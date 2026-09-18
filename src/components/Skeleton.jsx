export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse border-b border-r border-zinc-800 bg-zinc-950/40 p-4">
          <div className="h-3 w-2/3 bg-zinc-800" />
          <div className="mt-3 h-2.5 w-full bg-zinc-800/70" />
          <div className="mt-2 h-2.5 w-4/5 bg-zinc-800/70" />
          <div className="mt-4 flex gap-2">
            <div className="h-4 w-14 bg-zinc-800/60" />
            <div className="h-4 w-14 bg-zinc-800/60" />
          </div>
        </div>
      ))}
    </div>
  );
}
