import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="/images/Devbuddylogo2.png"
              className="h-8 w-8"
              alt="DevBuddy Logo"
            />
            <span className="text-xl font-bold tracking-tight text-primary hidden sm:inline-block">
              DevBuddy
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/home"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            to="/contact_us"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button asChild variant="secondary" size="sm" className="font-semibold hidden sm:flex hover:bg-secondary/80 transition-all duration-300">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild variant="default" size="sm" className="font-semibold">
            <Link to="/signup">Sign Up</Link>
          </Button>

          {/* Mobile Menu Placeholder - can be expanded with a Sheet if needed */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
