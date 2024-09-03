import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../leave.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-leave',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './create-leave.component.html',
  styleUrl: './create-leave.component.css',
  providers:[LeaveService]
})
export class CreateLeaveComponent implements OnInit {

  
  contactForm!: FormGroup;
  http = inject(HttpClient);

  constructor(private fb: FormBuilder,private leaveservice:LeaveService,private router: Router)
  
  {
    this.contactForm = new FormGroup({
      employee_name: new FormControl(),
      email: new FormControl(),
      start_date: new FormControl(),
      end_date: new FormControl(),
      leave_type: new FormControl(),
      reason: new FormControl()
    })
    
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      employee_name:[''],
      email:[''],
      start_date:[''],
      end_date:[''],
      leave_type:[''],
      reason:['']
    })

  }

  submit(){
    console.log("leave request submitted")
    console.log(this.contactForm.value);
    this.leaveservice.createLeave(this.contactForm.value).subscribe((response: any) => {
      console.log('Leave request submitted', response);
      this.router.navigate(['/leave-list']);
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
  }
}

