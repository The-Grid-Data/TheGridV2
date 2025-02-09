import { paths } from '../../../lib/routes/paths';

export const Footer = () => {
  return (
    <footer className="mt-10 border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-sm text-muted-foreground">
          © 2025 Enter the Grid B.V. All rights reserved.
        </div>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6">
          <a
            href={paths.externalUrls.docs}
            className="text-sm text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <a
            href={paths.externalUrls.termsOfService}
            className="text-sm text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>
          <a
            href={paths.externalUrls.privacyPolicy}
            className="text-sm text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
