import ResourceManager from '../../components/admin/ResourceManager.jsx';
import SmartImage from '../../components/common/SmartImage.jsx';
import { createService, deleteService, getServices, updateService } from '../../services/serviceApi.js';
import { truncate } from '../../utils/helpers.js';

// Fields shown in the add/edit form. `name` must match the API field.
const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'shortDescription', label: 'Short description', type: 'text', required: true, maxLength: 160, hint: 'Shown on cards. Keep it under 160 characters.' },
  { name: 'fullDescription', label: 'Full description', type: 'textarea', rows: 6, required: true, hint: 'Leave a blank line between paragraphs.' },
  { name: 'icon', label: 'Icon name', type: 'text', placeholder: 'home-icon.svg', hint: 'Words like home, building, factory, renovation, design or repair pick the matching icon.' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'featured', label: 'Featured', type: 'checkbox', checkboxLabel: 'Show on the home page' },
];

// Columns shown in the table
const columns = [
  { key: 'image', label: 'Image', render: (r) => <SmartImage src={r.image} alt="" className="h-12 w-16 rounded-sm" /> },
  { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
  { key: 'shortDescription', label: 'Summary', render: (r) => truncate(r.shortDescription, 70) },
  {
    key: 'featured',
    label: 'Featured',
    render: (r) => (r.featured ? <span className="font-medium text-survey">Yes</span> : <span className="text-steel">No</span>),
  },
];

export default function ManageServices() {
  return (
    <ResourceManager
      title="Services"
      singular="Service"
      description="What appears on the Services page and the home page."
      fields={fields}
      columns={columns}
      api={{ list: getServices, create: createService, update: updateService, remove: deleteService }}
    />
  );
}
