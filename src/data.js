/** Данные магазина и товаров с VK market «МОЙ ХОББИМИР» (group 15939030). */

export const site = {
  name: 'МОЙ ХОББИМИР',
  tagline: 'натуральные камни, фурнитура',
  city: 'Казань',
  address: 'ул. Маршала Чуйкова, 53',
  addressFull: 'Казань, ул. Маршала Чуйкова, 53',
  hours: [
    { days: 'Пн–Пт', time: '10:00–19:00' },
    { days: 'Сб', time: '10:00–17:00' },
    { days: 'Вс', time: 'выходной' },
  ],
  phones: [
    { label: 'Магазин', value: '+7 (966) 240-36-02', href: 'tel:+79662403602' },
    { label: 'Лариса', value: '+7 (905) 317-28-69', href: 'tel:+79053172869' },
    { label: 'Лилия', value: '+7 (903) 306-41-97', href: 'tel:+79033064197' },
  ],
  vk: 'https://vk.com/rukodeliye_kazan',
  market: 'https://vk.com/market-15939030',
  map: 'https://yandex.ru/maps/?text=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9C%D0%B0%D1%80%D1%88%D0%B0%D0%BB%D0%B0%20%D0%A7%D1%83%D0%B9%D0%BA%D0%BE%D0%B2%D0%B0%2C%2053',
};

export const nav = [
  { label: 'Каталог', href: '#categories' },
  { label: 'Камни', href: '#categories' },
  { label: 'Фурнитура', href: '#categories' },
  { label: 'Бисер', href: '#categories' },
  { label: 'Инструменты', href: '#categories' },
  { label: 'Доставка', href: site.vk },
  { label: 'Контакты', href: '#contacts' },
];

export const categories = [
  {
    id: 'stones',
    title: 'Натуральные камни',
    desc: 'Нити, галтовка, самородки и срезы',
    image: 'images/gallery/raw-stones.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'beads',
    title: 'Бусины',
    desc: 'Камень, керамика, стекло, лэмпворк',
    image: 'images/gallery/ceramic.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'findings',
    title: 'Фурнитура',
    desc: 'Стальная и позолоченная фурнитура',
    image: 'images/gallery/findings.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'chains',
    title: 'Цепи',
    desc: 'Цепочки и основы для украшений',
    image: 'images/gallery/clasps.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'pendants',
    title: 'Подвески',
    desc: 'Смола, эмаль, камень и стекло',
    image: 'images/gallery/pendants.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'seed',
    title: 'Бисер',
    desc: 'Бисер и стеклярус',
    image: 'images/gallery/velvet.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'tools',
    title: 'Инструменты',
    desc: 'Всё для сборки украшений',
    image: 'images/gallery/gallery2.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'cabochons',
    title: 'Кабошоны',
    desc: 'Кабошоны, коннекторы, вставки',
    image: 'images/gallery/dzi.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'cords',
    title: 'Шнуры и нити',
    desc: 'Шнуры, резинка, ланка, леска',
    image: 'images/gallery/pearl.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'packaging',
    title: 'Упаковка',
    desc: 'Упаковка для готовых изделий',
    image: 'images/gallery/store.jpg',
    href: 'https://vk.com/market-15939030',
  },
];

