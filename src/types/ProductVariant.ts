import mongoose, { Document } from "mongoose";

export interface IProductVariant extends Document {
  product: mongoose.Types.ObjectId;

  size: string;
  color: string;

  sku: string;

  stock: number;

  image?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
