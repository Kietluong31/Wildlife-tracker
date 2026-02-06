/********************************************************************************
* WEB322 - Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Luong Tuan Kiet
* Student ID: YOUR ID
* Date: 2026-02-06
*
********************************************************************************/
/********************************************************************************
* WEB322 - Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Luong Tuan Kiet  Student ID: 142739242  Date: 2026-02-06
*
********************************************************************************/
const { loadSightings } = require("./utils/dataLoader");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get("/api/sightings", async (req, res) => {
  try {
    const data = await loadSightings();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/verified", async (req, res) => {
  try {
    const data = await loadSightings();
    const verifiedSightings = data.filter(s => s.verified === true);
    res.json(verifiedSightings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/species-list", async (req, res) => {
  try {
    const data = await loadSightings();
    const speciesList = data.map(s => s.species);
    const uniqueSpecies = [...new Set(speciesList)];
    res.json(uniqueSpecies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/habitat/forest", async (req, res) => {
  try {
    const data = await loadSightings();
    const forestSightings = data.filter(s => s.habitat === "forest");
    res.json({
      habitat: "forest",
      sightings: forestSightings,
      count: forestSightings.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/search/eagle", async (req, res) => {
  try {
    const data = await loadSightings();
    const result = data.find(s => s.species.toLowerCase().includes("eagle"));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/find-index/moose", async (req, res) => {
  try {
    const data = await loadSightings();
    const index = data.findIndex(s => s.species === "Moose");
    res.json({
      index: index,
      sighting: data[index]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/sightings/recent", async (req, res) => {
  try {
    const data = await loadSightings();
    const recent3 = data.slice(-3).map(s => ({
      id: s.id,
      species: s.species,
      location: s.location,
      date: s.date,
      time: s.time,
      verified: s.verified
    }));
    res.json(recent3);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
