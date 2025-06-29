import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  successMessage: string='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = idParam;

      this.productService.getProductById(this.productId).subscribe((data: Product) => {
        this.productForm.patchValue(data);
      });
    } else {
      console.error(' No product ID found in route!');
    }
  }

 updateProduct(): void {
  if (this.productForm.valid) {
    const updatedProduct = this.productForm.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.updateProduct(id, updatedProduct).subscribe({
        next: () => {
          this.successMessage = '✅ Product updated successfully!';

          // Optional: wait and then navigate
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
        }
      });
    }
  }
}

}
