import { model } from 'mongoose';
import ArticleSchema from './article.schema';
const Articles = model('Articles', ArticleSchema);
export default Articles;
