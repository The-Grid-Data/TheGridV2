import { paths } from '@/lib/routes/paths';

export const Banner = () => {
  return (
    <section className="flex justify-center bg-foreground p-2">
      <span className="text-center text-sm font-light text-muted/70">
        Welcome to the Beta release of The Grid&apos;s profile manager. This is
        only the start... Open a support chat for questions or feedback.
      </span>
    </section>
  );
};
