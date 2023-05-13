import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLCategories = environment.apiUrl + 'categories';
  headers= new HttpHeaders()
  constructor(private http: HttpClient) {
    this.headers.append('Access-Control-Allow-Headers','*')
    this.headers.append('Access-Control-Allow-Methods','*');
    this.headers.append('Access-Control-Allow-Origin','*')
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories,{headers: this.headers});
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`,{headers: this.headers});
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, category,{headers: this.headers});
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category,{headers: this.headers});
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`,{headers: this.headers});
  }
}
