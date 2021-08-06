import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/common-types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onDelete(userId: string) {
    this.userService.deleteUser(userId);
  }
}
