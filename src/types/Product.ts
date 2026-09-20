import mongoose from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  basePrice: number;
  discountPrice: number;
  productVariants: mongoose.Types.ObjectId;
  gender: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}
