import { Component, inject, OnInit } from '@angular/core';
import { Link } from './notes.service';
import { AsyncPipe } from '@angular/common';
import { NotesHandler } from './app.handler';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [AsyncPipe, AddNoteComponent, NotesListComponent],
  template: `
    <app-add-note
      [isFormVisible]="isFormVisible"
      (addNote)="onAddNote($event)"
    />
    <div class="container">
      <app-notes-list
        title="To do"
        [notes]="todo$ | async"
        (delete)="onDelete($event)"
      />
      <app-notes-list
        title="In progress"
        [notes]="progress$ | async"
        (delete)="onDelete($event)"
      />
      <app-notes-list
        title="Done"
        [notes]="done$ | async"
        (delete)="onDelete($event)"
      />
    </div>
  `,
})
export class AppComponent implements OnInit {
  notesHandler = inject(NotesHandler);

  todo$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'TODO'))
  );
  progress$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'PROGRESS'))
  );
  done$ = this.notesHandler.allNotes$.pipe(
    map((n) => n.filter((x) => x.status === 'DONE'))
  );

  isFormVisible = false;
  categories = ['Work', 'Personal', 'Urgent', 'Others'];

  ngOnInit() {
    this.notesHandler.getAllNotes();
  }

  onAddNote(note: Partial<Link>) {
    this.notesHandler.addNote(note);
  }

  onDelete(noteId: string) {
    this.notesHandler.deleteNote(noteId);
  }
}
