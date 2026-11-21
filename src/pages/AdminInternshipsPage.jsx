import React, { useState, useEffect, useCallback } from "react";
import {
  Lock,
  Search,
  Download,
  FileText,
  LogOut,
  Eye,
  X,
  Loader2,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import API_URL from "../config/api";

const STATUS_OPTIONS = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected"
];

const STATUS_BADGE = {
  Submitted: "bg-blue-100 text-blue-800 border-blue-200",
  "Under Review": "bg-amber-100 text-amber-800 border-amber-200",
  Shortlisted: "bg-purple-100 text-purple-800 border-purple-200",
  "Interview Scheduled": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Selected: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200"
};

const TOKEN_STORAGE_KEY = "atspeaks_intern_admin_token";

export default function AdminInternshipsPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_STORAGE_KEY) || "");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({ total: 0, statusCounts: {} });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingId, setUpdatingId] = useState("");

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken("");
    setApplications([]);
  }, []);

  const fetchApplications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`${API_URL}/api/intern-applications?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load applications.");
      }
      setApplications(json.data || []);
      setSummary(json.summary || { total: 0, statusCounts: {} });
    } catch (err) {
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, [token, search, statusFilter, handleLogout]);

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token, fetchApplications]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch(`${API_URL}/api/intern-applications/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Invalid credentials.");
      }
      sessionStorage.setItem(TOKEN_STORAGE_KEY, json.token);
      setToken(json.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Login failed.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(
        `${API_URL}/api/intern-applications/${encodeURIComponent(applicationId)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      );
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update status.");
      }
      setApplications((prev) =>
        prev.map((a) => (a.applicationId === applicationId ? { ...a, status: newStatus } : a))
      );
      if (selectedApp?.applicationId === applicationId) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
      fetchApplications();
    } catch (err) {
      alert(err.message || "Could not update status.");
    } finally {
      setUpdatingId("");
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    params.set("token", token);
    window.open(`${API_URL}/api/intern-applications/export/csv?${params.toString()}`, "_blank");
  };

  const getFileDownloadUrl = (applicationId, type = "resume") => {
    return `${API_URL}/api/intern-applications/${encodeURIComponent(
      applicationId
    )}/file?type=${type}&token=${encodeURIComponent(token)}`;
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] px-6 py-7 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold">Admin Application Portal</h1>
          <p className="text-xs text-white/85 mt-1">
            Sign in to manage Sales Intern applications
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
          {loginError && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {loginError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f3492]/20 focus:border-[#1f3492]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f3492]/20 focus:border-[#1f3492]"
            />
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 disabled:opacity-60 transition-all"
          >
            {loggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1f3492]">
            Sales Intern Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Total Applications: <strong>{summary.total}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchApplications}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1f3492] text-white text-xs sm:text-sm font-semibold hover:bg-[#192b7a]"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs sm:text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATUS_OPTIONS.map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(statusFilter === st ? "" : st)}
            className={`text-left rounded-2xl border p-3.5 transition-all ${
              statusFilter === st
                ? "border-[#1f3492] bg-[#1f3492]/5 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-[11px] font-semibold text-slate-500 truncate">{st}</p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              {summary.statusCounts?.[st] ?? 0}
            </p>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name, email, or Application ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1f3492]/20 focus:border-[#1f3492]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f3492]/20"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#1f3492]" />
            <span className="text-sm">Loading applications...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500">
            No applications found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4">Application ID</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.applicationId} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#1f3492] whitespace-nowrap">
                      {app.applicationId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{app.personalInfo?.fullName}</p>
                      <p className="text-xs text-slate-500">{app.personalInfo?.email}</p>
                      <p className="text-xs text-slate-500">{app.personalInfo?.mobileNumber}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 text-xs">
                      {app.personalInfo?.currentLocation}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                      {app.submittedAt
                        ? new Date(app.submittedAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })
                        : "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        disabled={updatingId === app.applicationId}
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.applicationId, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-full border cursor-pointer ${
                          STATUS_BADGE[app.status] || "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#1f3492] text-xs font-semibold text-slate-700 hover:text-[#1f3492]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                      <a
                        href={getFileDownloadUrl(app.applicationId, "resume")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1f3492]/10 hover:bg-[#1f3492]/20 text-xs font-semibold text-[#1f3492]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Resume
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="bg-gradient-to-r from-[#1f3492] to-[#c8348f] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-mono opacity-90">{selectedApp.applicationId}</p>
                <h2 className="text-lg font-bold">{selectedApp.personalInfo?.fullName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-full hover:bg-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Email</span>
                  <strong>{selectedApp.personalInfo?.email}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Mobile / WhatsApp</span>
                  <strong>
                    {selectedApp.personalInfo?.mobileNumber} /{" "}
                    {selectedApp.personalInfo?.whatsappNumber}
                  </strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Location &amp; Age</span>
                  <strong>
                    {selectedApp.personalInfo?.currentLocation} ({selectedApp.personalInfo?.age}{" "}
                    yrs)
                  </strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Education</span>
                  <strong>
                    {selectedApp.education?.degreeDepartment},{" "}
                    {selectedApp.education?.collegeName} (Year:{" "}
                    {selectedApp.education?.currentYearOfStudy}, Grad:{" "}
                    {selectedApp.education?.graduationYear})
                  </strong>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#1f3492] mb-2">Experience &amp; Skills</h3>
                <p className="text-xs text-slate-500 mb-1">
                  Skills: {(selectedApp.experienceAndSkills?.strongestSkills || []).join(", ")}
                </p>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {selectedApp.experienceAndSkills?.previousPromotionDetails}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-[#1f3492]">Sales Assessment</h3>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-600">Approach 50 students:</p>
                  <p>{selectedApp.salesAssessment?.approachFiftyStudents}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-600">Convince hesitant student:</p>
                  <p>{selectedApp.salesAssessment?.convinceHesitantStudent}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-600">Fee objection response:</p>
                  <p>{selectedApp.salesAssessment?.handleFeeObjection}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-600">
                    Call comfort: {selectedApp.salesAssessment?.callComfortLevel} | Why good fit:
                  </p>
                  <p>{selectedApp.salesAssessment?.whyGoodFit}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={getFileDownloadUrl(selectedApp.applicationId, "resume")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1f3492] text-white text-xs font-bold"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </a>
                {selectedApp.certificates && (
                  <a
                    href={getFileDownloadUrl(selectedApp.applicationId, "certificates")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#c8348f] text-[#c8348f] text-xs font-bold"
                  >
                    <Download className="w-4 h-4" />
                    Download Certificates
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
