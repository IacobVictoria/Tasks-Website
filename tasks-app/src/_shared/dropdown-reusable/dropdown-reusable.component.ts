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


@Component({
  selector: 'app-dropdown-reusable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-reusable.component.html',
  styleUrl: './dropdown-reusable.component.css',
})
export class DropdownReusableComponent implements OnInit, OnChanges {
  @Input() config: Dropdown= {
    items: [],
    valueField: '',
    labelField: '',
    placeholder: '',
    heading: ''
  };
  // input - ce primesc de la componenta parinte
  @Output() selectionChanged = new EventEmitter<any>();
  dropDownList: any[] = [];
  selectedValue: any = null;
  valueField: string = '';
  labelField: string = '';
  placeholder: string = 'Select an option';
  heading: string = '';
  isOpen: boolean = false;

  ngOnInit(): void {
    this.dropDownList = this.config.items || [];
    this.valueField = this.config.valueField;
    this.labelField = this.config.labelField;
    this.placeholder = this.config.placeholder || this.placeholder;
    this.heading = this.config.heading || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.ngOnInit(); // Re-initialize if config changes
    }
  }

  onSelect(event: any): void{
    const selectedValue = this.dropDownList.find(item=> item[this.valueField] == event.target.value);
    this.selectedValue = selectedValue;
    this.selectionChanged.emit(selectedValue); // sa emita ce am ales
    this.isOpen = false;
  }
}
