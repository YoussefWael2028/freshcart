import { FlowbiteService } from './Shared/services/flowbite/flowbite.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Shared/layout/navbar/navbar.component";
import { FooterComponent } from './Shared/layout/footer/footer.component';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Assignment2';
  constructor(private _flowbiteService:FlowbiteService) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
    
      console.log('Flowbite loaded', flowbite);
    });
  }
}
