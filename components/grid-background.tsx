export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-electric-cyan/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-accent-orange/5 to-transparent" />
    </div>
  );
}
