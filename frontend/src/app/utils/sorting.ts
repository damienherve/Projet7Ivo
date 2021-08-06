import { Post } from '../common-types';

export const sortByCreationDate = (posts: Post[]) =>
  posts.sort((a, b) => {
    const d1 = new Date(a.createdAt);
    const d2 = new Date(b.createdAt);
    return d2.getTime() - d1.getTime();
  });
