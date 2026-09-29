// The original case studies, career chapters, and contact details are preserved.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => reducedMotion.matches || document.documentElement.dataset.motion === 'off' ? 'instant' : 'smooth';

const cases = {
  kavach: {
    category: 'FINANCE / ACADEMIC GROUP PROJECT', title: 'Kavach defence portfolio.',
    lead: 'How does an allocation change when the objective moves from finding returns to controlling risk? This group study compares portfolios of HAL, Bharat Dynamics, and Paras Defence.',
    metrics: [['3', 'defence-sector stocks'], ['231', 'feasible grid allocations'], ['36.6%', 'modelled minimum-variance volatility']],
    sections: [
      ['The question', 'Compare feasible allocations, a minimum-variance portfolio, and a tangency portfolio to understand the trade-off between concentration, volatility, and risk-adjusted performance.'],
      ['The work', ['Evaluated 231 feasible portfolio combinations using a 5% allocation grid.', 'Compared these with optimised minimum-variance and tangency solutions.', 'Analysed the role of each security in the portfolio, rather than choosing stocks only by their individual performance.']],
      ['What the model showed', 'The optimised minimum-variance portfolio allocated 85.8% to HAL and 14.2% to Paras Defence, with no allocation to BDL. Its modelled volatility was 36.6%, with a Sharpe ratio of 1.08. The tangency solution concentrated entirely in HAL, illustrating how an optimisation objective can produce a concentrated result.'],
      ['The takeaway', 'A model can identify an allocation, but concentration and the quality of its assumptions still need to be evaluated. A mathematically efficient result is only one part of an investment decision.']
    ], note: 'Academic group project · Bhoomika Bansal is credited in the submitted report. Figures are model outputs from the study, not realised returns. The optimised weights are separate from the 5% grid search.'
  },
  tata: {
    category: 'FINANCE / ACADEMIC GROUP PROJECT', title: 'Tata Steel, through three scenarios.',
    lead: 'A five-year financial analysis that connects statements, cash generation, balance-sheet risk, and valuation rather than relying on a single ratio.',
    metrics: [['3', 'DCF scenarios'], ['4', 'peer companies'], ['10.77%', 'assumed WACC']],
    sections: [
      ['The question', 'How do changes in operating assumptions affect the estimated value of a cyclical steel business?'],
      ['My contribution', 'I worked on cash-flow forecasting, the capital bridge, capital allocation, and peer valuation. These pieces connect the cash a business generates with how that cash is deployed, and how the business compares with its peers.'],
      ['The work', ['Reviewed comparative and common-size financial statements, financial ratios, and cash flows.', 'Used peer comparisons alongside a discounted cash-flow model.', 'Compared downside, base, and upside valuation scenarios with an assumed 10.77% WACC and 2.5% terminal growth rate.']],
      ['Reading the scenarios', 'The detailed DCF section estimates values of ₹264.47 per share in the downside case, ₹314.47 in the base case, and ₹381.31 in the upside case. These are scenario-based estimates from the academic model.'],
      ['The takeaway', 'Valuation is a range shaped by assumptions. Connecting margins, investment needs, and cash generation makes that range more useful than a standalone target price.']
    ], note: 'Academic group project · My role: cash-flow forecasting, capital bridge, capital allocation, and peer valuation. Figures follow the detailed DCF scenario table; they are not current market quotes.'
  },
  blinkit: {
    category: 'ANALYTICS / POWER BI', title: 'Blinkit retail intelligence.',
    lead: 'A six-page Power BI report that brings sales, product attributes, and outlet performance into a connected view of a retail business.',
    metrics: [['6', 'report pages'], ['4', 'headline KPI measures'], ['Power BI', 'reporting tool']],
    sections: [
      ['The question', 'How can a retail report move from a top-level sales number to a clearer view of the product mix and outlet characteristics behind it?'],
      ['Inside the report', ['Dashboard and Product & Outlet Insights pages provide entry points into the analysis.', 'Overall Sales Performance, Product Performance, Outlet Performance, and Product Attributes Impact on Sales provide focused views.', 'Measures include total sales, average sales, average rating, and total items, with filters for outlet location, outlet size, and item type.']],
      ['The takeaway', 'A useful dashboard connects the overview to the next question. This report organises the business into views that can be explored together.']
    ], note: 'Academic report · This case study describes the supplied Power BI report; the live Power BI file is not embedded here.'
  },
  shuttle: {
    category: 'OPERATIONS / ACADEMIC PLANNING PROJECT', title: 'A better weekend commute.',
    lead: 'A campus shuttle planning study covering the campus-to-IFFCO-Chowk route, with an eight-week plan for improving scheduling, booking, and boarding.',
    metrics: [['8 weeks', 'proposed project plan'], ['2 shuttles', 'existing service system'], ['KPI-led', 'evaluation approach']],
    sections: [
      ['The question', 'How can a campus shuttle service better connect passenger demand, seat availability, and a predictable travel experience?'],
      ['The work', ['Documented the existing service and baseline observations.', 'Developed a work breakdown structure, scheduling plan, and booking and boarding process.', 'Proposed a pilot and KPI evaluation to assess how the revised process performs.']],
      ['The takeaway', 'Service improvement needs a measurable starting point, a workable process, and a way to evaluate the pilot. The plan connects those three pieces.']
    ], note: 'Academic planning project · The eight-week plan is a proposal. No achieved operational savings or rollout results are claimed.'
  },
  reporting: {
    category: 'EXPERIENCE / JAN – MAY 2025', title: 'The discipline behind the numbers.',
    lead: 'An internship at Rajiv Goel & Associates, focused on financial reporting, compliance tracking, audit documentation, and client coordination.',
    metrics: [['Excel', 'compliance checklist'], ['Reporting', 'financial preparation'], ['Audit', 'documentation support']],
    sections: [
      ['The work', ['Supported preparation of financial reports and organised supporting documents.', 'Developed an Excel checklist to track compliance requirements and reduce manual oversight.', 'Coordinated with clients on documentation gaps and supported audit preparation.']],
      ['What it added', 'Practical finance depends on reliable inputs. This experience strengthened the habit of checking documentation, following up on missing information, and keeping reporting organised.']
    ], note: 'Internship experience · Summary drawn from the supplied personal portfolio information.'
  },
  cox: {
    category: 'EXPERIENCE / APR – JUN 2026', title: 'From lead to loyalty.',
    lead: 'An operations internship at Cox & Kings, examining how inquiries move through customer acquisition, lead allocation, follow-up, and the CRM lifecycle.',
    metrics: [['CRM', 'workflow focus'], ['Lead lifecycle', 'end-to-end view'], ['Operations', 'internship area']],
    sections: [
      ['The question', 'Where can a lead lose momentum between the first inquiry and a consistent follow-up?'],
      ['The work', ['Reviewed acquisition and customer inquiry workflows across digital and assisted channels.', 'Supported lead allocation, seller and pre-seller activity monitoring, follow-up checks, and CRM hygiene.', 'Worked on product-sheet and package-content maintenance, with support for campaign operations.']],
      ['The recommendations', 'Clearer routing, consistent follow-up timelines, structured seller audits, and CRM monitoring were identified as ways to improve transparency across the lifecycle.']
    ], note: 'Internship experience · Recommendations are presented as proposed improvements, not measured conversion gains.'
  }
};

