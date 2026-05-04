import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-top-bar"></div>
      <div class="footer-marquee constr-marquee" aria-hidden="true">
        <div class="constr-marquee__track">
          <span>★</span><span>偶然的风车</span><span>·</span><span>MOULIN ALÉATOIRE</span><span>·</span><span>歧路中的歧路</span><span>·</span><span>偶然唯物</span><span>·</span><span>译介·创磨·信风</span><span>·</span><span>★</span><span>偶然的风车</span><span>·</span><span>MOULIN ALÉATOIRE</span><span>·</span><span>歧路中的歧路</span><span>·</span><span>偶然唯物</span><span>·</span><span>译介·创磨·信风</span><span>·</span><span>★</span><span>偶然的风车</span><span>·</span><span>MOULIN ALÉATOIRE</span><span>·</span><span>歧路中的歧路</span><span>·</span>
        </div>
      </div>

      <div class="footer-inner">
        <div class="footer-stamp" aria-hidden="true">
          <span class="footer-stamp__no">№ 04</span>
          <span class="footer-stamp__year">— MMXXVI —</span>
          <span class="footer-stamp__edition">ÉDITION CONTINUE</span>
        </div>

        <div class="footer-brand">
          <div class="footer-brand__title">
            <span class="brand-line1">LE MOULIN</span>
            <span class="brand-line2">AL<span class="acc">É</span>ATOIRE</span>
          </div>
          <p class="footer-desc">偶然的风车 — 在流动的话语荒原上迎风而立，以译介与写作为叶片，研磨算法之外不可计算的风。</p>
        </div>

        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-col__label">站内</div>
            <a routerLink="/post">文章</a>
            <a routerLink="/publication">出版</a>
            <a routerLink="/project">项目</a>
            <a routerLink="/resource">资源</a>
          </div>
          <div class="footer-col">
            <div class="footer-col__label">关于</div>
            <a routerLink="/about">关于本站</a>
            <a routerLink="/links">友链</a>
            <a routerLink="/talk">讲座</a>
            <a href="/index.xml">RSS</a>
          </div>
          <div class="footer-col footer-col--colophon">
            <div class="footer-col__label">版式</div>
            <p class="colophon">字体：Archivo Narrow / Noto Sans SC / JetBrains Mono</p>
            <p class="colophon">视觉：1923 年 LEF 之后</p>
          </div>
        </div>

        <div class="footer-rail" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>

        <div class="footer-bottom">
          <p class="footer-license">
            原创内容采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可
          </p>
          <p class="footer-copy">Le Moulin Aléatoire © {{ year }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: var(--accent-black);
      color: #aaa;
      font-size: 0.9em;
      position: relative;
      margin-top: 4rem;
    }
    .footer-top-bar {
      height: 8px;
      background: var(--accent);
    }
    .footer-marquee {
      background: var(--accent-yellow);
      color: var(--accent-black);
      padding: 0.35rem 0;
      font-size: 0.7rem;
      border-bottom: 2px solid var(--accent-black);
    }
    .footer-marquee .constr-marquee__track {
      animation-duration: 60s;
      letter-spacing: 0.18em;
    }
    .footer-inner {
      max-width: var(--max-width-wide);
      margin: 0 auto;
      padding: 2.5rem 1.5rem 1.5rem;
      position: relative;
    }
    .footer-stamp {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 1.5rem;
    }
    .footer-stamp__no { color: var(--accent); }
    .footer-stamp__year { color: var(--accent-yellow); }
    .footer-stamp__edition { color: #aaa; }

    .footer-brand {
      margin-bottom: 2rem;
    }
    .footer-brand__title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.4rem, 7vw, 4.8rem);
      line-height: 0.92;
      letter-spacing: -0.04em;
      color: #fff;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.75rem;
    }
    .brand-line2 {
      color: var(--accent);
      padding-left: 1.5rem;
    }
    .footer-brand__title .acc {
      color: var(--accent-yellow);
      display: inline-block;
      transform: rotate(-8deg);
      transform-origin: center 60%;
    }
    .footer-desc {
      max-width: 32rem;
      color: #ccc;
      font-size: 0.95em;
      line-height: 1.55;
      margin: 0;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      padding: 1.75rem 0 1.25rem;
      border-top: 1px solid #333;
    }
    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .footer-col__label {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent-yellow);
      margin-bottom: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #333;
    }
    .footer-col a {
      color: #ddd;
      padding: 0.2rem 0;
      font-weight: 700;
      letter-spacing: 0.02em;
      font-size: 0.92em;
      transition: padding 0.12s, color 0.12s, background 0.12s;
    }
    .footer-col a::before {
      content: '→ ';
      color: var(--accent);
      font-family: var(--font-mono);
      font-weight: 700;
      opacity: 0.7;
    }
    .footer-col a:hover {
      color: var(--accent-yellow);
      background: transparent;
      padding-left: 0.4rem;
      text-decoration: none;
    }
    .footer-col a:hover::before { color: var(--accent-yellow); opacity: 1; }
    .colophon {
      margin: 0.2rem 0;
      color: #999;
      font-size: 0.85em;
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
    }

    .footer-rail {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin: 1rem 0 0.75rem;
    }
    .footer-rail span:nth-child(1) { flex: 0 0 5rem; height: 4px; background: var(--accent); }
    .footer-rail span:nth-child(2) { flex: 0 0 1rem; }
    .footer-rail span:nth-child(3) { flex: 0 0 8rem; height: 2px; background: var(--accent-yellow); }
    .footer-rail span:nth-child(4) { flex: 1; height: 1px; background: #444; }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      color: #777;
      font-size: 0.85em;
      font-family: var(--font-mono);
      letter-spacing: 0.06em;
      padding-top: 0.5rem;
    }
    .footer-bottom a {
      color: #aaa;
      text-decoration: underline;
      text-decoration-color: var(--accent);
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }
    .footer-bottom a:hover {
      color: #fff;
      background: transparent;
      text-decoration-color: var(--accent-yellow);
    }

    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-bottom { flex-direction: column; }
      .footer-brand__title { font-size: clamp(2rem, 12vw, 3rem); }
      .brand-line2 { padding-left: 0.75rem; }
    }
  `]
})
export class SiteFooterComponent {
  year = new Date().getFullYear();
}
