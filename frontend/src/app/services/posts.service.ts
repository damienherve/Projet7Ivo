import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from '../common-types';
import { sortByCreationDate } from '../utils/sorting';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Subject<Post[]> = new BehaviorSubject<Post[]>([]);
  private postDetail: Subject<Post> = new BehaviorSubject<Post>(undefined);

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.posts.asObservable();
  }

  getPostDetail() {
    return this.postDetail.asObservable();
  }

  loadPost(postId: string) {
    console.log(`RELOADING Post ${postId}`);
    this.http
      .get<Post>(`http://localhost:8080/api/post/${postId}`)
      .subscribe((post) => {
        this.postDetail.next({
          ...post,
          comments: sortByCreationDate(post.comments),
        });
      });
  }

  loadPosts() {
    console.log('RELOADING posts');
    this.http
      .get<Post[]>('http://localhost:8080/api/posts')
      .subscribe((posts) => {
        this.posts.next(sortByCreationDate(posts));
      });
  }

  addPost(title: string, text: string) {
    this.http
      .post('http://localhost:8080/api/post', {
        title,
        text,
      })
      .subscribe(() => {
        this.loadPosts();
      });
  }

  addComment(postId: string, title: string, text: string) {
    this.http
      .post(`http://localhost:8080/api/post/${postId}/comment`, {
        title,
        text,
      })
      .subscribe(() => {
        this.loadPost(postId);
      });
  }

  clap(post: Post) {
    return this.http.post(
      `http://localhost:8080/api/post/${post.id}/clap`,
      undefined
    );
  }
}
