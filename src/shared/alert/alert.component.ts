import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor() { }

  // Input to make it editable from outside 
  // can place a variable that contains information on this variable
  @Input() message: string;
  //adding <void> because we not emit any data
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit()
  }
}
