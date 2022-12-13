import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadComments } from 'src/app/actions/comment.actions';
import ProductComment from 'src/app/models/product-comment.model';
import { selectProductComments } from 'src/app/selectors/comment.selectors';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() productId!: number;
  comments$: Observable<ProductComment[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadComments({ productId: this.productId }));
    this.comments$ = this.store.select(selectProductComments(this.productId));
  }

}
