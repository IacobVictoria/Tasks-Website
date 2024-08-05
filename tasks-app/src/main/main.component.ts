import { Component } from '@angular/core';
import { InfoCompany } from '../_interfaces/infoCompany.interface';
import { companyHistory } from '../dummy-info';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  infos: InfoCompany[] = companyHistory;
}
