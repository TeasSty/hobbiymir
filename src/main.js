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

function saveState() {
  localStorage.setItem('hm-favs', JSON.stringify([...favorites]));
  localStorage.setItem('hm-cart', JSON.stringify(cart));
  updateBadges();
}

function updateBadges() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = String(cart.length);
    el.hidden = cart.length === 0;
  });
  document.querySelectorAll('[data-fav-count]').forEach((el) => {
    el.textContent = String(favorites.size);
    el.hidden = favorites.size === 0;
  });
}

function icon(name) {
  const icons = {
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.2C1.2 9 2.6 6 5.7 5.4c1.8-.3 3.4.5 4.3 1.8C11 6 12.6 5.1 14.4 5.4c3.1.6 4.5 3.6 2.9 6.4C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    bag: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l-.8 11.2a1.5 1.5 0 0 1-1.5 1.4H8.8a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4.5l3 1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    leaf: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M38 10C22 12 12 24 10 38c14-2 26-12 28-28Z" fill="currentColor" opacity=".9"/><path d="M14 34c6-6 12-10 20-14" fill="none" stroke="#F7F1E8" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  };
  return icons[name] || '';
}

function productCard(p) {
  const fav = favorites.has(p.id);
  return `
    <article class="product-card reveal" data-id="${p.id}">
      <a class="product-card__media" href="${p.href}" target="_blank" rel="noopener">
        <img src="${p.image}" alt="${p.title}" loading="lazy" width="400" height="480" />
      </a>
      <button class="icon-btn product-card__fav ${fav ? 'is-active' : ''}" type="button" data-fav="${p.id}" aria-label="В избранное">
        ${icon('heart')}
      </button>
      <div class="product-card__body">
        <div>
          <h3 class="product-card__title">${p.title}</h3>
          <p class="product-card__meta">${p.meta}</p>
        </div>
        <div class="product-card__row">
          <span class="product-card__price">${formatPrice(p.price)}</span>
          <button class="icon-btn product-card__cart" type="button" data-add="${p.id}" aria-label="В корзину">
            ${icon('bag')}
          </button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="grain" aria-hidden="true"></div>

    <header class="header" data-header>
      <div class="header__inner">
        <a class="logo" href="#top">
          <span class="logo__mark">${icon('leaf')}</span>
          <span class="logo__text">
            <strong>${site.name}</strong>
            <small>${site.tagline}</small>
          </span>
        </a>

        <nav class="nav" aria-label="Основная навигация">
          ${nav
            .map(
              (item) =>
                `<a href="${item.href}"${item.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${item.label}</a>`,
            )
            .join('')}
        </nav>

        <div class="header__actions">
          <button class="icon-btn" type="button" data-search-open aria-label="Поиск">${icon('search')}</button>
          <button class="icon-btn" type="button" aria-label="Избранное">
            ${icon('heart')}
            <span class="badge" data-fav-count hidden>0</span>
          </button>
          <button class="icon-btn" type="button" aria-label="Корзина">
            ${icon('bag')}
            <span class="badge" data-cart-count hidden>0</span>
          </button>
          <button class="icon-btn header__menu" type="button" data-menu-open aria-label="Меню">${icon('menu')}</button>
        </div>
      </div>
    </header>

    <div class="mobile-nav" data-mobile-nav hidden>
      <div class="mobile-nav__panel">
        <button class="icon-btn" type="button" data-menu-close aria-label="Закрыть">${icon('close')}</button>
        <nav>
          ${nav
            .map(
              (item) =>
                `<a href="${item.href}"${item.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${item.label}</a>`,
            )
            .join('')}
        </nav>
      </div>
    </div>

    <div class="search-overlay" data-search hidden>
      <form class="search-overlay__form" action="${site.market}" method="get" target="_blank">
        <input type="search" name="q" placeholder="Поиск по каталогу…" />
        <button class="btn btn--primary" type="submit">Искать ${icon('arrow')}</button>
      </form>
      <button class="search-overlay__close" type="button" data-search-close aria-label="Закрыть">${icon('close')}</button>
    </div>

    <main id="top">
      <section class="hero">
        <div class="hero__copy">
          <p class="eyebrow hero-anim">Натуральные камни и фурнитура</p>
          <h1 class="hero-anim">
            Вдохновение<br />
            <em>в каждой бусине</em>
          </h1>
          <p class="hero__lead hero-anim">
            Натуральные камни, фурнитура и всё для создания украшений в Казани.
            Для вашего хобби, творчества и стильных аксессуаров.
          </p>
          <div class="hero__cta hero-anim">
            <a class="btn btn--primary" href="#categories">Перейти в каталог ${icon('arrow')}</a>
            <a class="btn btn--ghost" href="#arrivals">Новинки</a>
          </div>
        </div>
        <div class="hero__visual hero-visual">
          <div class="hero__frame">
            <img
              src="images/gallery/hero.jpg"
              alt="Натуральные камни в нитях"
              width="1200"
              height="1400"
              fetchpriority="high"
            />
          </div>
          <p class="hero__script">Камни, которые вдохновляют</p>
        </div>
      </section>

      <section class="micro-info">
        <div class="micro-info__item">
          <span class="micro-info__icon">${icon('pin')}</span>
          <div>
            <strong>${site.addressFull}</strong>
            <p>Магазин материалов для украшений</p>
          </div>
        </div>
        <div class="micro-info__item">
          <span class="micro-info__icon">${icon('clock')}</span>
          <div>
            <strong>Пн–Пт 10:00–19:00 · Сб 10:00–17:00</strong>
            <p>Вс — выходной</p>
          </div>
        </div>
      </section>

      <section class="section" id="categories">
        <div class="section__head reveal">
          <div>
            <p class="eyebrow">Каталог</p>
            <h2>Популярные категории</h2>
          </div>
          <a class="text-link" href="${site.market}" target="_blank" rel="noopener">Весь каталог ${icon('arrow')}</a>
        </div>
        <div class="category-grid">
          ${categories
            .map(
              (c) => `
            <a class="category-card reveal" href="${c.href}" target="_blank" rel="noopener">
              <div class="category-card__media">
                <img src="${c.image}" alt="${c.title}" loading="lazy" width="480" height="360" />
              </div>
              <div class="category-card__body">
                <div>
                  <h3>${c.title}</h3>
                  <p>${c.desc}</p>
                </div>
                <span class="circle-arrow">${icon('arrow')}</span>
              </div>
            </a>
          `,
            )
            .join('')}
        </div>
      </section>

      <section class="section" id="arrivals">
        <div class="section__head reveal">
          <div>
            <p class="eyebrow">Свежие поступления</p>
            <h2>Новые камни в нитях</h2>
          </div>
          <div class="carousel-nav">
            <button type="button" data-scroll-left aria-label="Назад">${icon('arrow')}</button>
            <button type="button" data-scroll-right aria-label="Вперёд">${icon('arrow')}</button>
          </div>
        </div>
        <div class="product-rail" data-rail>
          ${products.map(productCard).join('')}
        </div>
      </section>

      <section class="build section" id="build">
        <div class="build__head reveal">
          <div>
            <p class="eyebrow">Сборка</p>
            <h2>Соберите своё украшение</h2>
            <p class="section__lead">Подберём всё необходимое для вашего изделия.</p>
          </div>
          <a class="btn btn--primary" href="${site.market}" target="_blank" rel="noopener">Выбрать изделие ${icon('arrow')}</a>
        </div>
        <div class="build__rail reveal">
          ${builds
            .map(
              (b) => `
            <a class="build-card" href="${b.href}" target="_blank" rel="noopener">
              <img src="${b.image}" alt="${b.title}" loading="lazy" width="360" height="420" />
              <span>${b.title}</span>
            </a>
          `,
            )
            .join('')}
        </div>
        <svg class="build__deco" viewBox="0 0 200 80" aria-hidden="true">
          <path d="M10 50c30-40 60-40 90 0s60 40 90 0" fill="none" stroke="currentColor" stroke-width="1" opacity=".35"/>
        </svg>
      </section>

      <section class="stone section" id="stone">
        <div class="stone__panel reveal">
          <p class="eyebrow">${stoneOfWeek.eyebrow}</p>
          <h2>${stoneOfWeek.title}</h2>
          <p>${stoneOfWeek.text}</p>
          <a class="btn btn--light" href="${stoneOfWeek.href}" target="_blank" rel="noopener">Смотреть камень ${icon('arrow')}</a>
        </div>
        <div class="stone__photo reveal">
          <img src="${stoneOfWeek.image}" alt="${stoneOfWeek.title}" loading="lazy" width="900" height="1100" />
        </div>
        <aside class="stone__aside reveal">
          <p class="eyebrow">Другие камни</p>
          <div class="stone__grid">
            ${stoneOfWeek.variants
              .map(
                (v) => `
              <a href="${v.href}" target="_blank" rel="noopener">
                <img src="${v.image}" alt="${v.name}" loading="lazy" width="120" height="120" />
                <span>${v.name}</span>
              </a>
            `,
              )
              .join('')}
          </div>
        </aside>
      </section>

      <section class="help reveal">
        <div class="help__inner">
          <h2>Не знаете, что выбрать?</h2>
          <p>Поможем подобрать камни и фурнитуру для вашего украшения.</p>
          <a class="btn btn--primary" href="${site.vk}" target="_blank" rel="noopener">Написать нам ${icon('arrow')}</a>
        </div>
      </section>

      <section class="store section" id="contacts">
        <div class="store__copy reveal">
          <p class="eyebrow">Магазин</p>
          <h2>Наш магазин в Казани</h2>
          <p class="store__address">${site.address}</p>
          <ul class="store__hours">
            ${site.hours.map((h) => `<li><span>${h.days}</span><strong>${h.time}</strong></li>`).join('')}
          </ul>
          <a class="btn btn--primary" href="${site.map}" target="_blank" rel="noopener">Построить маршрут ${icon('arrow')}</a>
        </div>
        <div class="store__photo reveal">
          <img src="images/gallery/store.jpg" alt="Товары магазина МОЙ ХОББИМИР" loading="lazy" width="900" height="700" />
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer__brand">
        <strong>${site.name}</strong>
        <p>${site.tagline} · ${site.city}</p>
      </div>
      <div class="footer__cols">
        <div>
          <p class="footer__label">Разделы</p>
          <a href="#categories">Каталог</a>
          <a href="#categories">Камни</a>
          <a href="#categories">Фурнитура</a>
          <a href="#categories">Бисер</a>
          <a href="#categories">Инструменты</a>
          <a href="#contacts">Контакты</a>
        </div>
        <div>
          <p class="footer__label">Контакты</p>
          ${site.phones
            .map(
              (p) =>
                `<a href="${p.href}"><span>${p.label}</span>${p.value}</a>`,
            )
            .join('')}
        </div>
        <div>
          <p class="footer__label">Адрес</p>
          <p>${site.city},<br />${site.address}</p>
          <a href="${site.vk}" target="_blank" rel="noopener">ВКонтакте</a>
        </div>
      </div>
      <p class="footer__note">Товары и цены — из каталога VK · ${new Date().getFullYear()}</p>
    </footer>
  `;

  bindUI();
  updateBadges();
  observeReveals();
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
}

function bindUI() {
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const mobile = document.querySelector('[data-mobile-nav]');
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => {
    mobile.hidden = false;
    document.body.classList.add('nav-open');
  });
  document.querySelector('[data-menu-close]')?.addEventListener('click', () => {
    mobile.hidden = true;
    document.body.classList.remove('nav-open');
  });
  mobile?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobile.hidden = true;
      document.body.classList.remove('nav-open');
    }),
  );

  const search = document.querySelector('[data-search]');
  document.querySelector('[data-search-open]')?.addEventListener('click', () => {
    search.hidden = false;
    search.querySelector('input')?.focus();
  });
  document.querySelector('[data-search-close]')?.addEventListener('click', () => {
    search.hidden = true;
  });

  const rail = document.querySelector('[data-rail]');
  document.querySelector('[data-scroll-left]')?.addEventListener('click', () => {
    rail.scrollBy({ left: -320, behavior: 'smooth' });
  });
  document.querySelector('[data-scroll-right]')?.addEventListener('click', () => {
    rail.scrollBy({ left: 320, behavior: 'smooth' });
  });

  document.querySelectorAll('[data-fav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.fav;
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      btn.classList.toggle('is-active', favorites.has(id));
      saveState();
    });
  });

  document.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.add;
      cart.push(id);
      saveState();
      btn.classList.add('is-added');
      setTimeout(() => btn.classList.remove('is-added'), 600);
    });
  });
}

function observeReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

render();
