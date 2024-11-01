import { getData, getDataById } from '../../services/firebase/firestore-service.ts';

export const getArticle = async (docId: string) => {
  return await getDataById('article', docId);
};

export const getAllArticle = async () => {
  return await getData('article');
};
