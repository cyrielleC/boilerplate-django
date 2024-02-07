import { Component } from '@angular/core';
import { ApiRequestService } from './service/api-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(apiService: ApiRequestService) {
    apiService.getMenu().subscribe(el => console.log(el));
  }
}
