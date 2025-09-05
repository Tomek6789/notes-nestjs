import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { Link } from '../app/notes.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="container">
      <button
      blue-notes
        data-cy="btn-add"
        (click)="hide.emit()"
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
          <select class="select" formControlName="status">
            <option value="TODO">TODO</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="DONE">DONE</option>
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
  @Input() state: 'edit' | 'add' = 'add';

  @Output() addNote = new EventEmitter();
  @Output() updateNote = new EventEmitter();
  @Output() hide = new EventEmitter();

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
    _id: new FormControl(''),
  });

  private _noteData: Link | undefined = undefined
  @Input() 
  get noteData(): Link | undefined {
    return this._noteData
  }
  set noteData(data: Link | undefined) {
    console.log(data)
    if(data) {
      this._noteData = data;
      this.note.patchValue(data)
    }
  }

  onAddNote() {
    if (this.note.invalid || this.note.get('honeypot')?.value !== 'password') {
      return;
    }

    if(this.state === 'add') {
      this.addNote.emit(this.note.value);
    } else {
      this.updateNote.emit(this.note.value)
    }
    this.note.reset();
  }
}
