export const LOCAL_MEMES = [
  {
    id: 'microservices-boats',
    width: 598,
    height: 450,
    alt: 'Meme: shipping containers being tied together on boats, captioned "when your boss tells you we\'re converting to microservices".',
  },
  {
    id: 'microservices-iq',
    width: 675,
    height: 499,
    alt: 'Meme: an IQ bell curve where "scalable microservices" sits in the middle, with "monolith here" on the left and "monolith it is" on the right.',
  },
  {
    id: 'microservices-cortex',
    width: 523,
    height: 521,
    alt: 'Meme: "running 700 microservices" paired with a strained cortex gauge, and "running 1 big monolith" paired with a relaxed one.',
  },
];

export function pickLocalMeme(random = Math.random) {
  return LOCAL_MEMES[Math.floor(random() * LOCAL_MEMES.length)];
}
