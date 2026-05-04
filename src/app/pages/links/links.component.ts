import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="page-hero">
      <div class="page-hero__halftone constr-halftone-yellow" aria-hidden="true"></div>
      <div class="page-hero__top">
        <span class="page-hero__no">№ 08 — LINKS</span>
        <span class="page-hero__rule"></span>
        <span class="page-hero__lang">EXTERNE</span>
      </div>
      <h1 class="page-hero__title">友<span class="acc">链</span></h1>
      <p class="page-hero__sub">
        <span class="page-hero__caption">Réseau —</span>
        推荐的学术站点与个人博客 / 排名不分先后
      </p>
    </div>

    <div class="constr-sect-label">
      <span class="constr-sect-label__no">№ 08·1</span>
      <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
      <span class="constr-sect-label__title">站点</span>
      <span class="constr-sect-label__rule"></span>
      <span class="constr-sect-label__meta" *ngIf="friends.length">{{ friends.length }} 个</span>
    </div>

    <div class="friends">
      <article class="friend-card" *ngFor="let f of friends; let i = index">
        <span class="friend-num">{{ pad(i + 1) }}</span>
        <img [src]="f.avatar" [alt]="f.name" class="friend-avatar" />
        <div class="friend-body">
          <a [href]="f.url" target="_blank" rel="noopener" class="friend-name">{{ f.name }}</a>
          <p class="friend-desc">{{ f.description }}</p>
        </div>
        <span class="friend-arrow" aria-hidden="true">↗</span>
      </article>
    </div>

    <div class="cta-strip">
      <div class="cta-strip__no">→</div>
      <div class="cta-strip__body">
        <div class="cta-strip__caption">EXCHANGE / 交换友链</div>
        <div class="cta-strip__title">如欲交换友链，请通过邮件或微信公众号联系</div>
      </div>
      <span class="cta-strip__triangle" aria-hidden="true"></span>
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

    .friends {
      margin: 1rem 0 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .friend-card {
      display: grid;
      grid-template-columns: 3.2rem 56px 1fr 2rem;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border: 2px solid var(--border);
      background: var(--paper);
      position: relative;
      transition: transform 0.12s, box-shadow 0.12s;
    }
    .friend-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: 5px 5px 0 0 var(--accent);
    }
    .friend-num {
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 1.4rem;
      color: var(--accent);
      letter-spacing: 0.04em;
      text-align: center;
      border-right: 2px solid var(--border);
      padding-right: 0.75rem;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .friend-avatar {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border: 2px solid var(--border);
    }
    .friend-body { min-width: 0; }
    .friend-name {
      color: var(--text);
      font-weight: 900;
      font-size: 1.05em;
      letter-spacing: -0.01em;
      display: inline-block;
    }
    .friend-name:hover {
      color: #fff;
      background: var(--accent);
      padding: 0 0.25em;
      text-decoration: none;
    }
    .friend-desc {
      margin: 0.25rem 0 0;
      color: var(--muted);
      font-size: 0.9em;
      line-height: 1.5;
    }
    .friend-arrow {
      font-family: var(--font-mono);
      font-size: 1.6rem;
      color: var(--accent);
      text-align: center;
      transition: transform 0.15s;
    }
    .friend-card:hover .friend-arrow {
      transform: translate(2px, -2px);
      color: var(--accent-black);
    }

    .cta-strip {
      display: grid;
      grid-template-columns: 4rem 1fr;
      align-items: center;
      gap: 1.25rem;
      background: var(--accent-black);
      color: #fff;
      padding: 1.25rem 1.5rem;
      position: relative;
      overflow: hidden;
    }
    .cta-strip__no {
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 2rem;
      color: var(--accent-yellow);
      text-align: center;
    }
    .cta-strip__caption {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent-yellow);
      margin-bottom: 0.35rem;
    }
    .cta-strip__title {
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #fff;
    }
    .cta-strip__triangle {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 32px 32px 0 0;
      border-color: var(--accent) transparent transparent transparent;
      pointer-events: none;
    }

    @media (max-width: 600px) {
      .page-hero__halftone { width: 140px; height: 140px; opacity: 0.16; }
      .friend-card {
        grid-template-columns: 2.5rem 48px 1fr;
        gap: 0.6rem;
        padding: 0.85rem 0.85rem;
      }
      .friend-arrow { display: none; }
      .friend-num { font-size: 1.1rem; padding-right: 0.4rem; }
      .friend-avatar { width: 48px; height: 48px; }
    }
  `]
})
export class LinksComponent implements OnInit {
  friends: any[] = [];

  constructor(private api: ApiService) {}

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  ngOnInit() {
    this.api.getFriends().subscribe(d => this.friends = d);
  }
}
