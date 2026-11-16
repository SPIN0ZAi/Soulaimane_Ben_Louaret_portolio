import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CtaBanner() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    window.location.href = `mailto:ssolayman244@gmail.com?subject=Collaboration%20Inquiry&body=Hi%20Soulaimane,%20let's%20connect.%20My%20email%20is%20${encodeURIComponent(email)}`;
    toast({
      title: 'Connecting...',
      description: 'Opening your email client to connect with Soulaimane.',
    });
    setEmail('');
  };

  return (
    <section className="py-20 relative bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card matching Image 6 */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#080202] via-[#0d0303] to-[#120404] border border-[#3D0000] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Ambient red glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FF0000]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Let's Build{' '}
                <span className="text-[#FF0000] relative inline-block">
                  Something Amazing
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-xl leading-relaxed">
                Whether you have an internship opportunity, a systems challenge, or an innovative full-stack project in mind, I am ready to build with you.
              </p>

              {/* Email Form with Red Arrow Pill Button */}
              <form onSubmit={handleSubscribe} className="flex max-w-md items-center rounded-full bg-black/80 border border-[#3D0000] p-1.5 focus-within:border-[#FF0000] transition-colors shadow-lg">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 px-5 rounded-full bg-[#FF0000] hover:bg-[#d60000] text-white font-bold flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-[#FF0000]/30"
                  title="Send"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Side: 3D Character Popping Up */}
            <div className="lg:col-span-4 relative hidden lg:flex items-end justify-center">
              <motion.img
                src="/images/soulaimane-3d.png?v=2"
                alt="Soulaimane 3D Avatar"
                className="w-72 h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(255,0,0,0.3)] select-none"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
