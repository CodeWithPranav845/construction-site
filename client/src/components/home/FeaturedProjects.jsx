import useFetch from '../../hooks/useFetch.js';
import { getProjects } from '../../services/projectApi.js';
import ProjectCard from '../projects/ProjectCard.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import Button from '../common/Button.jsx';

export default function FeaturedProjects() {
  const { data, loading, error, refetch } = useFetch(() => getProjects({ limit: 3 }), []);

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading
          title="Recently handed over"
          subtitle="A few of the buildings our crews finished this year."
          action={
            <Button to="/projects" variant="outline">
              View all projects
            </Button>
          }
        />
        <div className="mt-10">
          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {data && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
