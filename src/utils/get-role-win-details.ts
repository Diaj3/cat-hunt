import type { WinnerRole } from '../types/winnerRole';

import catwin1 from '../assets/cats/win-screen/catwin1.gif';
import catwin2 from '../assets/cats/win-screen/catwin2.gif';
import catwin3 from '../assets/cats/win-screen/catwin3.gif';
import catwin4 from '../assets/cats/win-screen/catwin4.gif';

import mousewin1 from '../assets/mice/win-screen/mousewin1.gif';
import mousewin2 from '../assets/mice/win-screen/mousewin2.gif';
import mousewin3 from '../assets/mice/win-screen/mousewin3.gif';
import mousewin4 from '../assets/mice/win-screen/mousewin4.gif';
import mousewin5 from '../assets/mice/win-screen/mousewin5.gif';

import raccoonwin1 from '../assets/raccoons/win-screen/raccoonwin1.gif';
import raccoonwin2 from '../assets/raccoons/win-screen/raccoonwin2.gif';

const catGifs = [catwin1, catwin2, catwin3, catwin4];
const mouseGifs = [mousewin1, mousewin2, mousewin3, mousewin4, mousewin5];
const raccoonGifs = [raccoonwin1, raccoonwin2];

const winnerDetails: Record<
  WinnerRole,
  { gif: string; title: string; description: string; color: string }
> = {
  MOUSE: {
    gif: mouseGifs[0],
    title: 'The Mice Win!',
    description: 'The village found every Cat and saved the day.',
    color: 'text-emerald-400',
  },
  CAT: {
    gif: catGifs[0],
    title: 'The Cats Win!',
    description: 'The Cats have taken control of the village.',
    color: 'text-red-400',
  },
  RACCOON: {
    gif: raccoonGifs[0],
    title: 'The Raccoon Wins!',
    description: 'The Raccoon was voted out and wins the game alone.',
    color: 'text-amber-400',
  },
};

export function getWinnerRoleDetails(winner: WinnerRole) {
  const catGif = catGifs[Math.floor(Math.random() * catGifs.length)];
  const mouseGif = mouseGifs[Math.floor(Math.random() * mouseGifs.length)];
  const raccoonGif =
    raccoonGifs[Math.floor(Math.random() * raccoonGifs.length)];

  winnerDetails['CAT'].gif = catGif;
  winnerDetails['MOUSE'].gif = mouseGif;
  winnerDetails['RACCOON'].gif = raccoonGif;

  return winnerDetails[winner];
}
