import ResourceManager from '../../components/admin/ResourceManager.jsx';
import SmartImage from '../../components/common/SmartImage.jsx';
import { createTeamMember, deleteTeamMember, getTeam, updateTeamMember } from '../../services/teamApi.js';
import { truncate } from '../../utils/helpers.js';

const fields = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'designation', label: 'Designation', type: 'text', required: true, placeholder: 'Site Engineer' },
  { name: 'bio', label: 'Short bio', type: 'textarea', rows: 3 },
  { name: 'photo', label: 'Photo', type: 'image' },
];

const columns = [
  { key: 'photo', label: 'Photo', render: (r) => <SmartImage src={r.photo} alt="" className="h-12 w-12 rounded-full" /> },
  { key: 'name', label: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
  { key: 'designation', label: 'Designation' },
  { key: 'bio', label: 'Bio', render: (r) => truncate(r.bio, 70) },
];

export default function ManageTeam() {
  return (
    <ResourceManager
      title="Team"
      singular="Team member"
      description="People shown on the About page."
      fields={fields}
      columns={columns}
      api={{ list: getTeam, create: createTeamMember, update: updateTeamMember, remove: deleteTeamMember }}
    />
  );
}
