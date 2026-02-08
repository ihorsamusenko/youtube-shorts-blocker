// === YouTube Shorts Blocker — MutationObserver layer ===
// Catches dynamically loaded Shorts elements that YouTube's SPA injects after
// the initial CSS rules have been applied.

(function () {
  "use strict";

  const SELECTORS = [
    // Shorts shelves (homepage, subscriptions, search)
    "ytd-reel-shelf-renderer",
    // Rich shelf tagged as Shorts
    'ytd-rich-shelf-renderer[is-shorts]',
    // Sidebar guide entry
    'ytd-guide-entry-renderer:has(a[title="Shorts"])',
    'ytd-guide-entry-renderer:has(a[href="/shorts"])',
    // Mini sidebar
    'ytd-mini-guide-entry-renderer:has(a[title="Shorts"])',
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts"])',
    // Channel page Shorts tab
    'yt-tab-shape[tab-title="Shorts"]',
    'tp-yt-paper-tab[aria-label="Shorts"]',
    '[tab-identifier="shorts"]',
    // Navigation chips
    'yt-chip-cloud-chip-renderer:has(yt-formatted-string[title="Shorts"])',
  ];

  const COMBINED = SELECTORS.join(", ");

  function hideElement(el) {
    el.style.setProperty("display", "none", "important");
  }

  function sweepNode(root) {
    if (!(root instanceof HTMLElement)) return;

    // Check the node itself
    if (root.matches && root.matches(COMBINED)) {
      hideElement(root);
      return; // no need to check children
    }

    // Check descendants
    root.querySelectorAll(COMBINED).forEach(hideElement);
  }

  // Initial sweep once the DOM is ready
  sweepNode(document.body);

  // Observe future mutations (YouTube SPA navigation)
  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        sweepNode(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
