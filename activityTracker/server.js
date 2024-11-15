const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const filePath = path.join(__dirname, 'browsing_data.csv');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Domain,Time Spent (seconds)\n');
}

app.post('/update-log', (req, res) => {
  const { domain, timeSpent } = req.body;

  if (domain && timeSpent) {
    const logEntry = `${domain},${timeSpent.toFixed(2)}\n`;
    fs.appendFile(filePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to CSV file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Data logged successfully');
      }
    });
  } else {
    res.status(400).send('Invalid data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
