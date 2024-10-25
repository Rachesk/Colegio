import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  noticias: any[] = [];

  constructor(private newsService: NewsService) {}

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
}
