import { Component, inject, OnInit } from '@angular/core';
import { Link } from './notes.service';
import { AsyncPipe } from '@angular/common';
import { NotesHandler } from './app.handler';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [AsyncPipe, AddNoteComponent, NotesListComponent],
  template: `
    <app-add-note
      [state]="state"
      [isFormVisible]="isFormVisible"
      [noteData]="noteToUpdate"
      (addNote)="onAddNote($event)"
      (updateNote)="onUpdateNote($event)"
      (hide)="onHide()"
    />
    <div class="container">
      <app-notes-list
        title="To do"
        [notes]="todo$ | async"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      />
      <app-notes-list
        title="In progress"
        [notes]="progress$ | async"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      />
      <app-notes-list
        title="Done"
        [notes]="done$ | async"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      />
    </div>
  `,
})
export class AppComponent implements OnInit {
  notesHandler = inject(NotesHandler);
  noteToUpdate: Link | undefined = undefined;
  state: 'add' | 'edit' = 'add';
  isFormVisible = false;

  todo$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'TODO'))
  );
  progress$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'PROGRESS'))
  );
  done$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'DONE'))
  );

  ngOnInit() {
    this.notesHandler.getAllNotes();
  }

  onHide() {
    this.isFormVisible = !this.isFormVisible;
  }

  onUpdate(noteId: string) {
    const notes = this.notesHandler.allNotes.getValue();
    this.noteToUpdate = notes.find((note) => note._id === noteId);
    this.state = 'edit';

    this.isFormVisible = !this.isFormVisible;
  }

  onAddNote(note: Partial<Link>) {
    this.notesHandler.addNote(note);
  }

  onUpdateNote(note: Partial<Link>) {
    this.notesHandler.updateNote(note);
  }

  onDelete(noteId: string) {
    this.notesHandler.deleteNote(noteId);
  }
}
