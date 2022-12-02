import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/db';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = products;

  constructor() { }

  ngOnInit() { }

}
