import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  generateResult, TestResult, Thinker,
  PATH_LABELS, PATH_DESCRIPTIONS, DIMENSION_LABELS,
  decodeAnswers, Path, Dimension,
  THINKERS, THINKER_COORDS
} from './test-data';

interface BookCluster {
  thinkerName: string;
  thinkerInfo: Thinker | null;
  books: ClusterBook[];
  isBonus: boolean;
}

interface ClusterBook {
  title: string;
  author: string;
  note?: string;
  thinker: string;
  expanded: boolean;
}

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink],
  template: `
    <ng-container *ngIf="result">
      <!-- 顶部带 -->
      <div class="result-hero">
        <div class="result-hero__no">№ X — RÉSULTAT</div>
        <div class="result-hero__marquee constr-marquee" aria-hidden="true">
          <div class="constr-marquee__track">
            <span>你的思想星丛</span><span>·</span><span>CONSTELLATION</span><span>·</span><span>{{ dominantPathLabel }}</span><span>·</span><span>{{ dominantDimLabel }}</span><span>·</span>
          </div>
        </div>
      </div>

      <!-- 标题区 -->
      <div class="result-title-block">
        <div class="geo-deco" aria-hidden="true">
          <span class="geo-circle"></span>
          <span class="geo-bar"></span>
          <span class="geo-triangle"></span>
        </div>
        <h1 class="result-title">你的思想星丛</h1>
        <p class="result-subtitle">{{ result.description }}</p>
      </div>

      <!-- 四路径得分 -->
      <section class="result-section">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 01</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">四路径得分</span>
        </div>
        <div class="path-combined">
          <div class="path-combined__bar">
            <div class="path-combined__seg"
                 *ngFor="let entry of pathEntries"
                 [style.flex-grow]="entry.score"
                 [style.flex-basis]="0"
                 [style.background]="pathColor(entry.path)"
                 [attr.title]="entry.label + ': ' + entry.score + '/30'">
              <span class="path-combined__label" *ngIf="entry.score >= 5">{{ entry.label }}</span>
            </div>
          </div>
          <div class="path-combined__legend">
            <span class="path-combined__legend-item" *ngFor="let entry of pathEntries">
              <span class="path-combined__swatch" [style.background]="pathColor(entry.path)"></span>
              {{ entry.label }} {{ entry.score }}/30 — {{ pathDescriptions[entry.path] }}
            </span>
          </div>
        </div>
      </section>

      <!-- 维度分析 -->
      <section class="result-section">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 02</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">四维度分析</span>
        </div>
        <div class="dim-grid">
          <div class="dim-card" *ngFor="let dim of dimensionEntries">
            <div class="dim-card__header">
              <span class="dim-card__name">{{ dim.label }}</span>
              <span class="dim-card__path-tag">{{ dim.pathLabel }}</span>
            </div>
            <div class="dim-card__bar">
              <div class="dim-card__fill" [style.width.%]="(dim.score / dim.maxScore) * 100"></div>
            </div>
            <p class="dim-card__desc">{{ dim.description }}</p>
          </div>
        </div>
      </section>

      <!-- 星丛雷达图 -->
      <section class="result-section">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 03</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">维度星丛图</span>
        </div>
        <p class="constellation-intro">
          你和四位思想家在四个维度上的画像叠加——没有一个思想家只属于单一象限，所有人都在同一张多轴空间中浮动、靠近或远离。
        </p>
        <div class="radar-chart">
          <svg viewBox="-25 -25 290 290" class="radar-chart__svg">
            <!-- 辅助网格 -->
            <g class="radar-grid" *ngFor="let level of [25, 50, 75, 100]">
              <polygon
                [attr.points]="gridPolygon(level)"
                [class.radar-grid--main]="level === 100"
                [class.radar-grid--half]="level === 50" />
            </g>
            <!-- 轴线和标签 -->
            <line *ngFor="let axis of radarAxes"
              [attr.x1]="100" [attr.y1]="100"
              [attr.x2]="axis.labelX" [attr.y2]="axis.labelY"
              stroke="var(--border)" stroke-width="1" />
            <!-- 思想家多边形 -->
            <polygon *ngFor="let ts of thinkerRadarSeries; let i = index"
              [attr.points]="ts.points"
              fill="none"
              [attr.stroke]="ts.color"
              stroke-width="1.5"
              stroke-dasharray="4,3"
              opacity="0.7" />
            <!-- 用户多边形（实线填充） -->
            <polygon
              [attr.points]="userRadarPoints"
              fill="var(--accent)"
              fill-opacity="0.18"
              stroke="var(--accent)"
              stroke-width="2.5" />
            <!-- 用户数据点 -->
            <circle *ngFor="let pt of userRadarDots"
              [attr.cx]="pt.x" [attr.cy]="pt.y" r="2.5"
              fill="var(--accent)" stroke="#fff" stroke-width="1" />
            <!-- 轴标签 -->
            <text *ngFor="let axis of radarAxes"
              [attr.x]="axis.labelX" [attr.y]="axis.labelY"
              text-anchor="middle"
              dominant-baseline="middle"
              class="radar-axis-label">{{ axis.label }}</text>
          </svg>
          <!-- 图例 -->
          <div class="radar-legend">
            <span class="radar-legend__item radar-legend__item--user">
              <span class="radar-legend__swatch radar-legend__swatch--user"></span>你
            </span>
            <span class="radar-legend__item" *ngFor="let ts of thinkerRadarSeries; let i = index">
              <span class="radar-legend__swatch" [style.background]="ts.color"></span>
              {{ ts.name }}
            </span>
          </div>
        </div>
      </section>

      <!-- 思想家星丛 -->
      <section class="result-section">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 04</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">你的思想家星丛</span>
        </div>
        <p class="constellation-intro">
          根据你在四个维度和四条路径上的选择，以下四位思想家构成了你此刻的"星丛"——他们并不组成一个"流派"，而是以你独特的思考方式排列在一起。
        </p>
        <div class="thinker-cards">
          <div class="thinker-card" *ngFor="let thinker of result.thinkers; let i = index">
            <div class="thinker-card__rank">{{ pad(i + 1) }}</div>
            <div class="thinker-card__body">
              <h3 class="thinker-card__name">{{ thinker.name }}</h3>
              <p class="thinker-card__en">{{ thinker.nameEn }}</p>
              <p class="thinker-card__bio">{{ thinker.shortBio }}</p>
              <blockquote class="thinker-card__key">{{ thinker.keyIdea }}</blockquote>
            </div>
          </div>
        </div>
      </section>

      <!-- 个性化阅读星丛 -->
      <section class="result-section">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 05</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">个性化阅读星丛</span>
        </div>
        <p class="constellation-intro">
          以下书单根据你的思想星丛定制。每个"星丛"对应一位思想家或一条推荐线索——点击书籍卡片展开阅读指南。不必全部读完，选择最让你好奇的一本开始。
        </p>

        <!-- 路径光谱 -->
        <div class="spectrum-strip">
          <div class="spectrum-strip__label">覆盖路径</div>
          <div class="spectrum-strip__bar">
            <div class="spectrum-strip__seg"
                 *ngFor="let seg of spectrumSegments"
                 [style.flex]="seg.weight"
                 [style.background]="seg.color"
                 [attr.title]="seg.label + ' ' + seg.weight"></div>
          </div>
          <div class="spectrum-strip__legend">
            <span *ngFor="let seg of spectrumSegments" class="spec-legend">
              <span class="spec-legend__swatch" [style.background]="seg.color"></span>
              {{ seg.label }}({{ seg.count }})
            </span>
          </div>
        </div>

        <!-- 星丛卡片 -->
        <div class="const-cards">
          <div class="const-cluster" *ngFor="let cluster of bookClusters"
               [class.const-cluster--bonus]="cluster.isBonus">
            <!-- 星丛头部 -->
            <div class="const-cluster__head">
              <span class="const-cluster__icon" *ngIf="!cluster.isBonus">✦</span>
              <span class="const-cluster__icon const-cluster__icon--bonus" *ngIf="cluster.isBonus">＋</span>
              <span class="const-cluster__name">{{ cluster.thinkerName }}</span>
              <span class="const-cluster__tag"
                    *ngIf="cluster.thinkerInfo"
                    [style.background]="pathColor(cluster.thinkerInfo.primaryPath)">
                {{ PATH_LABELS[cluster.thinkerInfo.primaryPath] }}
              </span>
              <span class="const-cluster__tag const-cluster__tag--bonus" *ngIf="cluster.isBonus">因你选择</span>
              <span class="const-cluster__count">{{ cluster.books.length }}册</span>
            </div>

            <!-- 书籍卡片 -->
            <div class="book-cards">
              <div class="book-card" *ngFor="let book of cluster.books; let bi = index; let last = last"
                   [class.book-card--expanded]="book.expanded"
                   [style.borderLeftColor]="cluster.isBonus ? 'var(--accent-yellow)' : pathColor(cluster.thinkerInfo?.primaryPath || 'critical')"
                   (click)="toggleBook(book)">
                <!-- 书间连接点 -->
                <div class="book-card__connector" *ngIf="!last"></div>
                <div class="book-card__main">
                  <span class="book-card__title">《{{ book.title }}》</span>
                  <span class="book-card__author">{{ book.author }}</span>
                  <span class="book-card__level"
                        *ngIf="getBookLevel(book)"
                        [class.book-card__level--entry]="getBookLevel(book) === '入门'"
                        [class.book-card__level--core]="getBookLevel(book) === '核心'"
                        [class.book-card__level--adv]="getBookLevel(book) === '进阶'">
                    {{ getBookLevel(book) }}
                  </span>
                  <span class="book-card__toggle">{{ book.expanded ? '▾' : '▸' }}</span>
                </div>
                <div class="book-card__detail" *ngIf="book.expanded">
                  <p class="book-card__note" *ngIf="book.note">{{ book.note }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 思想图谱：迷你坐标图 -->
        <div class="coord-map">
          <div class="coord-map__label">思想坐标 · 阅读轨迹</div>
          <div class="coord-map__grid">
            <!-- Y轴标签 -->
            <div class="coord-map__axis coord-map__axis--y">
              <span class="coord-map__axis-label coord-map__axis-label--top">建构</span>
              <span class="coord-map__axis-label coord-map__axis-label--btm">批判/解构</span>
            </div>
            <!-- 散点区域 -->
            <div class="coord-map__plot">
              <!-- 阅读轨迹：箭头路径 -->
              <svg class="coord-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ng-container *ngFor="let seg of readingTrajectory; let i = index">
                  <line *ngIf="i < readingTrajectory.length - 1"
                        [attr.x1]="(seg.x * 10) + '%'"
                        [attr.y1]="(100 - seg.y * 10) + '%'"
                        [attr.x2]="(readingTrajectory[i+1].x * 10) + '%'"
                        [attr.y2]="(100 - readingTrajectory[i+1].y * 10) + '%'"
                        [attr.stroke]="seg.color"
                        stroke-width="1"
                        stroke-dasharray="4,3"
                        opacity="0.7" />
                </ng-container>
              </svg>
              <!-- 散点（带编号） -->
              <div class="coord-map__dot"
                   *ngFor="let dot of thinkerDots"
                   [style.left.%]="dot.x * 10"
                   [style.bottom.%]="dot.y * 10"
                   [style.background]="dot.color"
                   [title]="dot.name + ' (' + dot.xLabel + ', ' + dot.yLabel + ')'">
                <span class="coord-map__step-num">{{ dot.step }}</span>
              </div>
            </div>
            <!-- X轴标签 -->
            <div class="coord-map__axis coord-map__axis--x">
              <span class="coord-map__axis-label">← 理论</span>
              <span class="coord-map__axis-label">实践 →</span>
            </div>
            <!-- 图例 -->
            <div class="coord-map__legend">
              <span *ngFor="let dot of thinkerDots" class="coord-map__legend-item">
                <span class="coord-map__legend-dot" [style.background]="dot.color">{{ dot.step }}</span>
                {{ dot.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 陷阱清算（如有） -->
      <section class="result-section" *ngIf="result.trapReviews.length > 0">
        <div class="constr-sect-label">
          <span class="constr-sect-label__no">№ 06</span>
          <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
          <span class="constr-sect-label__title">一些反思</span>
        </div>
        <p class="constellation-intro">
          在测试过程中，你选择了一些"陷阱选项"——它们听起来有说服力，但隐藏着值得追问的问题。以下是针对这些选择的反思，不是"你错了"，而是邀请你进行更深一层的思考。
        </p>
        <div class="trap-list">
          <div class="trap-card" *ngFor="let tr of result.trapReviews">
            <div class="trap-card__q">第 {{ tr.questionId }} 题</div>
            <div class="trap-card__body">{{ tr.response }}</div>
          </div>
        </div>
      </section>

      <!-- 重新测试 -->
      <div class="retry-bar">
        <a routerLink="/test" class="constr-btn">重新测试 →</a>
        <button class="constr-btn-outline share-btn" (click)="copyLink()">
          {{ copied ? '已复制链接 ✓' : '复制结果链接 🔗' }}
        </button>
        <a routerLink="/" class="constr-btn-outline">返回首页 →</a>
      </div>
    </ng-container>

    <!-- 无数据 -->
    <div class="result-empty" *ngIf="!result">
      <p>没有找到测试数据。请先完成测试。</p>
      <a routerLink="/test" class="constr-btn">开始测试 →</a>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .result-hero {
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
    .result-hero__no {
      flex: 0 0 auto;
      padding: 0.7rem 1.25rem;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      white-space: nowrap;
    }
    .result-hero__marquee {
      flex: 1;
      padding: 0.7rem 0;
      color: var(--accent-yellow);
    }

    /* 标题 */
    .result-title-block {
      position: relative;
      margin: 3rem 0 1.5rem;
      padding-bottom: 2rem;
      border-bottom: 3px solid var(--border);
    }
    .geo-deco {
      position: absolute;
      top: -1rem;
      right: 0;
      width: 180px;
      height: 180px;
      pointer-events: none;
      opacity: 0.5;
    }
    .geo-deco > * { position: absolute; mix-blend-mode: multiply; }
    .geo-circle { top: 0; right: 0; width: 100px; height: 100px; background: var(--accent); border-radius: 50%; }
    .geo-bar { top: 80px; left: 20px; width: 140px; height: 14px; background: var(--accent-yellow); }
    .geo-triangle { bottom: 10px; right: 10px; width: 0; height: 0; border-style: solid; border-width: 0 0 50px 50px; border-color: transparent transparent var(--accent-black) transparent; }
    .result-title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 7vw, 5rem);
      font-weight: 900;
      line-height: 0.9;
      letter-spacing: -0.04em;
      color: var(--accent);
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
    }
    .result-subtitle {
      font-size: 1.05rem;
      line-height: 1.7;
      color: var(--text);
      white-space: pre-line;
      max-width: 700px;
      position: relative;
      z-index: 1;
    }

    /* --- 四路径合一得分条 --- */
    .path-combined { margin-bottom: 0.5rem; }
    .path-combined__bar {
      display: flex;
      height: 28px;
      border: 2px solid var(--border);
      overflow: hidden;
    }
    .path-combined__seg {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: flex 0.5s ease;
      min-width: 0;
    }
    .path-combined__seg:first-child { border-radius: 0; }
    .path-combined__seg:last-child { border-radius: 0; }
    .path-combined__label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.08em;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      white-space: nowrap;
      overflow: hidden;
    }
    .path-combined__legend {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.8rem;
    }
    .path-combined__legend-item {
      font-size: 0.85rem;
      color: var(--muted);
      line-height: 1.5;
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
    }
    .path-combined__swatch {
      display: inline-block;
      width: 10px;
      height: 10px;
      flex-shrink: 0;
      margin-top: 0.3em;
    }

    /* --- 维度网格 --- */
    .dim-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
    .dim-card {
      border: 3px solid var(--border);
      padding: 1.25rem;
      background: var(--paper);
    }
    .dim-card__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.75rem;
    }
    .dim-card__name {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1rem;
      letter-spacing: -0.01em;
    }
    .dim-card__path-tag {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.15em 0.5em;
      background: var(--accent-black);
      color: #fff;
      letter-spacing: 0.08em;
    }
    .dim-card__bar {
      height: 6px;
      background: var(--bg-deep);
      margin-bottom: 0.75rem;
    }
    .dim-card__fill {
      height: 100%;
      background: var(--accent);
      transition: width 0.5s ease;
    }
    .dim-card__desc {
      font-size: 0.88rem;
      color: var(--muted);
      line-height: 1.55;
      margin: 0;
    }

    /* --- 思想家卡片 --- */
    .constellation-intro {
      font-size: 0.95rem;
      color: var(--muted);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .thinker-cards {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .thinker-card {
      display: flex;
      gap: 1.25rem;
      border: 3px solid var(--border);
      padding: 1.5rem;
      background: #fff;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
    }
    .thinker-card__rank {
      flex: 0 0 auto;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 3rem;
      line-height: 0.85;
      color: var(--accent-yellow);
    }
    .thinker-card__body { flex: 1; min-width: 0; }
    .thinker-card__name {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      margin: 0 0 0.15rem;
    }
    .thinker-card__en {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--muted);
      margin: 0 0 0.75rem;
      letter-spacing: 0.05em;
    }
    .thinker-card__bio {
      font-size: 0.92rem;
      line-height: 1.6;
      color: var(--text);
      margin: 0 0 0.75rem;
    }
    .thinker-card__key {
      font-size: 0.92rem;
      line-height: 1.6;
      color: #333;
      margin: 0;
      border-left-color: var(--accent-yellow);
      font-weight: 500;
    }

    /* --- 路径光谱条 --- */
    .spectrum-strip {
      margin-bottom: 2rem;
      padding: 1rem 1.25rem;
      background: var(--paper);
      border: 2px solid var(--border);
    }
    .spectrum-strip__label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }
    .spectrum-strip__bar {
      display: flex;
      height: 8px;
      margin-bottom: 0.5rem;
    }
    .spectrum-strip__seg {
      transition: flex 0.5s ease;
    }
    .spectrum-strip__seg:first-child { border-radius: 2px 0 0 2px; }
    .spectrum-strip__seg:last-child { border-radius: 0 2px 2px 0; }
    .spectrum-strip__legend {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .spec-legend {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .spec-legend__swatch {
      display: inline-block;
      width: 10px;
      height: 10px;
    }

    /* --- 星丛卡片群 --- */
    .const-cards {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .const-cluster {
      border: 3px solid var(--border);
      background: #fff;
      overflow: hidden;
    }
    .const-cluster--bonus {
      border-style: dashed;
      border-color: var(--accent-yellow);
      background: #fffef8;
    }
    .const-cluster__head {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 1rem 1.25rem;
      background: var(--accent-black);
      color: #fff;
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 900;
      letter-spacing: -0.01em;
    }
    .const-cluster--bonus .const-cluster__head {
      background: var(--accent-yellow);
      color: var(--accent-black);
    }
    .const-cluster__icon {
      font-size: 1.1rem;
      color: var(--accent-yellow);
    }
    .const-cluster__icon--bonus {
      color: var(--accent-black);
      font-weight: 700;
    }
    .const-cluster__name {
      flex: 1;
      min-width: 0;
    }
    .const-cluster__tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 0.2em 0.6em;
      color: #fff;
      white-space: nowrap;
    }
    .const-cluster__tag--bonus {
      background: transparent;
      border: 1px solid var(--accent-black);
      color: var(--accent-black);
    }
    .const-cluster__count {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      opacity: 0.7;
      white-space: nowrap;
    }

    /* --- 书籍卡片 --- */
    .book-cards {
      display: flex;
      flex-direction: column;
    }
    .book-card {
      border-left: 5px solid;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background 0.15s;
    }
    .book-card:last-child { border-bottom: none; }
    @media (hover: hover) {
      .book-card:hover { background: var(--paper); }
    }
    .book-card--expanded {
      background: var(--paper);
    }
    .book-card__main {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      padding: 0.9rem 1.25rem;
      user-select: none;
    }
    .book-card__title {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text);
    }
    .book-card__author {
      font-size: 0.85rem;
      color: var(--muted);
      flex: 1;
    }
    .book-card__toggle {
      flex: 0 0 auto;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--muted);
      width: 1.25rem;
      text-align: center;
    }
    .book-card__detail {
      padding: 0 1.25rem 1rem 1.25rem;
    }
    .book-card__note {
      margin: 0;
      font-size: 0.88rem;
      line-height: 1.65;
      color: #333;
    }

    /* --- 书籍阅读等级标签 --- */
    .book-card__level {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 0.15em 0.5em;
      white-space: nowrap;
    }
    .book-card__level--entry { background: var(--paper); color: var(--accent); border: 1px solid var(--accent); }
    .book-card__level--core { background: var(--accent-black); color: #fff; }
    .book-card__level--adv { background: transparent; color: var(--muted); border: 1px solid var(--border); }

    /* --- 书间连接点 --- */
    .book-card__connector {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border);
      margin: 0 auto 0 0.6rem;
      position: relative;
      z-index: 1;
    }

    /* --- 星丛雷达图 --- */
    .radar-chart {
      max-width: 400px;
      margin: 0 auto 0.5rem;
    }
    .radar-chart__svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .radar-grid polygon {
      fill: none;
      stroke: var(--border);
      stroke-width: 0.5;
    }
    .radar-grid--half polygon {
      stroke-dasharray: 3,4;
    }
    .radar-grid--main polygon {
      stroke-width: 1;
      stroke: var(--muted);
    }
    .radar-axis-label {
      font-family: var(--font-mono);
      font-size: 3.2px;
      fill: var(--muted);
      letter-spacing: 0.08em;
    }
    .radar-legend {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .radar-legend__item {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .radar-legend__swatch {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .radar-legend__swatch--user {
      background: var(--accent);
      border: 1px solid var(--accent);
    }

    /* --- 思想坐标图谱 --- */
    .coord-map {
      margin-top: 2rem;
      padding: 1.25rem;
      background: var(--paper);
      border: 2px solid var(--border);
    }
    .coord-map__label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.75rem;
    }
    .coord-map__grid {
      display: flex;
      gap: 0.5rem;
      height: 160px;
    }
    .coord-map__axis {
      display: flex;
      flex-shrink: 0;
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--muted);
      letter-spacing: 0.06em;
    }
    .coord-map__axis--y {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      width: 4rem;
      padding: 0 0.25rem;
    }
    .coord-map__axis--x {
      flex-direction: row;
      justify-content: space-between;
      height: 1rem;
      margin-top: 0.25rem;
    }
    .coord-map__axis-label--top { color: var(--accent); }
    .coord-map__axis-label--btm { color: var(--accent-ink); }
    .coord-map__plot {
      flex: 1;
      position: relative;
      background: #fff;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .coord-map__lines {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .coord-map__dot {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid #fff;
      transform: translate(-50%, 50%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
      z-index: 2;
    }
    .coord-map__step-num {
      font-family: var(--font-mono);
      font-size: 0.55rem;
      font-weight: 900;
      color: #fff;
      line-height: 1;
    }
    @media (hover: hover) {
      .coord-map__dot:hover {
        transform: translate(-50%, 50%) scale(1.5);
        z-index: 3;
      }
    }
    .coord-map__legend {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .coord-map__legend-item {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .coord-map__legend-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.5rem;
      font-weight: 900;
      color: #fff;
      flex-shrink: 0;
    }

    /* --- 陷阱清算 --- */
    .trap-list { display: flex; flex-direction: column; gap: 1rem; }
    .trap-card {
      border: 3px solid var(--accent-yellow);
      padding: 1.25rem;
      background: #fff;
    }
    .trap-card__q {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }
    .trap-card__body {
      font-size: 0.92rem;
      line-height: 1.65;
      color: var(--text);
    }

    /* --- 操作栏 --- */
    .retry-bar {
      display: flex;
      gap: 1rem;
      margin-top: 3rem;
      padding-bottom: 3rem;
      flex-wrap: wrap;
      align-items: center;
    }
    .share-btn {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      cursor: pointer;
      font-weight: 700;
      padding: 0.6rem 1.2rem;
      border: 3px solid var(--border);
      background: transparent;
      color: var(--text);
      transition: background 0.15s, border-color 0.15s;
    }
    @media (hover: hover) {
      .share-btn:hover {
        background: var(--accent-yellow);
        border-color: var(--accent-black);
      }
    }
    .result-empty {
      padding: 6rem 0;
      text-align: center;
    }
    .result-empty p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .result-section { margin-top: 2.5rem; }

    @media (max-width: 600px) {
      .result-hero { font-size: 0.65rem; }
      .result-hero__no { padding: 0.5rem 0.75rem; white-space: normal; }
      .geo-deco { width: 100px; height: 100px; opacity: 0.35; }
      .geo-circle { width: 60px; height: 60px; }
      .geo-bar { top: 50px; left: 10px; width: 80px; height: 8px; }
      .result-title-block { margin: 2rem 0 1rem; padding-bottom: 1.5rem; }
      .result-subtitle { font-size: 0.95rem; }
      .dim-grid { grid-template-columns: 1fr; gap: 1rem; }
      .dim-card { padding: 1rem; }
      .dim-card__header { flex-wrap: wrap; gap: 0.5rem; }
      .dim-card__name { font-size: 0.92rem; }
      .dim-card__path-tag { font-size: 0.65rem; }
      .thinker-card {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
        clip-path: none;
      }
      .thinker-card__rank { font-size: 2.5rem; }
      .thinker-card__name { font-size: 1.15rem; }
      .thinker-card__bio { font-size: 0.85rem; }
      .thinker-card__key { font-size: 0.85rem; }
      .spectrum-strip { padding: 0.75rem 1rem; }
      .spectrum-strip__legend { gap: 0.75rem; }
      .const-cluster__head { padding: 0.75rem 1rem; font-size: 0.92rem; flex-wrap: wrap; gap: 0.4rem; }
      .const-cluster__name { flex: 1 1 100%; }
      .book-card__main { padding: 0.75rem 1rem; flex-wrap: wrap; }
      .book-card__title { font-size: 0.88rem; }
      .book-card__author { font-size: 0.8rem; }
      .book-card__note { font-size: 0.82rem; }
      .book-card__detail { padding: 0 1rem 0.75rem 1rem; }
      .book-card__connector { margin-left: 0.4rem; }
      .radar-chart { max-width: 320px; }
      .radar-legend { gap: 0.5rem; }
      .radar-legend__item { font-size: 0.6rem; }
      .coord-map { padding: 0.75rem; }
      .coord-map__grid { height: 120px; }
      .coord-map__dot { width: 18px; height: 18px; }
      .coord-map__step-num { font-size: 0.5rem; }
      .coord-map__legend { gap: 0.5rem; }
      .coord-map__legend-item { font-size: 0.6rem; }
      .retry-bar { flex-direction: column; gap: 0.75rem; }
      .retry-bar .constr-btn,
      .retry-bar .constr-btn-outline,
      .share-btn {
        width: 100%;
        text-align: center;
        justify-content: center;
      }
      .trap-card { padding: 1rem; }
      .trap-card__body { font-size: 0.85rem; }
      .result-section { margin-top: 2rem; }
      .constellation-intro { font-size: 0.88rem; }
    }

    @media (max-width: 400px) {
      .geo-deco { display: none; }
      .result-title-block { margin: 1.5rem 0 1rem; }
      .thinker-card { padding: 1rem; gap: 0.5rem; }
      .thinker-card__rank { font-size: 2rem; }
      .thinker-card__name { font-size: 1.05rem; }
      .path-combined__bar { height: 22px; }
      .path-combined__label { font-size: 0.6rem; }
      .path-combined__legend-item { font-size: 0.78rem; }
    }
  `]
})
export class TestResultComponent implements OnInit {
  result: TestResult | null = null;
  copied = false;
  bookClusters: BookCluster[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encoded = params['answers'];
      if (encoded) {
        const answers = decodeAnswers(encoded);
        if (answers.length === 30 && answers.every(a => a.length > 0)) {
          this.result = generateResult(answers);
          this.bookClusters = this.buildBookClusters();
        }
      }
    });
  }

  private buildBookClusters(): BookCluster[] {
    if (!this.result) return [];
    const groups = new Map<string, ClusterBook[]>();
    for (const book of this.result.allBooks) {
      const key = book.thinker;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push({ title: book.title, author: book.author, note: book.note, thinker: book.thinker, expanded: false });
    }
    return Array.from(groups.entries()).map(([thinkerName, books]) => {
      const thinkInfo = THINKERS.find(t => t.name === thinkerName) || null;
      const isBonus = thinkerName === '额外推荐';
      return { thinkerName, thinkerInfo: thinkInfo, books, isBonus };
    });
  }

  get pathEntries(): { path: Path; label: string; score: number }[] {
    if (!this.result) return [];
    return (Object.entries(this.result.pathScores) as [Path, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([path, score]) => ({ path, label: PATH_LABELS[path], score }));
  }

  get pathDescriptions(): Record<Path, string> {
    return PATH_DESCRIPTIONS;
  }

  get dimensionEntries(): { dim: Dimension; label: string; score: number; maxScore: number; pathLabel: string; description: string }[] {
    if (!this.result) return [];
    const maxScores: Record<Dimension, number> = { world: 7, tech: 7, community: 8, ecology: 8 };
    return (['world', 'tech', 'community', 'ecology'] as Dimension[]).map(dim => ({
      dim,
      label: DIMENSION_LABELS[dim],
      score: this.result!.dimensionScores[dim],
      maxScore: maxScores[dim],
      pathLabel: PATH_LABELS[this.result!.dimensionAnalysis[dim].dominantPath],
      description: this.result!.dimensionAnalysis[dim].description
    }));
  }

  get dominantPathLabel(): string {
    return this.result ? PATH_LABELS[this.result.dominantPath] : '';
  }

  get dominantDimLabel(): string {
    return this.result ? DIMENSION_LABELS[this.result.dominantDimension] : '';
  }

  get spectrumSegments(): { path: Path; label: string; count: number; weight: number; color: string }[] {
    if (!this.result) return [];
    const paths: Path[] = ['critical', 'constructive', 'deconstructive', 'perceptive'];
    const bookPathCounts: Record<Path, number> = { critical: 0, constructive: 0, deconstructive: 0, perceptive: 0 };

    for (const cluster of this.bookClusters) {
      if (cluster.thinkerInfo) {
        bookPathCounts[cluster.thinkerInfo.primaryPath] += cluster.books.length;
      } else {
        // bonus books: distribute evenly or use a heuristic
        bookPathCounts['perceptive'] += cluster.books.length;
      }
    }

    const total = Object.values(bookPathCounts).reduce((a, b) => a + b, 0);
    return paths.map(p => ({
      path: p,
      label: PATH_LABELS[p],
      count: bookPathCounts[p],
      weight: total > 0 ? bookPathCounts[p] : 0,
      color: this.pathColor(p)
    }));
  }

  readonly PATH_LABELS = PATH_LABELS;

  pathColor(path: Path): string {
    const map: Record<Path, string> = {
      critical: 'var(--accent)',
      constructive: 'var(--accent-black)',
      deconstructive: 'var(--accent-ink)',
      perceptive: 'var(--accent-yellow)'
    };
    return map[path];
  }

  // ---- 星丛雷达图 ----

  /** 4 轴定义：角度和标签 */
  get radarAxes(): { dim: Dimension; angle: number; label: string; labelX: number; labelY: number }[] {
    const cx = 100, cy = 100, r = 88;
    return [
      { dim: 'world', angle: Math.PI * 1.5, label: '世界', labelX: cx, labelY: cy + r + 12 },
      { dim: 'tech', angle: 0, label: '技术', labelX: cx + r + 14, labelY: cy },
      { dim: 'community', angle: Math.PI * 0.5, label: '共同体', labelX: cx, labelY: cy - r - 10 },
      { dim: 'ecology', angle: Math.PI, label: '生态', labelX: cx - r - 14, labelY: cy },
    ];
  }

  /** 将极坐标 (angle, radius) 转为 SVG (x, y)，radius 为 0-10 缩放 */
  private polarToCartesian(angle: number, value: number): { x: number; y: number } {
    const cx = 100, cy = 100, maxR = 80;
    const r = (value / 10) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy - r * Math.sin(angle) };
  }

  /** 生成多边形 points 字符串 */
  private polygonPoints(profile: Record<Dimension, number>): string {
    return this.radarAxes.map(a => {
      const p = this.polarToCartesian(a.angle, profile[a.dim]);
      return `${p.x},${p.y}`;
    }).join(' ');
  }

  /** 辅助网格多边形 */
  gridPolygon(level: number): string {
    const cx = 100, cy = 100, maxR = 80;
    const r = (level / 100) * maxR;
    return this.radarAxes.map(a => {
      const x = cx + r * Math.cos(a.angle);
      const y = cy - r * Math.sin(a.angle);
      return `${x},${y}`;
    }).join(' ');
  }

  /** 用户画像的多边形 points */
  get userRadarPoints(): string {
    if (!this.result) return '';
    return this.polygonPoints(this.result.userDimensionProfile);
  }

  /** 用户画像的数据点 */
  get userRadarDots(): { x: number; y: number }[] {
    if (!this.result) return [];
    return this.radarAxes.map(a => {
      return this.polarToCartesian(a.angle, this.result!.userDimensionProfile[a.dim]);
    });
  }

  /** 4 位思想家的雷达序列 */
  get thinkerRadarSeries(): { name: string; points: string; color: string }[] {
    if (!this.result) return [];
    return this.result.thinkers.map(t => ({
      name: t.name,
      points: this.polygonPoints(t.dimensionProfile),
      color: this.pathColor(t.primaryPath)
    }));
  }

  toggleBook(book: ClusterBook): void {
    book.expanded = !book.expanded;
  }

  /** 判定书籍阅读等级：基于 note 中的关键词 */
  getBookLevel(book: ClusterBook): string {
    const n = book.note || '';
    if (n.includes('入门') || n.includes('最易读') || n.includes('最通俗') || n.includes('轻松入口')) return '入门';
    if (n.includes('核心') || n.includes('代表作') || n.includes('奠基')) return '核心';
    if (n.includes('进阶') || n.includes('巨著') || n.includes('系统') || n.includes('拓展') || n.includes('应用') || n.includes('延伸')) return '进阶';
    return '';
  }

  /** 图谱：思想家散点（带轨迹步骤编号） */
  get thinkerDots(): { name: string; step: number; x: number; y: number; color: string; xLabel: string; yLabel: string }[] {
    if (!this.result) return [];
    return this.result.thinkers.map((t, i) => {
      const coord = THINKER_COORDS[t.id];
      return {
        name: t.name,
        step: i + 1,
        x: coord.x,
        y: coord.y,
        color: this.pathColor(t.primaryPath),
        xLabel: coord.x <= 3 ? '实践' : coord.x >= 7 ? '理论' : '居中',
        yLabel: coord.y <= 3 ? '批判' : coord.y >= 7 ? '建构' : '居中'
      };
    });
  }

  /** 图谱：阅读轨迹（按推荐顺序排列的散点路径） */
  get readingTrajectory(): { x: number; y: number; color: string }[] {
    if (!this.result) return [];
    const dots = this.thinkerDots;
    // 按实践→理论方向排序（x 值升序），形成从易到难的阅读轨迹
    const sorted = [...dots].sort((a, b) => a.x - b.x);
    return sorted.map(d => ({ x: d.x, y: d.y, color: d.color }));
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2500);
    });
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }
}
