import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface Link {
    name: string;
    date?: string;
    description: string;
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