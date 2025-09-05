import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[blue-notes]',
  standalone: true,
  imports: [],
  host: {
    'class': 'submit-btn delete-btn',
  },
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {

}
