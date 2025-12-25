export default function loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-linear-to-b from-background to-muted">
      <div className="w-20 h-20 rounded-full border-4 border-t-primary border-b-secondary animate-spin shadow-glow-primary"></div>
    </div>
  );
}