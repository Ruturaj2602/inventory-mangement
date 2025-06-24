import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://inventory-mangement-2.onrender.com/api/products'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
