import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: any[] = [];

  constructor(private newsService: NewsService,
    private loadingController: LoadingController
  ) {}

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
