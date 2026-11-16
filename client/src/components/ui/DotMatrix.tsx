export default function DotMatrix({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-grid grid-cols-3 gap-1 align-middle ml-2.5 p-1 ${className}`}
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shadow-[0_0_8px_#FF0000]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#950101]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#950101]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shadow-[0_0_8px_#FF0000]" />
    </span>
  );
}
