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
    // Writers page
    writersPageTitle: 'Writers Wanted', writersPageDesc: 'AI 시대의 새로운 출판을 함께 만들어갈 작가를 모집합니다',
    whyJoinTitle: 'Why Spectrum Workshop?', whyJoinDesc: '스펙트럼 공작소와 함께하는 이유',
    whyAITitle: 'AI 출판 인프라', whyAIDesc: 'AI 기반 편집, 번역, 포맷팅 도구를 활용하여 집필부터 출간까지 효율적인 출판 프로세스를 지원합니다',
    whyMultiTitle: '다국어 출판', whyMultiDesc: '한국어, 영어, 스페인어, 일본어, 아랍어 등 다국어 동시 출판으로 글로벌 독자에게 다가갑니다',
    whyFairTitle: '공정한 인세', whyFairDesc: '투명한 판매 데이터와 공정한 인세 체계를 통해 저자의 창작 활동을 존중합니다',
    whyPlatformTitle: '멀티 플랫폼', whyPlatformDesc: 'Amazon, Google Play, 교보문고, YES24 등 국내외 주요 플랫폼에 동시 유통합니다',
    recruitTitle: 'Recruitment Areas', recruitDesc: '다음 분야의 작가를 모집하고 있습니다',
    recTravelTitle: '여행 작가', recTravelDesc: '해외 여행 경험이 풍부한 독립여행 작가. 특히 비주류 여행지 경험자 우대',
    recTechTitle: '기술 서적 저자', recTechDesc: 'AI/ML, 프로그래밍, 데이터 사이언스, 클라우드 등 IT 기술 분야 전문가',
    recEnergyTitle: '건축/에너지 전문가', recEnergyDesc: '건물에너지, 시뮬레이션, 스마트빌딩, 친환경 건축 분야 전문가',
    recTextbookTitle: '교재 저자', recTextbookDesc: '대학 교재, 전문 교육 교재 집필 경험이 있는 교수 및 전문가',
    recFictionTitle: '소설/문학 작가', recFictionDesc: 'SF, 판타지, 무협 등 장르문학 작가. 웹소설 경험자 환영',
    recKoreanTitle: '한국어/한국문화 전문가', recKoreanDesc: '외국어로서의 한국어 교육, 한국 문화 콘텐츠 제작 경험자',
    applyTitle: 'How to Apply', applyDesc: '간단한 3단계로 지원하세요',
    step1Title: '원고 또는 기획안 제출', step1Desc: '기획안(1~2페이지) 또는 기존 원고를 이메일로 보내주세요',
    step2Title: '편집팀 검토 및 미팅', step2Desc: '편집팀의 검토 후 출판 방향, 일정, 조건에 대해 상의합니다',
    step3Title: '계약 및 출판 진행', step3Desc: '출판 계약 체결 후 AI 도구 지원을 받으며 집필 및 출판을 진행합니다',
    applyBtn: '지원 문의하기 →',
    // About page
    aboutPageTitle: 'About Spectrum Workshop', aboutPageDesc: '지식의 모든 빛깔을 담다',
    missionTitle: 'Our Mission',
    mission1: '스펙트럼 공작소(Spectrum Workshop)는 2026년 설립된 출판사로, AI 기술과 전문 지식의 융합을 통해 다양한 분야의 고품질 도서를 제작합니다.',
    mission2: '빛이 프리즘을 통과하면 무지개빛 스펙트럼이 나타나듯, 우리는 전문 지식에 AI라는 프리즘을 더해 지식의 모든 빛깔을 독자에게 전달합니다.',
    mission3: '여행, 언어 교육, 건물에너지 시뮬레이션, 기술서적, 문학까지 — 장르의 경계를 넘어 지식이 필요한 모든 곳에 책을 만듭니다.',
    whatWeDoTitle: 'What We Do', whatWeDoDesc: '스펙트럼 공작소의 출판 분야',
    doTravelTitle: '여행서 출판', doTravelDesc: '110개국 이상의 여행 경험을 바탕으로 한 실전 여행 가이드 시리즈. 아시아, 유럽, 중동, 아프리카, 아메리카 전 지역을 다룹니다.',
    doKoreanTitle: '한국어 학습 교재', doKoreanDesc: 'K-Drama와 K-Life를 소재로 한 혁신적인 한국어 학습 교재. 영어, 스페인어, 일본어, 아랍어 4개 언어로 출판합니다.',
    doEnergyTitle: '에너지 시뮬레이션', doEnergyDesc: 'EnergyPlus 기반 건물에너지 시뮬레이션 전문서적과 AI/LLM 활용 에너지 분석 교재를 출판합니다.',
    doTechTitle: '기술서적', doTechDesc: 'AI, 프로그래밍, 데이터 사이언스 등 최신 기술 트렌드를 반영한 전문 기술서적을 출판합니다.',
    doTextbookTitle: '대학 교재', doTextbookDesc: '건축, 에너지, AI 분야의 대학 및 대학원 수준 전문 교재를 개발합니다.',
    doFictionTitle: '소설/문학', doFictionDesc: 'SF, 판타지, 무협 등 장르문학과 창작 소설을 출판합니다.',
    numbersTitle: 'Spectrum Workshop in Numbers', numbersDesc: '숫자로 보는 스펙트럼 공작소',
    numGoal: '연간 출판 목표 (종)', numLang: '출판 언어', numSeries: '시리즈 라인업', numCountries: '여행 방문 국가',
    techTitle: 'Our Technology', techDesc: 'AI 기반 출판 시스템',
    techIntro: '스펙트럼 공작소는 자체 개발한 AI 기반 출판 시스템을 통해 콘텐츠 생성부터 편집, 번역, 포맷팅, 배포까지 전 과정을 자동화합니다.',
    techItem1: 'YAML 기반 도서 구성 시스템', techItem2: 'AI 활용 다국어 동시 번역', techItem3: '자동 EPUB/PDF 빌드 파이프라인', techItem4: '품질 검증 자동화 체크리스트', techItem5: '다중 플랫폼 동시 배포 시스템',
    techOutro: '이를 통해 전통 출판사 대비 빠른 속도와 높은 품질의 도서를 제작할 수 있습니다.',
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
    // Writers page
    writersPageTitle: 'Writers Wanted', writersPageDesc: 'We are recruiting writers to shape the future of AI-powered publishing',
    whyJoinTitle: 'Why Spectrum Workshop?', whyJoinDesc: 'Reasons to join Spectrum Workshop',
    whyAITitle: 'AI Publishing Infrastructure', whyAIDesc: 'We support an efficient publishing process from writing to publication using AI-based editing, translation, and formatting tools',
    whyMultiTitle: 'Multilingual Publishing', whyMultiDesc: 'Reach global readers through simultaneous publishing in Korean, English, Spanish, Japanese, and Arabic',
    whyFairTitle: 'Fair Royalties', whyFairDesc: 'We respect authors\' creative work through transparent sales data and a fair royalty system',
    whyPlatformTitle: 'Multi-Platform', whyPlatformDesc: 'Simultaneous distribution on major platforms including Amazon, Google Play, Kyobo, and YES24',
    recruitTitle: 'Recruitment Areas', recruitDesc: 'We are looking for writers in the following fields',
    recTravelTitle: 'Travel Writers', recTravelDesc: 'Independent travel writers with extensive overseas experience. Preference for off-the-beaten-path destinations',
    recTechTitle: 'Tech Authors', recTechDesc: 'IT technology experts in AI/ML, programming, data science, cloud, and more',
    recEnergyTitle: 'Architecture/Energy Experts', recEnergyDesc: 'Experts in building energy, simulation, smart buildings, and green architecture',
    recTextbookTitle: 'Textbook Authors', recTextbookDesc: 'Professors and experts with experience writing university and professional education textbooks',
    recFictionTitle: 'Fiction/Literature Writers', recFictionDesc: 'Genre fiction writers in SF, fantasy, martial arts, etc. Web novel experience welcome',
    recKoreanTitle: 'Korean Language/Culture Experts', recKoreanDesc: 'Experience in Korean language education for foreigners and Korean cultural content creation',
    applyTitle: 'How to Apply', applyDesc: 'Apply in 3 simple steps',
    step1Title: 'Submit Manuscript or Proposal', step1Desc: 'Send a proposal (1-2 pages) or existing manuscript via email',
    step2Title: 'Editorial Review & Meeting', step2Desc: 'After editorial review, we discuss publishing direction, schedule, and terms',
    step3Title: 'Contract & Publication', step3Desc: 'After signing the publishing contract, proceed with writing and publication with AI tool support',
    applyBtn: 'Contact Us to Apply →',
    // About page
    aboutPageTitle: 'About Spectrum Workshop', aboutPageDesc: 'Every Shade of Knowledge',
    missionTitle: 'Our Mission',
    mission1: 'Spectrum Workshop, established in 2026, creates high-quality books across diverse fields through the fusion of AI technology and professional expertise.',
    mission2: 'Just as light passing through a prism reveals a rainbow spectrum, we add the prism of AI to professional knowledge to deliver every shade of knowledge to our readers.',
    mission3: 'From travel and language education to building energy simulation, technology books, and literature — we create books wherever knowledge is needed, crossing genre boundaries.',
    whatWeDoTitle: 'What We Do', whatWeDoDesc: 'Publishing fields of Spectrum Workshop',
    doTravelTitle: 'Travel Books', doTravelDesc: 'Practical travel guide series based on experience traveling to 110+ countries. Covering all regions including Asia, Europe, Middle East, Africa, and the Americas.',
    doKoreanTitle: 'Korean Language Textbooks', doKoreanDesc: 'Innovative Korean language learning textbooks using K-Drama and K-Life themes. Published in 4 languages: English, Spanish, Japanese, and Arabic.',
    doEnergyTitle: 'Energy Simulation', doEnergyDesc: 'Professional books on EnergyPlus-based building energy simulation and AI/LLM energy analysis textbooks.',
    doTechTitle: 'Technology Books', doTechDesc: 'Professional technology books reflecting the latest trends in AI, programming, and data science.',
    doTextbookTitle: 'University Textbooks', doTextbookDesc: 'Developing university and graduate-level professional textbooks in architecture, energy, and AI.',
    doFictionTitle: 'Fiction/Literature', doFictionDesc: 'Publishing genre fiction including SF, fantasy, martial arts, and original novels.',
    numbersTitle: 'Spectrum Workshop in Numbers', numbersDesc: 'Spectrum Workshop by the numbers',
    numGoal: 'Annual Publishing Goal', numLang: 'Publishing Languages', numSeries: 'Series Lineup', numCountries: 'Countries Visited',
    techTitle: 'Our Technology', techDesc: 'AI-Powered Publishing System',
    techIntro: 'Spectrum Workshop automates the entire process from content creation to editing, translation, formatting, and distribution through our proprietary AI-based publishing system.',
    techItem1: 'YAML-based book configuration system', techItem2: 'AI-powered multilingual simultaneous translation', techItem3: 'Automated EPUB/PDF build pipeline', techItem4: 'Automated quality verification checklist', techItem5: 'Multi-platform simultaneous distribution system',
    techOutro: 'This enables us to produce books at faster speeds and higher quality compared to traditional publishers.',
    // Catalog
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
