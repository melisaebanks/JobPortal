import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job, Category } from 'src/app/models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  log: boolean = true;
 joblist : Job[] = [];


  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.loadJobs();
    this.loadCategories();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(jobs => {this.jobs = jobs; this.joblist = jobs;});
  }

  loadCategories(): void {
    this.jobService.getCategories().subscribe(categories => this.categories = categories);
  }

  filterJobs(): void {
    if (this.selectedCategory) {
      this.jobs = this.joblist.filter(job => job.categoryType === this.selectedCategory);
    } else {
      this.loadJobs();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
