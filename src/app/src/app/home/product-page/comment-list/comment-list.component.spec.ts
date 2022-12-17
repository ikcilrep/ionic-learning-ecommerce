import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromComment from 'src/app/reducers/comment.reducer';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  const productId = 0;
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({ initialState: { [fromComment.commentFeatureKey]: fromComment.initialState } })]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.productId = productId;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
