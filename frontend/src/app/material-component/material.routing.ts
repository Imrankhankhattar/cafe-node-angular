import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AuthService } from '../services/auth.service';
import { RouteGuardService } from '../services/route-gaurd.service';



export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component:ManageCategoryComponent
    }
];
