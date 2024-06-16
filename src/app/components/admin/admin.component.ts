import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job, Category } from 'src/app/models/job.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  jobs: Job[] = [];
  categories: Category[] = [];
  isEditMode: boolean = false;
  jobForm: FormGroup;
  errorMessage: string = '';

  constructor(private jobService: JobService, private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      id:[0],
      title:['', [Validators.required, Validators.minLength(4)]],
      description:['', [Validators.required, Validators.minLength(10)]],
      categoryId:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadCategories();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(jobs => this.jobs = jobs);
  }

  loadCategories(): void {
    this.jobService.getCategories().subscribe(categories => this.categories = categories);
  }

  saveJob(): void {
    if(this.jobForm.valid){
      const job = this.jobForm.value;
    if (this.isEditMode) {
      this.jobService.updateJob(job).subscribe(() => this.loadJobs());
    } else {
      this.jobService.addJob(job).subscribe(() => this.loadJobs());
    }
    this.resetForm();
  }
  else
  {
    this.errorMessage = "Please fill out form correctly";
  }
}

  editJob(job: Job): void {
    this.jobForm.patchValue(job);
    this.isEditMode = true;
  }

  deleteJob(id: number): void {
    if(confirm("Are you sure you want to delete this item?  This cannot be undone."))
      this.jobService.deleteJob(id).subscribe(() => this.loadJobs());
  }

  resetForm(): void {
    this.jobForm.reset({ id: 0, categoryType: '', title: '', description: '' });
    this.isEditMode = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
