import { model } from 'mongoose';
import ArticleSchema from './articleSchema.js';
const Articles = model('Articles', ArticleSchema);
export default Articles;
