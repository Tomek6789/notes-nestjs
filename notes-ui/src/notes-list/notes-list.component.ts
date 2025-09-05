import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from '../app/notes.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  template: `
      <div class="container">
        <h3>{{title}}</h3>
        @for (item of notes; track item.name) {
        <div data-cy="note" class="item">
          <span> {{ item.date | date }} </span>
          <button blue-notes class="submit-btn delete-btn" (click)="delete.emit(item._id)">
            Delete
          </button>
          <h2>
            <a [href]="item.url" target="_blank">{{ item.name }}</a>
          </h2>
          <p>{{ item.description }}</p>
          <div>
            @for (tag of item.tags; track tag; let first = $first) {
            <span class="tag" [class.first]="first"
              ><a href="">{{ tag }}</a></span
            >
            }
          </div>
        </div>
        }
      </div>
  `,
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  @Input() title: string = ''
  @Input() notes: Link[] | null = [];

  @Output() delete = new EventEmitter<string>()
}