const chapters = {
  college: { label: 'THROUGH 2024 / EDUCATION', title: 'The foundations.', description: 'B.Com. at M.C.M. D.A.V. College for Women, Panjab University, Chandigarh.', heading: 'EXPERIENCES THAT SHAPED MY START', items: ['A foundation in commerce, accounting, and business.', 'Vice President of the Finance Club during undergraduate college, 2024.', 'Activities Head, Rotaract Club, 2024 — including sports-event organisation.'], note: 'An early combination of financial curiosity and working with people.' },
  ca: { label: 'JAN – MAY 2025 / INTERNSHIP', title: 'Finance in the real world.', description: 'Rajiv Goel & Associates. Practical exposure to reporting, audit support, compliance, and client documentation.', heading: 'WORK FROM THIS EXPERIENCE', projects: ['reporting'], note: 'From preparing reports to tracking the details behind them.' },
  pgdm: { label: '2025 – 2027 / POSTGRADUATE STUDY', title: 'Connecting the dots.', description: 'PGDM at Great Lakes Institute of Management, Gurgaon. Finance major, Analytics minor.', heading: 'SELECTED ACADEMIC WORK', projects: ['kavach', 'tata', 'blinkit', 'shuttle'], note: 'Explore the project cards horizontally. Open a case study for the full story.' },
  cox: { label: 'APR – JUN 2026 / INTERNSHIP', title: 'Closer to the customer.', description: 'Operations Intern at Cox & Kings, working across CRM processes, lead lifecycle management, and digital operations.', heading: 'WORK FROM THIS EXPERIENCE', projects: ['cox'], note: 'Connecting process discipline with the customer experience.' }
};

