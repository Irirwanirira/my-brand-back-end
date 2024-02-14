import { model } from 'mongoose';
import ArticleSchema from './article_schema';
const Articles = model('Articles', ArticleSchema);
export default Articles;
