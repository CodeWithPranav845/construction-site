import ResourceManager from '../../components/admin/ResourceManager.jsx';
import SmartImage from '../../components/common/SmartImage.jsx';
import RatingStars from '../../components/common/RatingStars.jsx';
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from '../../services/testimonialApi.js';
import { truncate } from '../../utils/helpers.js';

const fields = [
  { name: 'clientName', label: 'Client name', type: 'text', required: true },
  { name: 'clientCompany', label: 'Company or description', type: 'text' },
  { name: 'message', label: 'Testimonial', type: 'textarea', rows: 4, required: true },
  { name: 'rating', label: 'Rating (1 to 5)', type: 'number', min: 1, max: 5, step: 1, defaultValue: 5, required: true },
  { name: 'avatar', label: 'Photo', type: 'image' },
];

const columns = [
  { key: 'avatar', label: 'Photo', render: (r) => <SmartImage src={r.avatar} alt="" className="h-10 w-10 rounded-full" /> },
  {
    key: 'clientName',
    label: 'Client',
    render: (r) => (
      <div>
        <p className="font-medium">{r.clientName}</p>
        <p className="text-steel">{r.clientCompany}</p>
      </div>
    ),
  },
  { key: 'message', label: 'Message', render: (r) => truncate(r.message, 80) },
  { key: 'rating', label: 'Rating', render: (r) => <RatingStars rating={r.rating} /> },
];

export default function ManageTestimonials() {
  return (
    <ResourceManager
      title="Testimonials"
      singular="Testimonial"
      description="Client quotes shown on the home page."
      fields={fields}
      columns={columns}
      api={{ list: getTestimonials, create: createTestimonial, update: updateTestimonial, remove: deleteTestimonial }}
    />
  );
}
