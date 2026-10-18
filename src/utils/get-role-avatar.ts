import type { Role } from '../types/role';

import cat1 from './../assets/cats/avatars/cat1.png';
import cat2 from './../assets/cats/avatars/cat2.png';
import cat3 from './../assets/cats/avatars/cat3.png';
import cat4 from './../assets/cats/avatars/cat4.png';
import cat5 from './../assets/cats/avatars/cat5.png';
import cat6 from './../assets/cats/avatars/cat6.png';

import owl1 from './../assets/owls/owl1.png';
import owl2 from './../assets/owls/owl2.png';
import owl3 from './../assets/owls/owl3.png';

import dog1 from './../assets/guard-dogs/dog1.png';
import dog2 from './../assets/guard-dogs/dog2.png';
import dog3 from './../assets/guard-dogs/dog3.png';

import raccoon1 from './../assets/raccoons/avatars/raccoon1.png';
import raccoon2 from './../assets/raccoons/avatars/raccoon2.png';
import raccoon3 from './../assets/raccoons/avatars/raccoon3.png';

import mouse1 from './../assets/mice/avatars/mouse1.png';
import mouse2 from './../assets/mice/avatars/mouse2.png';
import mouse3 from './../assets/mice/avatars/mouse3.png';
import mouse4 from './../assets/mice/avatars/mouse4.png';
import mouse5 from './../assets/mice/avatars/mouse5.png';
import mouse6 from './../assets/mice/avatars/mouse6.png';
import mouse7 from './../assets/mice/avatars/mouse7.png';
import mouse8 from './../assets/mice/avatars/mouse8.png';

import host1 from './../assets/hosts/host1.png';
import host2 from './../assets/hosts/host2.png';
import host3 from './../assets/hosts/host3.png';
import host4 from './../assets/hosts/host4.png';

export function getRoleAvatar(role: Role): string {
  const cats = [cat1, cat2, cat3, cat4, cat5, cat6];
  const owls = [owl1, owl2, owl3];
  const guardDogs = [dog1, dog2, dog3];
  const raccoons = [raccoon1, raccoon2, raccoon3];
  const mice = [mouse1, mouse2, mouse3, mouse4, mouse5, mouse6, mouse7, mouse8];
  const host = [host1, host2, host3, host4];

  switch (role) {
    case 'CAT':
      return cats[Math.floor(Math.random() * cats.length)];

    case 'OWL':
      return owls[Math.floor(Math.random() * owls.length)];

    case 'GUARD DOG':
      return guardDogs[Math.floor(Math.random() * guardDogs.length)];

    case 'RACCOON':
      return raccoons[Math.floor(Math.random() * raccoons.length)];

    case 'HOST':
      return host[Math.floor(Math.random() * host.length)];

    default:
      return mice[Math.floor(Math.random() * mice.length)];
  }
}
