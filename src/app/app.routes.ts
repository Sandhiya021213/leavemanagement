import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateLeaveComponent } from './create-leave/create-leave.component';
import { UpdateLeaveComponent } from './update-leave/update-leave.component';
import { DeleteLeaveComponent } from './delete-leave/delete-leave.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    { path: 'home',
        loadComponent:() => 
            import('./home/home.component').then((c) => c.HomeComponent)
     },
    {path:'login',component:LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'create-leave', component: CreateLeaveComponent },
    { path: 'update-leave/:id', component: UpdateLeaveComponent },
    { path: 'delete-leave/:id', component: DeleteLeaveComponent },
    { path: 'leave-list', component: LeaveListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes),ReactiveFormsModule,],
    exports: [RouterModule,]
  })
  export class AppRoutingModule { }

  