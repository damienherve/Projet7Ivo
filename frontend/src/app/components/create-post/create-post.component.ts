import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() isComment: boolean = false;
  @Input() postId?: string;
  @Input() containerTitle: string;

  title: string;
  text: string;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onPost(): void {
    if (this.isComment) {
      // Add a comment
      this.postId &&
        this.postsService.addComment(this.postId, this.title, this.text);
    } else {
      this.postsService.addPost(this.title, this.text);
    }
  }
}
