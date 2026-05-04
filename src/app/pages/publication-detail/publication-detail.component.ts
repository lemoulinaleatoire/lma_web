import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { ApiService, ArticleMeta } from '../../services/api.service';

@Component({
  selector: 'app-publication-detail',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, RouterLink],
  template: `
    <div class="article-strip" *ngIf="pub">
      <a routerLink="/publication" class="strip-back">← 出版</a>
      <span class="strip-rule"></span>
      <span class="strip-type">PUBLICATION</span>
      <span class="strip-rule"></span>
      <span class="strip-date">{{ pub.date | date:'yyyy · MM · dd' }}</span>
    </div>

    <article *ngIf="pub">
      <div class="article-vlabel constr-vlabel" aria-hidden="true">PUBLICATION — LE MOULIN ALÉATOIRE</div>

      <header class="article-header">
        <h1>{{ pub.title }}</h1>
        <div class="header-rail" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="meta-band">
          <span class="meta-band__no">№</span>
          <span class="meta-band__item" *ngIf="pub.authors?.length">
            <span class="meta-band__label">作者</span>
            <span class="meta-band__value">{{ pub.authors?.join(', ') }}</span>
          </span>
          <span class="meta-band__item">
            <span class="meta-band__label">日期</span>
            <span class="meta-band__value">{{ pub.date | date:'yyyy-MM-dd' }}</span>
          </span>
          <span class="meta-band__item" *ngIf="pub.publication">
            <span class="meta-band__label">载于</span>
            <span class="meta-band__value">{{ pub.publication }}</span>
          </span>
        </div>
      </header>

      <div class="article-content" [innerHTML]="pub.html"></div>

      <footer class="article-footer">
        <div class="article-footer__rail" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="article-footer__row">
          <a routerLink="/publication" class="constr-btn-outline">← 全部出版</a>
          <span class="article-footer__sig">— Le Moulin Aléatoire —</span>
        </div>
      </footer>
    </article>
    <p *ngIf="!pub" class="loading">加载中...</p>
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
      background: var(--accent-yellow);
      color: var(--accent-black);
    }
    .strip-date { color: var(--accent-ink); }

    article { position: relative; }
    .article-vlabel {
      position: absolute;
      top: 1rem;
      left: -2.6rem;
      font-size: 0.7rem;
      pointer-events: none;
      color: var(--accent-ink);
    }

    .article-header { margin-bottom: 2rem; }
    .article-header h1 {
      font-family: var(--font-display);
      font-size: clamp(1.9rem, 5vw, 3rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.02em;
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

    .article-content {
      max-width: 720px;
      margin: 0 auto;
      font-size: 1.02rem;
      line-height: 1.8;
    }

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
    }
  `]
})
export class PublicationDetailComponent implements OnInit {
  pub: ArticleMeta | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.getPublication(params['slug']).subscribe(p => this.pub = p);
    });
  }
}
