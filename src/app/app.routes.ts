import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'links', loadComponent: () => import('./pages/links/links.component').then(m => m.LinksComponent) },
  { path: 'post', loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent) },
  { path: 'post/:slug', loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent) },
  { path: 'tag/:tag', loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent) },
  { path: 'author/:slug', loadComponent: () => import('./pages/author-detail/author-detail.component').then(m => m.AuthorDetailComponent) },
  { path: 'search', loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent) },
  { path: 'publication', loadComponent: () => import('./pages/publication-list/publication-list.component').then(m => m.PublicationListComponent) },
  { path: 'publication/:slug', loadComponent: () => import('./pages/publication-detail/publication-detail.component').then(m => m.PublicationDetailComponent) },
  { path: 'project', loadComponent: () => import('./pages/project-list/project-list.component').then(m => m.ProjectListComponent) },
  { path: 'resource', loadComponent: () => import('./pages/resource-list/resource-list.component').then(m => m.ResourceListComponent) },
  { path: 'talk', loadComponent: () => import('./pages/talk-list/talk-list.component').then(m => m.TalkListComponent) },
  { path: '**', redirectTo: '' }
];
