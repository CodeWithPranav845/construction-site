import { Building2, Factory, HardHat, Home, Hammer, Paintbrush, Ruler, Wrench } from 'lucide-react';

// The API stores an icon *filename* like "home-icon.svg". We match keywords in it
// (or in the title) to a Lucide icon, so the backend never has to host icon files.
const ICONS = [
  ['home', Home],
  ['residential', Home],
  ['building', Building2],
  ['commercial', Building2],
  ['factory', Factory],
  ['industrial', Factory],
  ['renovation', Hammer],
  ['remodel', Hammer],
  ['interior', Paintbrush],
  ['design', Ruler],
  ['architect', Ruler],
  ['repair', Wrench],
  ['maintenance', Wrench],
];

export default function ServiceIcon({ icon = '', title = '', className = 'h-6 w-6' }) {
  const haystack = `${icon} ${title}`.toLowerCase();
  const match = ICONS.find(([keyword]) => haystack.includes(keyword));
  const Icon = match ? match[1] : HardHat;
  return <Icon className={className} aria-hidden="true" />;
}
