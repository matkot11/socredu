import mongoose from "mongoose";

const connection: {
  isConnected?: number;
} = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  mongoose.set("strictQuery", false);
  const db = await mongoose.connect(process.env.DB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
