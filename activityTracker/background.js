let currentTabId = null;
let currentTabStartTime = null;
let websiteLog = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  logTimeSpentOnTab(currentTabId);
  currentTabId = activeInfo.tabId;
  currentTabStartTime = Date.now();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === currentTabId) {
    logTimeSpentOnTab(tabId);
    currentTabId = null;
    currentTabStartTime = null;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === "complete") {
    logTimeSpentOnTab(tabId);
    currentTabStartTime = Date.now();
  }
});

function logTimeSpentOnTab(tabId) {
  if (tabId !== null && currentTabStartTime !== null) {
    const timeSpent = (Date.now() - currentTabStartTime) / 1000;
    if (!isNaN(timeSpent) && timeSpent > 0.5) {
      chrome.tabs.get(tabId, (tab) => {
        if (tab && tab.url) {
          try {
            const domain = new URL(tab.url).hostname;
            if (!websiteLog[domain]) {
              websiteLog[domain] = 0;
            }
            websiteLog[domain] += timeSpent;

            fetch('http://localhost:3000/update-log', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ domain, timeSpent }),
            }).catch((error) => console.error('Error sending data to server:', error));
          } catch (error) {
            console.error('Error parsing URL:', error);
          }
        }
      });
    }
    currentTabStartTime = null;
  }
}
