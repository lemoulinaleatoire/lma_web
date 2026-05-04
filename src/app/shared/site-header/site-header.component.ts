import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  template: `
    <header>
      <div class="header-edstrip" aria-hidden="true">
        <span class="edstrip__no">№ 04 — MAI 2026</span>
        <span class="edstrip__bar"></span>
        <span class="edstrip__title">LE MOULIN ALÉATOIRE / ÉDITION CONTINUE</span>
        <span class="edstrip__bar"></span>
        <span class="edstrip__lang">CN · FR · EN</span>
      </div>
      <div class="header-accent-bar"></div>
      <div class="header-inner">
        <a routerLink="/" class="site-title">
          <span class="site-title-main">Le Moulin</span>
          <span class="site-title-sub">Al<span class="acc">é</span>atoire</span>
        </a>
        <nav>
          <a routerLink="/post" routerLinkActive="active"><span class="nav-num">01</span><span class="nav-label">文章</span></a>
          <a routerLink="/publication" routerLinkActive="active"><span class="nav-num">02</span><span class="nav-label">出版</span></a>
          <a routerLink="/project" routerLinkActive="active"><span class="nav-num">03</span><span class="nav-label">项目</span></a>
          <a routerLink="/resource" routerLinkActive="active"><span class="nav-num">04</span><span class="nav-label">资源</span></a>
          <a routerLink="/talk" routerLinkActive="active"><span class="nav-num">05</span><span class="nav-label">讲座</span></a>
          <a routerLink="/about" routerLinkActive="active"><span class="nav-num">06</span><span class="nav-label">关于</span></a>
          <a routerLink="/links" routerLinkActive="active"><span class="nav-num">07</span><span class="nav-label">友链</span></a>
        </nav>
        <div class="search-mini">
          <input type="text" [(ngModel)]="q" placeholder="搜索…" (keyup.enter)="search()" />
          <button (click)="search()" class="search-btn" aria-label="搜索">→</button>
        </div>
      </div>
      <div class="header-bottom-bar"></div>
    </header>
  `,
  styles: [`
    header {
      background: var(--paper);
      border-bottom: 3px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-edstrip {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      max-width: var(--max-width-wide);
      margin: 0 auto;
      padding: 0.25rem 1.5rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.66rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      background: var(--bg-deep);
      overflow: hidden;
      white-space: nowrap;
    }
    .edstrip__no { color: var(--accent); flex-shrink: 0; }
    .edstrip__title { flex-shrink: 0; }
    .edstrip__lang { margin-left: auto; color: var(--accent-ink); flex-shrink: 0; }
    .edstrip__bar {
      flex: 1 1 auto;
      height: 1px;
      background: var(--border);
      opacity: 0.4;
      min-width: 1.5rem;
    }
    .header-accent-bar {
      height: 6px;
      background: var(--accent);
    }
    .header-bottom-bar {
      height: 3px;
      background: var(--accent-yellow);
    }
    .header-inner {
      max-width: var(--max-width-wide);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.65rem 1.5rem;
      gap: 1rem;
      background: var(--paper);
    }
    .site-title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.3rem;
      color: var(--text);
      white-space: nowrap;
      line-height: 1;
      display: flex;
      align-items: baseline;
      gap: 0.35rem;
      letter-spacing: -0.04em;
    }
    .site-title-main { letter-spacing: -0.04em; }
    .site-title-sub {
      font-size: 0.85em;
      color: var(--accent);
      letter-spacing: -0.04em;
    }
    .site-title .acc {
      color: var(--accent-yellow);
      display: inline-block;
      transform: rotate(-8deg);
      transform-origin: center 60%;
    }
    .site-title:hover { text-decoration: none; background: transparent; }
    .site-title:hover .site-title-main { background: var(--accent-black); color: #fff; padding: 0 0.15em; }
    nav { display: flex; gap: 0; }
    nav a {
      padding: 0.45rem 0.7rem;
      font-size: 0.85em;
      color: var(--muted);
      font-family: var(--font-sans);
      white-space: nowrap;
      font-weight: 700;
      letter-spacing: 0.02em;
      border-right: 1px solid rgba(23,19,18,0.12);
      display: inline-flex;
      align-items: baseline;
      gap: 0.35em;
      line-height: 1;
    }
    .nav-num {
      font-family: var(--font-mono);
      font-size: 0.7em;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.1em;
    }
    .nav-label { font-weight: 700; }
    nav a:last-child { border-right: none; }
    nav a:hover, nav a.active {
      color: #fff;
      background: var(--accent-black);
      text-decoration: none;
    }
    nav a:hover .nav-num, nav a.active .nav-num { color: var(--accent-yellow); }
    .search-mini {
      display: flex;
      align-items: center;
    }
    .search-mini input {
      width: 130px;
      padding: 0.4rem 0.6rem;
      border: 2px solid var(--border);
      font-size: 0.85em;
      font-family: var(--font-sans);
      background: var(--bg);
    }
    .search-mini input:focus { outline: none; border-color: var(--accent); width: 170px; background: #fff; }
    .search-btn {
      background: var(--accent);
      color: #fff;
      border: 2px solid var(--accent);
      padding: 0.4rem 0.7rem;
      font-family: var(--font-mono);
      font-weight: 700;
      cursor: pointer;
      margin-left: -2px;
      letter-spacing: 0.05em;
    }
    .search-btn:hover { background: var(--accent-black); border-color: var(--accent-black); color: var(--accent-yellow); }
    @media (max-width: 900px) {
      .header-edstrip { display: none; }
      .nav-num { display: none; }
    }
    @media (max-width: 768px) {
      .header-inner { flex-wrap: wrap; justify-content: center; padding: 0.5rem 1rem; }
      nav { flex-wrap: wrap; justify-content: center; }
      nav a { padding: 0.35rem 0.55rem; }
      .search-mini input { width: 100px; }
      .search-mini input:focus { width: 130px; }
    }
  `]
})
export class SiteHeaderComponent {
  q = '';
  constructor(private router: Router) {}
  search() {
    if (this.q.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.q.trim() } });
    }
  }
}
