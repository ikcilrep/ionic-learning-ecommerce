import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPagePageRoutingModule } from './product-page-routing.module';

import { ProductPagePage } from './product-page.page';
import { CommentFormComponent } from 'src/app/src/app/home/product-page/comment-form/comment-form.component';
import { CommentSectionComponent } from 'src/app/src/app/home/product-page/comment-section/comment-section.component';
import { CommentContentComponent } from 'src/app/src/app/home/product-page/comment-content/comment-content.component';

@NgModule({
  declarations: [ProductPagePage, CommentFormComponent, CommentSectionComponent, CommentContentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPagePageRoutingModule,
  ]
})
export class ProductPagePageModule { }
