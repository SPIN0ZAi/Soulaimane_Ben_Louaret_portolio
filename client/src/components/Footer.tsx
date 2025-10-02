import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Soulaimane Ben Louaret</h3>
            <p className="text-sm text-muted-foreground">
              Computer Engineering student passionate about technology, programming, and solving
              complex problems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    document
                      .querySelector(`#${item.toLowerCase()}`)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-footer-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => window.open('https://github.com/SPIN0ZAi', '_blank')}
                data-testid="button-footer-github"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b',
                    '_blank'
                  )
                }
                data-testid="button-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => (window.location.href = 'mailto:ssolayman244@gmail.com')}
                data-testid="button-footer-email"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> by Soulaimane Ben
            Louaret © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
