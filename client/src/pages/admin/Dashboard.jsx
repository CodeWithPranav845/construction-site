import { Link } from 'react-router-dom';
import { Briefcase, Hammer, Inbox, MessageSquare, Users } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getServices } from '../../services/serviceApi.js';
import { getProjects } from '../../services/projectApi.js';
import { getTestimonials } from '../../services/testimonialApi.js';
import { getTeam } from '../../services/teamApi.js';
import { getInquiries } from '../../services/contactApi.js';
import { formatDate } from '../../utils/helpers.js';
import StatusBadge from '../../components/admin/StatusBadge.jsx';

// One useFetch that loads everything the dashboard needs in parallel
const loadDashboard = async () => {
  const [services, projects, testimonials, team, inquiries] = await Promise.all([
    getServices({ limit: 1 }),
    getProjects({ limit: 1 }),
    getTestimonials(),
    getTeam(),
    getInquiries(),
  ]);
  return { services, projects, testimonials, team, inquiries };
};

export default function Dashboard() {
  const { admin } = useAuth();
  const { data, loading, error, refetch } = useFetch(loadDashboard, []);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const newInquiries = data.inquiries.items.filter((i) => i.status === 'new').length;
  const recent = data.inquiries.items.slice(0, 5);

  const cards = [
    { to: '/admin/services', label: 'Services', value: data.services.totalItems, Icon: Hammer },
    { to: '/admin/projects', label: 'Projects', value: data.projects.totalItems, Icon: Briefcase },
    { to: '/admin/testimonials', label: 'Testimonials', value: data.testimonials.totalItems, Icon: MessageSquare },
    { to: '/admin/team', label: 'Team members', value: data.team.totalItems, Icon: Users },
    { to: '/admin/inquiries', label: 'New inquiries', value: newInquiries, Icon: Inbox },
  ];

  return (
    <div>
      <h1 className="text-3xl">Welcome back{admin?.name ? `, ${admin.name}` : ''}</h1>
      <p className="mt-1 text-steel">Here is what is on the website right now.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ to, label, value, Icon }) => (
          <Link key={label} to={to} className="rounded-sm border border-line bg-white p-5 transition-colors hover:border-blueprint">
            <Icon className="h-5 w-5 text-survey" aria-hidden="true" />
            <p className="mt-3 font-display text-4xl font-extrabold">{value}</p>
            <p className="text-sm text-steel">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl">Latest quote requests</h2>
          <Link to="/admin/inquiries" className="text-sm font-medium text-survey hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto rounded-sm border border-line bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-line bg-concrete/60">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Project type</th>
                <th className="px-4 py-3 font-semibold">Received</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-steel">
                    No quote requests yet.
                  </td>
                </tr>
              )}
              {recent.map((i) => (
                <tr key={i._id}>
                  <td className="px-4 py-3 font-medium">{i.name}</td>
                  <td className="px-4 py-3">{i.projectType}</td>
                  <td className="px-4 py-3">{formatDate(i.createdAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
