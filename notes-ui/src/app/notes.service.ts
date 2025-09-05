import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

type STATUS = 'TODO' | 'PROGRESS' | 'DONE';
export interface Link {
    name: string;
    date?: string;
    description: string;
    status: STATUS
    tags: string[];
    url:string;
    _id: string;
  }  

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    http = inject(HttpClient);

    getNotes() {
        return this.http.get<Link[]>('/api/links');
    }

    saveNotes(data: Partial<Link>) {
        return this.http.post<Link>('/api/links', data);
    }

    deleteNote(noteId: string) {
        return this.http.delete<Link>(`/api/links/${noteId}`);
    }
}