const shortNames = { kavach: 'Kavach portfolio', tata: 'Tata Steel valuation', blinkit: 'Blinkit retail intelligence', shuttle: 'Campus shuttle planning', reporting: 'Reporting & compliance', cox: 'From lead to loyalty' };
const categories = { kavach: 'FINANCE', tata: 'FINANCE', blinkit: 'ANALYTICS', shuttle: 'OPERATIONS', reporting: 'FINANCIAL REPORTING', cox: 'CRM OPERATIONS' };
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dialog = document.getElementById('case-dialog');
let lastTrigger = null;
function openCase(id, trigger = null) {
  if (!Object.hasOwn(cases, id)) throw new Error('Unknown case study');
  const data = cases[id];
  lastTrigger = trigger || document.activeElement;
  document.getElementById('case-content').innerHTML = `<p class="eyebrow">${escapeHTML(data.category)}</p><h2 id="case-title">${escapeHTML(data.title)}</h2><p class="case-lead">${escapeHTML(data.lead)}</p><div class="case-metrics">${data.metrics.map(([value, label]) => `<div class="case-metric"><strong>${escapeHTML(value)}</strong><span>${escapeHTML(label)}</span></div>`).join('')}</div>${data.sections.map(([title, content]) => `<section class="case-section"><h3>${escapeHTML(title)}</h3>${Array.isArray(content) ? `<ul>${content.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>` : `<p>${escapeHTML(content)}</p>`}</section>`).join('')}<p class="case-note">${escapeHTML(data.note)}</p>`;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('no-scroll');
  dialog.querySelector('.dialog-close').focus({preventScroll:true});
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-case]');
  if (button) openCase(button.dataset.case, button);
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('no-scroll'); lastTrigger?.focus({preventScroll:true}); });

const timelineTabs = [...document.querySelectorAll('[data-chapter]')];
const journeyPanel = document.getElementById('journey-panel');
let selectedChapter = 'pgdm';
function selectChapter(id, { focus = false, scroll = false } = {}) {
  if (!Object.hasOwn(chapters, id)) throw new Error('Unknown journey chapter');
  selectedChapter = id;
  const data = chapters[id];
  timelineTabs.forEach(tab => { const active = tab.dataset.chapter === id; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) { tab.focus({preventScroll:true}); tab.scrollIntoView({behavior:scrollBehavior(), block:'nearest', inline:'nearest'}); } });
  journeyPanel.setAttribute('aria-labelledby', `tab-${id}`);
  journeyPanel.innerHTML = `<div class="chapter-overview"><p class="chapter-eyebrow">${escapeHTML(data.label)}</p><h3>${escapeHTML(data.title)}</h3><p>${escapeHTML(data.description)}</p></div><div class="chapter-details" tabindex="0" aria-label="Work and details for this chapter"><h4>${escapeHTML(data.heading)}</h4>${data.projects ? `<div class="chapter-projects" aria-label="Projects, scroll horizontally" tabindex="0">${data.projects.map(key => `<button class="chapter-project" data-case="${key}"><span>${categories[key]}</span><strong>${shortNames[key]}</strong><span>Explore project ↗</span></button>`).join('')}</div>` : `<ul class="chapter-list">${data.items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`}<p class="chapter-detail-note">${escapeHTML(data.note)}</p></div>`;
  if (scroll) document.getElementById('journey').scrollIntoView({behavior:scrollBehavior(),block:'start'});
}
timelineTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { selectChapter(tab.dataset.chapter); history.replaceState(null, '', `#journey-${tab.dataset.chapter}`); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % timelineTabs.length;
    if (event.key === 'ArrowLeft') next = (index + timelineTabs.length - 1) % timelineTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = timelineTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectChapter(timelineTabs[next].dataset.chapter, {focus:true}); history.replaceState(null, '', `#journey-${timelineTabs[next].dataset.chapter}`); }
  });
});
function applyJourneyHash() {
  const chapter = location.hash.replace('#journey-', '');
  if (location.hash.startsWith('#journey-') && Object.hasOwn(chapters, chapter)) selectChapter(chapter, {scroll:true});
}
selectChapter('pgdm');
applyJourneyHash();
addEventListener('hashchange', applyJourneyHash);

