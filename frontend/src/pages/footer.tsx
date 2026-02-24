import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Link to="/home" className="flex items-center gap-2">
              <img
                src="/images/Devbuddylogo2.png"
                className="h-6 w-6"
                alt="DevBuddy Logo"
              />
              <span className="text-lg font-bold tracking-tight text-primary">
                DevBuddy
              </span>
            </Link>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/home" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact_us" className="hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} DevBuddy. All rights reserved.
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
            Built with passion for developers. Empowering your learning journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
