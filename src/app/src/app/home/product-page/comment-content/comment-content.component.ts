import { Component, Input, OnInit } from '@angular/core';
import ProductComment from 'src/app/models/product-comment.model';
import User from 'src/app/models/user.model';
import * as db from 'src/app/db';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.scss'],
})
export class CommentContentComponent implements OnInit {
  @Input() comment!: ProductComment;
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = db.users.find((user) => user.id === this.comment.userId);
  }

}