export const products = [
  {
    id: '13497423',
    title: 'Кварц розовый',
    meta: 'звезда 6×2 мм · нить',
    price: 650,
    image: 'images/products/13497423.jpg',
    href: 'https://vk.ru/market/product/kvarts-rozovy-zvezda-6kh2mm-otverstie-07mm-nit6134-15939030-13497423',
    stone: 'rose-quartz',
  },
  {
    id: '13497406',
    title: 'Тигровый глаз',
    meta: 'звезда 6×2 мм · нить',
    price: 650,
    image: 'images/products/13497406.jpg',
    href: 'https://vk.ru/market/product/tigrovy-glaz-zvezda-6kh2mm-otverstie-07mm-nit6133-15939030-13497406',
    stone: 'tiger-eye',
  },
  {
    id: '13497393',
    title: 'Аметист',
    meta: 'звезда 6×2 мм · нить',
    price: 650,
    image: 'images/products/13497393.jpg',
    href: 'https://vk.ru/market/product/ametist-zvezda-6kh2mm-otverstie-07mm-nit6129-15939030-13497393',
    stone: 'amethyst',
  },
  {
    id: '13497384',
    title: 'Кварц розовый',
    meta: 'клевер 14×5 мм',
    price: 890,
    image: 'images/products/13497384.jpg',
    href: 'https://vk.ru/market/product/kvarts-rozovy-klever-14kh5mm-otverstie-12mm-pnit6128-15939030-13497384',
    stone: 'rose-quartz',
  },
  {
    id: '13497368',
    title: 'Авантюрин зелёный',
    meta: 'клевер 14×5 мм',
    price: 890,
    image: 'images/products/13497368.jpg',
    href: 'https://vk.ru/market/product/avantyurin-naturalny-zeleny-klever-14kh5mm-otverstie-12mm-pnit6126-15939030-13497368',
    stone: 'aventurine',
  },
  {
    id: '13497357',
    title: 'Аметист',
    meta: 'клевер 14×5 мм',
    price: 1230,
    image: 'images/products/13497357.jpg',
    href: 'https://vk.ru/market/product/ametist-klever-14kh5mm-otverstie-12mm-pnit6123-15939030-13497357',
    stone: 'amethyst',
  },
  {
    id: '13490942',
    title: 'Тигровый глаз',
    meta: 'галтовка 20–12×17–7 мм',
    price: 1290,
    image: 'images/products/13490942.jpg',
    href: 'https://vk.ru/market/product/tigrovy-glaz-galtovka-20-12kh17-7mm-nit6117-15939030-13490942',
    stone: 'tiger-eye',
  },
  {
    id: '13490913',
    title: 'Лазурит',
    meta: 'галтовка 20–12×17–7 мм',
    price: 1290,
    image: 'images/products/13490913.jpg',
    href: 'https://vk.ru/market/product/lazurit-galtovka-20-12kh17-7mm-nit6114-15939030-13490913',
    stone: 'lapis',
  },
];

export const builds = [
  {
    id: 'bracelet',
    title: 'Браслет',
    image: 'images/gallery/gallery1.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'beads',
    title: 'Бусы',
    image: 'images/gallery/novinki.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'earrings',
    title: 'Серьги',
    image: 'images/gallery/pendants.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'necklace',
    title: 'Колье',
    image: 'images/gallery/pearl.jpg',
    href: 'https://vk.com/market-15939030',
  },
  {
    id: 'choker',
    title: 'Чокер',
    image: 'images/gallery/velvet.jpg',
    href: 'https://vk.com/market-15939030',
  },
];

export const stoneOfWeek = {
  title: 'Розовый кварц',
  eyebrow: 'Камень недели',
  text: 'Нежный натуральный камень для браслетов, бус и подвесок. В каталоге — нити, звёзды и клевер.',
  image: 'images/gallery/rose-feature.jpg',
  href: 'https://vk.ru/market/product/kvarts-rozovy-klever-14kh5mm-otverstie-12mm-pnit6128-15939030-13497384',
  variants: [
    { name: 'Аметист', image: 'images/products/13497393.jpg', href: 'https://vk.ru/market/product/ametist-zvezda-6kh2mm-otverstie-07mm-nit6129-15939030-13497393' },
    { name: 'Агат', image: 'images/products/13497363.jpg', href: 'https://vk.ru/market/product/agat-bely-klever-14kh5mm-otverstie-12mm-pnit6125-15939030-13497363' },
    { name: 'Тигровый глаз', image: 'images/products/13497406.jpg', href: 'https://vk.ru/market/product/tigrovy-glaz-zvezda-6kh2mm-otverstie-07mm-nit6133-15939030-13497406' },
    { name: 'Авантюрин', image: 'images/products/13497368.jpg', href: 'https://vk.ru/market/product/avantyurin-naturalny-zeleny-klever-14kh5mm-otverstie-12mm-pnit6126-15939030-13497368' },
    { name: 'Лазурит', image: 'images/products/13490913.jpg', href: 'https://vk.ru/market/product/lazurit-galtovka-20-12kh17-7mm-nit6114-15939030-13490913' },
    { name: 'Горный хрусталь', image: 'images/products/13497398.jpg', href: 'https://vk.ru/market/product/gorny-khrustal-zvezda-6kh2mm-otverstie-07mm-nit6131-15939030-13497398' },
  ],
};

export function formatPrice(n) {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}
