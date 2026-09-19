import { useState } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectFilter from '../components/projects/ProjectFilter.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import useFetch from '../hooks/useFetch.js';
import useDebounce from '../hooks/useDebounce.js';
import { getProjects } from '../services/projectApi.js';

const PAGE_SIZE = 9;

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  // Whenever category / search / page changes, useFetch calls the API again:
  //   GET /projects?category=Residential&search=green&page=2&limit=9
  const { data, loading, error, refetch } = useFetch(
    () =>
      getProjects({
        category: category === 'All' ? undefined : category,
        search: debouncedSearch || undefined,
        page,
        limit: PAGE_SIZE,
      }),
    [category, debouncedSearch, page]
  );

  const handleCategory = (c) => {
    setCategory(c);
    setPage(1);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Projects"
        description="Buildings we have completed for homeowners, retailers and manufacturers."
        crumbs={[{ label: 'Projects' }]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <ProjectFilter value={category} onChange={handleCategory} />
            <div className="relative w-full sm:w-72">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel" aria-hidden="true" />
              <input
                id="project-search"
                type="search"
                value={search}
                onChange={handleSearch}
                placeholder="Search by project name"
                className="field pl-10"
              />
            </div>
          </div>

          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {data && data.items.length === 0 && (
            <EmptyState title="No projects found">Try another category or clear the search box.</EmptyState>
          )}
          {data && data.items.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((p) => (
                  <ProjectCard key={p._id} project={p} />
                ))}
              </div>
              <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
