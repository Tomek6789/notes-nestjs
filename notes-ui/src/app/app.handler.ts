import { inject, Injectable } from '@angular/core';
import { Link, NotesService } from './notes.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesHandler {
  noteService = inject(NotesService);
  
  private allNotes = new BehaviorSubject<Link[]>([]);
  allNotes$ = this.allNotes.asObservable();

  getAllNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.allNotes.next(notes);
    });
  }

  addNote(note: Partial<Link>) {
    this.noteService.saveNotes(note).subscribe((note) => {
      this.allNotes.next([...this.allNotes.value, note]);
    });
  }

  deleteNote(noteId: string) {
    this.noteService.deleteNote(noteId).subscribe(() => {
      this.allNotes.next(this.allNotes.value.filter((note) => note._id !== noteId));
    });
  }
}
