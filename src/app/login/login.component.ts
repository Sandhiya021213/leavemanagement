import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeaveService } from '../leave.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule,RouterOutlet,CommonModule,DashboardComponent,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LeaveService]
})
export class LoginComponent {
  http = inject(HttpClient);
submit() {
  if (this.username == "" && this.password == "") {
    this.router.navigate(['/dashboard']);
  } else {
    alert('Please enter a valid username and password.');
  }
}

  username: string = '';
  password: string = '';

  constructor(private router: Router,private leaveservice:LeaveService) {}

  
}




