import './style.css';
import {
  site,
  nav,
  categories,
  products,
  builds,
  stoneOfWeek,
  formatPrice,
} from './data.js';

const favorites = new Set(JSON.parse(localStorage.getItem('hm-favs') || '[]'));
const cart = JSON.parse(localStorage.getItem('hm-cart') || '[]');

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
    heart: '<path d="M20.8 8.8c0 5-8.8 10-8.8 10S3.2 13.8 3.2 8.8A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.3Z"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    truck: '<path d="M2 6h12v11H2zM14 10h4l4 4v3h-8z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</g></svg>`;
}

function saveState() {
  localStorage.setItem('hm-favs', JSON.stringify([...favorites]));
  localStorage.setItem('hm-cart', JSON.stringify(cart));
  updateBadges();
}

function updateBadges() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(cart.length);
  });
  document.querySelectorAll('[data-fav-count]').forEach((el) => {
    el.textContent = String(favorites.size);
    el.hidden = favorites.size === 0;
  });
}

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-card__media" href="${product.href}" target="_blank" rel="noopener">
        <img src="${product.image}" alt="${product.title} — ${product.meta}" loading="lazy" width="400" height="400">
      </a>
      <button class="product-card__fav ${favorites.has(product.id) ? 'is-active' : ''}" type="button" data-fav="${product.id}" aria-label="В избранное">${icon('heart')}</button>
      <div class="product-card__body">
        <div class="product-card__text">
          <h3>${product.title}</h3>
          <p>${product.meta}</p>
          <strong>${formatPrice(product.price)}</strong>
        </div>
        <button class="product-card__cart" type="button" data-add="${product.id}" aria-label="В корзину">${icon('bag')}</button>
      </div>
    </article>`;
}

function render() {
  const arrivals = products.slice(0, 6);

  document.querySelector('#app').innerHTML = `
    <header class="header" data-header>
      <div class="shell header__bar">
        <a class="logo" href="#top" aria-label="${site.name} — на главную">
          <img class="logo__img" src="images/gallery/logo.jpg" alt="" width="40" height="40">
          <span>
            <strong>${site.name}</strong>
            <small>${site.tagline}</small>
          </span>
        </a>

        <nav class="nav" aria-label="Основная навигация">
          ${nav.map((item) => `
            <a href="${item.href}">
              ${item.label}${item.dropdown ? `<span class="nav__caret">${icon('chevronDown')}</span>` : ''}
            </a>`).join('')}
        </nav>

        <form class="search" action="${site.market}" method="get" target="_blank" rel="noopener">
          <input type="search" name="q" placeholder="Поиск товаров, камней, фурнитуры…" aria-label="Поиск">
          <button type="submit" aria-label="Найти">${icon('search')}</button>
        </form>

        <div class="header__tools">
          <button class="icon-btn" type="button" data-favorites-open aria-label="Избранное">
            ${icon('heart')}
            <span class="badge" data-fav-count hidden>0</span>
          </button>
          <a class="icon-btn" href="${site.market}" target="_blank" rel="noopener" aria-label="Корзина">
            ${icon('bag')}
            <span class="badge badge--always" data-cart-count>0</span>
          </a>
          <button class="icon-btn header__burger" type="button" data-menu-open aria-label="Меню">${icon('menu')}</button>
        </div>
      </div>

      <div class="mobile-nav" data-mobile-nav hidden>
        <nav aria-label="Мобильная навигация">
          ${nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
        </nav>
      </div>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__copy">
          <p class="eyebrow">Натуральные камни и фурнитура</p>
          <h1 id="hero-title">Вдохновение в каждой бусине</h1>
          <p class="hero__lead">Натуральные камни, фурнитура и всё для создания украшений в Казани. Для вашего хобби, творчества и стильных аксессуаров.</p>
          <div class="hero__actions">
            <a class="btn btn--solid" href="#categories">Перейти в каталог ${icon('arrow')}</a>
            <a class="btn btn--ghost" href="#arrivals">Новинки</a>
          </div>
        </div>
        <figure class="hero__figure">
          <img src="images/gallery/hero.jpg" alt="Нити натуральных бусин и камней" width="1400" height="900" fetchpriority="high">
        </figure>
      </section>

      <section class="info-strip" aria-label="Информация о магазине">
        <div class="shell info-strip__grid">
          <div class="info-item">
            ${icon('pin')}
            <div>
              <strong>${site.addressFull}</strong>
              <span>${site.hoursShort}</span>
            </div>
          </div>
          <div class="info-item">
            ${icon('truck')}
            <div>
              <strong>Доставка по России</strong>
              <span class="info-item__carriers">${site.carriers.join(' · ')}</span>
            </div>
          </div>
          <div class="info-item">
            ${icon('card')}
            <div>
              <strong>Наличные, карта, QR-код</strong>
              <span>Оплата в магазине и онлайн</span>
            </div>
          </div>
        </div>
      </section>

      <section class="block shell" id="categories">
        <div class="block__head">
          <h2>Популярные категории</h2>
          <a class="link" href="${site.market}" target="_blank" rel="noopener">Весь каталог ${icon('arrow')}</a>
        </div>
        <div class="cat-grid">
          ${categories.map((cat) => `
            <a class="cat-card" href="${cat.href}" target="_blank" rel="noopener">
              <img src="${cat.image}" alt="${cat.title}" loading="lazy" width="360" height="280">
              <span class="cat-card__foot">
                <span>
                  <strong>${cat.title}</strong>
                  <small>${cat.desc}</small>
                </span>
                <i aria-hidden="true">${icon('chevron')}</i>
              </span>
            </a>`).join('')}
        </div>
      </section>

      <section class="block shell" id="arrivals">
        <div class="block__head">
          <h2>Свежие поступления</h2>
          <div class="rail-nav">
            <button type="button" data-scroll-left aria-label="Назад">${icon('arrow')}</button>
            <button type="button" data-scroll-right aria-label="Вперёд">${icon('arrow')}</button>
          </div>
        </div>
        <div class="product-rail" data-rail>${arrivals.map(productCard).join('')}</div>
      </section>

      <section class="build">
        <div class="shell build__inner">
          <div class="build__copy">
            <p class="eyebrow">Вдохновение для ваших идей</p>
            <h2>Соберите своё<br>украшение</h2>
            <p>Подберём все необходимые материалы для вашего изделия.</p>
            <a class="btn btn--solid" href="${site.market}" target="_blank" rel="noopener">Выбрать изделие ${icon('arrow')}</a>
          </div>
          <div class="build__rail">
            ${builds.map((item) => `
              <a class="build-card" href="${item.href}" target="_blank" rel="noopener">
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="280" height="280">
                <span>${item.title}${icon('chevron')}</span>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="stone-week shell" aria-labelledby="stone-title">
        <article class="stone-feature">
          <div class="stone-feature__copy">
            <p class="eyebrow">${stoneOfWeek.eyebrow}</p>
            <h2 id="stone-title">${stoneOfWeek.title}</h2>
            <p>${stoneOfWeek.text}</p>
            <a class="btn btn--light" href="${stoneOfWeek.href}" target="_blank" rel="noopener">${stoneOfWeek.cta} ${icon('arrow')}</a>
          </div>
          <div class="stone-feature__photo">
            <img src="${stoneOfWeek.image}" alt="${stoneOfWeek.title}" loading="lazy" width="900" height="700">
          </div>
        </article>
        <aside class="stone-aside">
          <div class="stone-aside__head">
            <h3>Другие популярные камни</h3>
          </div>
          <div class="stone-aside__grid">
            ${stoneOfWeek.variants.map((v) => `
              <a href="${v.href}" target="_blank" rel="noopener">
                <img src="${v.image}" alt="${v.name}" loading="lazy" width="200" height="140">
                <span>${v.name}${icon('arrow')}</span>
              </a>`).join('')}
          </div>
        </aside>
      </section>

      <section class="about-row shell" id="contacts">
        <article class="about-card about-card--store">
          <img src="images/gallery/store.jpg" alt="Магазин в Казани" loading="lazy" width="320" height="240">
          <div>
            <h3>Наш магазин в Казани</h3>
            <p>${site.addressFull}</p>
            <p class="about-card__meta">${site.hoursShort}</p>
            <a class="link" href="${site.map}" target="_blank" rel="noopener">Построить маршрут ${icon('arrow')}</a>
          </div>
        </article>

        <article class="about-card about-card--delivery">
          <div>
            <h3>Доставляем по всей России</h3>
            <div class="carrier-logos" aria-label="Службы доставки">
              <b>СДЭК</b>
              <b>OZON</b>
              <b>Яндекс<br>Доставка</b>
              <b>ПОЧТА<br>РОССИИ</b>
            </div>
            <p class="about-card__meta">Быстро и надёжно — в любой город</p>
            <a class="link" href="${site.vk}" target="_blank" rel="noopener">Подробнее ${icon('arrow')}</a>
          </div>
          <img src="images/gallery/gallery2.jpg" alt="Упаковка заказа" loading="lazy" width="180" height="220">
        </article>

        <article class="about-card about-card--pay">
          <div>
            <h3>Способы оплаты</h3>
            <p>Наличные, карта, QR-код — в магазине и онлайн.</p>
            <a class="btn btn--ghost btn--sm" href="${site.vk}" target="_blank" rel="noopener">Подробнее ${icon('arrow')}</a>
          </div>
          <img src="images/gallery/novinki.jpg" alt="Оплата в магазине" loading="lazy" width="180" height="220">
        </article>
      </section>
    </main>

    <footer class="footer">
      <div class="shell footer__inner">
        <a class="logo" href="#top">
          <img class="logo__img" src="images/gallery/logo.jpg" alt="" width="36" height="36">
          <span>
            <strong>${site.name}</strong>
            <small>${site.tagline}</small>
          </span>
        </a>
        <p>${site.addressFull} · ${site.phones.map((p) => `<a href="${p.href}">${p.value}</a>`).join(' · ')}</p>
        <a class="link" href="${site.vk}" target="_blank" rel="noopener">Мы ВКонтакте ${icon('arrow')}</a>
      </div>
    </footer>
  `;

  bindUI();
  updateBadges();
}

function bindUI() {
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const mobileNav = document.querySelector('[data-mobile-nav]');
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => {
    mobileNav.hidden = !mobileNav.hidden;
  });
  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { mobileNav.hidden = true; });
  });

  const rail = document.querySelector('[data-rail]');
  document.querySelector('[data-scroll-left]')?.addEventListener('click', () => {
    rail?.scrollBy({ left: -260, behavior: 'smooth' });
  });
  document.querySelector('[data-scroll-right]')?.addEventListener('click', () => {
    rail?.scrollBy({ left: 260, behavior: 'smooth' });
  });

  document.querySelector('[data-favorites-open]')?.addEventListener('click', () => {
    const saved = products.filter((p) => favorites.has(p.id));
    window.alert(saved.length
      ? `В избранном: ${saved.map((p) => p.title).join(', ')}`
      : 'В избранном пока пусто');
  });

  document.querySelectorAll('[data-fav]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.fav;
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      button.classList.toggle('is-active', favorites.has(id));
      saveState();
    });
  });

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      cart.push(button.dataset.add);
      saveState();
      button.classList.add('is-added');
      window.setTimeout(() => button.classList.remove('is-added'), 400);
    });
  });
}

render();
