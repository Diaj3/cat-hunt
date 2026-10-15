import type { Role } from '../types/game';
import cat1 from './../assets/cats/cat1.jpg';
import cat2 from './../assets/cats/cat2.jpg';
import cat3 from './../assets/cats/cat3.jpg';
import cat4 from './../assets/cats/cat4.webp';
import cat5 from './../assets/cats/cat5.jpeg';

import owl1 from './../assets/owls/owl1.jpg';
import owl2 from './../assets/owls/owl2.jpeg';
import owl3 from './../assets/owls/owl3.jpeg';

import dog1 from './../assets/guard-dogs/dog1.jpg';
import dog2 from './../assets/guard-dogs/dog2.png';
import dog3 from './../assets/guard-dogs/dog3.png';

import raccoon1 from './../assets/raccoons/raccoon1.jpg';
import raccoon2 from './../assets/raccoons/raccoon2.jpeg';
import raccoon3 from './../assets/raccoons/raccoon3.jpeg';

import mouse1 from './../assets/mice/mouse1.jpeg';
import mouse2 from './../assets/mice/mouse2.jpg';
import mouse3 from './../assets/mice/mouse3.jpeg';
import mouse4 from './../assets/mice/mouse4.jpg';
import mouse5 from './../assets/mice/mouse5.jpg';

import host1 from './../assets/hosts/host1.jpg';
import host2 from './../assets/hosts/host2.gif';
import host3 from './../assets/hosts/host3.jpg';
import host4 from './../assets/hosts/host4.jpeg';

export function getRoleAvatar(role: Role): string {
  const cats = [cat1, cat2, cat3, cat4, cat5];
  const owls = [owl1, owl2, owl3];
  const guardDogs = [dog1, dog2, dog3];
  const raccoons = [raccoon1, raccoon2, raccoon3];
  const mice = [mouse1, mouse2, mouse3, mouse4, mouse5];
  const host = [host1, host2, host3, host4];

  switch (role) {
    case 'Cat':
      return cats[Math.floor(Math.random() * cats.length)];

    case 'Owl':
      return owls[Math.floor(Math.random() * owls.length)];

    case 'Guard Dog':
      return guardDogs[Math.floor(Math.random() * guardDogs.length)];

    case 'Raccoon':
      return raccoons[Math.floor(Math.random() * raccoons.length)];

    case 'Host':
      return host[Math.floor(Math.random() * host.length)];

    default:
      return mice[Math.floor(Math.random() * mice.length)];
  }
}
