export default function Badge({ children, as: Tag = 'span', href }) {
  const className =
    'inline-flex items-center gap-1.5 border border-zinc-700 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-zinc-300 sm:px-2 sm:py-0.5 sm:text-[10px]';
  if (Tag === 'a') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${className} transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand`}
      >
        {children}
      </a>
    );
  }
  return <Tag className={className}>{children}</Tag>;
}
