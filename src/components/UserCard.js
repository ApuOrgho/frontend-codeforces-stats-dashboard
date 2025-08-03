import React from "react";

// Helper: map rank string to CSS class for color
function getRankClass(rank) {
  if (!rank) return "rank-unrated";
  const rankLower = rank.toLowerCase();
  if (rankLower.includes("tourist")) return "rank-tourist";
  if (rankLower.includes("legendary grandmaster")) return "rank-legendary";
  if (rankLower.includes("grandmaster")) return "rank-grandmaster";
  if (rankLower.includes("international master")) return "rank-im";
  if (rankLower.includes("master")) return "rank-master";
  if (rankLower.includes("candidate master")) return "rank-cm";
  if (rankLower.includes("expert")) return "rank-expert";
  if (rankLower.includes("specialist")) return "rank-specialist";
  if (rankLower.includes("pupil")) return "rank-pupil";
  if (rankLower.includes("newbie")) return "rank-newbie";
  return "rank-unrated";
}

// Format unix timestamp to human-readable date
function formatDate(unixSeconds) {
  if (!unixSeconds) return "N/A";
  const d = new Date(unixSeconds * 1000);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export default function UserCard({ user, lastOnline, registered }) {
  if (!user && !lastOnline && !registered) return null;
  const {
    handle,
    avatar,
    currentRank,
    rating,
    maxRank,
    maxRating,
    currentRating,
    country,
    organization,
    contribution,
  } = user;

  const rankClass = getRankClass(currentRank);
  const maxRankClass = getRankClass(maxRank);
  return (
    <section className="user-card">
      <div className="user-info">
        <h2 className="user-handle">{handle}</h2>
        <p className={`rank ${rankClass}`}>
          Current Rank: {currentRank || "Unrated"}{" "}
          <span className={`rating ${rankClass}`}>
            ({currentRating ?? "N/A"})
          </span>
        </p>
        <p className={`rank ${maxRankClass}`}>
          Max Rank: {maxRank || "Unrated"}{" "}
          <span className={`rating ${maxRankClass}`}>
            ({maxRating ?? "N/A"})
          </span>
        </p>
        {country && (
          <p className="user-country">
            <strong>Country:</strong> {country}
          </p>
        )}
        {organization && (
          <p className="user-organization">
            <strong>Organization:</strong> {organization}
          </p>
        )}
        {typeof contribution === "number" && (
          <p className="user-contribution">
            <strong>Contribution:</strong> {contribution}
          </p>
        )}
      </div>
      <img
        className="user-avatar"
        src={
          avatar ||
          "https://sta.codeforces.com/s/95160/images/codeforces-logo-round.png"
        }
        alt={`${handle}'s avatar`}
      />
    </section>
  );
}
