import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, ArticleMeta, TagInfo } from '../../services/api.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';

const CATEGORY_MAP: Record<string, string> = {
  'yifang': '译坊',
  'chuangmo': '创磨',
  'xinfeng': '信风'
};

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ArticleCardComponent],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone-red" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 02 — POSTS</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">CN · EDITION</span>
      </div>
      <h1 class="page-hero__title">全部<span class="acc">文章</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Index —</span>
        译坊 · 创磨 · 信风
      </p>
    </div>

    <div class="filters">
      <div class="constr-sect-label sect-mini">
        <span class="constr-sect-label__no">№ 02·1</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">分类</span>
        <span class="constr-sect-label__rule"></span>
      </div>
      <div class="category-tabs">
        <a routerLink="/post" [queryParams]="{}" [class.active]="!activeCategory" class="tab">
          <span class="tab-num">00</span><span class="tab-label">全部</span>
        </a>
        <a [routerLink]="[]" [queryParams]="{category:'yifang'}" [class.active]="activeCategory==='yifang'" class="tab tab-red">
          <span class="tab-num">01</span><span class="tab-label">译坊</span>
        </a>
        <a [routerLink]="[]" [queryParams]="{category:'chuangmo'}" [class.active]="activeCategory==='chuangmo'" class="tab tab-yellow">
          <span class="tab-num">02</span><span class="tab-label">创磨</span>
        </a>
        <a [routerLink]="[]" [queryParams]="{category:'xinfeng'}" [class.active]="activeCategory==='xinfeng'" class="tab tab-black">
          <span class="tab-num">03</span><span class="tab-label">信风</span>
        </a>
      </div>

      <div *ngIf="tags.length" class="tag-section">
        <div class="constr-sect-label sect-mini">
          <span class="constr-sect-label__no">№ 02·2</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">标签</span>
          <span class="constr-sect-label__rule"></span>
          <span class="constr-sect-label__meta">{{ tags.length }} 个</span>
        </div>
        <div class="tag-cloud">
          <a *ngFor="let t of tags"
             [routerLink]="['/tag', t.name]"
             [class.active]="activeTag === t.name"
             class="tag-link">
            #{{ t.name }}
            <span class="tag-count">{{ t.count }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="result-row" *ngIf="total > 0">
      <span class="result-no">№ 02·3</span>
      <span class="result-bar"></span>
      <span class="result-label" *ngIf="activeCategory">{{ categoryLabel }}</span>
      <span class="result-label result-label--tag" *ngIf="activeTag">#{{ activeTag }}</span>
      <span class="result-text">共 <strong>{{ total }}</strong> 篇</span>
    </div>

    <ul class="article-list indexed-list" *ngIf="posts.length">
      <li class="indexed-row" *ngFor="let p of posts; let i = index">
        <span class="list-index">{{ pad(i + 1 + (currentPage - 1) * limit) }}</span>
        <div class="indexed-row__body">
          <app-article-card [article]="p" linkPrefix="/post"></app-article-card>
        </div>
      </li>
    </ul>

    <p *ngIf="!posts.length && !loading" class="empty">暂无文章</p>

    <nav class="pagination" *ngIf="totalPages > 1" aria-label="分页">
      <a [routerLink]="[]" [queryParams]="pageParams(1)" [class.disabled]="currentPage===1" aria-label="第一页">«</a>
      <a [routerLink]="[]" [queryParams]="pageParams(currentPage-1)" [class.disabled]="currentPage===1" aria-label="上一页">‹</a>
      <a *ngFor="let p of pageNumbers"
         [routerLink]="[]" [queryParams]="pageParams(p)"
         [class.active]="p===currentPage"
         class="page-num">{{ pad(p) }}</a>
      <a [routerLink]="[]" [queryParams]="pageParams(currentPage+1)" [class.disabled]="currentPage===totalPages" aria-label="下一页">›</a>
      <a [routerLink]="[]" [queryParams]="pageParams(totalPages)" [class.disabled]="currentPage===totalPages" aria-label="最后一页">»</a>
    </nav>
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

    .filters { margin-bottom: 1.5rem; }
    .sect-mini { margin: 1.25rem 0 0.75rem; }
    .sect-mini .constr-sect-label__title { font-size: 1.1rem; }
    .sect-mini .constr-sect-label__no { font-size: 0.75rem; }

    .category-tabs {
      display: flex;
      gap: 0;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }
    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.85em;
      font-weight: 900;
      letter-spacing: 0.04em;
      border: 2px solid var(--border);
      margin-left: -2px;
      color: var(--text);
      background: var(--paper);
      display: inline-flex;
      align-items: baseline;
      gap: 0.4rem;
      transition: transform 0.12s, box-shadow 0.12s;
    }
    .tab-num {
      font-family: var(--font-mono);
      font-size: 0.7em;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.1em;
    }
    .tab:first-child { margin-left: 0; }
    .tab:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 0 var(--accent-black); position: relative; z-index: 2; text-decoration: none; }
    .tab.active {
      background: var(--accent-black);
      color: #fff;
      border-color: var(--accent-black);
      position: relative;
      z-index: 1;
    }
    .tab.active .tab-num { color: var(--accent-yellow); }
    .tab-red { background: var(--accent); color: #fff; border-color: var(--accent); }
    .tab-red .tab-num { color: var(--accent-yellow); }
    .tab-red:hover, .tab-red.active { background: var(--paper); color: var(--accent); border-color: var(--accent); }
    .tab-red:hover .tab-num, .tab-red.active .tab-num { color: var(--accent); }
    .tab-yellow { background: var(--accent-yellow); color: var(--accent-black); border-color: var(--accent-yellow); }
    .tab-yellow .tab-num { color: var(--accent); }
    .tab-yellow:hover, .tab-yellow.active { background: var(--paper); color: var(--accent-black); border-color: var(--accent-yellow); }
    .tab-black { background: var(--accent-black); color: #fff; border-color: var(--accent-black); }
    .tab-black .tab-num { color: var(--accent-yellow); }
    .tab-black:hover, .tab-black.active { background: var(--paper); color: var(--accent-black); }
    .tab-black:hover .tab-num, .tab-black.active .tab-num { color: var(--accent); }

    .tag-section { margin-top: 1rem; }
    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem 0.45rem;
      padding: 1rem 1.1rem;
      background: var(--paper);
      border: 2px solid var(--border);
    }
    .tag-link {
      font-size: 0.82em;
      padding: 0.3em 0.65em;
      background: var(--bg);
      color: var(--text);
      font-weight: 700;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      border: 1.5px solid var(--border);
      transition: transform 0.12s, box-shadow 0.12s;
    }
    .tag-link:hover {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      text-decoration: none;
      transform: translate(-2px, -2px);
      box-shadow: 3px 3px 0 0 var(--accent-black);
    }
    .tag-link.active {
      background: var(--accent-black);
      color: var(--accent-yellow);
      border-color: var(--accent-black);
    }
    .tag-count {
      font-size: 0.78em;
      opacity: 0.65;
      margin-left: 0.25em;
      color: inherit;
    }

    .result-row {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin: 1.5rem 0 1rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85em;
      letter-spacing: 0.06em;
      color: var(--muted);
      flex-wrap: wrap;
    }
    .result-no { color: var(--accent); letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.78rem; }
    .result-bar {
      flex: 1 1 4rem;
      height: 4px;
      background: var(--accent);
      max-width: 6rem;
    }
    .result-label {
      display: inline-block;
      background: var(--accent-black);
      color: #fff;
      padding: 0.2em 0.55em;
      font-weight: 900;
      font-size: 0.85em;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .result-label--tag { background: var(--accent); }
    .result-text strong { color: var(--accent); font-size: 1.1em; }

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

    .empty {
      padding: 2rem;
      text-align: center;
      background: var(--paper);
      border: 2px solid var(--border);
      color: var(--muted);
      font-weight: 700;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 0;
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
    }
    .pagination a {
      padding: 0.5rem 0.85rem;
      border: 2px solid var(--border);
      font-size: 0.85em;
      color: var(--text);
      font-weight: 700;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      margin-left: -2px;
      background: var(--paper);
      min-width: 2.5rem;
      text-align: center;
    }
    .pagination a:first-child { margin-left: 0; }
    .pagination a:hover {
      background: var(--accent-black);
      color: var(--accent-yellow);
      border-color: var(--accent-black);
      text-decoration: none;
      position: relative;
      z-index: 1;
    }
    .pagination a.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      position: relative;
      z-index: 1;
    }
    .pagination a.disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.12; }
      .indexed-row { grid-template-columns: 2.4rem 1fr; }
      .list-index { font-size: 0.95rem; padding-top: 1.55rem; padding-right: 0.4rem; }
    }
  `]
})
export class PostListComponent implements OnInit {
  posts: ArticleMeta[] = [];
  tags: TagInfo[] = [];
  total = 0;
  totalPages = 0;
  currentPage = 1;
  activeCategory = '';
  activeTag = '';
  loading = true;
  limit = 10;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  get categoryLabel(): string { return CATEGORY_MAP[this.activeCategory] || ''; }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  pageParams(p: number) {
    const params: any = { page: p };
    if (this.activeCategory) params.category = this.activeCategory;
    return params;
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] || '';
      this.currentPage = parseInt(params['page'] || '1');
      this.fetchPosts();
    });

    this.route.params.subscribe(params => {
      this.activeTag = params['tag'] || '';
      this.activeCategory = '';
      this.currentPage = 1;
      this.fetchPosts();
    });

    this.api.getTags().subscribe(t => this.tags = t);
  }

  fetchPosts() {
    this.loading = true;
    this.api.getPosts({
      page: this.currentPage,
      limit: this.limit,
      category: this.activeCategory,
      tag: this.activeTag
    }).subscribe(r => {
      this.posts = r.posts;
      this.total = r.total;
      this.totalPages = r.totalPages;
      this.loading = false;
    });
  }
}
