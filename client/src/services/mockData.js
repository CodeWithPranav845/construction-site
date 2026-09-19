// Demo data used ONLY when VITE_USE_MOCK=true.
// Shapes match the README's API contract exactly, so switching to the real backend needs no UI changes.

export const MOCK_TOKEN = 'mock-admin-token';
export const MOCK_ADMIN_CREDENTIALS = { email: 'admin@buildcraft.com', password: 'Admin@123' };

const STORAGE_KEY = 'buildcraft_mock_db_v1';

export const newId = () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

export const slugify = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const img = (seed, w = 900, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const seed = () => ({
  admin: { id: '665f1c2e2a1b2c3d4e5f6789', name: 'Admin User', email: MOCK_ADMIN_CREDENTIALS.email },

  services: [
    {
      _id: '665f1c2e2a1b2c3d4e5f0001',
      title: 'Residential Construction',
      slug: 'residential-construction',
      shortDescription: 'Houses, villas and apartment blocks, built from foundation to finishing.',
      fullDescription:
        'We handle the whole job: soil testing, foundation, structure, services and finishing. You get one site engineer as your point of contact from the first day to handover.\n\nEvery home is built to the approved drawings, with material test certificates and a written programme shared before work begins.',
      icon: 'home-icon.svg',
      image: img('bc-service-residential'),
      featured: true,
      createdAt: '2026-01-10T10:00:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0002',
      title: 'Commercial Construction',
      slug: 'commercial-construction',
      shortDescription: 'Offices, showrooms and retail spaces delivered around your opening date.',
      fullDescription:
        'Commercial buildings live or die by their schedule. We plan around your fit-out and opening dates, and coordinate electrical, HVAC and fire-safety contractors on one programme.\n\nWe can build the shell only, or hand over a fully fitted space that is ready to trade.',
      icon: 'building-icon.svg',
      image: img('bc-service-commercial'),
      featured: true,
      createdAt: '2026-01-10T10:05:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0003',
      title: 'Industrial Construction',
      slug: 'industrial-construction',
      shortDescription: 'Factories, warehouses and cold stores with heavy-duty structures.',
      fullDescription:
        'Pre-engineered steel sheds, RCC frames, heavy floor slabs and loading bays. We design for the loads your machinery and racking actually produce.\n\nWork is phased so that part of the plant can start operating while the rest is still being built.',
      icon: 'factory-icon.svg',
      image: img('bc-service-industrial'),
      featured: true,
      createdAt: '2026-01-10T10:10:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0004',
      title: 'Renovation and Remodeling',
      slug: 'renovation-and-remodeling',
      shortDescription: 'Extensions, layout changes and full refurbishments of existing buildings.',
      fullDescription:
        'We survey the existing structure first, so you know what can be opened up and what cannot before you commit to a design.\n\nDust, noise and access are planned with you, and we can phase the work if you need to keep living or trading in the building.',
      icon: 'renovation-icon.svg',
      image: img('bc-service-renovation'),
      featured: true,
      createdAt: '2026-01-10T10:15:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0005',
      title: 'Architecture and Interior Design',
      slug: 'architecture-and-interior-design',
      shortDescription: 'Plans, permits and interiors from the same team that builds them.',
      fullDescription:
        'Our architects draw with construction in mind, which keeps costs honest. We prepare drawings, submit for approvals and follow through to interiors.\n\nYou see 3D views and a bill of quantities before you sign off on a design.',
      icon: 'design-icon.svg',
      image: img('bc-service-design'),
      featured: false,
      createdAt: '2026-01-10T10:20:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0006',
      title: 'Structural Repair and Maintenance',
      slug: 'structural-repair-and-maintenance',
      shortDescription: 'Crack repair, waterproofing and strengthening for ageing buildings.',
      fullDescription:
        'We inspect, test and report before we repair. Options range from waterproofing and jacketing to full structural strengthening.\n\nAnnual maintenance contracts are available for commercial and industrial sites.',
      icon: 'repair-icon.svg',
      image: img('bc-service-repair'),
      featured: false,
      createdAt: '2026-01-10T10:25:00.000Z',
    },
  ],

  projects: [
    ['Green Valley Apartments', 'Residential', 'Dehradun, UK', 'Green Valley Developers', '2025-11-01', 'A 40-unit residential complex with basement parking, rainwater harvesting and a shared courtyard, delivered in 22 months.'],
    ['Rajpur Road Showroom', 'Commercial', 'Dehradun, UK', 'Sharma Motors', '2025-08-15', 'A three-storey automobile showroom with a service bay, built while the neighbouring road stayed open to traffic.'],
    ['Sidcul Cold Store', 'Industrial', 'Haridwar, UK', 'FreshLine Foods', '2025-06-30', 'A 60,000 sq ft cold storage facility with insulated panels, a heavy floor slab and four loading docks.'],
    ['Hill View Villa', 'Residential', 'Mussoorie, UK', 'Private client', '2025-04-12', 'A four-bedroom hillside villa with retaining walls, stepped terraces and a stone-clad facade.'],
    ['Tech Park Block C', 'Commercial', 'Noida, UP', 'Nexus Workspaces', '2025-02-20', 'A seven-storey office block with a glazed facade, delivered ahead of the tenant fit-out schedule.'],
    ['Ganga Steel Works Shed', 'Industrial', 'Roorkee, UK', 'Ganga Steel Pvt. Ltd.', '2024-12-05', 'A 45 m clear-span steel shed with a 10-tonne gantry crane and a reinforced machine foundation.'],
    ['Lotus Enclave Villas', 'Residential', 'Rishikesh, UK', 'Lotus Homes', '2024-09-18', 'Twelve independent villas on a shared plot, built in two phases so early buyers could move in.'],
    ['Central Mall Extension', 'Commercial', 'Haridwar, UK', 'Central Retail', '2024-06-01', 'A two-floor extension of a working mall, built at night and on Sundays to keep shops open.'],
    ['Agro Warehouse Complex', 'Industrial', 'Kashipur, UK', 'AgroMart', '2024-03-10', 'Three interconnected warehouses with racking-ready floors and a truck circulation yard.'],
  ].map(([title, category, location, clientName, completionDate, description], i) => ({
    _id: `665f1c2e2a1b2c3d4e5f01${String(i + 10).padStart(2, '0')}`,
    title,
    category,
    location,
    clientName,
    completionDate,
    coverImage: img(`bc-project-${i + 1}`),
    gallery: [1, 2, 3, 4].map((n) => img(`bc-project-${i + 1}-g${n}`, 1200, 800)),
    description,
    createdAt: new Date(Date.UTC(2026, 0, 20 - i, 10)).toISOString(),
  })),

  testimonials: [
    {
      _id: '665f1c2e2a1b2c3d4e5f0301',
      clientName: 'Rohan Mehta',
      clientCompany: 'Mehta Builders Pvt. Ltd.',
      message: 'BuildCraft delivered our project on time and within budget. The weekly reports meant we never had to chase anyone.',
      rating: 5,
      avatar: img('bc-avatar-1', 200, 200),
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0302',
      clientName: 'Neha Kapoor',
      clientCompany: 'Homeowner, Dehradun',
      message: 'They told us early which changes would cost extra, and the final bill matched the quote to the rupee.',
      rating: 5,
      avatar: img('bc-avatar-2', 200, 200),
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0303',
      clientName: 'Sandeep Rawat',
      clientCompany: 'FreshLine Foods',
      message: 'The cold store floor and panels were done exactly to spec. Our first inspection passed without a single remark.',
      rating: 5,
      avatar: img('bc-avatar-3', 200, 200),
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0304',
      clientName: 'Anita Verma',
      clientCompany: 'Central Retail',
      message: 'Building next to trading shops is hard. Their night-shift plan meant customers barely noticed the work.',
      rating: 4,
      avatar: img('bc-avatar-4', 200, 200),
    },
  ],

  team: [
    {
      _id: '665f1c2e2a1b2c3d4e5f0004',
      name: 'Ankit Sharma',
      designation: 'Site Engineer',
      photo: img('bc-team-1', 500, 600),
      bio: '8+ years of experience in structural engineering.',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0401',
      name: 'Meera Joshi',
      designation: 'Principal Architect',
      photo: img('bc-team-2', 500, 600),
      bio: 'Designs homes and offices that are easy to build and easy to maintain.',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0402',
      name: 'Vikram Negi',
      designation: 'Project Manager',
      photo: img('bc-team-3', 500, 600),
      bio: 'Runs schedules and budgets for our commercial and industrial sites.',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0403',
      name: 'Farah Khan',
      designation: 'Quantity Surveyor',
      photo: img('bc-team-4', 500, 600),
      bio: 'Prepares the line-by-line quotes and tracks every change order.',
    },
  ],

  inquiries: [
    {
      _id: '665f1c2e2a1b2c3d4e5f0005',
      name: 'Priya Nair',
      email: 'priya@example.com',
      phone: '+91-9876543210',
      projectType: 'Residential',
      budgetRange: '10L-20L',
      message: 'Looking to build a 2BHK house on a 1200 sqft plot.',
      status: 'new',
      createdAt: '2026-01-15T09:30:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0502',
      name: 'Arjun Bisht',
      email: 'arjun@example.com',
      phone: '+91-9812345678',
      projectType: 'Commercial',
      budgetRange: '50L-1Cr',
      message: 'We want a two-floor showroom on our plot near the bypass. Can someone visit the site this week?',
      status: 'contacted',
      createdAt: '2026-01-13T14:10:00.000Z',
    },
    {
      _id: '665f1c2e2a1b2c3d4e5f0503',
      name: 'Kavita Rana',
      email: 'kavita@example.com',
      phone: '+91-9900112233',
      projectType: 'Renovation',
      budgetRange: '20L-50L',
      message: 'Need to add a first floor to our existing house. Not sure if the foundation can take it.',
      status: 'resolved',
      createdAt: '2026-01-08T11:45:00.000Z',
    },
  ],
});

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupted storage */
  }
  return seed();
};

// The "database": edits made in the admin panel persist in this browser via localStorage.
export const db = load();

export const saveDb = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    /* storage full or blocked: changes just won't survive a refresh */
  }
};

/** Call from the browser console: import('/src/services/mockData.js').then(m => m.resetMockDb()) */
export const resetMockDb = () => {
  Object.assign(db, seed());
  saveDb();
};
