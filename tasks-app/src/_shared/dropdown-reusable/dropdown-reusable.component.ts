import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Dropdown } from '../../_interfaces/dropdown.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-reusable',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dropdown-reusable.component.html',
  styleUrl: './dropdown-reusable.component.css',
})
export class DropdownReusableComponent {
  @Input() options: { id: any; name: string; imageUrl: string }[] = [];
  @Input() selectedValue: any;
  @Output() selectedValueChange = new EventEmitter<any>();
  
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    this.selectedValue = option;
    this.selectedValueChange.emit(option);
    this.isOpen = false; 
  }
}
