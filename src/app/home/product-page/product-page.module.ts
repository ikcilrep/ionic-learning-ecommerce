import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPagePageRoutingModule } from './product-page-routing.module';

import { ProductPagePage } from './product-page.page';
import { CommentFormComponent } from 'src/app/src/app/home/product-page/comment-form/comment-form.component';
import { CommentListComponent } from 'src/app/src/app/home/product-page/comment-list/comment-list.component';
import { CommentComponent } from 'src/app/src/app/home/product-page/comment/comment.component';

@NgModule({
  declarations: [ProductPagePage, CommentFormComponent, CommentListComponent, CommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPagePageRoutingModule,
  ]
})
export class ProductPagePageModule { }
