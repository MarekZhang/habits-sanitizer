/* eslint-disable no-undef */
import axios from "axios";
let queryOptions = { active: true, lastFocusedWindow: true };

chrome.tabs.query(queryOptions, (tabs) => {
  const domain = new URL(tabs[0].url).hostname;
  chrome.storage.sync.set({ currentTabDomain: domain });
});

export async function blockSite(domain) {
  console.log("domain is", domain);
  chrome.storage.sync.get(["blockedDomains"], (result) => {
    console.log("result is", result);
    let domains = result.blockedDomains;
    if (!domains) domains = [];

    let alreadyHasDomain = false;
    for (let d of domains) {
      if (d.includes(domain)) {
        alreadyHasDomain = true;
        break;
      }
    }
    !alreadyHasDomain && domains.push(domain);

    chrome.storage.sync.set({ blockedDomains: domains });
  });
}

export async function unBlockSite(domain) {
  console.log("unblock");
}

export async function clearStorage() {
  chrome.storage.sync.set({ blockedDomains: [] });
}