// Contact details can be updated here without changing the page layout.
const contact = { email: 'bhoomika.pgdm27g@greatlakes.edu.in', linkedin: 'https://www.linkedin.com/in/bhoomika-bansal-bb6282229/', resume: 'assets/Bhoomika-Bansal-Finance-Resume.docx' };
const links = [];
if (contact.email) links.push(`<a class="text-link" href="mailto:${escapeHTML(contact.email)}">Email me <span aria-hidden="true">↗</span></a>`);
if (contact.linkedin) links.push(`<a class="text-link" href="${escapeHTML(contact.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>`);
if (contact.resume) links.push(`<a class="text-link" href="${escapeHTML(contact.resume)}" download>Download résumé <span aria-hidden="true">↓</span></a>`);
document.getElementById('contact-links').innerHTML = links.join('');

// Filter the visible project collection without altering the case-study content.
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('.project-card[data-category]')];
const filterStatus = document.getElementById('filter-status');
const filterNames = { all: 'All work', finance: 'Finance', analytics: 'Analytics', operations: 'Operations' };
function filterProjects(category, announce = true) {
  if (!Object.hasOwn(filterNames, category)) return;
  let count = 0;
  projectCards.forEach(card => {
    const visible = category === 'all' || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  if (filterStatus && announce) filterStatus.textContent = `${filterNames[category]}: ${count} ${count === 1 ? 'project' : 'projects'}.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
filterProjects('all', false);

// These are the three exact outputs of the original academic DCF model.
const scenarios = {
  downside: { value: '264.47', label: 'Downside scenario', width: '69.36%' },
  base: { value: '314.47', label: 'Base scenario', width: '82.47%' },
  upside: { value: '381.31', label: 'Upside scenario', width: '100%' }
};
const scenarioButtons = [...document.querySelectorAll('[data-scenario]')];
function selectScenario(id) {
  if (!Object.hasOwn(scenarios, id)) return;
  const scenario = scenarios[id];
  const value = document.getElementById('scenario-value');
  const label = document.getElementById('scenario-label');
  const bar = document.getElementById('scenario-bar');
  if (value) value.textContent = `₹${scenario.value}`;
  if (label) label.textContent = scenario.label;
  if (bar) bar.style.setProperty('--scenario-width', scenario.width);
  scenarioButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scenario === id)));
}
scenarioButtons.forEach(button => button.addEventListener('click', () => selectScenario(button.dataset.scenario)));
selectScenario('base');

// CSS controls desktop/mobile visibility; closing the menu restores its trigger.
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const header = menuToggle?.closest('header');
function setMenuOpen(open, restoreFocus = false) {
  if (!menuToggle || !header) return;
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (restoreFocus) menuToggle.focus({ preventScroll: true });
}
menuToggle?.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
mainNav?.addEventListener('click', event => { if (event.target.closest('a')) setMenuOpen(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') setMenuOpen(false, true);
});
document.addEventListener('click', event => {
  if (menuToggle?.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenuOpen(false);
});

// Expose the same navigation actions in browsers that support WebMCP.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const tools = [
    { name: 'navigate_career_chapter', title: 'Explore a career chapter', description: 'Select a career chapter and show its related experience and project cards.', inputSchema: { type: 'object', properties: { chapter: { type: 'string', enum: Object.keys(chapters) } }, required: ['chapter'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { if (!input || typeof input.chapter !== 'string' || !Object.hasOwn(chapters,input.chapter) || Object.keys(input).some(k => k !== 'chapter')) throw new Error('Provide one valid chapter'); selectChapter(input.chapter,{scroll:true}); return { selectedChapter, title: chapters[selectedChapter].title }; } },
    { name: 'open_project_case_study', title: 'Open a project case study', description: 'Open the project case study dialog with its methods, results, and scope.', inputSchema: { type: 'object', properties: { project: { type: 'string', enum: Object.keys(cases) } }, required: ['project'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { if (!input || typeof input.project !== 'string' || !Object.hasOwn(cases,input.project) || Object.keys(input).some(k => k !== 'project')) throw new Error('Provide one valid project'); openCase(input.project); return { project: input.project, title: cases[input.project].title, dialogOpen: dialog.open }; } }
  ];
  for (const tool of tools) { try { Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(() => {}); } catch {} }
  addEventListener('pagehide', () => lifecycle.abort(), {once:true});
}
