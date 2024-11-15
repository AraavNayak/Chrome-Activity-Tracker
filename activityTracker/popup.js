document.addEventListener('DOMContentLoaded', function() {
  const logContainer = document.getElementById('logContainer');

  // Fetch the logs from chrome storage
  chrome.storage.local.get('websiteLog', function(data) {
    const websiteLog = data.websiteLog || [];
    
    // If there are no logs, display a message
    if (websiteLog.length === 0) {
      logContainer.textContent = 'No website activity logged yet.';
    } else {
      // Display each log entry
      websiteLog.forEach(log => {
        const logElement = document.createElement('div');
        logElement.classList.add('log-item');
        logElement.textContent = `URL: ${log.url} - Time Spent: ${log.timeSpent} seconds`;
        logContainer.appendChild(logElement);
      });
    }
  });
});
