/* eslint-disable no-undef */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.sync.get(["blockedDomains"], (result) => {
    const blockedDomains = result.blockedDomains;
    console.log(blockedDomains);
    if (!blockedDomains) return;
    for (let domain of blockedDomains) {
      if (tab.url.includes(domain)) {
        chrome.tabs.update({
          url: `chrome-extension://${chrome.runtime.id}/block.html`,
        });
      }
    }
  });
});
