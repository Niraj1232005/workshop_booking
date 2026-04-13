import { Alert } from '../ui/Alert';
import { Navbar } from './Navbar';

export function Layout({ appData, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar
        canPropose={appData.user.role !== 'instructor'}
        links={appData.links}
        user={appData.user}
      />

      <main className="flex-1">
        {Array.isArray(appData.messages) && appData.messages.length ? (
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
            <div className="space-y-3">
              {appData.messages.map((message, index) => (
                <Alert
                  key={`${message.text}-${index}`}
                  variant={message.type || 'info'}
                >
                  {message.text}
                </Alert>
              ))}
            </div>
          </div>
        ) : null}

        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FOSSEE Workshops. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
