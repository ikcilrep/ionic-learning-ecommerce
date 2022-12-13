import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import ProductComment from 'src/app/models/product-comment.model';
import { selectUserId } from 'src/app/selectors/login.selectors';
import * as CommentActions from 'src/app/actions/comment.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() productId!: number;

  commentText = '';
  userId$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.userId$ = this.store.select(selectUserId);
  }

  postComment() {

    if (this.commentText !== '') {
      this.userId$.subscribe(userId => {
        const comment = { productId: this.productId, userId, text: this.commentText, id: undefined, createdAt: undefined };
        this.store.dispatch(CommentActions.postComment({ comment }));
        this.commentText = '';
      });
    }
  }
}
