import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, ArticleMeta } from '../../services/api.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';

@Component({
  selector: 'app-talk-list',
  standalone: true,
  imports: [NgFor, NgIf, ArticleCardComponent],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone-yellow" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 06 — TALKS</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">SPEECH · CONF.</span>
      </div>
      <h1 class="page-hero__title">讲<span class="acc">座</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Tribune —</span>
        学术报告与会议发言
      </p>
    </div>

    <div class="constr-sect-label">
      <span class="constr-sect-label__no">№ 06·1</span>
      <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
      <span class="constr-sect-label__title">日程</span>
      <span class="constr-sect-label__rule"></span>
      <span class="constr-sect-label__meta" *ngIf="talks.length">{{ talks.length }} 场</span>
    </div>

    <ul class="article-list indexed-list" *ngIf="talks.length">
      <li class="indexed-row" *ngFor="let t of talks; let i = index">
        <span class="list-index">{{ pad(i + 1) }}</span>
        <div class="indexed-row__body">
          <app-article-card [article]="t" linkPrefix="/talk"></app-article-card>
        </div>
      </li>
    </ul>

    <p *ngIf="!talks.length" class="empty">尚无讲座</p>
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

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.16; }
      .indexed-row { grid-template-columns: 2.4rem 1fr; }
      .list-index { font-size: 0.95rem; padding-top: 1.55rem; padding-right: 0.4rem; }
    }
  `]
})
export class TalkListComponent implements OnInit {
  talks: ArticleMeta[] = [];

  constructor(private api: ApiService) {}

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  ngOnInit() {
    this.api.getTalks().subscribe(t => this.talks = t);
  }
}
