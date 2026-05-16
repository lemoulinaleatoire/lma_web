import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ApiService, ArticleMeta } from '../../services/api.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, ArticleCardComponent],
  template: `
    <div class="hero-strip" aria-hidden="false">
      <div class="hero-strip__no">№ 04 — MAI 2026 — ÉDITION CONTINUE</div>
      <div class="hero-strip__marquee constr-marquee" aria-hidden="true">
        <div class="constr-marquee__track">
          <span>偶然的风车</span><span>·</span><span>MOULIN</span><span>·</span><span>ALÉATOIRE</span><span>·</span><span>歧路中的歧路</span><span>·</span><span>译介</span><span>·</span><span>创磨</span><span>·</span><span>信风</span><span>·</span><span>偶然唯物</span><span>·</span><span>VENT</span><span>·</span><span>偶然的风车</span><span>·</span><span>MOULIN</span><span>·</span><span>ALÉATOIRE</span><span>·</span><span>歧路中的歧路</span><span>·</span><span>译介</span><span>·</span><span>创磨</span><span>·</span><span>信风</span><span>·</span><span>偶然唯物</span><span>·</span><span>VENT</span><span>·</span>
        </div>
      </div>
    </div>

    <section class="hero">
      <div class="hero-diagonal" aria-hidden="true"></div>
      <div class="hero-halftone constr-halftone-red" aria-hidden="true"></div>
      <div class="hero-vlabel" aria-hidden="true">МАНИФЕСТ — RU/CN/EN — 2026</div>

      <div class="hero-geo" aria-hidden="true">
        <div class="geo-circle"></div>
        <div class="geo-bar"></div>
        <div class="geo-triangle"></div>
        <div class="geo-square"></div>
      </div>

      <div class="hero-content">
        <div class="hero-meta">
          <span class="hero-meta__no">01 / SUBJECT</span>
          <span class="hero-meta__rule"></span>
          <span class="hero-meta__date">2026 · 05</span>
        </div>

        <h1 class="hero-title">
          <span class="line1">Le Moulin</span>
          <span class="line2">Al<span class="acc">é</span>atoire</span>
        </h1>

        <p class="hero-sub">
          <span class="hero-sub__caption">Subject —</span>
          <span class="hero-sub__text">偶然的风车 — 在流动的话语荒原上重建一座磨坊，迎风修缮叶片</span>
        </p>

        <div class="hero-actions">
          <a routerLink="/post" class="constr-btn">→ 阅读文章</a>
          <a routerLink="/about" class="constr-btn-outline">→ 关于本站</a>
        </div>
      </div>

      <div class="hero-railway" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
    </section>

    <section class="section">
      <div class="constr-sect-label">
        <span class="constr-sect-label__no">№ 02</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">最新文章</span>
        <span class="constr-sect-label__rule"></span>
        <span class="constr-sect-label__meta">{{ posts.length }} 篇</span>
      </div>

      <div class="category-tabs">
        <a routerLink="/post" [queryParams]="{category:'yifang'}" class="tab tab-red">译坊</a>
        <a routerLink="/post" [queryParams]="{category:'chuangmo'}" class="tab tab-yellow">创磨</a>
        <a routerLink="/post" [queryParams]="{category:'xinfeng'}" class="tab tab-black">信风</a>
      </div>

      <div class="featured-wrap" *ngIf="posts.length">
        <div class="featured-wrap__no">01</div>
        <div class="featured-wrap__card">
          <app-article-card [article]="posts[0]" linkPrefix="/post"></app-article-card>
        </div>
        <div class="featured-wrap__tag">FEATURED</div>
      </div>

      <div class="indexed-list" *ngIf="posts.length > 1">
        <div class="indexed-row" *ngFor="let p of posts.slice(1); let i = index">
          <div class="indexed-row__no">{{ pad(i + 2) }}</div>
          <div class="indexed-row__body">
            <app-article-card [article]="p" linkPrefix="/post"></app-article-card>
          </div>
        </div>
      </div>

      <a routerLink="/post" class="cta-strip" *ngIf="posts.length">
        <span class="cta-strip__main">查看全部文章</span>
        <span class="cta-strip__meta">ARCHIVE · 译坊 · 创磨 · 信风</span>
        <span class="cta-strip__arrow">→</span>
      </a>
    </section>

    <section class="section" *ngIf="talks.length">
      <div class="constr-sect-label">
        <span class="constr-sect-label__no">№ 03</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">近期讲座</span>
        <span class="constr-sect-label__rule"></span>
        <span class="constr-sect-label__meta">{{ talks.length }} 场</span>
      </div>
      <ul class="article-list">
        <app-article-card *ngFor="let t of talks" [article]="t" linkPrefix="/talk"></app-article-card>
      </ul>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* ===== 顶部工业带 ===== */
    .hero-strip {
      margin: -2rem calc(50% - 50vw) 0;
      display: flex;
      align-items: stretch;
      background: var(--accent-black);
      color: #fff;
      border-bottom: 3px solid var(--border);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      overflow: hidden;
    }
    .hero-strip__no {
      flex: 0 0 auto;
      padding: 0.7rem 1.25rem;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      white-space: nowrap;
    }
    .hero-strip__marquee {
      flex: 1;
      padding: 0.7rem 0;
      color: var(--accent-yellow);
    }

    /* ===== Hero ===== */
    .hero {
      position: relative;
      margin: 0 calc(50% - 50vw);
      padding: 5rem 0 3.5rem;
      overflow: hidden;
      background: var(--paper);
      border-bottom: 3px solid var(--border);
      margin-bottom: 3.5rem;
    }
    .hero-diagonal {
      position: absolute; inset: 0;
      background: repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(214,40,40,0.05) 5px, rgba(214,40,40,0.05) 9px);
      z-index: 0;
      pointer-events: none;
    }
    .hero-halftone {
      position: absolute;
      bottom: 0; left: 0;
      width: 38%; height: 55%;
      z-index: 1;
      pointer-events: none;
      opacity: 0.18;
    }
    .hero-vlabel {
      position: absolute;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      writing-mode: vertical-rl;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      white-space: nowrap;
      z-index: 4;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 5;
      max-width: var(--max-width-wide);
      margin: 0 auto;
      padding: 0 2rem;
    }
    .hero-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .hero-meta__no { color: var(--accent); }
    .hero-meta__rule { flex: 0 0 4rem; height: 1px; background: var(--border); opacity: 0.5; }
    .hero-meta__date { color: var(--muted); }

    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(3.2rem, 11.5vw, 9.5rem);
      font-weight: 900;
      line-height: 0.88;
      letter-spacing: -0.04em;
      margin-bottom: 1.75rem;
      position: relative;
      z-index: 6;
    }
    .hero-title .line1 { display: block; color: var(--text); }
    .hero-title .line2 {
      display: block;
      color: var(--accent);
      margin-left: clamp(1rem, 5vw, 4rem);
      margin-top: -0.05em;
    }
    .hero-title .acc {
      color: var(--accent-yellow);
      display: inline-block;
      transform: rotate(-8deg) translateY(-0.04em);
      transform-origin: 50% 60%;
    }

    .hero-sub {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 1.1rem;
      color: var(--text);
      margin-bottom: 2.5rem;
      font-weight: 500;
      max-width: 540px;
      border-left: 6px solid var(--accent-yellow);
      padding: 0.4rem 0 0.4rem 1.25rem;
    }
    .hero-sub__caption {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.7rem;
      color: var(--accent);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .hero-sub__text { line-height: 1.5; }

    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* 几何叠印 */
    .hero-geo {
      position: absolute;
      top: 50%;
      right: 7%;
      transform: translateY(-50%);
      z-index: 3;
      width: 360px;
      height: 360px;
      pointer-events: none;
    }
    .hero-geo > * { position: absolute; mix-blend-mode: multiply; }
    .geo-circle { top: 0; right: 60px; width: 200px; height: 200px; background: var(--accent); border-radius: 50%; }
    .geo-bar { top: 165px; left: 0; width: 280px; height: 28px; background: var(--accent-yellow); }
    .geo-triangle { bottom: 30px; right: 20px; width: 0; height: 0; border-style: solid; border-width: 0 0 100px 100px; border-color: transparent transparent var(--accent-black) transparent; }
    .geo-square { bottom: 18px; left: 100px; width: 50px; height: 50px; background: var(--accent-ink); transform: rotate(15deg); }

    /* 钢轨分隔 */
    .hero-railway {
      position: relative;
      z-index: 5;
      max-width: var(--max-width-wide);
      margin: 3rem auto 0;
      padding: 0 2rem;
      display: flex;
      align-items: center;
    }
    .hero-railway > span { display: block; }
    .hero-railway > span:nth-child(1) { flex: 0 0 18%; height: 8px; background: var(--accent-black); }
    .hero-railway > span:nth-child(2) { flex: 0 0 4rem; height: 14px; background: var(--accent); margin: 0 0.75rem; }
    .hero-railway > span:nth-child(3) { flex: 0 0 8rem; height: 4px; background: var(--accent-yellow); margin-right: 0.75rem; }
    .hero-railway > span:nth-child(4) { flex: 1; height: 1px; background: var(--border); opacity: 0.55; }

    /* ===== Section / 文章列表 ===== */
    .section { margin-top: 3rem; }

    .category-tabs { display: flex; gap: 0; margin: -0.5rem 0 1rem; }
    .tab {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      padding: 0.4rem 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border: 2px solid var(--border);
      margin-left: -2px;
      color: var(--text);
    }
    .tab:first-child { margin-left: 0; }
    .tab:hover { text-decoration: none; background: var(--accent-black); color: #fff; border-color: var(--accent-black); position: relative; z-index: 1; }
    .tab-red { background: var(--accent); color: #fff; border-color: var(--accent); }
    .tab-red:hover { background: #fff; color: var(--accent); }
    .tab-yellow { background: var(--accent-yellow); color: var(--accent-black); border-color: var(--accent-yellow); }
    .tab-yellow:hover { background: #fff; color: var(--accent-black); border-color: var(--accent-black); }
    .tab-black { background: var(--accent-black); color: #fff; border-color: var(--accent-black); }
    .tab-black:hover { background: #fff; color: var(--accent-black); }

    /* Featured 头条 */
    .featured-wrap {
      position: relative;
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      padding: 1.5rem 1.5rem 1.5rem 1.25rem;
      background: var(--paper);
      border: 3px solid var(--border);
      margin: 1.5rem 0 1rem;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%);
    }
    .featured-wrap__no {
      flex: 0 0 auto;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 4.5rem;
      line-height: 0.85;
      color: var(--accent);
      letter-spacing: -0.05em;
      padding-top: 0.6rem;
    }
    .featured-wrap__card { flex: 1; min-width: 0; }
    .featured-wrap__card ::ng-deep .article-card-item {
      border-bottom: none;
      padding: 0;
    }
    .featured-wrap__card ::ng-deep .article-card-item::before { display: none; }
    .featured-wrap__tag {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--accent);
      color: #fff;
      padding: 0.3rem 0.8rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      z-index: 2;
    }

    /* Indexed list */
    .indexed-list { margin: 0; }
    .indexed-row { display: flex; gap: 1rem; align-items: stretch; }
    .indexed-row__no {
      flex: 0 0 2.5rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--muted);
      letter-spacing: 0.1em;
      padding-top: 1.65rem;
    }
    .indexed-row__body { flex: 1; min-width: 0; }

    /* CTA strip */
    .cta-strip {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      background: var(--accent-black);
      color: #fff;
      padding: 1.25rem 1.5rem;
      margin-top: 2.5rem;
      font-family: var(--font-sans);
      position: relative;
      border: 3px solid var(--accent-black);
      transition: background 0.18s, color 0.18s, transform 0.15s, box-shadow 0.15s, border-color 0.18s;
    }
    .cta-strip__main { font-weight: 900; font-size: 1.1rem; letter-spacing: -0.01em; flex-shrink: 0; }
    .cta-strip__meta {
      flex: 1;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      color: var(--accent-yellow);
      text-transform: uppercase;
    }
    .cta-strip__arrow {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--accent-yellow);
      transition: transform 0.2s;
    }
    .cta-strip:hover {
      background: var(--accent);
      color: #fff;
      text-decoration: none;
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0 0 var(--accent-yellow);
      border-color: var(--accent);
    }
    .cta-strip:hover .cta-strip__arrow { transform: translateX(8px); color: #fff; }
    .cta-strip:hover .cta-strip__meta { color: #fff; }

    /* ===== 响应式 ===== */
    @media (max-width: 900px) {
      .hero-geo {
        width: 220px; height: 220px;
        right: 1rem; top: 1rem; transform: none;
      }
      .geo-circle { width: 120px; height: 120px; right: 0; top: 0; }
      .geo-bar { width: 170px; height: 18px; top: 100px; }
      .geo-triangle { border-width: 0 0 60px 60px; bottom: 10px; right: 5px; }
      .geo-square { width: 30px; height: 30px; left: 60px; bottom: 0; }
      .hero-vlabel { display: none; }
    }
    @media (max-width: 600px) {
      .hero { padding: 3rem 0 2.5rem; margin-bottom: 2.5rem; }
      .hero-content { padding: 0 1rem; }
      .hero-railway { padding: 0 1rem; }
      .hero-strip__no { font-size: 0.7rem; padding: 0.55rem 0.85rem; }
      .hero-strip__marquee { font-size: 0.7rem; }
      .featured-wrap { flex-direction: column; gap: 0.75rem; padding: 1rem; }
      .featured-wrap__no { font-size: 3rem; padding-top: 0; }
      .indexed-row__no { flex: 0 0 1.75rem; font-size: 0.72rem; padding-top: 1.7rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  posts: ArticleMeta[] = [];
  talks: ArticleMeta[] = [];

  private konamiBuffer: string[] = [];
  private readonly konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  private konamiTriggered = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getPosts({ limit: 6 }).subscribe(r => this.posts = r.posts);
    this.api.getTalks().subscribe(t => this.talks = t.slice(0, 3));
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.konamiTriggered) return;
    this.konamiBuffer.push(e.key);
    if (this.konamiBuffer.length > this.konamiCode.length) {
      this.konamiBuffer.shift();
    }
    if (this.konamiBuffer.length === this.konamiCode.length &&
        this.konamiBuffer.every((k, i) => k === this.konamiCode[i])) {
      this.konamiTriggered = true;
      this.router.navigate(['/test']);
    }
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }
}
