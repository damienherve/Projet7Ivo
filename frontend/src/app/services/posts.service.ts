import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from '../common-types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Subject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.posts.asObservable();
  }

  loadPosts() {
    console.log('RELOADING posts');
    this.http
      .get<Post[]>('http://localhost:8080/api/posts')
      .subscribe((posts) => this.posts.next(posts));
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

  clap(postId: string) {
    return this.http
      .post(`http://localhost:8080/api/post/${postId}/clap`, undefined)
      .subscribe(() => {
        this.loadPosts();
      });
  }
}
