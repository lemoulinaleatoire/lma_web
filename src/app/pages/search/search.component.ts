import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { ApiService, ArticleMeta } from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf, ArticleCardComponent],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone-red" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 09 — SEARCH</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">QUERY · CN/EN</span>
      </div>
      <h1 class="page-hero__title">搜<span class="acc">索</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Recherche —</span>
        全文检索文章、出版与讲座
      </p>
    </div>

    <div class="search-box">
      <span class="search-box__prefix">Q</span>
      <input #qInput type="text" [value]="query" placeholder="输入关键词搜索..." (keyup.enter)="doSearch(qInput.value)" />
      <button (click)="doSearch(qInput.value)" class="constr-btn search-btn-action">→ 搜索</button>
    </div>

    <div class="result-row" *ngIf="searched">
      <span class="result-no">№ 09·1</span>
      <span class="result-bar"></span>
      <span class="result-text">关键词「<strong>{{ query }}</strong>」共 <span class="result-count">{{ total }}</span> 条结果</span>
    </div>

    <ul class="article-list indexed-list" *ngIf="results.length">
      <li class="indexed-row" *ngFor="let p of results; let i = index">
        <span class="list-index">{{ pad(i + 1) }}</span>
        <div class="indexed-row__body">
          <app-article-card [article]="p" linkPrefix="/post"></app-article-card>
        </div>
      </li>
    </ul>

    <div *ngIf="searched && !results.length" class="no-result">
      <span class="no-result__no">↯</span>
      <div class="no-result__body">
        <div class="no-result__title">未找到相关文章</div>
        <div class="no-result__sub">尝试更换关键词，或浏览全部 <a href="/post">文章列表</a></div>
      </div>
    </div>
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
      opacity: 0.18;
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
    .page-hero__title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.5rem, 7vw, 4.5rem);
      letter-spacing: -0.04em;
      line-height: 1;
      margin: 0.4rem 0 0.6rem;
      color: var(--text);
    }
    .page-hero__title .acc { color: var(--accent); }
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
    }
    .page-hero__caption {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .search-box {
      display: flex;
      gap: 0;
      margin: 1.5rem 0;
      align-items: stretch;
    }
    .search-box__prefix {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      background: var(--accent-black);
      color: var(--accent-yellow);
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 1.3rem;
      border: 3px solid var(--border);
      border-right: none;
    }
    .search-box input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 3px solid var(--border);
      font-size: 1.05rem;
      font-family: var(--font-sans);
      background: var(--paper);
      font-weight: 500;
    }
    .search-box input:focus {
      outline: none;
      border-color: var(--accent);
      background: #fff;
    }
    .search-btn-action {
      margin-left: -3px;
      border-radius: 0;
      padding: 0.75rem 1.5rem;
    }

    .result-row {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin: 1rem 0;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85em;
      letter-spacing: 0.06em;
      color: var(--muted);
      flex-wrap: wrap;
    }
    .result-no { color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.78rem; }
    .result-bar { flex: 1 1 4rem; height: 4px; background: var(--accent); max-width: 5rem; }
    .result-text strong { color: var(--accent); padding: 0 0.15em; }
    .result-count {
      display: inline-block;
      background: var(--accent);
      color: #fff;
      padding: 0.1em 0.5em;
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

    .no-result {
      margin-top: 2rem;
      padding: 2rem;
      background: var(--paper);
      border: 3px solid var(--border);
      display: grid;
      grid-template-columns: 4rem 1fr;
      gap: 1rem;
      align-items: center;
    }
    .no-result__no {
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 3rem;
      color: var(--accent);
      text-align: center;
      line-height: 1;
    }
    .no-result__title {
      font-weight: 900;
      font-size: 1.1rem;
      letter-spacing: -0.01em;
      margin-bottom: 0.3rem;
    }
    .no-result__sub {
      font-family: var(--font-mono);
      font-size: 0.85em;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .no-result__sub a {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.12; }
      .search-box__prefix { width: 2.4rem; font-size: 1.1rem; }
      .indexed-row { grid-template-columns: 2.4rem 1fr; }
      .list-index { font-size: 0.95rem; padding-top: 1.55rem; padding-right: 0.4rem; }
      .no-result { grid-template-columns: 3rem 1fr; padding: 1.25rem; }
      .no-result__no { font-size: 2.2rem; }
    }
  `]
})
export class SearchComponent {
  query = '';
  results: ArticleMeta[] = [];
  total = 0;
  searched = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) this.doSearch(this.query);
    });
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  doSearch(q: string) {
    if (!q.trim()) return;
    this.query = q.trim();
    this.searched = true;
    this.router.navigate(['/search'], { queryParams: { q: this.query } });
    this.api.search(this.query).subscribe(r => {
      this.results = r.posts;
      this.total = r.total;
    });
  }
}
