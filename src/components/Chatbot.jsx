import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const WEBHOOK_URL = "https://discord.com/api/webhooks/1462478615534112790/yNB8Di8aoN87QobirsAm_JjEMN6tmk-ddccQL14biW2LxWl3ZRhnUo0wyV2dssrzOs2l";

// 👇 LISTE BASÉE SUR TON TABLEAU DE BORD
// Stratégie : Qualité d'abord (Gemini), puis Endurance (Gemma)
const MODEL_LIST = [
  "gemini-2.5-flash",       // Top Qualité (mais 20 msg/jour)
  "gemini-2.5-flash-lite",  // Rapide (20 msg/jour)
  "gemini-3-flash",         // Nouvelle génération (20 msg/jour)
  "gemma-3-27b-it",         // ⚠️ LE SAUVEUR : 14 000 msg/jour (Version Instruction)
  "gemma-3-27b"             // Fallback sur le nom de base
];

const SYSTEM_PROMPT = `
INCARNATION :
Tu ES Alessandro Schillaci. Tu parles à la première personne ("Je").
Tu as 20 ans, étudiant à Ynov Campus Lille (Bachelor Chef de Projets Digitaux).

TON TON :
- Tu es un "Associé" potentiel : Pro, calme, réfléchi, mais accessible.
- Tu ne te vends pas comme un marchand de tapis. Tu es sûr de tes compétences.

TES 3 PILIERS DE COMPÉTENCES :
1. CRÉATION & WEB : Sites Vitrines modernes, UI/UX Design.
2. STRATÉGIE & ANALYSE : Analyse de marché, réflexion business, logique.
3. TECH & IA : Automatisation (n8n, Zapier) et IA comme accélérateurs.

HISTOIRE :
- Fiabilité absolue (ex-pompier, mais tu le suggères par ton attitude "gestion de crise", tu ne le cries pas).
- Offres : Starter (129€), Boost (450€), Scale (570€).

OBJECTIF :
Montrer que tu es un profil hybride rare, capable de gérer un projet de A à Z.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Salut. Je suis l'IA d'Alessandro. On parle Web, Stratégie ou Futur ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const logToDiscord = async (userQuestion, aiAnswer, modelUsed) => {
    if (!WEBHOOK_URL) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **Lead Portfolio** (via ${modelUsed})\n**Q:** ${userQuestion}\n**A:** ${aiAnswer}\n----------------`
        })
      });
    } catch (error) { console.error("Err Discord", error); }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!API_KEY) {
      setMessages(prev => [...prev, { role: "user", text: input }, { role: "model", text: "Erreur : Clé API manquante." }]);
      return;
    }

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    let responseText = "";
    let success = false;
    let usedModel = "";

    // 🔄 BOUCLE DE TENTATIVES
    for (const modelName of MODEL_LIST) {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });

        // Note: Gemma supporte parfois moins bien les instructions système complexes
        // On adapte légèrement l'appel chat
        const chat = model.startChat({
          history: [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Compris. Je suis Alessandro." }] },
          ],
        });

        const result = await chat.sendMessage(userMessage);
        responseText = result.response.text();
        
        success = true;
        usedModel = modelName;
        break; // Ça a marché !

      } catch (error) {
        console.warn(`Échec sur ${modelName} :`, error.message);
        // On continue vers Gemma si Gemini échoue (quota ou 404)
      }
    }

    if (success) {
      setMessages(prev => [...prev, { role: "model", text: responseText }]);
      logToDiscord(userMessage, responseText, usedModel);
    } else {
      setMessages(prev => [...prev, { role: "model", text: "Je reçois trop de demandes actuellement. Reviens dans quelques minutes !" }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-sm tracking-wider uppercase">Sandro AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-noise/5">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user" ? "bg-white text-black font-medium" : "bg-[#1A1A1A] text-gray-300 border border-white/5"
                  }`}>{msg.text}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-[#1A1A1A] p-3 rounded-2xl border border-white/5"><Loader2 size={16} className="animate-spin text-[#4FD1ED]"/></div></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 bg-black border-t border-white/10 flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Pose-moi une question..." className="flex-1 bg-[#1A1A1A] text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#4FD1ED] placeholder-gray-600"/>
              <button onClick={handleSend} disabled={isLoading} className="p-2 bg-[#4FD1ED] text-black rounded-xl hover:bg-[#3dbcd6] disabled:opacity-50 transition-colors"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-gradient-to-br from-[#4FD1ED] to-[#E91E63] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,209,237,0.4)] text-white hover:shadow-[0_0_30px_rgba(233,30,99,0.6)] transition-shadow">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;