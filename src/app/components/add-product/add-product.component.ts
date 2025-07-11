import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  successMessage: string= "";
deleteMessage: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

 addProduct(): void {
  if (this.productForm.valid) {
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.successMessage = '✅ Product added successfully!';

        // Optional: wait 2 seconds before navigating
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/products']);
        }, 2000);
      },
      error: (err) => {
        console.error('Add product failed:', err);
      }
    });
  }
}
}
