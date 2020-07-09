import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';

const routes: Routes = [
  {path: 'new-product', component: AddNewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
