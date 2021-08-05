import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  title: string;
  text: string;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onPost(): void {
    this.postsService.addPost(this.title, this.text);
  }
}
