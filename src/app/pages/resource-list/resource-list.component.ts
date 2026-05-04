import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService, ArticleMeta } from '../../services/api.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone-red" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 05 — RESOURCES</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">OPEN · CC</span>
      </div>
      <h1 class="page-hero__title">资<span class="acc">源</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Archive —</span>
        术语表、课程笔记、开放资料
      </p>
    </div>

    <div class="constr-sect-label">
      <span class="constr-sect-label__no">№ 05·1</span>
      <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
      <span class="constr-sect-label__title">条目</span>
      <span class="constr-sect-label__rule"></span>
      <span class="constr-sect-label__meta" *ngIf="resources.length">{{ resources.length }} 条</span>
    </div>

    <div class="resource-grid">
      <article class="resource-card" *ngFor="let r of resources; let i = index">
        <div class="resource-card__no">
          <span class="num">{{ pad(i + 1) }}</span>
        </div>
        <div class="resource-card__body">
          <div class="resource-card__head">
            <h3>{{ r.title }}</h3>
            <span class="cat-chip" *ngFor="let c of r['categories']">{{ c }}</span>
          </div>
          <p class="meta">
            <span class="meta-label">日期</span>
            <span class="meta-value">{{ r.date | date:'yyyy-MM-dd' }}</span>
          </p>
          <p *ngIf="r.html" class="excerpt" [innerHTML]="excerpt(r.html)"></p>
        </div>
      </article>
    </div>

    <p *ngIf="!resources.length" class="empty">暂无资源</p>
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

    .resource-grid { display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem; }
    .resource-card {
      display: grid;
      grid-template-columns: 5rem 1fr;
      background: var(--paper);
      border: 2px solid var(--border);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .resource-card:hover {
      transform: translate(-2px, -2px);
      box-shadow: 5px 5px 0 0 var(--accent);
    }
    .resource-card__no {
      background: var(--accent);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 1.6rem;
      letter-spacing: 0.05em;
    }
    .resource-card__body {
      padding: 1.1rem 1.4rem;
    }
    .resource-card__head {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }
    .resource-card__head h3 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 900;
      letter-spacing: -0.01em;
    }
    .cat-chip {
      display: inline-block;
      padding: 0.18em 0.55em;
      background: var(--accent-yellow);
      color: var(--accent-black);
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.66rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .meta {
      display: inline-flex;
      gap: 0.4em;
      align-items: baseline;
      font-family: var(--font-mono);
      font-size: 0.75em;
      margin: 0 0 0.55rem;
    }
    .meta-label {
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.9em;
    }
    .meta-value { color: var(--text); font-weight: 700; }
    .excerpt {
      margin: 0;
      color: var(--muted);
      font-size: 0.92em;
      line-height: 1.6;
    }
    .excerpt ::ng-deep p { margin: 0; }

    .empty {
      padding: 2rem;
      text-align: center;
      background: var(--paper);
      border: 2px solid var(--border);
      color: var(--muted);
      font-weight: 700;
    }

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.12; }
      .resource-card { grid-template-columns: 3.5rem 1fr; }
      .resource-card__no { font-size: 1.2rem; }
    }
  `]
})
export class ResourceListComponent implements OnInit {
  resources: ArticleMeta[] = [];

  constructor(private api: ApiService) {}

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  excerpt(html: string): string {
    const text = html.replace(/<[^>]+>/g, '').trim();
    return text.length > 180 ? text.slice(0, 180) + '...' : text;
  }

  ngOnInit() {
    this.api.getResources().subscribe(r => this.resources = r);
  }
}
