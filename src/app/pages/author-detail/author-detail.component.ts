import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, ArticleMeta, AuthorsResult } from '../../services/api.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ArticleCardComponent],
  template: `
    <div *ngIf="author">
      <div class="page-hero">
        <div class="page-hero__halftone constr-halftone-yellow" aria-hidden="true"></div>
        <div class="page-hero__top">
          <span class="page-hero__no">№ — AUTEUR</span>
          <span class="page-hero__rule"></span>
          <span class="page-hero__lang">PROFILE</span>
        </div>
        <div class="author-name-block">
          <span class="author-prefix">作者</span>
          <h1 class="page-hero__title">{{ author.name }}</h1>
        </div>
        <p class="page-hero__sub">
          <span class="page-hero__caption">Œuvre —</span>
          共
          <span class="count-num">{{ author.posts?.length || 0 }}</span>
          篇文章
        </p>
      </div>

      <div class="constr-sect-label">
        <span class="constr-sect-label__no">Index</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">作品</span>
        <span class="constr-sect-label__rule"></span>
      </div>

      <ul class="article-list indexed-list" *ngIf="author.posts?.length">
        <li class="indexed-row" *ngFor="let p of author.posts; let i = index">
          <span class="list-index">{{ pad(i + 1) }}</span>
          <div class="indexed-row__body">
            <app-article-card [article]="p" linkPrefix="/post"></app-article-card>
          </div>
        </li>
      </ul>

      <p *ngIf="!author.posts?.length" class="empty">该作者尚无文章</p>
    </div>
    <p *ngIf="!author" class="loading">加载中...</p>
  `,
  styles: [`
    .page-hero {
      position: relative;
      padding: 1.5rem 0 2rem;
      margin-bottom: 1.5rem;
      border-bottom: 3px solid var(--border);
      overflow: hidden;
    }
    .page-hero__halftone {
      position: absolute;
      top: -1rem;
      right: -2rem;
      width: 220px;
      height: 220px;
      opacity: 0.22;
      pointer-events: none;
    }
    .page-hero__top {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }
    .page-hero__no { color: var(--accent); }
    .page-hero__lang { color: var(--accent-ink); }
    .page-hero__rule {
      flex: 1 1 auto;
      height: 1px;
      background: var(--border);
      opacity: 0.4;
      max-width: 12rem;
    }
    .author-name-block {
      display: flex;
      align-items: baseline;
      gap: 0.85rem;
      margin: 0.5rem 0 0.6rem;
      flex-wrap: wrap;
    }
    .author-prefix {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      padding: 0.2em 0.6em;
      background: var(--accent-yellow);
      color: var(--accent-black);
    }
    .page-hero__title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.2rem, 6.5vw, 3.8rem);
      letter-spacing: -0.04em;
      line-height: 1;
      margin: 0;
      color: var(--text);
    }
    .page-hero__sub {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      font-size: 1rem;
      color: var(--muted);
      font-weight: 500;
      margin: 0;
      border-left: 6px solid var(--accent-yellow);
      padding-left: 0.85rem;
      flex-wrap: wrap;
    }
    .page-hero__caption {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }
    .count-num {
      display: inline-block;
      background: var(--accent);
      color: #fff;
      padding: 0.1em 0.45em;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 1.1em;
      letter-spacing: 0.04em;
    }

    .indexed-list { list-style: none; padding: 0; margin: 0; }
    .indexed-row {
      display: grid;
      grid-template-columns: 3.5rem 1fr;
      gap: 0.5rem;
      align-items: stretch;
    }
    .list-index {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--accent);
      letter-spacing: 0.06em;
      padding-top: 1.65rem;
      text-align: right;
      border-right: 2px solid var(--border);
      padding-right: 0.65rem;
    }
    .indexed-row__body { min-width: 0; }
    .indexed-row__body ::ng-deep .article-card-item { padding-left: 0.5rem; }
    .indexed-row__body ::ng-deep .article-card-item:hover { padding-left: 0.85rem; }

    .empty, .loading {
      padding: 2rem;
      text-align: center;
      background: var(--paper);
      border: 2px solid var(--border);
      color: var(--muted);
      font-weight: 700;
    }

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.16; }
      .indexed-row { grid-template-columns: 2.4rem 1fr; }
      .list-index { font-size: 0.95rem; padding-top: 1.55rem; padding-right: 0.4rem; }
    }
  `]
})
export class AuthorDetailComponent implements OnInit {
  author: AuthorsResult | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getAuthor(params['slug']).subscribe(a => this.author = a);
    });
  }
}
