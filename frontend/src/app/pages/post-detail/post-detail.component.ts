import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/common-types';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  @Input() post!: Post;
  postListTitle = 'Les derniers commentaires';
  createPostTitle = 'Ajoutez un commentaire';
  isComment = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postsService
        .getPostDetail()
        .subscribe((post: Post) => (this.post = post));
      this.postsService.loadPost(params.id);
    });
  }
}
