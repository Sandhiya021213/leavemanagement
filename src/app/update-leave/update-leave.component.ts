import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import id from '@angular/common/locales/id';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LeaveService } from '../leave.service';

@Component({
  selector: 'app-update-leave',
  standalone: true,
  imports: [RouterLink,RouterModule,RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './update-leave.component.html',
  styleUrl: './update-leave.component.css',
  providers:[LeaveService]
})
export class UpdateLeaveComponent implements OnInit {

  contactForm!: FormGroup;
  http = inject(HttpClient);
  leaveId: any;
  

  constructor(private fb: FormBuilder,private leaveservice:LeaveService,private route: ActivatedRoute,private router:Router) {
    
  }

  ngOnInit(): void {
    this.leaveId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.contactForm = this.fb.group({
      employee_name:[''],
      email:[''],
      start_date:[''],
      end_date:[''],
      leave_type:[''],
      reason:['']
    })

    this.leaveservice.getLeavesById(this.leaveId).subscribe((response: any) => {
      this.contactForm.patchValue({
        employee_name: response.employee_name,
        email: response.email,
        start_date: response.start_date,
        end_date: response.end_date,
        leave_type: response.leave_type,
        reason: response.reason
      });
      console.log('Leave request get', response);
      
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
    
    // Fetch leave request data here (e.g., from a service)
    // Example:
    // this.leaveService.getLeaveRequest(id).subscribe(data => this.leave = data);
  }

  submit(){
    console.log("leave request updated")
    console.log(this.contactForm.value);
    this.leaveservice.updateLeave(this.leaveId,this.contactForm.value).subscribe((response: any) => {
      console.log('Leave request updated', response);
      window.location.reload();
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
    this.router.navigate(['/leave-list']);
  }
}

