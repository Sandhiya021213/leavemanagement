import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet,Router } from '@angular/router';
import { LeaveService } from '../leave.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [RouterModule,RouterOutlet,RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './leave-list.component.html',
  styleUrl: './leave-list.component.css',
  providers:[LeaveService]
})
export class LeaveListComponent implements OnInit {
  leaves:any;
  http = inject(HttpClient);

  constructor(private leaveservice:LeaveService,private router: Router){}
  eventService: any;
  eventData: any;


  updateLeave(id: number) {
    console.log(`Update leave with ID: ${id}`);
  
    
    this.router.navigate(['/update-leave',id]);

  }

  deleteLeave(id: number) {
    console.log(`Delete leave with ID: ${id}`);
    this.router.navigate(['/delete-leave',id]);

  }

  sendLeaveEmail(id: number, recipientEmail: string) {
    alert(recipientEmail)
    console.log(`Send leave details of ID: ${id} to ${recipientEmail}`);
    this.leaveservice.sendLeaveEmail(id,recipientEmail).subscribe((response: any) => {
      this.leaves = response;
      console.log('response', response);
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
  }
  
  

  ngOnInit() {
    // // Subscribe to the event observable
    // this.eventService.eventObservable$.subscribe((data: any) => {
    //   console.log('Event data received in another component:', data);
    //   this.eventData = data;
    //   // Handle the event data as needed
    // });

    this.leaveservice.getLeaves().subscribe((response: any) => {
      this.leaves = response;
      console.log('response', response);
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
  }
}