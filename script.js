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
    projectsGrid.innerHTML = '';
    projects.forEach((project, index) => {
      const card = document.createElement('article');
      card.className = project.fullWidth ? 'proj-card proj-pub' : 'proj-card';

      const head = document.createElement('div');
      head.className = 'proj-head';

      const num = document.createElement('span');
      num.className = 'proj-num';
      num.textContent = String(index + 1).padStart(2, '0');
      head.appendChild(num);

      if (project.badge) {
        const badge = document.createElement('span');
        badge.className = 'proj-badge';
        badge.textContent = project.badge;
        head.appendChild(badge);
      } else if (project.githubUrl) {
        const gh = document.createElement('a');
        gh.className = 'proj-gh';
        gh.href = project.githubUrl;
        gh.target = '_blank';
        gh.rel = 'noopener';
        gh.setAttribute('aria-label', `${project.title} GitHub Repository`);
        gh.textContent = 'GitHub ↗';
        head.appendChild(gh);
      }

      const title = document.createElement('h3');
      title.className = 'proj-title';
      title.textContent = project.title;

      const desc = document.createElement('p');
      desc.className = 'proj-desc';
      desc.textContent = project.desc;

      const tags = document.createElement('div');
      tags.className = 'proj-tags';
      (project.tags || []).forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.textContent = tag;
        tags.appendChild(tagEl);
      });

      card.appendChild(head);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(tags);

      if (project.doiUrl) {
        const doi = document.createElement('a');
        doi.className = 'proj-doi';
        doi.href = project.doiUrl;
        doi.target = '_blank';
        doi.rel = 'noopener';
        doi.textContent = project.doiText || 'Read Publication ↗';
        card.appendChild(doi);
      }

      projectsGrid.appendChild(card);
    });
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
