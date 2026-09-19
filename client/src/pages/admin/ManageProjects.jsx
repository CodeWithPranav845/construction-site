import ResourceManager from '../../components/admin/ResourceManager.jsx';
import SmartImage from '../../components/common/SmartImage.jsx';
import { createProject, deleteProject, getProjects, updateProject } from '../../services/projectApi.js';
import { PROJECT_CATEGORIES } from '../../config/site.js';
import { formatDate } from '../../utils/helpers.js';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'select', options: PROJECT_CATEGORIES, required: true },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'Dehradun, UK' },
  { name: 'clientName', label: 'Client name', type: 'text' },
  { name: 'completionDate', label: 'Completion date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 5 },
  { name: 'coverImage', label: 'Cover image', type: 'image' },
  { name: 'gallery', label: 'Gallery', type: 'gallery', hint: 'Paste URLs (one per line), upload files, or both.' },
];

const columns = [
  { key: 'coverImage', label: 'Cover', render: (r) => <SmartImage src={r.coverImage} alt="" className="h-12 w-16 rounded-sm" /> },
  { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
  { key: 'category', label: 'Category' },
  { key: 'location', label: 'Location' },
  { key: 'completionDate', label: 'Completed', render: (r) => formatDate(r.completionDate) },
];

export default function ManageProjects() {
  return (
    <ResourceManager
      title="Projects"
      singular="Project"
      description="Your portfolio. Projects can be filtered by category on the website."
      fields={fields}
      columns={columns}
      api={{ list: getProjects, create: createProject, update: updateProject, remove: deleteProject }}
    />
  );
}
