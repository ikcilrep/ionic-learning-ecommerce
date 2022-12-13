import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import * as db from 'src/app/db';
import ProductComment from 'src/app/models/product-comment.model';

import { CommentComponent } from './comment.component';

describe('CommentContentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const comment: ProductComment = db.comments[0];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = db.comments[0];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find a user with id given in comment', () => {
    expect(component.user.id).toBe(comment.userId);
  });
});
