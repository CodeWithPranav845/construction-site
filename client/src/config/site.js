// Everything a new client would want to rebrand lives here.
// Change these values and the whole site (navbar, footer, contact page) updates.

export const SITE = {
  name: 'BuildCraft',
  tagline: 'Built to the drawing, on schedule.',
  intro:
    'BuildCraft delivers residential, commercial and industrial construction from foundation to handover, with one accountable team on site.',
  phone: '+91 98765 43210',
  email: 'info@buildcraft.example',
  address: '12 Civil Lines, Dehradun, Uttarakhand 248001',
  hours: 'Monday to Saturday, 9:00 am to 6:00 pm',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
  },
};

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

// Shown on the About page
export const FACTS = [
  { value: '240+', label: 'projects handed over' },
  { value: '15', label: 'years on site' },
  { value: '60', label: 'engineers and site staff' },
  { value: '98%', label: 'delivered by the agreed date' },
];

// Must match the categories the backend accepts for projects
export const PROJECT_CATEGORIES = ['Residential', 'Commercial', 'Industrial'];

// Options for the quote form
export const PROJECT_TYPES = ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Other'];
export const BUDGET_RANGES = ['Below 10L', '10L-20L', '20L-50L', '50L-1Cr', 'Above 1Cr'];

export const INQUIRY_STATUSES = ['new', 'contacted', 'resolved'];
