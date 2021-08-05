import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/common-types';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Array<Post> = [];

  selectedPost?: Post;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    // On initialise la liste en appelant une première fois la MAJ
    this.postsService.loadPosts();
  }

  onSelect(post: Post) {
    this.selectedPost = post;
  }

  onClap(post: Post) {
    this.postsService.clap(post.id);
  }
}
