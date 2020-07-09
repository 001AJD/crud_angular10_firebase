import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  productForm: FormGroup;
  model: Product;

  constructor(private fb: FormBuilder, private ps: ProductService) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.model = {
      title: this.productForm.get('title').value,
      description: this.productForm.get('description').value,
      quantity: Number(this.productForm.get('quantity').value),
      price: Number(this.productForm.get('price').value),
    };
    this.ps.addNewProduct(this.model);
    this.productForm.reset(); // always reset form at the end
  }
}
