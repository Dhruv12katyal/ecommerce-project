import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../services/data-type';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders: order[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.productService.getOrders().subscribe((orders) => {
        debugger;
        this.orders = orders;
      });
  }
}
