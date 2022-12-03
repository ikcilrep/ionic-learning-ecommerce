import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import * as db from 'src/app/db';
import UserComment from 'src/app/models/user-comment.model';

import { CommentContentComponent } from './comment-content.component';

describe('CommentContentComponent', () => {
  let component: CommentContentComponent;
  let fixture: ComponentFixture<CommentContentComponent>;
  const comment: UserComment = db.comments[0];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommentContentComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentContentComponent);
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
