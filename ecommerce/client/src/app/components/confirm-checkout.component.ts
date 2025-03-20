import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {
  // TODO Task 3
  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)
  private productSvc = inject(ProductService);
  private router = inject(Router);
  items!: LineItem[];
  totalCost: number = 0;
  cart : Cart = {
    lineItems : []
  }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.createForm()
    this.checkCart();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('',[Validators.required]),
      address: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }

  checkCart(): void {
    this.cartStore.cart$.subscribe(
      (data) => {
        this.items = data;
        this.cart.lineItems = data;
        

        data.forEach(
          (item) => {
          this.totalCost += item.price*item.quantity; 
        });

      }
    )
  }

  placeOrder() {
    const order : Order = this.form.value;
    order.cart = this.cart;
    console.info('>>>process form: ', order);

    this.productSvc.checkout(order).subscribe({
     next: (data:any) => {
        alert(data.response);
        this.cartStore.resetCart();
        this.router.navigate(['/']);
      },
      error: (error:any) => {
        alert(error);
      },
      complete: () =>console.log('Order posted')
    })

  }

}
