import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl =`${environment.apiBaseUrl}/products`;
  //private baseUrl = 'https://inventory-mangement-2.onrender.com/api/products';// 
  // private baseUrl = 'http://localhost:5000/api/products' 



  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
