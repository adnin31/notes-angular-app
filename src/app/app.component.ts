import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService, Note } from './services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  newNote: Partial<Note> = { title: '', content: '' };

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getAllNotes().subscribe(notes => this.notes = notes);
  }

  createNote() {
    if (!this.newNote.title || !this.newNote.content) return;
    this.notesService.createNote(this.newNote).subscribe(note => {
      this.notes.push(note);
      this.newNote = { title: '', content: '' };
    });
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }
}
