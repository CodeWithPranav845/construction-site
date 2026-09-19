import { useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/common/Logo.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { USE_MOCK } from '../../services/api.js';
import { MOCK_ADMIN_CREDENTIALS } from '../../services/mockData.js';
import { validateLogin } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/admin';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Skip the form.
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const found = validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      await login(values.email.trim(), values.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="blueprint-grid flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-sm bg-white p-8">
        <Logo />
        <h1 className="mt-6 text-3xl">Admin login</h1>
        <p className="mt-1 text-steel">Sign in to manage services, projects and quote requests.</p>

        {USE_MOCK && (
          <div className="mt-5 rounded-sm border border-line bg-paper p-3 text-sm">
            <p className="font-medium">Demo mode</p>
            <p className="text-steel">
              Email: {MOCK_ADMIN_CREDENTIALS.email}
              <br />
              Password: {MOCK_ADMIN_CREDENTIALS.password}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {serverError && (
            <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </p>
          )}
          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="username" value={values.email} onChange={handleChange} className={`field ${errors.email ? 'field-error' : ''}`} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input id="password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange} className={`field ${errors.password ? 'field-error' : ''}`} />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <Button type="submit" size="lg" loading={submitting} className="w-full">
            {submitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-steel hover:text-blueprint hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
