import {model, Schema, Document} from 'mongoose';
import {ArticleDocument} from './articleTypes.js';
import ArticleSchema from './articleSchema.js';

const Articles = model<ArticleDocument>('Articles', ArticleSchema);
export default Articles;