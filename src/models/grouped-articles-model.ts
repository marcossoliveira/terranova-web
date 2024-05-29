import { ArticleCategoryModel } from './article-category-model.ts';
import { ArticleModel } from './article-model.ts';

export interface GroupedArticlesModel {
  articleCategory: ArticleCategoryModel;
  articles: ArticleModel[];
}
