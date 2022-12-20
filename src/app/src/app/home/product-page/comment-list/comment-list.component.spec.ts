import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/reducers';
import * as fromComment from 'src/app/reducers/comment.reducer';
import * as CommentActions from 'src/app/actions/comment.actions';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  const productId = 0;
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let mockStore: MockStore<State>;
  let mockStoreDispatchSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({ initialState: { [fromComment.commentFeatureKey]: fromComment.initialState } })]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore<State>);
    mockStoreDispatchSpy = spyOn(mockStore, 'dispatch');

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.productId = productId;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comments', () => {
    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(CommentActions.loadComments({ productId }));
  });
});
