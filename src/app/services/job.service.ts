import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, Category, Login } from '../models/job.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://melisaebanks-001-site1.htempurl.com/api';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job`).pipe(
      map(response => response.map(job => ({
        id: job.id,
        categoryId: job.categoryId, // Temporary map to categoryId
        title: job.name,
        description: job.description,
        categoryType: job.categoryName
      })))
    );
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<any>(`${this.apiUrl}/job/${id}`).pipe(
      map(job => ({
        id: job.id,
        categoryId: job.categoryId, // Temporary map to categoryId
        title: job.name,
        description: job.description,
        categoryType: job.categoryName
      }))
    );
  }

  addJob(job: Job): Observable<Job> {
    const requestBody = {
      categoryId: job.categoryId,
      name: job.title,
      description: job.description
    };
    return this.http.post<any>(`${this.apiUrl}/job`, requestBody).pipe(
      map(response => ({
        id: response.id,
        categoryId: response.categoryId,
        title: response.name,
        description: response.description,
        categoryType: response.categoryName
      }))
    );
  }

  updateJob(job: Job): Observable<Job> {
    const requestBody = {
      id: job.id,
      categoryId: job.categoryId,
      name: job.title,
      description: job.description
    };
    return this.http.put<any>(`${this.apiUrl}/job`, requestBody).pipe(
      map(response => ({
        id: response.id,
        categoryId: response.categoryId,
        title: response.name,
        description: response.description,
        categoryType: response.categoryName
      }))
    );
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/job/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/jobcategory`);
  }

}
