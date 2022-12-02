import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { products } from 'src/app/db';
import { State } from 'src/app/reducers';
import * as fromCart from 'src/app/selectors/cart.selectors';
import * as CartActions from 'src/app/actions/cart.actions';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {
  product: Product;
  numberOfItems$: Observable<number>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<State>) {
    const productId = Number.parseInt(this.route.snapshot.params.id, 10);
    this.product = products.find((product) => product.id === productId);
  }

  ngOnInit() {
    this.numberOfItems$ = this.store.select(fromCart.selectNumberOfItems);
  }

  addToCart() {
    this.store.dispatch(CartActions.addProductToCart(this.product));
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

}
