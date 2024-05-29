import { getData } from '../../services/firestore-service.ts';

export const getAllArticleCategory = async () => {
  return await getData('article-category');
};
