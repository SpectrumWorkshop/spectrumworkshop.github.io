/* ===== Spectrum Workshop - Main JavaScript ===== */

// --- i18n Texts ---
const i18n = {
  ko: {
    // Nav
    home: 'Home', catalog: '도서목록', writers: '작가모집', about: '소개', contact: '연락처',
    // Hero
    heroTitle: '지식의 모든 빛깔을 담다',
    heroSubtitle: 'AI 기술과 전문 지식의 융합으로 여행, 언어, 기술, 에너지 분야의 새로운 스펙트럼을 만들어가는 출판사입니다.',
    heroCatalog: '도서 카탈로그', heroWriters: '작가 모집',
    statTotalLabel: 'Total Titles', statPubLabel: 'Published', statSeriesLabel: 'Series', statLangLabel: 'Languages',
    // Sections
    browseCategory: '분야별 도서', browseCategoryDesc: '다양한 분야의 전문 도서를 만나보세요',
    latestTitle: '최근 출간', latestDesc: '최근 출간된 도서를 확인하세요',
    viewAll: '전체 도서 보기',
    featuredTitle: '주요 시리즈', featuredDesc: '체계적으로 구성된 시리즈를 만나보세요',
    joinTitle: '함께할 작가를 찾습니다', joinDesc: 'AI 시대의 새로운 출판을 함께 만들어갈 작가를 모집합니다',
    joinExpert: '전문 분야 저자', joinExpertDesc: '기술, 과학, 교육 등 전문 분야의 지식을 책으로 만들고 싶은 전문가를 찾습니다',
    joinTravel: '여행 작가', joinTravelDesc: '세계 각지의 생생한 여행 경험을 공유할 여행 작가를 모집합니다',
    joinAI: 'AI 콘텐츠 크리에이터', joinAIDesc: 'AI 도구를 활용하여 혁신적인 교육 콘텐츠를 제작할 크리에이터를 환영합니다',
    joinBtn: '작가 지원하기',
    // Catalog
    catalogTitle: '도서 카탈로그', catalogDesc: '스펙트럼 공작소의 모든 도서를 만나보세요',
    searchPlaceholder: '도서 검색...',
    // Book detail
    author: '저자', series: '시리즈', format: '형태', price: '가격',
    priceTBD: '가격 미정', preview: '미리보기', buyNow: '구매하기',
    previewTitle: '미리보기', previewClose: '닫기',
    previewNotice: '미리보기 콘텐츠가 준비 중입니다.<br>곧 샘플 챕터를 확인하실 수 있습니다.',
    noResults: '검색 결과가 없습니다.',
    units: '종',
    // Footer
    footerDesc: 'AI 기술과 전문 지식의 융합으로\n새로운 지식의 스펙트럼을 만들어갑니다.'
  },
  en: {
    home: 'Home', catalog: 'Catalog', writers: 'Writers', about: 'About', contact: 'Contact',
    heroTitle: 'Every Shade of Knowledge',
    heroSubtitle: 'A publisher creating new spectrums of knowledge through the fusion of AI technology and expertise in travel, language, technology, and energy.',
    heroCatalog: 'Book Catalog', heroWriters: 'Join as Writer',
    statTotalLabel: 'Total Titles', statPubLabel: 'Published', statSeriesLabel: 'Series', statLangLabel: 'Languages',
    browseCategory: 'Browse by Category', browseCategoryDesc: 'Explore our diverse collection of professional books',
    latestTitle: 'Latest Publications', latestDesc: 'Check out our recently published books',
    viewAll: 'View All Books',
    featuredTitle: 'Featured Series', featuredDesc: 'Discover our systematically organized series',
    joinTitle: 'Join Spectrum Workshop', joinDesc: 'We are looking for writers to shape the future of AI-powered publishing',
    joinExpert: 'Subject Experts', joinExpertDesc: 'We seek professionals who want to turn their expertise in technology, science, and education into books',
    joinTravel: 'Travel Writers', joinTravelDesc: 'We recruit travel writers to share vivid travel experiences from around the world',
    joinAI: 'AI Content Creators', joinAIDesc: 'We welcome creators who leverage AI tools to produce innovative educational content',
    joinBtn: 'Apply Now',
    catalogTitle: 'Book Catalog', catalogDesc: 'Browse all books from Spectrum Workshop',
    searchPlaceholder: 'Search books...',
    author: 'Author', series: 'Series', format: 'Format', price: 'Price',
    priceTBD: 'TBD', preview: 'Preview', buyNow: 'Buy Now',
    previewTitle: 'Sample Preview', previewClose: 'Close',
    previewNotice: 'Preview content is being prepared.<br>Sample chapters will be available soon.',
    noResults: 'No books found.',
    units: 'titles',
    footerDesc: 'Creating new spectrums of knowledge\nthrough AI technology and expertise.'
  }
};

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

