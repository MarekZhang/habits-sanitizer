/* eslint-disable no-undef */
let queryOptions = { active: true, lastFocusedWindow: true };

chrome.tabs.query(queryOptions, (tabs) => {
  const domain = new URL(tabs[0].url).hostname;
  chrome.storage.sync.set({ currentTabDomain: domain });
});

export async function blockSite(domain) {
  alert(domain);
}
