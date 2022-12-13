import { Component, Input, OnInit } from '@angular/core';
import ProductComment from 'src/app/models/product-comment.model';
import User from 'src/app/models/user.model';
import * as db from 'src/app/db';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: ProductComment;
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = db.users.find((user) => user.id === this.comment.userId);
  }

}
