import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Observable<Product[]>;
  productDoc: DocumentReference;
  model: Product;

  constructor(private af: AngularFirestore) {}

  getAllProducts(): Observable<Product[]> {
    this.products = this.af
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            {
              const data = a.payload.doc.data() as Product;
              return {
                id: a.payload.doc.id,
                title: data.title,
                description: data.description,
                quantity: data.quantity,
                price: data.price,
              };
            }
          })
        )
      );
    return this.products;
  }

  updateTitle(id: string, value: string): void {
    this.productDoc = this.af.collection('products').doc(id).ref;
    this.productDoc.update({ title: value });
  }

  updateDescription(id: string, desc: string): void {
    this.productDoc = this.af.collection('products').doc(id).ref;
    this.productDoc.update({ description: desc });
  }

  updateQuantity(id: string, qty: number): void {
    this.productDoc = this.af.collection('products').doc(id).ref;
    this.productDoc.update({ quantity: qty });
  }

  updatePrice(id: string, prc: number): void {
    this.model = {
      price: prc as number
    };
    this.productDoc = this.af.collection('products').doc(id).ref;
    this.productDoc.update(this.model);
  }

  deleteProduct(id: string): string {
    let errStr = '';
    this.af
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        errStr = 'Product Removed';
      })
      .catch((error) => {
        console.log('error deleting product {}', error);
        errStr = 'error deleting product {}' + error;
      });
    return errStr;
  }

  addNewProduct(data: {}): any {

    return this.af
      .collection('products')
      .add(data)
      .then(
        (docRef) => {
          console.log(`document reference id ${docRef.id}`);
        },
        () => {}
      )
      .catch((error) => {});
  }
}
