import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
      <p className="font-display text-7xl font-extrabold text-survey md:text-8xl">404</p>
      <h1 className="mt-2 text-3xl md:text-4xl">This page isn't on the plans</h1>
      <p className="mt-3 max-w-md text-lg text-steel">
        The link may be broken or the page may have moved. Head back to the homepage and try again.
      </p>
      <Button to="/" className="mt-6">
        Go to homepage
      </Button>
    </section>
  );
}
