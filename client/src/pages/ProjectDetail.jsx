import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import SmartImage from '../components/common/SmartImage.jsx';
import ProjectGallery from '../components/projects/ProjectGallery.jsx';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import useFetch from '../hooks/useFetch.js';
import { getProjectById } from '../services/projectApi.js';
import { formatDate } from '../utils/helpers.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error, refetch } = useFetch(() => getProjectById(id), [id]);

  if (loading) return <Loader className="min-h-[60vh]" />;
  if (error) {
    return (
      <div className="container-x py-16">
        <ErrorState message={error} onRetry={refetch} />
        <p className="text-center">
          <Link to="/projects" className="font-medium text-survey hover:underline">
            Back to all projects
          </Link>
        </p>
      </div>
    );
  }

  const facts = [
    { label: 'Category', value: project.category },
    { label: 'Location', value: project.location },
    { label: 'Client', value: project.clientName },
    { label: 'Completed', value: formatDate(project.completionDate) },
  ];

  return (
    <>
      <PageHeader
        title={project.title}
        crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.title }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SmartImage src={project.coverImage} alt={project.title} className="aspect-[16/8] w-full rounded-sm" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl">About this project</h2>
              <p className="mt-4 max-w-2xl text-lg text-steel">{project.description}</p>
            </div>

            <dl className="divide-y divide-line self-start border-y border-line">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-steel">{f.label}</dt>
                  <dd className="text-right font-medium">{f.value || '-'}</dd>
                </div>
              ))}
            </dl>
          </div>

          {project.gallery?.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 text-2xl md:text-3xl">Photos</h2>
              <ProjectGallery images={project.gallery} title={project.title} />
            </div>
          )}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <p className="text-lg">Planning something similar?</p>
            <div className="flex gap-3">
              <Button to="/projects" variant="outline">
                All projects
              </Button>
              <Button to="/contact">Get a free quote</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
