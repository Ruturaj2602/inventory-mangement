import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})



export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id?: string): void {
    if (id === undefined) return;
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  sortBy(column: number): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  filteredProducts(): Product[] {
    let filtered = this.products.filter((product) =>
      (product.name + product.description).toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof Product];
        const bValue = b[this.sortColumn as keyof Product];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return this.sortDirection === 'asc'
          ? ('' + aValue).localeCompare('' + bValue)
          : ('' + bValue).localeCompare('' + aValue);
      });
    }

    // 🆕 Pagination logic
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  
  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
}
