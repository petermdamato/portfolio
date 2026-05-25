const navLinkClass =
  "font-meta text-[10px] uppercase tracking-[0.22em] text-zinc-900 hover:text-[#3e0000] transition-colors";

export default function SiteNav() {
  return (
    <nav className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:right-12 z-30 flex items-center gap-6 pointer-events-auto">
      <a href="#work" className={navLinkClass}>
        Work
      </a>
      <a href="#contact" className={navLinkClass}>
        Contact
      </a>
    </nav>
  );
}
