import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[];
  changeCell: string;
  res: string;

  constructor(private ps: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((product) => {
      this.products = product;
    });
  }

  updateTitle(id: string, txt: string): void {
    this.ps.updateTitle(id, txt);
  }

  updateDescription(id: string, desc: string): void {
    this.ps.updateDescription(id, desc);
  }

  updateQuantity(id: string, quantity: number): void {
    const qty = Number(quantity);
    this.ps.updateQuantity(id, qty);
  }

  updatePrice(id: string, price: number): void {
    const prc = Number(price);
    this.ps.updatePrice(id, prc);
  }

  deleteProduct(id: string): void {
    this.res = this.ps.deleteProduct(id);
  }
}
