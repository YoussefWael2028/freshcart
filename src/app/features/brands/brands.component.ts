import { Component, OnInit } from '@angular/core';
import { Brand } from '../../brands';
import { BrandsService } from '../../Shared/services/brands/brands.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = []
  isLoading = true

  constructor(private brandsService: BrandsService) {}

  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
      }
    });
}
}
