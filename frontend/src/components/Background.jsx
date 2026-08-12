export default function Background() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <img
        src="/assets/hero-background.jpg"
        alt=""
        className="h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />
      {/* Subtle gradient so the UI stays readable without flattening the artwork */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,12,8,0.45) 0%, rgba(20,12,8,0.05) 22%, rgba(20,12,8,0.05) 60%, rgba(20,12,8,0.55) 100%)"
        }}
      />
    </div>
  );
}
