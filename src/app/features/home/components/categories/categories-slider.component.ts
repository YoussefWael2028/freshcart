import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../../../Shared/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../Shared/services/category';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css']
})
export class CategoriesSliderComponent implements OnInit {
  Categories: Category[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    margin: 10,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  };

  private _categoriesService = inject(CategoriesService);

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}
