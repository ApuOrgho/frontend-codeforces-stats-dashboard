import React from "react";
import PropTypes from "prop-types";

export default function ContestOverview({ contestData, stats }) {
  if (!contestData && !stats) return null;

  // Contest Stats
  const {
    total_contests,
    highest_rating,
    best_rank_overall,
    best_rank_by_division,
    contests_skipped,
  } = contestData || {};

  // General Stats (Merged from StatsCards)
  const accepted = stats?.verdict_counter?.OK ?? stats?.accepted_count ?? 0;
  const wrongAnswers =
    stats?.verdict_counter?.WRONG_ANSWER ?? stats?.wrong_answer_count ?? 0;
  const solvedFirstAttempt = stats?.first_attempt_solved ?? 0;

  const divisionOrder = ["Div. 1", "Div. 2", "Div. 3", "Other"];
  const sortedDivisionRanks = divisionOrder
    .filter((div) => best_rank_by_division?.[div] !== undefined)
    .map((div) => ({
      name: div,
      rank: best_rank_by_division[div],
    }));

  const cardsData = [
    { label: "Total Submissions", value: stats?.total_submissions ?? "N/A" },
    { label: "Accepted (OK)", value: accepted },
    { label: "Wrong Answers", value: wrongAnswers },
    {
      label: "Unique Problems Attempted",
      value: stats?.unique_attempted ?? "N/A",
    },
    {
      label: "Unique Problems Solved",
      value: stats?.unique_solved ?? "N/A",
    },
    {
      label: "Problem Solving Success Rate (%)",
      value:
        stats?.problem_solving_rate !== undefined
          ? `${stats.problem_solving_rate.toFixed(2)}%`
          : "N/A",
    },
    { label: "Solved on First Attempt", value: solvedFirstAttempt },
  ];

  return (
    <section className="contest-overview">
      <h2 className="overview-title">🏆 Contest & Stats Overview</h2>

      <div className="overview-cards">
        {/* Contest Summary */}
        <div className="overview-card">
          <span className="label">Total Contests</span>
          <span className="value">{total_contests ?? "N/A"}</span>
        </div>
        <div className="overview-card">
          <span className="label">Highest Rating</span>
          <span className="value">{highest_rating ?? "N/A"}</span>
        </div>
        <div className="overview-card">
          <span className="label">Best Overall Rank</span>
          <span className="value">{best_rank_overall ?? "N/A"}</span>
        </div>

        {/* Division Ranks */}
        {sortedDivisionRanks.map(({ name, rank }) => (
          <div className="overview-card" key={name}>
            <span className="label">{name} Best Rank</span>
            <span className="value">{rank ?? "N/A"}</span>
          </div>
        ))}

        {/* Contests Skipped */}
        <div className="overview-card">
          <span className="label">Contests Skipped</span>
          <span className="value">{contests_skipped ?? "N/A"}</span>
        </div>

        {/* General Stats Merged */}
        {cardsData.map(({ label, value }) => (
          <div className="overview-card" key={label}>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

ContestOverview.propTypes = {
  contestData: PropTypes.shape({
    total_contests: PropTypes.number,
    highest_rating: PropTypes.number,
    best_rank_overall: PropTypes.number,
    best_rank_by_division: PropTypes.object,
    contests_skipped: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  stats: PropTypes.shape({
    total_submissions: PropTypes.number,
    accepted_count: PropTypes.number,
    wrong_answer_count: PropTypes.number,
    unique_attempted: PropTypes.number,
    unique_solved: PropTypes.number,
    problem_solving_rate: PropTypes.number,
    first_attempt_solved: PropTypes.number,
    verdict_counter: PropTypes.object,
  }),
};
