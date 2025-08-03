import React, { useState } from "react";
import "./App.css";
import { fetchUserStats } from "./api";
import UserCard from "./components/UserCard";
import DifficultyChart from "./components/DifficultyChart";
import TopicChart from "./components/TopicChart";
import { FaCode } from "react-icons/fa"; // Codeforces-like logo
import VerdictList from "./components/VerdictList";
import ContestOverview from "./components/ContestOverview";
import Footer from "./Footer/footer";
function App() {
  const [handle, setHandle] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setLoading(true);
    setError(null);
    setStats(null);

    try {
      const data = await fetchUserStats(handle);
      if (!data.error) {
        setStats(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("⚠ Failed to fetch stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${stats ? "with-stats" : "initial-screen"}`}>
      {/* Header */}
      <header className="header" role="banner">
        <div className="logo-title">
          <FaCode className="logo-icon" />
          <h1 className="title">Codeforces Statistics Dashboard</h1>
        </div>
        <p className="subtitle">
          Visualize your competitive programming journey
        </p>
      </header>

      {/* Search */}
      <form
        onSubmit={fetchStats}
        className="form-container"
        role="search"
        aria-label="Search Codeforces user"
      >
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter Codeforces handle"
          required
          className="handle-input"
          aria-label="Codeforces handle"
        />
        <button
          type="submit"
          disabled={loading}
          className={`fetch-button ${loading ? "loading" : ""}`}
        >
          {loading ? <span className="spinner"></span> : "Fetch Stats"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="error-message">{error}</p>}

      {/* Dashboard */}
      {stats && !error && (
        <main className="stats-section">
          {/* Profile Card */}
          <UserCard
            user={{ ...stats.user_info, handle: stats.handle }}
            lastOnline={stats.user_info}
            registered={stats.user_info}
          />

          {/* Quick Summary Cards */}
          <ContestOverview
            contestData={stats.contest_stats}
            stats={stats.stats}
          />
          <VerdictList verdicts={stats.stats.verdict_counter} />

          {/* Charts */}
          <div className="charts-row">
            <DifficultyChart data={stats.stats.difficulty_solved} />
          </div>
          <div className="charts-row">
            <TopicChart data={stats.stats.topic_solved} />
          </div>
        </main>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
