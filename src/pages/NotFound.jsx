import { useNavigate } from "react-router-dom";

function NotFound(){

    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <main className="max-w-md w-full text-center space-y-8">
        {/* Visual Badge / Glowing 404 */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
          </div>
          <span className="relative text-9xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 tracking-widest">
            404
          </span>
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="text-base text-slate-400">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
         <button onClick={()=>useNavigate(-1)}> <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <svg 
              className="mr-2 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            Go back home
          </a>
          </button>

          <a
            href="/support"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700/60 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
          >
            Contact support
          </a>
        </div>

        {/* Footer Links */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500">
          Need help? Check out our{' '}
          <a href="/docs" className="underline hover:text-slate-400">
            documentation
          </a>{' '}
          or{' '}
          <a href="/status" className="underline hover:text-slate-400">
            status page
          </a>
          .
        </div>
      </main>
    </div>
    );
}

export default NotFound;