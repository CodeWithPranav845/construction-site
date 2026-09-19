import { useState } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Loader from '../components/common/Loader.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import useFetch from '../hooks/useFetch.js';
import useDebounce from '../hooks/useDebounce.js';
import { getServices } from '../services/serviceApi.js';

const PAGE_SIZE = 9;

export default function Services() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const { data, loading, error, refetch } = useFetch(
    () => getServices({ page, limit: PAGE_SIZE, search: debouncedSearch || undefined }),
    [page, debouncedSearch]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Whatever you are building, one team can take it from drawings to handover."
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="relative mb-10 max-w-md">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-steel" aria-hidden="true" />
            <input
              id="service-search"
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search services"
              className="field pl-10"
            />
          </div>

          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={refetch} />}
          {data && data.items.length === 0 && (
            <EmptyState title="No services match your search">Try a shorter word, like "home" or "repair".</EmptyState>
          )}
          {data && data.items.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((s) => (
                  <ServiceCard key={s._id} service={s} />
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
