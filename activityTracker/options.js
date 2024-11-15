document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('websiteLog', (result) => {
    const websiteLog = result.websiteLog || {};
    console.log('Fetched website log:', websiteLog);

    const logContainer = document.getElementById('log');
    logContainer.innerHTML = ''; // Clear any existing content

    if (Object.keys(websiteLog).length === 0) {
      logContainer.textContent = 'No browsing data available yet.';
      return;
    }

    // Display the log data in a readable format
    for (const [website, timeSpent] of Object.entries(websiteLog)) {
      const listItem = document.createElement('div');
      listItem.textContent = `Website: ${website}, Time Spent: ${timeSpent.toFixed(2)} seconds`;
      logContainer.appendChild(listItem);
    }
  });
});
