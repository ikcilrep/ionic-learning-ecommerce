import { Component, OnInit } from '@angular/core';
import { Product, products } from 'src/db';

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