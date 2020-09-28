import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AppBlankComponent } from './app-blank/app-blank.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';


export const OthersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'blank',
      component: AppBlankComponent,
      data: { title: 'Blank', breadcrumb: 'Blank' }
    },
    {
      path: 'khachhang',
      component: CustomerComponent,
      data: { title: 'Khách Hàng', breadcrumb: 'Khách Hàng' },
      children:[
        {
          path: '', component: CustomerListComponent,
          data: { title: 'Edit', breadcrumb: 'Edit' }
        },
        {
        path: ':id/edit', component: CustomerEditComponent,
        data: { title: 'Edit', breadcrumb: 'Edit' }
        },
        {
          path: 'add', component: CustomerAddComponent,
          data: { title: 'Add', breadcrumb: 'Add' }
        }
      ]
    },
    {
      path: 'taikhoan',
      component: AccountComponent,
      data: { title: 'Tài Khoản', breadcrumb: 'Tài Khoản' }
    }
  ]
  }
];