import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';
import { LineItem } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  // NOTE: you are free to modify this component

  private router = inject(Router)
  private store = inject(CartStore)

  itemCount!: number
  cartSlice!: LineItem[];

  ngOnInit(): void {
    this.getCartItemCount()
  }

  checkout(): void {
    if (this.itemCount === 0){
      alert('Cart is empty!')
    }
    
    this.router.navigate([ '/checkout' ])
  }

  getCartItemCount() {
    this.store.cart$.subscribe(
      (products) => {
        this.itemCount = products.length;
        this.cartSlice = products;
        console.log(this.cartSlice);
      }
    )
  }

  isCartEmpty() {
    return this.itemCount === 0;
  }
}
