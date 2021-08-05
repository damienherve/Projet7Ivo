import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  topicTitle = 'Mon premier message';
  topicContent = 'Mon message de ouf';
  topicAuthor = 'Wojtek';
  accountName = 'Wojtek Jakobek';
  counter = 1;
  reactName = 'Jean-Louis';
  reactNameTopic = 'Mon premier message';

  constructor() {}

  ngOnInit(): void {}
}
