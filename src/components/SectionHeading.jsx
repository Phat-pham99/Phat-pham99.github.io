export default function SectionHeading({ cmd, children, comment }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-base text-zinc-500 sm:text-sm">
        <span className="text-brand">$</span> {cmd}
      </p>
      <h2 className="mt-2 font-mono text-3xl font-bold text-zinc-100 sm:text-3xl md:text-4xl">
        {children}
        <span className="text-brand">_</span>
      </h2>
      {comment ? <p className="mt-2 max-w-prose text-zinc-400">{comment}</p> : null}
    </div>
  );
}
