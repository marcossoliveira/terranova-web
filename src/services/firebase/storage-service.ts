import { storage } from '../../config/firebase/firestore/firestore-config';

export const uploadImage = async (file: File, breadcumb?: string[] | undefined): Promise<string> => {
  const storageRef = storage.ref(breadcumb ? breadcumb.join('/') : 'generic');
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  const fileUrl = await fileRef.getDownloadURL();
  return fileUrl;
};
