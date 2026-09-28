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
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.2C1.2 9 2.6 6 5.7 5.4c1.8-.3 3.4.5 4.3 1.8C11 6 12.6 5.1 14.4 5.4c3.1.6 4.5 3.6 2.9 6.4C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
    bag: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l-.8 11.2a1.5 1.5 0 0 1-1.5 1.4H8.8a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    leaf: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M38 10C22 12 12 24 10 38c14-2 26-12 28-28Z" fill="currentColor"/><path d="M14 34c6-6 12-10 20-14" fill="none" stroke="#F4EEE4" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  };
  return icons[name] || '';
}

function productCard(p, variant = '') {
  const fav = favorites.has(p.id);
  return `
    <article class="p-card ${variant}" data-id="${p.id}">
      <a class="p-card__media" href="${p.href}" target="_blank" rel="noopener">
        <img src="${p.image}" alt="${p.title}" loading="lazy" width="480" height="560" />
      </a>
      <button class="icon-btn p-card__fav ${fav ? 'is-active' : ''}" type="button" data-fav="${p.id}" aria-label="В избранное">${icon('heart')}</button>
      <div class="p-card__meta">
        <div>
          <h3>${p.title}</h3>
          <p>${p.meta}</p>
        </div>
        <div class="p-card__row">
          <span>${formatPrice(p.price)}</span>
          <button class="icon-btn p-card__cart" type="button" data-add="${p.id}" aria-label="В корзину">${icon('bag')}</button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const featured = products.find((p) => p.featured) || products[0];
  const rest = products.filter((p) => p.id !== featured.id);
  const heroCat = categories.find((c) => c.size === 'hero');
  const sideCats = categories.filter((c) => c.size === 'md');
  const smallCats = categories.filter((c) => c.size === 'sm');

  document.querySelector('#app').innerHTML = `
    <div class="paper" aria-hidden="true">
      <div class="paper__grain"></div>
      <div class="paper__glow paper__glow--1"></div>
      <div class="paper__glow paper__glow--2"></div>
      <div class="paper__glow paper__glow--3"></div>
    </div>

    <header class="header" data-header>
      <div class="shell header__inner">
        <a class="logo" href="#top">
          <span class="logo__mark">${icon('leaf')}</span>
          <span>
            <strong>${site.name}</strong>
            <small>${site.tagline}</small>
          </span>
        </a>
        <nav class="nav" aria-label="Основная навигация">
          ${nav.map((item) => `<a href="${item.href}"${item.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${item.label}</a>`).join('')}
        </nav>
        <div class="header__actions">
          <button class="icon-btn" type="button" data-search-open aria-label="Поиск">${icon('search')}</button>
          <button class="icon-btn" type="button" aria-label="Избранное">${icon('heart')}<span class="badge" data-fav-count hidden>0</span></button>
          <button class="icon-btn" type="button" aria-label="Корзина">${icon('bag')}<span class="badge" data-cart-count hidden>0</span></button>
          <button class="icon-btn header__burger" type="button" data-menu-open aria-label="Меню">${icon('menu')}</button>
        </div>
      </div>
    </header>

    <div class="drawer" data-mobile-nav hidden>
      <div class="drawer__panel">
        <button class="icon-btn" type="button" data-menu-close aria-label="Закрыть">${icon('close')}</button>
        <nav>${nav.map((item) => `<a href="${item.href}"${item.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${item.label}</a>`).join('')}</nav>
      </div>
    </div>

    <div class="search" data-search hidden>
      <form class="search__form" action="${site.market}" method="get" target="_blank">
        <input type="search" name="q" placeholder="Поиск по каталогу…" />
        <button class="btn btn--dark" type="submit">Искать ${icon('arrow')}</button>
      </form>
      <button class="search__close" type="button" data-search-close aria-label="Закрыть">${icon('close')}</button>
    </div>

    <main id="top">
      <!-- HERO: editorial magazine spread — photo as physical object -->
      <section class="hero">
        <div class="hero__light" aria-hidden="true"></div>

        <div class="hero__layout">
          <div class="hero__copy">
            <p class="kicker hero-anim">Натуральные камни · Казань</p>
            <h1 class="hero-anim">
              Вдохновение<br />
              <em>в каждой бусине</em>
            </h1>
            <p class="hero__lead hero-anim">
              Натуральные камни, фурнитура и всё для создания украшений.
              Для хобби, творчества и стильных аксессуаров.
            </p>
            <div class="hero__actions hero-anim">
              <a class="btn btn--dark" href="#categories">Перейти в каталог ${icon('arrow')}</a>
              <a class="btn btn--soft" href="#arrivals">Новинки</a>
            </div>
            <div class="hero__chip glass hero-anim">
              <strong>${site.address}</strong>
              <span>Пн–Пт 10–19 · Сб 10–17 · Вс выходной</span>
            </div>
          </div>

          <div class="hero__visual">
            <figure class="hero__shot hero-anim-photo">
              <img src="images/gallery/hero.jpg" alt="Натуральные камни в нитях" width="1400" height="1600" fetchpriority="high" />
            </figure>
            <figure class="hero__accent hero-anim-photo">
              <img src="images/gallery/raw-stones.jpg" alt="" width="640" height="800" loading="eager" />
            </figure>
            <a class="hero__float glass hero-anim" href="${featured.href}" target="_blank" rel="noopener">
              <img src="${featured.image}" alt="${featured.title}" width="200" height="240" />
              <span>${featured.title}<small>${formatPrice(featured.price)}</small></span>
            </a>
            <img class="botany botany--hero" src="images/decor/olive.svg" alt="" aria-hidden="true" data-plant />
            <img class="botany botany--hero-2" src="images/decor/sprig.svg" alt="" aria-hidden="true" data-plant />
          </div>
        </div>
      </section>

      <!-- CATEGORIES: asymmetric editorial mosaic -->
      <section class="band" id="categories">
        <div class="shell">
          <div class="band__head reveal">
            <div>
              <p class="kicker">Каталог</p>
              <h2>Популярные<br />категории</h2>
            </div>
            <a class="text-link" href="${site.market}" target="_blank" rel="noopener">Весь каталог ${icon('arrow')}</a>
          </div>

          <div class="mosaic reveal">
            <a class="mosaic__hero" href="${heroCat.href}" target="_blank" rel="noopener">
              <img src="${heroCat.image}" alt="${heroCat.title}" loading="lazy" width="900" height="1100" />
              <div class="mosaic__caption">
                <h3>${heroCat.title}</h3>
                <p>${heroCat.desc}</p>
              </div>
            </a>
            <div class="mosaic__stack">
              ${sideCats
                .map(
                  (c) => `
                <a class="mosaic__card" href="${c.href}" target="_blank" rel="noopener">
                  <img src="${c.image}" alt="${c.title}" loading="lazy" width="520" height="360" />
                  <div><h3>${c.title}</h3><p>${c.desc}</p></div>
                </a>
              `,
                )
                .join('')}
            </div>
            <div class="mosaic__row">
              ${smallCats
                .map(
                  (c) => `
                <a class="mosaic__mini" href="${c.href}" target="_blank" rel="noopener">
                  <img src="${c.image}" alt="${c.title}" loading="lazy" width="320" height="240" />
                  <span>${c.title}</span>
                </a>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>
        <img class="botany botany--cats" src="images/decor/branch-right.svg" alt="" aria-hidden="true" data-plant />
      </section>

      <!-- PRODUCTS: featured + journal grid -->
      <section class="band band--tight" id="arrivals">
        <div class="shell">
          <div class="band__head reveal">
            <div>
              <p class="kicker">Свежие поступления</p>
              <h2>Новые камни<br />в нитях</h2>
            </div>
            <div class="rail-nav">
              <button type="button" data-scroll-left aria-label="Назад">${icon('arrow')}</button>
              <button type="button" data-scroll-right aria-label="Вперёд">${icon('arrow')}</button>
            </div>
          </div>

          <div class="arrivals reveal">
            ${productCard(featured, 'p-card--featured')}
            <div class="arrivals__rail" data-rail>
              ${rest.map((p) => productCard(p)).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- BUILD -->
      <section class="build" id="build">
        <div class="shell build__inner reveal">
          <div class="build__copy">
            <p class="kicker">Сборка</p>
            <h2>Соберите своё<br />украшение</h2>
            <p>Подберём всё необходимое для вашего изделия.</p>
            <a class="btn btn--dark" href="${site.market}" target="_blank" rel="noopener">Выбрать изделие ${icon('arrow')}</a>
          </div>
          <div class="build__strip">
            ${builds
              .map(
                (b) => `
              <a class="build__card" href="${b.href}" target="_blank" rel="noopener">
                <img src="${b.image}" alt="${b.title}" loading="lazy" width="280" height="340" />
                <span>${b.title}</span>
              </a>
            `,
              )
              .join('')}
          </div>
        </div>
        <img class="botany botany--build" src="images/decor/sprig.svg" alt="" aria-hidden="true" data-plant />
      </section>

      <!-- STONE OF WEEK -->
      <section class="stone" id="stone">
        <div class="shell stone__layout reveal">
          <div class="stone__copy">
            <p class="kicker">${stoneOfWeek.eyebrow}</p>
            <h2>${stoneOfWeek.title}</h2>
            <p>${stoneOfWeek.text}</p>
            <a class="btn btn--dark" href="${stoneOfWeek.href}" target="_blank" rel="noopener">Смотреть камень ${icon('arrow')}</a>
            <div class="stone__thumbs">
              ${stoneOfWeek.variants
                .map(
                  (v) => `
                <a href="${v.href}" target="_blank" rel="noopener">
                  <img src="${v.image}" alt="${v.name}" loading="lazy" width="96" height="96" />
                  <span>${v.name}</span>
                </a>
              `,
                )
                .join('')}
            </div>
          </div>
          <div class="stone__shot">
            <img src="${stoneOfWeek.image}" alt="${stoneOfWeek.title}" loading="lazy" width="900" height="1100" />
          </div>
        </div>
      </section>

      <!-- HELP -->
      <section class="help reveal">
        <div class="shell help__box glass">
          <div>
            <h2>Не знаете, что выбрать?</h2>
            <p>Поможем подобрать камни и фурнитуру для вашего украшения.</p>
          </div>
          <a class="btn btn--dark" href="${site.vk}" target="_blank" rel="noopener">Написать нам ${icon('arrow')}</a>
        </div>
      </section>

      <!-- STORE -->
      <section class="store" id="contacts">
        <div class="shell store__layout reveal">
          <div class="store__copy">
            <p class="kicker">Магазин</p>
            <h2>Наш магазин<br />в Казани</h2>
            <p class="store__addr">${site.address}</p>
            <ul>
              ${site.hours.map((h) => `<li><span>${h.days}</span><strong>${h.time}</strong></li>`).join('')}
            </ul>
            <a class="btn btn--dark" href="${site.map}" target="_blank" rel="noopener">Построить маршрут ${icon('arrow')}</a>
          </div>
          <div class="store__shot">
            <img src="images/gallery/store.jpg" alt="Товары магазина МОЙ ХОББИМИР" loading="lazy" width="900" height="700" />
          </div>
        </div>
        <img class="botany botany--store" src="images/decor/branch-left.svg" alt="" aria-hidden="true" data-plant />
      </section>
    </main>

    <footer class="footer">
      <div class="shell footer__grid">
        <div>
          <strong>${site.name}</strong>
          <p>${site.tagline} · ${site.city}</p>
        </div>
        <div>
          <p class="footer__label">Разделы</p>
          <a href="#categories">Каталог</a>
          <a href="#categories">Камни</a>
          <a href="#categories">Фурнитура</a>
          <a href="#contacts">Контакты</a>
        </div>
        <div>
          <p class="footer__label">Контакты</p>
          ${site.phones.map((p) => `<a href="${p.href}"><span>${p.label}</span>${p.value}</a>`).join('')}
        </div>
        <div>
          <p class="footer__label">Адрес</p>
          <p>${site.city},<br />${site.address}</p>
          <a href="${site.vk}" target="_blank" rel="noopener">ВКонтакте</a>
        </div>
      </div>
      <p class="shell footer__note">Товары и цены — из каталога VK · ${new Date().getFullYear()}</p>
    </footer>
  `;

  bindUI();
  updateBadges();
  observeReveals();
  bindPlantDrift();
}

function bindUI() {
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const drawer = document.querySelector('[data-mobile-nav]');
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => {
    drawer.hidden = false;
    document.body.classList.add('nav-open');
  });
  document.querySelector('[data-menu-close]')?.addEventListener('click', () => {
    drawer.hidden = true;
    document.body.classList.remove('nav-open');
  });
  drawer?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      drawer.hidden = true;
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
  document.querySelector('[data-scroll-left]')?.addEventListener('click', () => rail?.scrollBy({ left: -280, behavior: 'smooth' }));
  document.querySelector('[data-scroll-right]')?.addEventListener('click', () => rail?.scrollBy({ left: 280, behavior: 'smooth' }));

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
      cart.push(btn.dataset.add);
      saveState();
      btn.classList.add('is-added');
      setTimeout(() => btn.classList.remove('is-added'), 500);
    });
  });
}

function observeReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function bindPlantDrift() {
  const plants = [...document.querySelectorAll('[data-plant]')];
  if (!plants.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    plants.forEach((el, i) => {
      const shift = ((y * 0.015) * (i % 2 ? -1 : 1)) % 14;
      el.style.translate = `0 ${shift.toFixed(1)}px`;
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

render();