// --- State ---
let booksData = null;
let currentFilter = 'all';
let currentSearch = '';
let currentLang = 'ko';

// --- Init ---
document.addEventListener('DOMContentLoaded', async () => {
  await loadBooks();
  initNavToggle();
  initFilters();
  initSearch();
  initModal();
  renderPage();
});

// --- Data Loading ---
async function loadBooks() {
  try {
    const res = await fetch('data/books.json');
    booksData = await res.json();
  } catch (e) {
    console.error('Failed to load books data:', e);
  }
}

// --- Navigation ---
function initNavToggle() {
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }
}

// --- Filters ---
function initFilters() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.category || 'all';
      renderBookGrid();
    }
  });
}

// --- Search ---
function initSearch() {
  const searchInput = document.getElementById('bookSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      renderBookGrid();
    });
  }
}

// --- Book Rendering ---
function getFilteredBooks() {
  if (!booksData) return [];
  let books = booksData.books;
  if (currentFilter !== 'all') {
    books = books.filter(b => b.category === currentFilter);
  }
  if (currentSearch) {
    books = books.filter(b =>
      b.title_ko.toLowerCase().includes(currentSearch) ||
      b.title_en.toLowerCase().includes(currentSearch) ||
      b.author.toLowerCase().includes(currentSearch) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(currentSearch))) ||
      (b.series && b.series.toLowerCase().includes(currentSearch))
    );
  }
  return books;
}

function getStatusBadge(status) {
  const map = {
    'published': `<span class="badge badge--published">${currentLang === 'ko' ? '출간' : 'Published'}</span>`,
    'in_progress': `<span class="badge badge--progress">${currentLang === 'ko' ? '집필중' : 'In Progress'}</span>`,
    'planned': `<span class="badge badge--planned">${currentLang === 'ko' ? '기획중' : 'Planned'}</span>`
  };
  return map[status] || '';
}

function getCoverGradient(category) {
  const gradients = {
    'travel': 'linear-gradient(135deg, #1565c0, #42a5f5)',
    'korean': 'linear-gradient(135deg, #c62828, #ef5350)',
    'energy': 'linear-gradient(135deg, #e65100, #ff9800)',
    'fiction': 'linear-gradient(135deg, #7b1fa2, #ba68c8)',
    'tech': 'linear-gradient(135deg, #2e7d32, #66bb6a)'
  };
  return gradients[category] || 'linear-gradient(135deg, #667eea, #764ba2)';
}

function getCategoryIcon(category) {
  const icons = {
    'travel': '\u{1F30F}',
    'korean': '\u{1F1F0}\u{1F1F7}',
    'energy': '\u26A1',
    'fiction': '\u{1F4D6}',
    'tech': '\u{1F4BB}'
  };
  return icons[category] || '\u{1F4DA}';
}

