import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(" MONGODB_URI Missing");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("DB connection successful");

    return mongoose.connection;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};
