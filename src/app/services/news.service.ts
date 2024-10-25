// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiKey = '95b2a370c5344fb8bd9a4683ece3abeb';  //esta es la clave de la api xd(me tuve que logear)
  baseUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(country: string, category: string, language: string): Observable<any> {
    const url = `${this.baseUrl}?country=${country}&category=${category}&language=${language}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
