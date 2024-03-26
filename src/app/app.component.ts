import { Component } from '@angular/core';
import { FetchDetailsService } from './fetch-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ngxs-demo';
  result: any;
    
  
  constructor() {
    
  }

  ngOnInit(): void {
    
}
 
}
