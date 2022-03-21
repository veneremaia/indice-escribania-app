import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceFormComponent } from './components/indice-form/indice-form.component';
import {IndiceListComponent} from './components/indice-list/indice-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/indices',
    pathMatch: 'full'
  },{
    path: 'indices',
    component:  IndiceListComponent
  },
  {
    path: 'indices/add',
    component: IndiceFormComponent
  },
  {
    path: 'indices/edit/:id',
    component: IndiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
