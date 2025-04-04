import { Component, inject, OnInit } from '@angular/core';
import { Link } from './notes.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesHandler } from './app.handler';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule],
  template: `
    <div class="container">
      <button data-cy="btn-add" class="submit-btn" (click)="isFormVisible = !isFormVisible">
        {{ isFormVisible ? 'Hide' : 'Add' }}
      </button>
      @if (isFormVisible) {
      <div class="item">
        <form [formGroup]="note" (ngSubmit)="onAddNote()">
          <input formControlName="honeypot" class="visually-hidden" tabindex="-1" autocomplete="off">
          <input
            formControlName="url"
            type="text"
            placeholder="URL"
            class="full-width"
          />
          <input
            formControlName="name"
            type="text"
            placeholder="Name"
            class="full-width"
          />
            <select multiple class="select" formControlName="tags"
            >
              <option value="ngrx">ngrx</option>
              <option value="javascript">javascript</option>
              <option value="typescript">typescript</option>
              <option value="nodejs">nodejs</option>
            </select>

          <button type="submit" class="submit-btn">Submit</button>
        </form>

        @if(note.invalid && (note.dirty || note.touched)){ @if
        (note.controls.name.hasError('required')) {

        <div>Name is required.</div>
        } }
      </div>
      }
    </div>

    <div class="container">
      @for (item of (notesHandler.allNotes$ | async); track item.name) {
      <div data-cy="note" class="item">
        <span> {{ item.date | date }} </span>
        <button class="submit-btn delete-btn" (click)="onDelete(item._id)">
          Delete
        </button>
        <h2>
          <a [href]="item.url" target="_blank">{{ item.name }}</a>
        </h2>
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
})
export class AppComponent implements OnInit {
  isFormVisible = false;
  notesHandler = inject(NotesHandler);

  categories = ['Work', 'Personal', 'Urgent', 'Others'];

  note = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', { nonNullable: true }),
    tags: new FormControl([''], { nonNullable: true }),
    url: new FormControl('', { nonNullable: true }),
    honeypot: new FormControl('password'),
  });

  ngOnInit() {
    this.notesHandler.getAllNotes();
  }

  onAddNote() {
    if (this.note.invalid || this.note.get('honeypot')?.value !== 'password') {
      return;
    }

    this.notesHandler.addNote(this.note.value as Partial<Link>);
    this.note.reset();
  }

  onDelete(noteId: string) {
    this.notesHandler.deleteNote(noteId);
  }

}
