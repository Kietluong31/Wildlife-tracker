const fs = require("fs");
const path = require("path");
async function loadSightings() {
  try {
    const filePath = path.join(__dirname, "../data/sightings.json");
    const dataString = await fs.promises.readFile(filePath, "utf-8");
    const dataObj = JSON.parse(dataString);
    return dataObj.sightings; 
  } catch (err) {
    console.error("Error loading sightings:", err);
    throw new Error("Unable to load sightings data");
  }
}
module.exports = { loadSightings };
