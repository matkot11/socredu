import mongoose from "mongoose";

const connection: {
  isConnected?: number;
} = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DB_URI);
  mongoose.set("strictQuery", false);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
