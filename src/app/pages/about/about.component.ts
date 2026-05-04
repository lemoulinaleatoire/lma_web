import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-hero">
      <div class="about-hero__halftone constr-halftone-red" aria-hidden="true"></div>
      <div class="about-hero__top">
        <span class="about-hero__no">№ 07 — ABOUT</span>
        <span class="about-hero__rule"></span>
        <span class="about-hero__lang">MANIFESTO</span>
      </div>
      <h1 class="about-hero__title">
        <span class="line1">LE MOULIN</span>
        <span class="line2">AL<span class="acc">É</span>ATOIRE</span>
      </h1>
      <p class="about-hero__sub">
        <span class="about-hero__caption">Concept —</span>
        <strong>偶然的风车</strong>是一座迎风而立的磨坊——以译介与写作为叶片，研磨流动话语之下不可计算的风
      </p>
    </div>

    <div class="about-grid">
      <div class="about-block">
        <div class="block-no" aria-hidden="true">01</div>
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 07·1</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">我是谁</span>
          <span class="constr-sect-label__rule"></span>
        </div>
        <ul>
          <li><strong>译者</strong> ─ 系统译介当代欧陆哲学、批判理论与人文社科的关键文本，让异域的星火借汉语再次燃烧</li>
          <li><strong>研究者</strong> ─ 在偶然唯物主义的视野下，于哲学、社会理论与科学技术研究的歧路里再开一条歧路</li>
          <li><strong>写作者</strong> ─ 拒绝填充中产书架的姿态，把书写当作面向崭新未来的长程战略，而非应景的策略</li>
        </ul>
      </div>

      <div class="about-block">
        <div class="block-no" aria-hidden="true">02</div>
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 07·2</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">关注什么</span>
          <span class="constr-sect-label__rule"></span>
        </div>
        <ul>
          <li>偶然唯物主义视野下的当代理论与历史问题</li>
          <li>欧陆哲学、批判理论、马克思主义传统在汉语世界的转译与再生</li>
          <li>科学技术研究、媒介与算法批判，以及未来主义—加速主义的诸种支流</li>
          <li>翻译作为方法论，也作为政治姿态：在沉默的虚空中高声言说</li>
        </ul>
      </div>
    </div>

    <div class="about-block full">
      <div class="block-no" aria-hidden="true">03</div>
      <div class="constr-sect-label">
        <span class="constr-sect-label__no">№ 07·3</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">本博客</span>
        <span class="constr-sect-label__rule"></span>
      </div>
      <div class="block-content">
        <p>本站所有原创内容均采用 <strong>CC BY-NC-SA 4.0</strong> 许可协议发布；译文根据原文授权情况，通常采用 <strong>CC BY-NC 4.0</strong>。如无特别说明，所有翻译均为本人译出，引用请注明出处。</p>
        <p class="meta-line"><span class="meta-key">微信公众号</span><code>le_moulin_aleatoire</code></p>
        <p><img src="/img/qrcode-wechat.jpg" alt="微信公众号二维码" class="qr-code"></p>
      </div>
    </div>

    <div class="about-block full cta">
      <div class="block-no block-no--inverse" aria-hidden="true">04</div>
      <div class="constr-sect-label cta-sect">
        <span class="constr-sect-label__no">№ 07·4</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick cta-rule"></span>
        <span class="constr-sect-label__title cta-title">参与与协作</span>
        <span class="constr-sect-label__rule cta-rule-thin"></span>
      </div>
      <div class="block-content">
        <p>本博客的翻译项目、术语表、资源库均开放协作。如果你认同这座风车迎风而立的姿态，愿意一同修缮叶片，欢迎通过邮件或 GitHub Issue 与我联系。</p>
        <p class="meta-line"><span class="meta-key">📧</span><code class="cta-code">yourname&#64;example.com</code></p>
      </div>
      <span class="cta-triangle" aria-hidden="true"></span>
    </div>
  `,
  styles: [`
    .about-hero {
      position: relative;
      padding: 2rem 0 2.5rem;
      margin-bottom: 2rem;
      border-bottom: 3px solid var(--border);
      overflow: hidden;
    }
    .about-hero__halftone {
      position: absolute;
      top: -2rem;
      right: -2rem;
      width: 260px;
      height: 260px;
      opacity: 0.18;
      pointer-events: none;
    }
    .about-hero__top {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.85rem;
    }
    .about-hero__no { color: var(--accent); }
    .about-hero__lang { color: var(--accent-ink); }
    .about-hero__rule {
      flex: 1 1 auto;
      height: 1px;
      background: var(--border);
      opacity: 0.4;
      max-width: 14rem;
    }
    .about-hero__title {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.6rem, 9vw, 6rem);
      letter-spacing: -0.045em;
      line-height: 0.92;
      margin: 0 0 0.85rem;
      display: flex;
      flex-direction: column;
      color: var(--text);
    }
    .about-hero__title .line2 {
      color: var(--accent);
      padding-left: 1.5rem;
    }
    .about-hero__title .acc {
      color: var(--accent-yellow);
      display: inline-block;
      transform: rotate(-8deg);
      transform-origin: center 60%;
    }
    .about-hero__sub {
      display: flex;
      align-items: baseline;
      gap: 0.7rem;
      font-size: 1.05rem;
      color: var(--muted);
      font-weight: 500;
      margin: 0;
      border-left: 6px solid var(--accent-yellow);
      padding-left: 0.85rem;
      max-width: 36rem;
    }
    .about-hero__sub strong { color: var(--accent); }
    .about-hero__caption {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
      flex-shrink: 0;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .about-block {
      background: var(--paper);
      border: 3px solid var(--border);
      padding: 1.5rem 1.75rem;
      position: relative;
      overflow: hidden;
    }
    .about-block.full { grid-column: 1 / -1; }
    .about-block.cta {
      background: var(--accent-black);
      color: #ddd;
      border-color: var(--accent-black);
    }
    .block-no {
      position: absolute;
      top: 0.6rem;
      right: 1rem;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 4rem;
      line-height: 1;
      color: rgba(214, 40, 40, 0.12);
      letter-spacing: -0.04em;
      pointer-events: none;
    }
    .block-no--inverse { color: rgba(245, 183, 0, 0.18); }
    .about-block .constr-sect-label { margin-top: 0; }
    .about-block ul {
      list-style: none;
      padding: 0;
    }
    .about-block li {
      margin-bottom: 0.85rem;
      line-height: 1.7;
      padding-left: 1.25rem;
      position: relative;
    }
    .about-block li::before {
      content: '■';
      position: absolute;
      left: 0;
      top: 0;
      color: var(--accent);
      font-size: 0.7em;
      transform: translateY(0.5em);
    }
    .about-block strong { color: var(--accent); }
    .about-block.cta strong { color: var(--accent-yellow); }
    .about-block.cta .constr-sect-label__title.cta-title { color: var(--accent-yellow); }
    .about-block.cta .constr-sect-label__no { color: var(--accent-yellow); }
    .about-block.cta .cta-rule { background: var(--accent-yellow); }
    .about-block.cta .cta-rule-thin { background: #555; opacity: 1; }

    .block-content { margin-top: 0.75rem; }
    .meta-line {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      font-family: var(--font-mono);
      font-size: 0.9em;
    }
    .meta-key {
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-size: 0.85em;
    }
    .about-block.cta .meta-key { color: var(--accent-yellow); }
    code {
      background: var(--accent-black);
      color: var(--accent-yellow);
      padding: 0.15em 0.5em;
      font-family: var(--font-mono);
      font-weight: 700;
    }
    .cta-code {
      background: var(--accent);
      color: #fff;
    }
    .qr-code {
      max-width: 200px;
      border: 3px solid var(--border);
      display: block;
      margin-top: 0.5rem;
    }

    .cta-triangle {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 36px 36px;
      border-color: transparent transparent var(--accent) transparent;
      pointer-events: none;
    }

    @media (max-width: 600px) {
      .about-grid { grid-template-columns: 1fr; }
      .about-hero__title { font-size: clamp(2rem, 13vw, 3rem); }
      .about-hero__title .line2 { padding-left: 0.75rem; }
      .block-no { font-size: 2.6rem; }
      .about-block { padding: 1.25rem 1.25rem; }
    }
  `]
})
export class AboutComponent {}
