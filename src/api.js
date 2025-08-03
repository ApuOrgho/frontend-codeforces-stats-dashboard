// api.js
export async function fetchUserStats(handle) {
  try {
    // Default to your Railway backend URL if no env variable is set
    const API_BASE_URL =
      process.env.REACT_APP_API_BASE_URL ||
      "https://web-production-4461.up.railway.app";

    const response = await fetch(
      `${API_BASE_URL}/api/stats?handle=${encodeURIComponent(handle)}`
    );

    if (!response.ok) {
      // Try to parse error message from JSON response
      const errorData = await response.json().catch(() => null);
      const errorMsg =
        errorData?.error || `Error: ${response.status} ${response.statusText}`;
      return { error: errorMsg };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      error:
        "Network error: Failed to fetch stats. Please check your connection.",
    };
  }
}
