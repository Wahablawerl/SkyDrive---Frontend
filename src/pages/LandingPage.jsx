import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-100">
              S
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              SkyDrive
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 bg-blue-50 opacity-70 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                Trusted file management for teams and individuals
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
                Your files, organized and ready wherever you go.
              </h1>
              <p className="max-w-2xl text-base md:text-lg text-slate-600">
                SkyDrive delivers fast uploads, secure cloud backup, and a
                polished dashboard for managing all your documents, media, and
                projects in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-600 hover:text-blue-600"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[.24em] text-blue-600">
                    Instant Sync
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">
                    Sync across devices
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Access your files from any device with seamless cloud sync.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[.24em] text-blue-600">
                    Smart Backup
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">
                    Safe and secure
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Keep your files protected with secure storage and recovery.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-blue-200/70 blur-2xl" />
              <div className="absolute left-8 bottom-16 h-20 w-20 rounded-full bg-slate-200/80 blur-2xl" />
              <div className="relative rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-slate-200 p-8">
                <div className="mb-6 rounded-4xl border border-slate-200 bg-blue-50 p-6 text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-600/10 text-blue-700 shadow-inner shadow-blue-100">
                    <svg
                      viewBox="0 0 64 64"
                      className="h-16 w-16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 36a12 12 0 112.4-23.7 16 16 0 1130.9 10.2A10 10 0 1144 44H20a8 8 0 010-16z" />
                      <path d="M24 42h16" />
                      <path d="M28 48h8" />
                    </svg>
                  </div>
                  <p className="mt-5 text-sm text-slate-500">
                    A sleek workspace for managing files and media.
                  </p>
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-slate-500">SkyDrive</p>
                    <p className="text-xs text-slate-400">Cloud workspace</p>
                  </div>
                  <div className="rounded-2xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
                    Live
                  </div>
                </div>
                <div className="mb-6 rounded-3xl bg-slate-50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-2xl bg-blue-100 p-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-blue-600 fill-current"
                      >
                        <path d="M4 11a4 4 0 014-4h1.2a6 6 0 0111.8 1.5A4.5 4.5 0 0117.5 19H8a4 4 0 01-4-4v-0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Cloud backup
                      </p>
                      <p className="text-xs text-slate-500">Always available</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="text-sm text-slate-500">
                        Project brief.pdf
                      </p>
                      <p className="mt-2 font-semibold text-slate-900">
                        1.2 MB
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                      <p className="text-sm text-slate-500">Marketing.png</p>
                      <p className="mt-2 font-semibold text-slate-900">
                        3.8 MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-blue-600/10 p-4">
                    <p className="text-sm text-blue-700">Starred</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      12
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4">
                    <p className="text-sm text-slate-500">Storage used</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      34 GB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
