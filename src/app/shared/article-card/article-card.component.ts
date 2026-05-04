import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { ArticleMeta, TYPE_NAMES } from '../../services/api.service';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, DatePipe, NgIf, NgFor],
  template: `
    <li class="article-card-item">
      <a [routerLink]="link" class="cover-link" *ngIf="article.cover">
        <img [src]="article.cover" [alt]="article.title" class="cover" loading="lazy" />
      </a>
      <div class="card-body">
        <div class="card-top">
          <span class="type-badge" *ngIf="article.type" [class]="'badge-' + article.type">
            {{ typeName }}
          </span>
          <span class="date">{{ article.date | date:'yyyy-MM-dd' }}</span>
        </div>
        <h3><a [routerLink]="link">{{ article.title }}</a></h3>
        <div class="meta">
          <ng-container *ngIf="article.author">
            <a [routerLink]="['/author', article.author]">{{ article.author }}</a>
          </ng-container>
          <ng-container *ngIf="article.wordcount"> · {{ article.wordcount }} 字</ng-container>
        </div>
        <div class="tags" *ngIf="article.tags?.length">
          <a *ngFor="let t of article.tags" [routerLink]="['/tag', t]" class="tag">#{{ t }}</a>
        </div>
      </div>
    </li>
  `,
  styles: [`
    .article-card-item {
      display: flex;
      gap: 1.25rem;
      padding: 1.5rem 0;
      border-bottom: 2px solid var(--border);
      position: relative;
      transition: padding-left 0.18s ease, background 0.18s ease;
    }
    .article-card-item::before {
      content: '';
      position: absolute;
      top: 1.25rem;
      bottom: 1.25rem;
      left: -0.5rem;
      width: 4px;
      background: var(--accent);
      transform: scaleY(0);
      transform-origin: top center;
      transition: transform 0.2s ease;
    }
    .article-card-item:hover {
      padding-left: 0.6rem;
    }
    .article-card-item:hover::before {
      transform: scaleY(1);
    }
    .cover-link {
      flex-shrink: 0;
      position: relative;
      display: block;
    }
    .cover-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 18px 18px;
      border-color: transparent transparent var(--accent-yellow) transparent;
      pointer-events: none;
    }
    .cover-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 12px 12px 0 0;
      border-color: var(--accent) transparent transparent transparent;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .article-card-item:hover .cover-link::before { opacity: 1; }
    .cover {
      width: 150px;
      height: 100px;
      object-fit: cover;
      border: 2px solid var(--border);
      display: block;
      transition: transform 0.2s;
    }
    .article-card-item:hover .cover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 0 var(--accent-black); }
    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .card-top {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.45rem;
    }
    h3 {
      font-size: 1.2rem;
      margin: 0;
      font-weight: 900;
      line-height: 1.25;
      letter-spacing: -0.01em;
    }
    h3 a { color: var(--text); }
    h3 a:hover {
      color: var(--accent);
      background: transparent;
      text-decoration: none;
    }
    .meta {
      font-size: 0.82em;
      color: var(--muted);
      margin-top: 0.35rem;
      font-weight: 500;
      font-family: var(--font-mono);
      letter-spacing: 0.02em;
    }
    .meta a { color: var(--muted); }
    .meta a:hover { color: #fff; background: var(--accent); }
    .tags {
      margin-top: 0.6rem;
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .tag {
      font-size: 0.72em;
      background: transparent;
      color: var(--text);
      padding: 0.18em 0.55em;
      font-weight: 700;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      border: 1.5px solid var(--border);
    }
    .tag:hover {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      text-decoration: none;
    }
    .date {
      font-size: 0.72em;
      color: var(--muted);
      font-weight: 700;
      letter-spacing: 0.1em;
      font-family: var(--font-mono);
    }
    .type-badge {
      font-size: 0.66em;
      font-weight: 900;
      padding: 0.25em 0.55em;
      letter-spacing: 0.1em;
      font-family: var(--font-mono);
      display: inline-block;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%);
    }
    .badge-translation { background: var(--accent); color: #fff; }
    .badge-post { background: var(--accent-yellow); color: var(--accent-black); }
    .badge-guest { background: var(--accent-black); color: var(--accent-yellow); }
    @media (max-width: 500px) {
      .article-card-item { flex-direction: column; gap: 0.75rem; }
      .article-card-item:hover { padding-left: 0; }
      .article-card-item::before { display: none; }
      .cover { width: 100%; height: 180px; }
      .article-card-item:hover .cover { transform: none; box-shadow: none; }
    }
  `]
})
export class ArticleCardComponent {
  @Input() article!: ArticleMeta;
  @Input() linkPrefix: string = '/post';

  get link(): string { return `${this.linkPrefix}/${this.article.slug}`; }
  get typeName(): string { return TYPE_NAMES[this.article.type || ''] || ''; }
}
