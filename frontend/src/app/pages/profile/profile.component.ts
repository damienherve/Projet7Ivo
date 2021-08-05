import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  accountName = 'Wojtek Jakobek';
  counter = 1;
  reactName = 'Jean-Louis';
  reactNameTopic = 'Mon premier message';
  constructor() {}

  ngOnInit(): void {}
}
