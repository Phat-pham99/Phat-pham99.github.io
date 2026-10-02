import { memo } from 'react';
import BtopPanel from './BtopPanel.jsx';
import useMeme from '../hooks/useMeme.js';
import microservicesBoats from '../assets/Microservices_meme_1.jpeg';
import microservicesIq from '../assets/Microservices_meme_2.jpeg';
import microservicesCortex from '../assets/Microservices_meme_3.png';

const LOCAL_SRC = {
  'microservices-boats': microservicesBoats,
  'microservices-iq': microservicesIq,
  'microservices-cortex': microservicesCortex,
};

function Meme() {
  const { status, meme, source, useLocal } = useMeme();
  const isFallback = source === 'fallback';

  return (
    <BtopPanel
      title="MEME / CACHE"
      titleRight={status === 'loading' ? 'fetching...' : isFallback ? 'local-meme.jpg' : 'meme.jpg'}
      accent="mem"
      fullHeight
      className="min-w-0 overflow-hidden"
      contentClassName="flex min-h-0 flex-col"
    >
      <div className="flex min-h-0 flex-1 items-center justify-center p-3">
        {status === 'loading' ? (
          <p role="status" className="px-3 text-center font-mono text-sm text-zinc-500 sm:text-xs">
            pulling a fresh meme...
          </p>
        ) : (
          <img
            src={meme.url ?? LOCAL_SRC[meme.id]}
            alt={meme.alt}
            width={meme.width}
            height={meme.height}
            loading="lazy"
            decoding="async"
            onError={useLocal}
            className="max-h-64 min-h-0 w-auto max-w-full border border-zinc-800 object-contain sm:max-h-72"
          />
        )}
      </div>
      <div className="border-t border-zinc-800 bg-zinc-900/20 px-3 py-2 font-mono text-xs leading-relaxed text-zinc-500 sm:py-1.5 sm:text-[10px]">
          <>
            <span className="text-zinc-600">#</span> You look sad. Grab a meme, it's free.
          </>
      </div>
    </BtopPanel>
  );
}

export default memo(Meme);
