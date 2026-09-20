import mongoose, { Schema, Model } from "mongoose";
import { IProductVariant } from "@/types/ProductVariant";

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate combinations
ProductVariantSchema.index({ product: 1, size: 1, color: 1 }, { unique: true });

const ProductVariant: Model<IProductVariant> =
  mongoose.models.ProductVariant ||
  mongoose.model<IProductVariant>("ProductVariant", ProductVariantSchema);

export default ProductVariant;
