import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("idle");
  const [honeypot, setHoneypot] = useState(""); // 🛡️ Le piège à robot

  // Récupération sécurisée des clés depuis le fichier .env
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    // 🛡️ SÉCURITÉ : Si le champ caché est rempli, c'est un robot. On annule tout.
    if (honeypot !== "") {
      console.warn("Robot détecté ! Envoi bloqué.");
      return; 
    }

    setStatus("loading");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log("SUCCÈS !", result.text);
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus("idle"), 5000); 
      }, (error) => {
          console.error("ERREUR:", error.text);
          setStatus("error");
          setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FD1ED]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E91E63]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Parlons <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1ED] to-[#E91E63]">Projet</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-medium">
            Remplis ce formulaire, je le reçois directement sur mon téléphone.
          </p>
        </div>

        <div className="bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden group/form">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4FD1ED] to-[#E91E63] opacity-50" />

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            
            {/* 🛡️ CHAMP PIÈGE (HONEYPOT) : Invisible pour l'humain, visible pour le robot */}
            <input 
              type="text" 
              name="bot-field" 
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }} 
              autoComplete="off"
            />

            {/* Titre caché pour le template */}
            <input type="hidden" name="title" value="Nouveau Lead Portfolio" />

            <div className="relative group">
              <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#4FD1ED] transition-colors" size={20} />
              <input type="text" name="name" placeholder="Ton Nom" required className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#4FD1ED] transition-all" />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#E91E63] transition-colors" size={20} />
              <input type="email" name="email" placeholder="Ton Email" required className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#E91E63] transition-all" />
            </div>

            <div className="relative group">
              <MessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-white transition-colors" size={20} />
              <textarea name="message" rows="5" placeholder="Ton message..." required className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/30 transition-all resize-none" />
            </div>

            <button type="submit" disabled={status === "loading" || status === "success"} className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${status === "success" ? "bg-green-500/20 text-green-500 border border-green-500/50" : status === "error" ? "bg-red-500/20 text-red-500 border border-red-500/50" : "bg-gradient-to-r from-[#4FD1ED] to-[#E91E63] text-white hover:shadow-[0_0_20px_rgba(233,30,99,0.4)]"}`}>
              {status === "idle" && <>Envoyer <Send size={18} /></>}
              {status === "loading" && <><Loader2 size={20} className="animate-spin" /> Envoi...</>}
              {status === "success" && <><CheckCircle size={20} /> Reçu 5/5 !</>}
              {status === "error" && <><AlertCircle size={20} /> Erreur</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;