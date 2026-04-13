import { useState, useEffect } from 'react';

function MobileToggle({ isOpen, onClick }) {
  return (
    <button
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent lg:hidden"
      type="button"
      onClick={onClick}
    >
      <div className="space-y-1.5">
        <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </div>
    </button>
  );
}

function InternalLink({ href, label, isActive, onClick, mobile = false }) {
  const baseClasses = mobile
    ? "block w-full rounded-lg px-4 py-3 text-sm font-medium transition"
    : "rounded-lg px-4 py-2 text-sm font-medium transition";

  const stateClasses = isActive
    ? "bg-indigo-50 text-indigo-600"
    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  return (
    <a
      className={`${baseClasses} ${stateClasses}`}
      href={href}
      onClick={onClick}
    >
      {label}
    </a>
  );
}

function ExternalLink({ href, label, mobile = false }) {
  if (!href) return null;

  const baseClasses = mobile
    ? "block w-full rounded-lg px-4 py-3 text-sm font-medium transition text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    : "rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900";

  return (
    <a className={baseClasses} href={href}>
      {label}
    </a>
  );
}

export function Navbar({ canPropose, links, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Simple logic to determine active path for highlighting
    setCurrentPath(window.location.pathname);
  }, []);

  const statusRoute = user.role === 'instructor' ? '/workshop/dashboard' : '/workshop/status';
  const internalLinks = [
    { label: 'Workshop Status', href: statusRoute },
    { label: 'Workshop Types', href: '/workshop/types/' },
    ...(canPropose ? [{ label: 'Propose Workshop', href: '/workshop/propose/' }] : []),
  ];

  const secondaryLinks = [
    { label: 'Home', href: links.home },
    { label: 'Workshop Statistics', href: links.publicStatistics },
    ...(user.role === 'instructor' && links.teamStatistics
      ? [{ label: 'Team Statistics', href: links.teamStatistics }]
      : []),
    { label: 'Workshop Types', href: links.workshopTypes },
    { label: 'Profile', href: links.profile },
    { label: 'Change Password', href: links.changePassword },
    { label: 'Logout', href: links.logout },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a className="min-w-0 shrink-0" href={links.home}>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            FOSSEE Workshops
          </p>
          <div className="mt-1">
            <p className="truncate text-lg font-semibold text-gray-900">
              Workshop Booking
            </p>
            <p className="truncate text-sm text-gray-500">
              {user.fullName} | {user.role}
            </p>
          </div>
        </a>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <nav className="flex items-center gap-1">
            {internalLinks.map((link) => (
              <InternalLink 
                key={link.href} 
                href={link.href} 
                label={link.label} 
                isActive={currentPath === link.href}
              />
            ))}
          </nav>

          <div className="ml-4 flex items-center gap-1 border-l border-gray-200 pl-4">
            {secondaryLinks.map((link) => (
              <ExternalLink key={link.label} href={link.href} label={link.label} />
            ))}
          </div>
        </div>

        <MobileToggle
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen ? (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 shadow-lg lg:hidden">
          <nav className="mt-2 flex flex-col gap-1">
            {internalLinks.map((link) => (
              <InternalLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={currentPath === link.href}
                mobile
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
            {secondaryLinks.map((link) => (
              <ExternalLink
                key={link.label}
                href={link.href}
                label={link.label}
                mobile
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
