/**
 * =========================================================================
 * GLOBAL FUSION 2026 - SITE & FESTIVAL TRAILER CONFIGURATION
 * =========================================================================
 * TO CHANGE THE FESTIVAL TRAILER YOUTUBE VIDEO:
 * Replace the value of FESTIVAL_YOUTUBE_VIDEO_ID below with your own
 * YouTube Video ID or paste your full YouTube URL.
 *
 * Example:
 * If your YouTube video link is:
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *   or https://youtu.be/dQw4w9WgXcQ
 *
 * Simply enter your Video ID:
 *   const FESTIVAL_YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";
 *
 * The trailer component automatically parses and renders the responsive
 * 16:9 YouTube iframe player inside the website without opening a new tab.
 * =========================================================================
 */

const FESTIVAL_YOUTUBE_VIDEO_ID = "hXKCEe167tY";

/**
 * Helper function to extract an 11-character YouTube video ID from
 * either a raw ID string or any standard YouTube URL.
 */
function parseYouTubeId(input) {
  if (!input) return "hXKCEe167tY";
  const trimmed = String(input).trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) return match[1];
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return trimmed;
}

const siteConfig = {
  // Configured YouTube Video ID
  youtubeVideoId: FESTIVAL_YOUTUBE_VIDEO_ID,

  // Trailer display metadata
  trailerBadge: "OFFICIAL FESTIVAL TRAILER • 4K SOUND",
  trailerTitle: "Global Fusion 2026: The Spirit of Kathmandu",
  trailerSubtitle: "Experience the rehearsals, cultural dances, and vibrant campus life bridging LBEF and APU students together.",

  // Helper method to retrieve embed URL
  getTrailerEmbedUrl: function (autoplay = false) {
    const id = parseYouTubeId(this.youtubeVideoId);
    if (!id || id === "YOUR_VIDEO_ID_HERE") {
      return null;
    }
    return `https://www.youtube.com/embed/${encodeURIComponent(id)}${autoplay ? '?autoplay=1' : ''}`;
  }
};

// Global exports
window.FESTIVAL_YOUTUBE_VIDEO_ID = FESTIVAL_YOUTUBE_VIDEO_ID;
window.parseYouTubeId = parseYouTubeId;
window.siteConfig = siteConfig;
