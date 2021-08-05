import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  accountName = 'Wojtek Jakobek';
  counter = 1;
  reactName = 'Jean-Louis';
  reactNameTopic = 'Mon premier message';
  topicTitle = 'Mon premier message';
  topicContent = 'Mon contenu de ouf';
  commentary = '';
  commentaryAuthor = 'John Doe';
  commentaryContent = 'Ton message est ouf mec';

  constructor() {}

  ngOnInit(): void {}
}
