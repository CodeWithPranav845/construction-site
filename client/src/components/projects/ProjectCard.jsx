import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SmartImage from '../common/SmartImage.jsx';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group block overflow-hidden rounded-sm border border-line bg-white transition-colors hover:border-blueprint"
    >
      <div className="relative">
        <SmartImage src={project.coverImage} alt={project.title} className="aspect-[4/3] w-full" />
        <span className="absolute left-3 top-3 rounded-sm bg-white px-2.5 py-1 text-xs font-medium text-blueprint">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl group-hover:underline">{project.title}</h3>
        {project.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-steel">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {project.location}
          </p>
        )}
      </div>
    </Link>
  );
}
