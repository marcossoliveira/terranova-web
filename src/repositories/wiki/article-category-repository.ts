import { getData } from '../../services/firebase/firestore-service.ts';

export const getAllArticleCategory = async () => {
  return await getData('article-category');
};
