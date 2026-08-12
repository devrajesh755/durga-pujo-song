export default function HeroTitle() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
      <h1
        className="animate-hero-in font-bengali font-extrabold text-cream drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]"
        style={{
          fontSize: "clamp(3.25rem, 9vw, 10rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em"
        }}
      >
        দুর্গা
        <br />
        এলো
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm font-medium uppercase tracking-[0.35em] text-cream/70 sm:text-base">
        শুভ শারদীয়া — Rajesh Manik
      </p>
    </div>
  );
}
