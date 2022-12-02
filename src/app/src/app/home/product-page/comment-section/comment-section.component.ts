import { Component, Input, OnInit } from '@angular/core';
import * as db from 'src/app/db';
import UserComment from 'src/app/models/user-comment.model';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() productId!: number;
  comments: UserComment[];

  constructor() { }

  ngOnInit() {
    this.comments = db.comments.filter((comment) => comment.productId === this.productId);
    this.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

}
