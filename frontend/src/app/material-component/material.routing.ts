import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AuthService } from '../services/auth.service';
import { RouteGuardService } from '../services/route-gaurd.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { MaangeOrderComponent } from './maange-order/maange-order.component';



export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component:ManageCategoryComponent
    },
    {
        path: 'product',
        component:ManageProductComponent
    },
    {
        path: 'order',
        component:MaangeOrderComponent
    }
];
