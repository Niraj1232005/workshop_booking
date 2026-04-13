import { Layout } from './components/layout/Layout';

function getCSRFToken() {
  if (typeof document === 'undefined') {
    return '';
  }

  const tokenCookie = document.cookie
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith('csrftoken='));

  return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : '';
}

function App() {
  const appData = {
    messages: [],
    user: {
      fullName: 'Django User',
      role: 'instructor',
    },
    links: {
      home: '/',
      publicStatistics: '/statistics/public',
      teamStatistics: '/statistics/team',
      workshopTypes: '/workshop/types/',
      profile: '/workshop/view_profile/',
      changePassword: '/reset/password_change/',
      logout: '/workshop/logout/',
    },
    // Mocking sample data purely to visualize the requested Workshop Status Page
    workshops: [
      { id: 1, title: 'Introduction to Python', instructor: 'Dr. Smith', date: 'Oct 15, 2026', status: 'Approved' },
      { id: 2, title: 'Advanced Django', instructor: 'Prof. Davis', date: 'Nov 02, 2026', status: 'Pending' },
      { id: 3, title: 'React Fundamentals', instructor: 'Ms. Taylor', date: 'Dec 10, 2026', status: 'Rejected' },
    ]
  };

  const csrfToken = getCSRFToken();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{status}</span>;
      case 'Pending':
        return <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{status}</span>;
      case 'Rejected':
        return <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{status}</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{status}</span>;
    }
  };

  return (
    <Layout appData={appData}>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        
        {/* WORKSHOP STATUS PAGE */}
        <section>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Your Workshops</h1>
              <p className="mt-1 text-sm text-gray-600">Review the status and details of your requested workshops.</p>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appData.workshops.map((workshop) => (
              <div key={workshop.id} className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-900">{workshop.title}</h3>
                  {getStatusBadge(workshop.status)}
                </div>
                <div className="mt-4 flex flex-1 flex-col gap-2 text-sm text-gray-600">
                  <p><strong>Instructor:</strong> {workshop.instructor}</p>
                  <p><strong>Date:</strong> {workshop.date}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <a 
                    href={`/workshop/details/${workshop.id}`} 
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View Details &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROPOSE WORKSHOP FORM */}
        <section className="mx-auto max-w-2xl pt-8">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Propose a Workshop</h2>
              <p className="mt-1 text-sm text-gray-600">Fill in the details below to submit a new workshop proposal.</p>
            </div>
            
            <form action="/workshop/propose/" method="post" className="space-y-6">
              <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="workshop_type">
                  Workshop Type
                </label>
                <select
                  id="workshop_type"
                  name="workshop_type"
                  defaultValue=""
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-3 pr-10 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select a workshop type</option>
                  <option value="1">Introduction to Python</option>
                  <option value="2">Core Java</option>
                  <option value="3">Advanced Django</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="date">
                  Preferred Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 items-center">
                  <input
                    id="tnc_accepted"
                    name="tnc_accepted"
                    type="checkbox"
                    value="on"
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="tnc_accepted" className="font-medium text-gray-700">
                    I accept the terms and conditions
                  </label>
                  <p className="text-gray-500">You must accept our policies before submitting the proposal.</p>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700 sm:w-auto"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export default App;
