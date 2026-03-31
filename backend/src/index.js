import dotenv from "dotenv";
import app from "./app.js";
import { ConnectDB } from "./configs/db.js";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  //Connect to DB
  await ConnectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
