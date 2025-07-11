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
  sortColumn: keyof Product = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  successMessage: string = '';

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
    if (!id) return;

    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.successMessage = '🗑️ Product deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 2000);
      },
      error: (err) => {
        console.error('❌ Failed to delete product:', err);
      }
    });
  }

  sortBy(column: keyof Product): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get filteredAndSortedProducts(): Product[] {
    let filtered = this.products.filter((product) =>
      (product.name + (product.description || '')).toLowerCase().includes(this.searchText.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return this.sortDirection === 'asc'
        ? ('' + aValue).localeCompare('' + bValue)
        : ('' + bValue).localeCompare('' + aValue);
    });

    return filtered;
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAndSortedProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAndSortedProducts.length / this.itemsPerPage);
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