function renderBookCard(book) {
  const title = currentLang === 'ko' ? book.title_ko : book.title_en;
  const gradient = getCoverGradient(book.category);
  const icon = getCategoryIcon(book.category);
  const priceText = book.price ? `$${book.price.toFixed(2)}` : t('priceTBD');

  return `
    <div class="book-card" data-book-id="${book.id}" onclick="openBookDetail('${book.id}')">
      <div class="book-card__cover" style="background: ${gradient}">
        <div style="font-size:2.5rem; margin-bottom:12px;">${icon}</div>
        <div>${title}</div>
        <div class="book-card__cover-overlay">${getStatusBadge(book.status)}</div>
      </div>
      <div class="book-card__body">
        <div class="book-card__series">${(currentLang === 'ko' ? book.series : (book.series_en || book.series)) || ''}</div>
        <h3 class="book-card__title">${title}</h3>
        <p class="book-card__author">${book.author}</p>
        <div class="book-card__meta">
          <span class="book-card__price">${priceText}</span>
          <div class="book-card__formats">
            ${book.format.map(f => `<span class="book-card__format">${f}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBookGrid() {
  const grid = document.getElementById('bookGrid');
  if (!grid) return;
  const books = getFilteredBooks();
  if (books.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--text-light);">
      <div style="font-size:2.5rem; margin-bottom:12px; opacity:0.4;">\u{1F50D}</div>
      <p>${t('noResults')}</p>
    </div>`;
    return;
  }
  grid.innerHTML = books.map(renderBookCard).join('');
}

// --- Category Stats ---
function getCategoryCount(categoryId) {
  if (!booksData) return 0;
  if (categoryId === 'all') return booksData.books.length;
  return booksData.books.filter(b => b.category === categoryId).length;
}

function renderCategoryStats() {
  const container = document.getElementById('categoryStats');
  if (!container || !booksData) return;

  const cats = booksData.categories;
  container.innerHTML = cats.map(cat => `
    <a href="catalog.html?category=${cat.id}" class="category-card">
      <div class="category-card__icon category-card__icon--${cat.id}">${getCategoryIcon(cat.id)}</div>
      <div class="category-card__name">${currentLang === 'ko' ? cat.name_ko : cat.name_en}</div>
      <div class="category-card__count">${getCategoryCount(cat.id)} ${t('units')}</div>
    </a>
  `).join('');
}

// --- Latest Books (Home) ---
function renderLatestBooks() {
  const grid = document.getElementById('latestBooks');
  if (!grid || !booksData) return;
  const latest = booksData.books.filter(b => b.status === 'published').slice(0, 8);
  grid.innerHTML = latest.map(renderBookCard).join('');
}

// --- Translatable static text ---
function updateStaticText() {
  // Nav links
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  // Hero section
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = t('heroTitle') + '<br><span>Spectrum Workshop</span>';
  const heroSub = document.getElementById('heroSubtitle');
  if (heroSub) heroSub.textContent = t('heroSubtitle');
  const heroCatalogBtn = document.getElementById('heroCatalogBtn');
  if (heroCatalogBtn) heroCatalogBtn.textContent = t('heroCatalog');
  const heroWritersBtn = document.getElementById('heroWritersBtn');
  if (heroWritersBtn) heroWritersBtn.textContent = t('heroWriters');

  // Stat labels
  document.querySelectorAll('[data-stat-label]').forEach(el => {
    el.textContent = t(el.dataset.statLabel);
  });

  // Section titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.textContent = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-desc]').forEach(el => {
    el.textContent = t(el.dataset.i18nDesc);
  });

  // Search placeholder
  const searchInput = document.getElementById('bookSearch');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');

  // Catalog page header
  const catalogPageTitle = document.getElementById('catalogPageTitle');
  if (catalogPageTitle) catalogPageTitle.textContent = t('catalogTitle');
  const catalogPageDesc = document.getElementById('catalogPageDesc');
  if (catalogPageDesc) catalogPageDesc.textContent = t('catalogDesc');
}

// --- Book Detail Modal ---
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openBookDetail(bookId) {
  if (!booksData) return;
  const book = booksData.books.find(b => b.id === bookId);
  if (!book) return;

  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!overlay || !content) return;

  const title = currentLang === 'ko' ? book.title_ko : book.title_en;
  const desc = currentLang === 'ko' ? book.description_ko : book.description_en;
  const gradient = getCoverGradient(book.category);
  const icon = getCategoryIcon(book.category);
  const priceText = book.price ? `$${book.price.toFixed(2)}` : t('priceTBD');

  content.innerHTML = `
    <button class="modal__close" onclick="closeModal()">&times;</button>
    <div class="modal__content">
      <div class="modal__cover" style="background: ${gradient}">
        <div>
          <div style="font-size:3rem; margin-bottom:16px;">${icon}</div>
          <div style="font-size:1.1rem; font-weight:600;">${title}</div>
          ${book.subtitle ? `<div style="font-size:0.85rem; margin-top:8px; opacity:0.8;">${book.subtitle}</div>` : ''}
        </div>
      </div>
      <div class="modal__info">
        <h2>${title}</h2>
        ${book.subtitle ? `<p class="subtitle">${book.subtitle}</p>` : ''}
        <p style="margin-bottom:8px;">
          <strong>${t('author')}:</strong> ${book.author} &nbsp;
          ${getStatusBadge(book.status)}
        </p>
        <p style="margin-bottom:8px;">
          <strong>${t('series')}:</strong> ${(currentLang === 'ko' ? book.series : (book.series_en || book.series)) || '-'}
          ${book.series_number ? ` #${book.series_number}` : ''}
        </p>
        <p style="margin-bottom:8px;">
          <strong>${t('format')}:</strong> ${book.format.map(f => f.toUpperCase()).join(', ')}
        </p>
        <p style="margin-bottom:16px;">
          <strong>${t('price')}:</strong> ${priceText}
        </p>
        <p class="description">${desc}</p>
        <div class="modal__tags">
          ${(book.tags || []).map(t => `<span class="modal__tag">${t}</span>`).join('')}
        </div>
        <div class="modal__actions">
          ${book.preview_available ? `<button class="btn btn--primary" onclick="showPreview('${book.id}')">
            \u{1F4D6} ${t('preview')}
          </button>` : ''}
          ${book.status === 'published' ? `<button class="btn btn--accent">
            \u{1F6D2} ${t('buyNow')}
          </button>` : ''}
        </div>
        <div id="previewArea"></div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- EPUB Preview ---
function showPreview(bookId) {
  const area = document.getElementById('previewArea');
  if (!area) return;

  area.innerHTML = `
    <div class="preview-container" style="margin-top:24px;">
      <div class="preview-header">
        <span class="preview-header__title">\u{1F4D6} ${t('previewTitle')}</span>
        <button class="btn btn--outline" style="padding:4px 12px; font-size:0.8rem;" onclick="document.getElementById('previewArea').innerHTML=''">
          ${t('previewClose')}
        </button>
      </div>
      <div class="preview-body">
        <div class="preview-notice">
          <div class="preview-notice__icon">\u{1F4DA}</div>
          <p>${t('previewNotice')}</p>
        </div>
      </div>
    </div>
  `;

  fetch(`previews/${bookId}.html`)
    .then(res => {
      if (res.ok) return res.text();
      throw new Error('No preview');
    })
    .then(html => {
      const body = area.querySelector('.preview-body');
      if (body) body.innerHTML = html;
    })
    .catch(() => {});
}

// --- Language Toggle ---
function toggleLang() {
  currentLang = currentLang === 'ko' ? 'en' : 'ko';
  const btn = document.querySelector('.header__lang');
  if (btn) btn.textContent = currentLang === 'ko' ? 'EN' : 'KO';
  renderPage();
}

// --- Page Render ---
function renderPage() {
  updateStaticText();
  renderCategoryStats();
  renderLatestBooks();
  renderBookGrid();
  updateHeroStats();
}

function updateHeroStats() {
  if (!booksData) return;
  const totalEl = document.getElementById('statTotal');
  const publishedEl = document.getElementById('statPublished');
  const seriesEl = document.getElementById('statSeries');

  if (totalEl) totalEl.textContent = booksData.books.length + '+';
  if (publishedEl) {
    publishedEl.textContent = booksData.books.filter(b => b.status === 'published').length;
  }
  if (seriesEl) {
    const series = new Set(booksData.books.map(b => b.series).filter(Boolean));
    seriesEl.textContent = series.size;
  }
}
