import { Component, Input, OnInit } from '@angular/core';
import UserComment from 'src/app/models/user-comment.model';
import User from 'src/app/models/user.model';
import * as db from 'src/app/db';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.scss'],
})
export class CommentContentComponent implements OnInit {
  @Input() comment!: UserComment;
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = db.users[this.comment.userId];
  }

}
