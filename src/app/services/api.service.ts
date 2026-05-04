import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  type?: string;      // 'translation' | 'post' | 'guest'
  author?: string;
  tags?: string[];
  cover?: string;
  wordcount?: number;
  license?: string;
  excerpt?: string;
  html?: string;
  subtitle?: string;
  publication?: string;
  authors?: string[];
  featured?: boolean;
  summary?: string;
  abstract?: string;
  bibtex?: string;
  pdf?: string;
  [key: string]: any;
}

export interface PageResult {
  posts: ArticleMeta[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AuthorsResult {
  name: string;
  count: number;
  posts?: ArticleMeta[];
}

export interface TagInfo {
  name: string;
  count: number;
}

export const TYPE_NAMES: Record<string, string> = {
  'translation': '译坊',
  'post': '创磨',
  'guest': '信风'
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Posts with filters
  getPosts(params?: {
    page?: number; limit?: number; tag?: string;
    category?: string; author?: string; search?: string;
  }): Observable<PageResult> {
    return this.http.get<PageResult>(`${this.base}/posts`, { params: params as any });
  }

  getPost(slug: string): Observable<ArticleMeta> {
    return this.http.get<ArticleMeta>(`${this.base}/posts/${slug}`);
  }

  getPublications(): Observable<ArticleMeta[]> {
    return this.http.get<ArticleMeta[]>(`${this.base}/publications`);
  }

  getPublication(slug: string): Observable<ArticleMeta> {
    return this.http.get<ArticleMeta>(`${this.base}/publications/${slug}`);
  }

  getResources(): Observable<ArticleMeta[]> {
    return this.http.get<ArticleMeta[]>(`${this.base}/resources`);
  }

  getProjects(): Observable<ArticleMeta[]> {
    return this.http.get<ArticleMeta[]>(`${this.base}/projects`);
  }

  getTalks(): Observable<ArticleMeta[]> {
    return this.http.get<ArticleMeta[]>(`${this.base}/talks`);
  }

  // Tags
  getTags(): Observable<TagInfo[]> {
    return this.http.get<TagInfo[]>(`${this.base}/tags`);
  }

  // Authors
  getAuthors(): Observable<AuthorsResult[]> {
    return this.http.get<AuthorsResult[]>(`${this.base}/authors`);
  }

  getAuthor(slug: string): Observable<AuthorsResult> {
    return this.http.get<AuthorsResult>(`${this.base}/authors/${slug}`);
  }

  // Search
  search(q: string, page = 1, limit = 10): Observable<PageResult> {
    return this.http.get<PageResult>(`${this.base}/search`, {
      params: { q, page, limit } as any
    });
  }

  // Data
  getFriends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/data/friends`);
  }

  getSocial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/data/social`);
  }
}
