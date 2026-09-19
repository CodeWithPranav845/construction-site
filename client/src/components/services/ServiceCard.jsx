import { Link } from 'react-router-dom';
import SmartImage from '../common/SmartImage.jsx';
import ServiceIcon from '../common/ServiceIcon.jsx';

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service._id}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white transition-colors hover:border-blueprint"
    >
      <SmartImage src={service.image} alt={service.title} className="h-48 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <ServiceIcon icon={service.icon} title={service.title} className="h-6 w-6 text-survey" />
        <h3 className="mt-3 text-xl group-hover:underline">{service.title}</h3>
        <p className="mt-2 flex-1 text-steel">{service.shortDescription}</p>
      </div>
    </Link>
  );
}
