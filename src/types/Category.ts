import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: mongoose.Types.ObjectId | null;
  image?: string;
  bannerImage?: string;
  order?: number;
  isFeatured?: boolean;
  isActive: boolean;

  // SEO Meta
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  createdAt?: Date;
  updatedAt?: Date;
}
