// Client-side validation for the quote form. The server validates again,
// this only gives people instant feedback.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s-]{8,16}$/;

export const validateInquiry = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!PHONE_RE.test(v.phone.trim())) errors.phone = 'Enter a phone number with 8 to 15 digits.';
  if (!v.projectType) errors.projectType = 'Choose a project type.';
  if (v.message.trim().length < 10) errors.message = 'Tell us a little more (at least 10 characters).';
  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
};
