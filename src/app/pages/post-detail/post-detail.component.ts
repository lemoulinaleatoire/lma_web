import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { ApiService, ArticleMeta, TYPE_NAMES } from '../../services/api.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, RouterLink],
  template: `
    <div class="article-strip" *ngIf="post" aria-hidden="false">
      <a routerLink="/post" class="strip-back">← 文章</a>
      <span class="strip-rule"></span>
      <span class="strip-type" *ngIf="post.type" [class]="'badge-' + post.type">
        {{ typeName }}
      </span>
      <span class="strip-rule"></span>
      <span class="strip-date">{{ post.date | date:'yyyy · MM · dd' }}</span>
    </div>

    <article *ngIf="post">
      <div class="article-vlabel constr-vlabel" aria-hidden="true">ARTICLE — LE MOULIN ALÉATOIRE</div>

      <div class="cover-wrap" *ngIf="post.cover">
        <img [src]="post.cover" [alt]="post.title" class="cover-img" />
        <span class="cover-cut"></span>
        <span class="cover-tag" *ngIf="post.type" [class]="'badge-' + post.type">{{ typeName }}</span>
      </div>

      <header class="article-header">
        <div class="header-meta-top" *ngIf="!post.cover && post.type">
          <span class="type-badge" [class]="'badge-' + post.type">{{ typeName }}</span>
        </div>
        <h1>{{ post.title }}</h1>
        <div class="header-rail" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="meta-band">
          <span class="meta-band__no">№</span>
          <span class="meta-band__item">
            <span class="meta-band__label">日期</span>
            <span class="meta-band__value">{{ post.date | date:'yyyy-MM-dd' }}</span>
          </span>
          <span class="meta-band__item" *ngIf="post.author">
            <span class="meta-band__label">作者</span>
            <a class="meta-band__value link" [routerLink]="['/author', post.author]">{{ post.author }}</a>
          </span>
          <span class="meta-band__item" *ngIf="post.wordcount">
            <span class="meta-band__label">字数</span>
            <span class="meta-band__value">{{ post.wordcount }}</span>
          </span>
          <span class="meta-band__item" *ngIf="post.license">
            <span class="meta-band__label">许可</span>
            <span class="meta-band__value">{{ post.license }}</span>
          </span>
          <span class="meta-band__item" *ngIf="post['wechat_link']">
            <span class="meta-band__label">来源</span>
            <a class="meta-band__value link" [href]="post['wechat_link']" target="_blank" rel="noopener">{{ sourceLabel }}</a>
          </span>
        </div>
        <div class="tags" *ngIf="post.tags?.length">
          <a *ngFor="let t of post.tags" [routerLink]="['/tag', t]" class="tag">#{{ t }}</a>
        </div>
      </header>

      <div class="article-content" [innerHTML]="post.html"></div>

      <div class="wc-source" *ngIf="post['wechat_link']">
        <span class="wc-source__main">
          <span class="wc-source__icon" aria-hidden="true">✧</span>
          <span class="wc-source__label">本文首发于</span>
          <a class="wc-source__link" [href]="post['wechat_link']" target="_blank" rel="noopener">
            {{ sourceFullName }}
            <span class="wc-source__arrow" aria-hidden="true">↗</span>
          </a>
        </span>
        <span class="wc-source__also" *ngIf="post['wechat_repost']">
          另见<a class="wc-source__link" [href]="post['wechat_repost']" target="_blank" rel="noopener">微信公众号转载<span class="wc-source__arrow" aria-hidden="true">↗</span></a>
        </span>
      </div>

      <footer class="article-footer">
        <div class="article-footer__rail" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="article-footer__row">
          <a routerLink="/post" class="constr-btn-outline">← 全部文章</a>
          <span class="article-footer__sig">— Le Moulin Aléatoire —</span>
        </div>
      </footer>
    </article>

    <p *ngIf="!post" class="loading">加载中...</p>
  `,
  styles: [`
    .article-strip {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.5rem 0;
      margin-bottom: 1rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
      flex-wrap: wrap;
    }
    .strip-back { color: var(--accent); padding: 0.15rem 0; }
    .strip-back:hover { background: var(--accent); color: #fff; padding: 0.15rem 0.4rem; text-decoration: none; }
    .strip-rule { flex: 1 1 auto; height: 1px; background: var(--border); opacity: 0.4; max-width: 8rem; }
    .strip-type {
      padding: 0.2em 0.55em;
      font-weight: 900;
      letter-spacing: 0.1em;
      font-size: 0.85em;
    }
    .strip-date { color: var(--accent-ink); }
    .badge-translation { background: var(--accent); color: #fff; }
    .badge-post { background: var(--accent-yellow); color: var(--accent-black); }
    .badge-guest { background: var(--accent-black); color: var(--accent-yellow); }

    article {
      position: relative;
    }
    .article-vlabel {
      position: absolute;
      top: 2rem;
      left: -2.6rem;
      font-size: 0.7rem;
      pointer-events: none;
    }
    .cover-wrap {
      position: relative;
      margin-bottom: 2rem;
    }
    .cover-img {
      width: 100%;
      max-height: 460px;
      object-fit: cover;
      border: 3px solid var(--border);
      display: block;
    }
    .cover-cut {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 32px 32px;
      border-color: transparent transparent var(--accent-yellow) transparent;
      pointer-events: none;
    }
    .cover-tag {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.25em 0.7em;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .header-meta-top { margin-bottom: 0.65rem; }
    .type-badge {
      display: inline-block;
      padding: 0.25em 0.6em;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .article-header { margin-bottom: 2rem; }
    .article-header h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5.5vw, 3.4rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin: 0 0 0.85rem;
      color: var(--text);
    }
    .header-rail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.6rem 0 1rem;
    }
    .header-rail span:nth-child(1) { flex: 0 0 5rem; height: 6px; background: var(--accent); }
    .header-rail span:nth-child(2) { flex: 0 0 0.6rem; }
    .header-rail span:nth-child(3) { flex: 0 0 2rem; height: 3px; background: var(--accent-yellow); }
    .header-rail span:nth-child(4) { flex: 1; height: 1px; background: var(--border); opacity: 0.4; }

    .meta-band {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.85rem;
      padding: 0.6rem 0.85rem;
      background: var(--paper);
      border: 2px solid var(--border);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.05em;
      margin-bottom: 0.85rem;
    }
    .meta-band__no { color: var(--accent); font-weight: 900; }
    .meta-band__item { display: inline-flex; align-items: baseline; gap: 0.4em; }
    .meta-band__label {
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.85em;
    }
    .meta-band__value { color: var(--text); font-weight: 700; }
    .meta-band .link { color: var(--accent-ink); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
    .meta-band .link:hover { color: #fff; background: var(--accent); }

    .tags {
      margin: 0.75rem 0 1rem;
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .tag {
      font-size: 0.78em;
      padding: 0.25em 0.6em;
      font-weight: 700;
      font-family: var(--font-mono);
      letter-spacing: 0.05em;
      border: 1.5px solid var(--border);
      color: var(--text);
      background: transparent;
    }
    .tag:hover {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      text-decoration: none;
    }

    .article-content {
      max-width: 720px;
      margin: 0 auto;
      font-size: 1.02rem;
      line-height: 1.8;
    }
    .article-content ::ng-deep p { margin-bottom: 1.25rem; }
    .article-content ::ng-deep h2 {
      margin-top: 2.5rem;
      font-family: var(--font-display);
      letter-spacing: -0.02em;
    }

    /* Dialogue layout — SHE / HE speaker markers */
    .article-content ::ng-deep .dlg-speaker {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 2.25rem 0 0.5rem;
      padding: 0.55rem 0;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      border-bottom: 3px solid;
      position: relative;
    }
    .article-content ::ng-deep .dlg-speaker::after {
      content: '';
      position: absolute;
      bottom: -3px;
      right: 0;
      width: 1.2rem;
      height: 3px;
    }
    .article-content ::ng-deep .dlg-avatar {
      width: 42px;
      height: 42px;
      object-fit: cover;
      border: 3px solid;
      flex-shrink: 0;
      margin: 0;
    }
    .article-content ::ng-deep .dlg-she {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
    .article-content ::ng-deep .dlg-she::after {
      background: var(--accent-black);
    }
    .article-content ::ng-deep .dlg-she .dlg-avatar {
      border-color: var(--accent);
    }
    .article-content ::ng-deep .dlg-he {
      color: var(--accent-black);
      border-bottom-color: var(--accent-black);
    }
    .article-content ::ng-deep .dlg-he::after {
      background: var(--accent);
    }
    .article-content ::ng-deep .dlg-he .dlg-avatar {
      border-color: var(--accent-black);
    }

    @media (max-width: 600px) {
      .article-content ::ng-deep .dlg-speaker {
        margin: 1.5rem 0 0.35rem;
        padding: 0.4rem 0;
        font-size: 0.75rem;
        gap: 0.5rem;
      }
      .article-content ::ng-deep .dlg-avatar {
        width: 34px;
        height: 34px;
      }
    }

    .wc-source {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      margin: 2rem auto 0;
      padding: 1rem 1.5rem;
      max-width: 720px;
      background: var(--paper);
      border: 2px solid var(--border);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      letter-spacing: 0.06em;
    }
    .wc-source__main {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .wc-source__also {
      color: var(--muted);
      font-size: 0.9em;
    }
    .wc-source__also .wc-source__link {
      margin-left: 0.3em;
    }
    .wc-source__icon { color: var(--accent); font-size: 1.1em; }
    .wc-source__label { color: var(--muted); font-weight: 500; }
    .wc-source__link {
      color: #07C160;
      font-weight: 700;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
    }
    .wc-source__link:hover { background: #07C160; color: #fff; text-decoration: none; padding: 0.15em 0.4em; }
    .wc-source__arrow { font-size: 0.9em; }

    .article-footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      max-width: 720px;
      margin-left: auto;
      margin-right: auto;
    }
    .article-footer__rail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .article-footer__rail span:nth-child(1) { flex: 1; height: 1px; background: var(--border); opacity: 0.4; }
    .article-footer__rail span:nth-child(2) { flex: 0 0 4rem; height: 4px; background: var(--accent); }
    .article-footer__rail span:nth-child(3) { flex: 1; height: 1px; background: var(--border); opacity: 0.4; }
    .article-footer__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .article-footer__sig {
      font-family: var(--font-mono);
      font-weight: 700;
      letter-spacing: 0.18em;
      font-size: 0.78rem;
      color: var(--muted);
      text-transform: uppercase;
    }

    .loading {
      padding: 4rem 0;
      text-align: center;
      color: var(--muted);
      font-family: var(--font-mono);
      letter-spacing: 0.1em;
    }

    @media (max-width: 1100px) {
      .article-vlabel { display: none; }
    }
    @media (max-width: 600px) {
      .meta-band { gap: 0.6rem; padding: 0.5rem 0.6rem; }
      .article-content { font-size: 0.98rem; }
    }
  `]
})
export class PostDetailComponent implements OnInit {
  post: ArticleMeta | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  get typeName(): string { return TYPE_NAMES[this.post?.type || ''] || ''; }

  get sourceLabel(): string {
    const url = this.post?.['wechat_link'] || '';
    return url.includes('zhihu.com') ? '知乎' : '公众号';
  }

  get sourceFullName(): string {
    const url = this.post?.['wechat_link'] || '';
    return url.includes('zhihu.com') ? '知乎' : '微信公众号';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getPost(params['slug']).subscribe(p => this.post = p);
    });
  }
}
