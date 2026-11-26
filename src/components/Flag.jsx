// Inline SVGs because emoji flags render as plain letters on Windows.
const FLAGS = {
  US: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="12" height={(7 * 20) / 13} fill="#3C3B6E" />
    </>
  ),
  VN: (
    <>
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15"
        fill="#FFFF00"
      />
    </>
  ),
  JP: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </>
  ),
  FI: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect x="8.33" width="5" height="20" fill="#002F6C" />
      <rect y="7.27" width="30" height="5.45" fill="#002F6C" />
    </>
  ),
};

export default function Flag({ country, className = '' }) {
  return (
    <svg viewBox="0 0 30 20" className={`shrink-0 ring-1 ring-zinc-700/60 ${className}`} aria-hidden="true" focusable="false">
      {FLAGS[country]}
    </svg>
  );
}
