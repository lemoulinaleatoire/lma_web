import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, ArticleMeta } from '../../services/api.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, RouterLink],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 04 — PROJECTS</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">IN PROGRESS</span>
      </div>
      <h1 class="page-hero__title">项<span class="acc">目</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Atelier —</span>
        进行中的翻译与研究计划
      </p>
    </div>

    <div class="constr-sect-label">
      <span class="constr-sect-label__no">№ 04·1</span>
      <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
      <span class="constr-sect-label__title">在册</span>
      <span class="constr-sect-label__rule"></span>
      <span class="constr-sect-label__meta" *ngIf="projects.length">{{ projects.length }} 项</span>
    </div>

    <div class="project-grid">
      <article class="project-card" *ngFor="let p of projects; let i = index">
        <div class="project-card__no">
          <span class="num">{{ pad(i + 1) }}</span>
          <span class="kind">PROJECT</span>
        </div>
        <div class="project-card__body">
          <h3><a [routerLink]="['/project', p.slug]">{{ p.title }}</a></h3>
          <p class="meta">
            <span class="meta-label">日期</span>
            <span class="meta-value">{{ p.date | date:'yyyy-MM-dd' }}</span>
          </p>
          <p class="summary" *ngIf="p.summary">{{ p.summary }}</p>
        </div>
        <span class="project-card__triangle" aria-hidden="true"></span>
      </article>
    </div>

    <p *ngIf="!projects.length" class="empty">暂无项目</p>
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

    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .project-card {
      display: grid;
      grid-template-columns: 4.5rem 1fr;
      background: var(--paper);
      border: 3px solid var(--border);
      position: relative;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .project-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 0 var(--accent);
    }
    .project-card__no {
      background: var(--accent-black);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0.5rem;
      font-family: var(--font-mono);
      font-weight: 700;
    }
    .project-card__no .num {
      font-size: 1.6rem;
      color: var(--accent-yellow);
      letter-spacing: 0.04em;
    }
    .project-card__no .kind {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      color: #aaa;
    }
    .project-card__body {
      padding: 1.25rem 1.5rem;
      flex: 1;
    }
    .project-card__body h3 {
      margin: 0 0 0.6rem;
      font-size: 1.2rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      line-height: 1.25;
    }
    .project-card__body h3 a { color: var(--text); }
    .project-card__body h3 a:hover {
      color: #fff;
      background: var(--accent);
      padding: 0 0.2em;
      text-decoration: none;
    }
    .meta {
      display: inline-flex;
      align-items: baseline;
      gap: 0.4em;
      font-family: var(--font-mono);
      font-size: 0.75em;
      letter-spacing: 0.05em;
      margin: 0 0 0.6rem;
    }
    .meta-label {
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.9em;
    }
    .meta-value { color: var(--text); font-weight: 700; }
    .summary {
      margin: 0;
      color: var(--muted);
      font-size: 0.92em;
      line-height: 1.55;
    }
    .project-card__triangle {
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
      .project-card { grid-template-columns: 3.5rem 1fr; }
      .project-card__no .num { font-size: 1.3rem; }
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: ArticleMeta[] = [];

  constructor(private api: ApiService) {}

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  ngOnInit() {
    this.api.getProjects().subscribe(p => this.projects = p);
  }
}
