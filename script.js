document.addEventListener('DOMContentLoaded', function () {

  /* ── Year ──────────────────────────────────── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Smooth scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mn = document.getElementById('mobile-nav');
        if (mn) mn.classList.remove('open');
      }
    });
  });

  /* ── Mobile menu ────────────────────────────── */
  const btn = document.getElementById('menu-btn');
  const mn  = document.getElementById('mobile-nav');
  if (btn && mn) {
    btn.addEventListener('click', () => {
      const open = mn.classList.toggle('open');
      mn.setAttribute('aria-hidden', String(!open));
    });
  }

  /* ── Projects render ────────────────────────── */
  const projects = [
    {
      title: 'constellation',
      desc: 'Built a unified intelligence platform that connects enterprise knowledge, live signals, and workflow tools to provide context-aware recommendations and faster operational decisions.',
      tags: ['Python', 'FastAPI', 'LangChain', 'RAG', 'Vector DB', 'Docker', 'PostgreSQL'],
      githubUrl: 'https://github.com/iamharshit13/constellation'
    },
    {
      title: 'CEREBRO_AI',
      desc: 'Developed an agentic AI framework for enterprise automation with memory-aware reasoning, multi-tool orchestration, and modular APIs for rapid workflow deployment.',
      tags: ['OpenAI', 'Agentic AI', 'Prompt Engineering', 'APIs', 'Automation', 'Python'],
      githubUrl: 'https://github.com/iamharshit13/CEREBRO_AI'
    },
    {
      title: 'Microverse — Distributed Recommendation Platform',
      desc: 'Engineered a distributed recommendation platform using containerised microservices, event-driven processing, and automated CI/CD to deliver low-latency, high-throughput personalization at scale.',
      tags: ['Python', 'Django', 'FastAPI', 'React', 'Kafka', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions'],
      githubUrl: 'https://github.com/iamharshit13/microverse-app'
    },
    {
      title: 'E-Commerce Image Intelligence',
      desc: 'Built a computer-vision powered cataloguing system that combines custom ML models with Google Vision and automated scraping pipelines to accelerate large-scale product onboarding.',
      tags: ['Python', 'Flask', 'TensorFlow', 'Google Vision API', 'Selenium', 'BeautifulSoup', 'Computer Vision']
    },
    {
      title: 'Comparative Analysis of CNN Algorithms',
      desc: 'Published peer-reviewed research comparing CNN architectures across image-classification benchmarks, with analysis focused on accuracy, efficiency, and architectural trade-offs.',
      tags: ['Deep Learning', 'CNNs', 'Computer Vision', 'Research'],
      badge: 'Publication · Sept 2020',
      doiUrl: 'https://doi.org/10.22214/ijraset.2020.31693',
      doiText: 'DOI: 10.22214/ijraset.2020.31693 ↗',
      fullWidth: true
    }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map((project, index) => {
      const projectNum = String(index + 1).padStart(2, '0');
      const cardClasses = ['proj-card'];
      if (project.fullWidth) cardClasses.push('proj-pub');

      const tagsMarkup = (project.tags || [])
        .map(tag => `<span>${tag}</span>`)
        .join('');

      const githubLinkMarkup = project.githubUrl
        ? `<a class="proj-gh" href="${project.githubUrl}" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>`
        : '';

      const badgeMarkup = project.badge
        ? `<span class="proj-badge">${project.badge}</span>`
        : '';

      const doiMarkup = project.doiUrl
        ? `<a class="proj-doi" href="${project.doiUrl}" target="_blank" rel="noopener">${project.doiText || 'Read Publication ↗'}</a>`
        : '';

      return `
        <article class="${cardClasses.join(' ')}">
          <div class="proj-head">
            <span class="proj-num">${projectNum}</span>
            ${badgeMarkup || githubLinkMarkup}
          </div>
          <h3 class="proj-title">${project.title}</h3>
          <p class="proj-desc">${project.desc}</p>
          <div class="proj-tags">${tagsMarkup}</div>
          ${doiMarkup}
        </article>
      `;
    }).join('');
  }

  /* ── Scroll reveal ──────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Active nav on scroll ───────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const hdrHeight = (document.getElementById('site-header') || {}).offsetHeight || 60;

  function setActive() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - hdrHeight - 90) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
});
