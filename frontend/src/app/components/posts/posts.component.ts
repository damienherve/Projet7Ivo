import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/common-types';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[];
  @Input() title!: string;

  constructor() {}

  ngOnInit(): void {}
}
