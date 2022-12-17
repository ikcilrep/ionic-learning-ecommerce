import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/reducers';
import { selectUserId } from 'src/app/selectors/login.selectors';

import * as CommentActions from 'src/app/actions/comment.actions';
import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let mockStore: MockStore<State>;
  const userId = 0;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        provideMockStore({ selectors: [{ selector: selectUserId, value: userId }] }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.inject(MockStore<State>);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('postComment', () => {
    it('should dispatch postComment, if commentText is not empty', () => {
      spyOn(mockStore, 'dispatch');
      const commentText = 'Some comment text';
      const productId = 0;
      component.commentText = commentText;
      component.productId = productId;
      component.postComment();
      const comment = { id: undefined, createdAt: undefined, text: commentText, productId, userId: 0 };
      expect(mockStore.dispatch).toHaveBeenCalledOnceWith(CommentActions.postComment({ comment }));
    });
  });
});
