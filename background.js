chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({min_volumne: 0});
    chrome.storage.sync.set({max_volumne: 100});
  });