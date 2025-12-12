import type { Product } from '../types';

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const products: Product[] = [
  // Boba
  {
    id: 'erdbeer-boba',
    name: 'Erdbeer Boba',
    price: 4.9,
    image: img('erdbeer_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'heidelbeer-boba',
    name: 'Heidelbeer Boba',
    price: 4.9,
    image: img('heidelbeer_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'kirsche-boba',
    name: 'Kirsch Boba',
    price: 4.9,
    image: img('kirsche_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'kiwi-boba',
    name: 'Kiwi Boba',
    price: 4.9,
    image: img('kiwi_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'litschi-boba',
    name: 'Litschi Boba',
    price: 4.9,
    image: img('litschi_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'passionsfrucht-boba',
    name: 'Passionsfrucht Boba',
    price: 4.9,
    image: img('passionsfrucht_boba.jpg'),
    category: 'boba',
  },
  {
    id: 'mango-boba',
    name: 'Mango Boba',
    price: 4.9,
    image: img('mango_boba.jpg'),
    category: 'boba',
  },
  // Tapioka
  {
    id: 'tapioka',
    name: 'Tapioka',
    price: 5.2,
    image: img('tapioka.jpg'),
    category: 'tapioka',
  },
  // Tee
  {
    id: 'schwarztee',
    name: 'Schwarztee',
    price: 3.5,
    image: img('schwarztee.jpg'),
    category: 'tee',
  },
  // Sirup
  {
    id: 'mango-sirup',
    name: 'Mango Sirup',
    price: 2.5,
    image: img('mango_sirup.jpg'),
    category: 'sirup',
  },
  {
    id: 'erdbeer-sirup',
    name: 'Erdbeer Sirup',
    price: 2.5,
    image: img('erdbeer_sirup.jpg'),
    category: 'sirup',
  },
  {
    id: 'braunerzucker-sirup',
    name: 'Brauner Zucker Sirup',
    price: 2.5,
    image: img('braunerzucker_sirup.jpg'),
    category: 'sirup',
  },
  {
    id: 'melone-sirup',
    name: 'Melone Sirup',
    price: 2.5,
    image: img('melone_sirup.jpg'),
    category: 'sirup',
  },
  {
    id: 'passionsfrucht-sirup',
    name: 'Passionsfrucht Sirup',
    price: 2.5,
    image: img('passionsfrucht_sirup.jpg'),
    category: 'sirup',
  },
  {
    id: 'pfirsisch-sirup',
    name: 'Pfirsisch Sirup',
    price: 2.5,
    image: img('pfirsisch_sirup.jpg'),
    category: 'sirup',
  },
  // Zubehör
  {
    id: 'strohhalm-set',
    name: 'Trinkhalm Set',
    price: 1.9,
    image: img('strohhalm_braun.jpg'),
    category: 'zubehor',
  },
];
