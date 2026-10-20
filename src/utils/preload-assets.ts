import cat1 from './../assets/cats/avatars/cat1.png';
import cat2 from './../assets/cats/avatars/cat2.png';
import cat3 from './../assets/cats/avatars/cat3.png';
import cat4 from './../assets/cats/avatars/cat4.png';
import cat5 from './../assets/cats/avatars/cat5.png';
import cat6 from './../assets/cats/avatars/cat6.png';

import catwin1 from '../assets/cats/win-screen/catwin1.gif';
import catwin2 from '../assets/cats/win-screen/catwin2.gif';
import catwin3 from '../assets/cats/win-screen/catwin3.gif';
import catwin4 from '../assets/cats/win-screen/catwin4.gif';

import owl1 from './../assets/owls/owl1.png';
import owl2 from './../assets/owls/owl2.png';
import owl3 from './../assets/owls/owl3.png';

import dog1 from './../assets/guard-dogs/dog1.png';
import dog2 from './../assets/guard-dogs/dog2.png';
import dog3 from './../assets/guard-dogs/dog3.png';

import raccoon1 from './../assets/raccoons/avatars/raccoon1.png';
import raccoon2 from './../assets/raccoons/avatars/raccoon2.png';
import raccoon3 from './../assets/raccoons/avatars/raccoon3.png';

import raccoonwin1 from '../assets/raccoons/win-screen/raccoonwin1.gif';
import raccoonwin2 from '../assets/raccoons/win-screen/raccoonwin2.gif';

import mouse1 from './../assets/mice/avatars/mouse1.png';
import mouse2 from './../assets/mice/avatars/mouse2.png';
import mouse3 from './../assets/mice/avatars/mouse3.png';
import mouse4 from './../assets/mice/avatars/mouse4.png';
import mouse5 from './../assets/mice/avatars/mouse5.png';
import mouse6 from './../assets/mice/avatars/mouse6.png';
import mouse7 from './../assets/mice/avatars/mouse7.png';
import mouse8 from './../assets/mice/avatars/mouse8.png';

import mousewin1 from '../assets/mice/win-screen/mousewin1.gif';
import mousewin2 from '../assets/mice/win-screen/mousewin2.gif';
import mousewin3 from '../assets/mice/win-screen/mousewin3.gif';
import mousewin4 from '../assets/mice/win-screen/mousewin4.gif';
import mousewin5 from '../assets/mice/win-screen/mousewin5.gif';

import host1 from './../assets/hosts/host1.png';
import host2 from './../assets/hosts/host2.png';
import host3 from './../assets/hosts/host3.png';
import host4 from './../assets/hosts/host4.png';

import dawn from './../assets/others/dawn.png';
import dusk from './../assets/others/dusk.png';

import logo from './../assets/logo/logo.png';

const GAME_ASSETS = [
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  catwin1,
  catwin2,
  catwin3,
  catwin4,
  owl1,
  owl2,
  owl3,
  dog1,
  dog2,
  dog3,
  raccoon1,
  raccoon2,
  raccoon3,
  raccoonwin1,
  raccoonwin2,
  mouse1,
  mouse2,
  mouse3,
  mouse4,
  mouse5,
  mouse6,
  mouse7,
  mouse8,
  mousewin1,
  mousewin2,
  mousewin3,
  mousewin4,
  mousewin5,
  host1,
  host2,
  host3,
  host4,
  dawn,
  dusk,
  logo,
];

/**
 * Improve asset load times by preloading and chaching
 * all assets on launch
 */
export function preloadGameAssets(): void {
  GAME_ASSETS.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
