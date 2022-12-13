import { Component, Input, OnInit } from '@angular/core';
import * as db from 'src/app/db';
import ProductComment from 'src/app/models/product-comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() productId!: number;
  comments: ProductComment[];

  constructor() { }

  ngOnInit() {
    this.comments = db.comments.filter((comment) => comment.productId === this.productId);
    this.comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

}
