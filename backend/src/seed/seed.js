import { ConnectDB } from "../configs/db.js";
import Property from "../models/property.model.js";
import { properties } from "./data/properties.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const seedData = async () => {
  try {
    await ConnectDB(); // connect to DB

    for (const prop of properties) {
      // Check if property already exists by title + location
      const exists = await Property.findOne({
        title: prop.title,
        location: prop.location,
      });
      if (!exists) {
        await Property.create(prop);
        console.log(`Added: ${prop.title}`);
      }
    }

    console.log("Seeding completed");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
