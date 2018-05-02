import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Map-App';

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

}
