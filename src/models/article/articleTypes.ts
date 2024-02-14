import { Document, Model } from "mongoose";

export interface ArticleType {
    title: string;
    image: string;
    description: string;
    date: string;
}

export interface ArticleDocument extends ArticleType, Document {}
export interface ArticleModel extends Model<ArticleDocument> {}