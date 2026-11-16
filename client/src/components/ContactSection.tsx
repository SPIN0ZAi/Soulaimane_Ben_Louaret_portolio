import { useState } from 'react';
import {
  Mail,
  Clock,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  Copy,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DotMatrix from './ui/DotMatrix';

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const emailAddress = 'ssolayman244@gmail.com';

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    toast({
      title: 'Email Copied!',
      description: 'ssolayman244@gmail.com copied to your clipboard.',
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: "Thank you for reaching out. I'll get back to you shortly.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;

        toast({
          title: 'Opening Email Client',
          description:
            'Direct message fallback activated. You can also send directly to ssolayman244@gmail.com.',
        });
        window.location.href = mailtoUrl;
      }
    } catch {
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      toast({
        title: 'Email Client Opened',
        description:
          'Your message was prepared in your default mail app. Thank you!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative scroll-mt-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header matching Image 7 "Let's Talk About Your Idea :::" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
                Let's Talk About Your Idea
              </h2>
              <DotMatrix />
            </div>

            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              Open to software engineering internships, junior systems developer positions, and open-source systems collaborations.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080202] border border-[#3D0000]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                  <span>ssolayman244@gmail.com</span>
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="p-1.5 rounded-lg bg-[#3D0000]/40 hover:bg-[#FF0000] text-zinc-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-[#FF0000]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#080202] border border-[#3D0000]">
                <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                <span>Albacete, Spain · ESII UCLM</span>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/SPIN0ZAi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3D0000]/30 hover:bg-[#3D0000]/80 text-xs font-mono text-zinc-200 border border-[#3D0000] hover:border-[#FF0000] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub @SPIN0ZAi</span>
              </a>

              <a
                href="https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3D0000]/30 hover:bg-[#3D0000]/80 text-xs font-mono text-zinc-200 border border-[#3D0000] hover:border-[#FF0000] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#FF0000]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Form Column matching Image 7 */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#080202] border border-[#3D0000] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-400">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-black/80 border-[#3D0000] text-white placeholder:text-zinc-600 focus-visible:ring-[#FF0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-400">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-black/80 border-[#3D0000] text-white placeholder:text-zinc-600 focus-visible:ring-[#FF0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono text-zinc-400">
                    Subject / Topic
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="Internship opportunity / Systems inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-black/80 border-[#3D0000] text-white placeholder:text-zinc-600 focus-visible:ring-[#FF0000]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-400">
                    Discussion / Details
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Hi Soulaimane, I saw your work on nup-extractor and FrameVault..."
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-xl bg-black/80 border-[#3D0000] text-white placeholder:text-zinc-600 focus-visible:ring-[#FF0000] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-full px-8 py-6 font-bold text-sm bg-[#FF0000] text-white hover:bg-[#d60000] shadow-xl shadow-[#FF0000]/30 transition-transform active:scale-95"
                  >
                    {isSubmitting ? 'Sending...' : 'Get in Touch'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar matching Image 7 */}
        <div className="pt-10 border-t border-[#3D0000]/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            
            <div className="flex items-center gap-3">
              <DotMatrix className="hidden sm:inline-grid shrink-0" />
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                  57+
                </div>
                <div className="text-xs text-zinc-400 font-sans">
                  Stars on nup-extractor
                </div>
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                100%
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Passed Years 1 &amp; 2 Coursework
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                3rd Year
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                UCLM CS (2026–27)
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                  24/7
                </div>
                <div className="text-xs text-zinc-400 font-sans">
                  Passion for Engineering
                </div>
              </div>
              <DotMatrix className="hidden sm:inline-grid shrink-0 ml-auto" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
