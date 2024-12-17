import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// Initialize Express
const app = express();
const PORT = 3000;

// Allow JSON and URL encoded requests
app.use(express.json());

// Fix for __dirname in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set CORS headers to allow requests from frontend
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend origin

// File path to the JSON data
const dataFilePath = path.join(__dirname, 'data/data.json');

// Utility to read the JSON file
const readData = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// GET endpoint to fetch all chess masters
app.get('/api/chessMasters', (req, res) => {
  const data = readData();
  res.json(data);
});

// DELETE endpoint to delete a chess master by name
app.delete('/api/chessMasters/:name', (req, res) => {
  const { name } = req.params;
  let data = readData();

  const filteredData = data.filter((chessMaster) => chessMaster.name !== name);

  if (data.length === filteredData.length) {
    return res.status(404).json({ message: "Chess master not found." });
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(filteredData, null, 2));
  res.status(200).json({ message: "Chess master deleted successfully." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
