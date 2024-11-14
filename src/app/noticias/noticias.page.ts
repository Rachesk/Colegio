import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild('appLogo', { static: false }) appLogo!: ElementRef;
  @ViewChild('titulo', { static: true }) titulo!: ElementRef;
  animateLogo = false;
  noticias: any[] = [];

  constructor(private newsService: NewsService,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.animateLogo = true;

      const animation = this.animationCtrl.create()
      .addElement([this.appLogo.nativeElement,this.titulo.nativeElement])
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);

      animation.play();
    },500);
  }

  ngOnInit() {
    this.loadNoticias();
  }

  async loadNoticias() {
    try {
      const country = 'us';  
      const category = '';   
      const language = 'en'; 
      
      const response = await this.newsService.getTopHeadlines(country, category, language).toPromise();
      console.log('Noticias:', response); 
      this.noticias = response.articles;
    } catch (error) {
      console.error('Error loading news:', error);
    }
  }

  async loading2(){
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    
    await loading.present();
  }
}
