import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "@/types/Category";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxLength: [50, "Category name cannot exceed 50 characters"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },

    // Self-referencing field for parent-child categories
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    image: {
      type: String, // Thumbnail image URL
    },

    bannerImage: {
      type: String, // Category detail page header banner
    },

    order: {
      type: Number,
      default: 0, // Used to sort categories on the Navbar/UI
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  },
);

// Compound Indexing for fast query execution
CategorySchema.index({ parent: 1, isActive: 1 });

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
