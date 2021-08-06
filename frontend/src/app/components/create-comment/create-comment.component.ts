import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  title: string;
  text: string;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onComment(): void {
    // this.postsService.addComment(this.title, this.text);
  }
}
