import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/userr.service';
import { AnimationController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  @ViewChild('appLogo', { static: false }) appLogo!: ElementRef;
  @ViewChild('titulo', { static: true }) titulo!: ElementRef;

  animateLogo = false;
  newNote: string = '';
  notes: string[] = [];
  username: string = '';

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private alertController: AlertController 
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.animateLogo = true;

      const animation = this.animationCtrl.create()
        .addElement([this.appLogo.nativeElement, this.titulo.nativeElement])
        .duration(1500)
        .keyframes([
          { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
          { offset: 1, transform: 'translateX(0)', opacity: '1' },
        ]);

      animation.play();
    }, 500);
  }

  async ngOnInit() {
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

  
  async confirmDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar esta nota?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            console.log('Nota eliminada');
            this.deleteNote(index); 
          },
        },
      ],
    });

    await alert.present();
  }

  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500,
    });

    await loading.present();
  }
}