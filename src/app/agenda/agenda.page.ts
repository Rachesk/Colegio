import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  newNote: string = '';
  notes: string[] = [];
  username: string = '';

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Obtener el nombre de usuario actual de forma asincrónica
    this.username = await this.userService.getUser();
    this.loadNotes();
  }

  addNote() {
    if (this.newNote.trim()) {
      this.notes.push(this.newNote);
      this.saveNotes();
      this.newNote = '';
    }
  }

  saveNotes() {
    if (this.username) {
      localStorage.setItem(`notes_${this.username}`, JSON.stringify(this.notes));
    }
  }

  loadNotes() {
    if (this.username) {
      const storedNotes = localStorage.getItem(`notes_${this.username}`);
      if (storedNotes) {
        this.notes = JSON.parse(storedNotes);
      }
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }
}
