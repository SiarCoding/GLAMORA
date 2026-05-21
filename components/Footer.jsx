export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-mist py-12">
      <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
        <div className="font-display text-[15px] tracking-[0.45em] text-noir/80">
          GLAMORA
        </div>
        <div className="text-[10px] uppercase tracking-widest2 text-noir/35">
          Hamburg · Dubai · © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest2 text-noir/45">
          <a href="#" className="hover:text-gold-600 transition-colors">Impressum</a>
          <a href="#" className="hover:text-gold-600 transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-gold-600 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
