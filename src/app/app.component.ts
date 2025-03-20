import { Component, OnInit } from '@angular/core';
import { NotesService, Note } from './services/notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  newNote: Partial<Note> = { title: '', content: '' };
  isEditModalOpen = false;
  currentNote: Note = { id: 0, title: '', content: '' };

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getAllNotes().subscribe((notes) => (this.notes = notes));
  }

  createNote() {
    if (!this.newNote.title || !this.newNote.content) return;
    this.notesService.createNote(this.newNote).subscribe((note) => {
      this.notes.push(note);
      this.newNote = { title: '', content: '' };
    });
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note.id !== id);
    });
  }

  openEditModal(note: Note) {
    this.currentNote = { ...note };  // Make a copy of the note
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveNote() {
    this.notesService.updateNote(this.currentNote.id, this.currentNote).subscribe((updatedNote) => {
      const index = this.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
      }
      this.closeEditModal();
    });
  }
}
