import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="container">
      <button
      blue-notes
        data-cy="btn-add"
        (click)="isFormVisible = !isFormVisible"
      >
        {{ isFormVisible ? 'Hide' : 'Add' }}
      </button>
      @if (isFormVisible) {
      <div class="item">
        <form [formGroup]="note" (ngSubmit)="onAddNote()">
          <input
            formControlName="honeypot"
            class="visually-hidden"
            tabindex="-1"
            autocomplete="off"
          />
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
          <input
            formControlName="description"
            type="text"
            placeholder="Notes"
            class="full-width"
          />
          <select multiple class="select" formControlName="tags">
            <option value="ngrx">ngrx</option>
            <option value="javascript">javascript</option>
            <option value="typescript">typescript</option>
            <option value="nodejs">nodejs</option>
          </select>

          <button type="submit" class="submit-btn">Submit</button>
        </form>

        @if(note.invalid && (note.dirty || note.touched)){ 
          @if(note.controls.name.hasError('required')) {
            <div>Name is required.</div>
          } 
        }
      </div>
      }
    </div>
  `,
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent {
  @Input() isFormVisible = false;

  @Output() addNote = new EventEmitter();

  note = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', { nonNullable: true }),
    tags: new FormControl([''], { nonNullable: true }),
    url: new FormControl('', { nonNullable: true }),
    honeypot: new FormControl('password'),
    status: new FormControl('TODO'),
  });

  onAddNote() {
    if (this.note.invalid || this.note.get('honeypot')?.value !== 'password') {
      return;
    }

    this.addNote.emit(this.note.value);
    this.note.reset();
  }
}
