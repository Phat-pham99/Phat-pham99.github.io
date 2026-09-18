export default function SectionHeading({ cmd, children, comment }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-zinc-500">
        <span className="text-brand">$</span> {cmd}
      </p>
      <h2 className="mt-2 font-mono text-2xl font-bold text-zinc-100 sm:text-3xl">
        {children}
        <span className="text-brand">_</span>
      </h2>
      {comment ? <p className="mt-2 max-w-prose text-zinc-400">{comment}</p> : null}
    </div>
  );
}
