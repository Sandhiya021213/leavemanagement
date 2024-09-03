import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../leave.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-leave',
  standalone: true,
  imports: [HttpClientModule,],
  templateUrl: './delete-leave.component.html',
  styleUrl: './delete-leave.component.css',
  providers:[LeaveService]
})
export class DeleteLeaveComponent {
  leaveId!: any;
  http = inject(HttpClient);
  

  constructor(private route: ActivatedRoute, private router:Router,private leaveservice:LeaveService) {}

  ngOnInit(): void {
    // Get the leave ID from the route parameters
    this.leaveId = this.route.snapshot.paramMap.get('id') || '';
  }

  onDelete() {
    // Handle delete logic here
    console.log(`Deleting leave request with ID: ${this.leaveId}`);
    // Redirect to leave list after deletion
    this.leaveservice.deleteLeave(this.leaveId).subscribe((response: any) => {
      window.location.reload();
    }, (error: any) => {
      console.error('Error submitting leave request', error);
    });
    this.router.navigate(['/leave-list']);

  }
}
