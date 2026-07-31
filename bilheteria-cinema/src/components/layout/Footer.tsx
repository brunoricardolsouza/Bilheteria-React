import Logo from "./Logo";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Careers", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 px-6 py-8">
      <div className="mb-6">
        <Logo />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <p className="text-xs text-gray-500 max-w-xs">
          © {new Date().getFullYear()} Cineplex Private Screening. All rights
          reserved. The ultimate cinematic sanctuary for true film lovers.
        </p>

        <div className="flex flex-wrap gap-6 text-xs text-gray-400">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href="#"
            aria-label="Website"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Trailers"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="Feed"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
