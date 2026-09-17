import { Component } from '@angular/core';
import { RecentProductsComponent } from '../../Shared/components/business/recent-item/recent-item.component';
import { CategoriesComponent } from "../categories/categories.component";
import { CategoriesSliderComponent } from "./components/categories/categories-slider.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecentProductsComponent, CategoriesComponent, CategoriesSliderComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
