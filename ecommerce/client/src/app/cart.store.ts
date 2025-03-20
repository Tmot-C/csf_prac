
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { ComponentStore } from "@ngrx/component-store";

export interface CartState {
    cartSlice: LineItem[];  
}

// const INIT_STORE: Cart = {
//     lineItems: []
// }

@Injectable()

export class CartStore extends ComponentStore<CartState> {
    constructor() {
        super({cartSlice: []});
    }

    //selector
    readonly cart$ = this.select(state => state.cartSlice);

    // Updaters
    readonly addToCartStore = this.updater((state, lineItem: LineItem) => ({
        ...state,
        cartSlice: [...state.cartSlice, lineItem]
    }));

    readonly resetCart = this.updater(() => ({cartSlice: []}));

    // readonly resetCart = this.updater(function () {
    //     return {
    //         cartSlice: []
    //     };
    // });
    
}

