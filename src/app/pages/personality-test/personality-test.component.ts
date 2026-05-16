import { Component, OnInit, HostListener } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import {
  QUESTIONS, TestQuestion, TestOption,
  PATH_LABELS, DIMENSION_LABELS,
  encodeAnswers, Path
} from './test-data';

interface UIState {
  screen: 'intro' | 'test' | 'submitted';
  currentPart: 1 | 2 | 3 | 4;
  questionIdx: number;     // 在当前 part 内的索引
  answers: string[];       // 按题目 id 顺序存储的选项 id（全部 30 个位置）
  selectedOptionId: string | null;
  partTitles: string[];
}

@Component({
  selector: 'app-personality-test',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  template: `
    <!-- ===== 入口介绍页 ===== -->
    <div class="intro-screen" *ngIf="state.screen === 'intro'">
      <div class="intro-hero">
        <div class="intro-hero__no">№ X — TEST</div>
        <div class="intro-hero__marquee constr-marquee" aria-hidden="true">
          <div class="constr-marquee__track">
            <span>激进社会思想家人格测试</span><span>·</span><span>批判</span><span>·</span><span>建构</span><span>·</span><span>解构</span><span>·</span><span>感知</span><span>·</span><span>星丛</span><span>·</span>
          </div>
        </div>
      </div>

      <div class="intro-body">
        <div class="intro-deco" aria-hidden="true">
          <span class="intro-deco__circle"></span>
          <span class="intro-deco__circle intro-deco__circle--sm"></span>
          <span class="intro-deco__circle intro-deco__circle--xs"></span>
          <span class="intro-deco__bar"></span>
          <span class="intro-deco__tri"></span>
        </div>

        <p class="intro-text">
          恭喜你，发现了网站设计者留下的彩蛋！
        </p>
        <p class="intro-text">
          这是我受到各种测试热潮启发制作的一项全新人格测试——<strong>"星丛测试"</strong>。本测试面向初学者以及对人文社科感兴趣的大众，为测试者筛选其可能感兴趣和接受的"切口"思想家。题目受日常生活的诸多不适与"断裂"场景启发撰写，请选择<strong>最能说服自己/最能表达自己想法/最感兴趣</strong>的一项。
        </p>
        <p class="intro-text">
          测试会根据各维度选择，生成一份<strong>"最相似思想家星丛"</strong>人格类型评估结果和个性化书单建议。
        </p>

        <div class="intro-meta">
          <div class="intro-meta__item">
            <span class="intro-meta__num">30</span>
            <span class="intro-meta__label">道题目</span>
          </div>
          <div class="intro-meta__item">
            <span class="intro-meta__num">4</span>
            <span class="intro-meta__label">个维度</span>
          </div>
          <div class="intro-meta__item">
            <span class="intro-meta__num">~10</span>
            <span class="intro-meta__label">分钟</span>
          </div>
        </div>

        <div class="intro-caveat">
          <p>提示：本测试仍然会陷入标签化和庸俗化的困境。另外，请牢记：</p>
          <blockquote>"哲学家们只用不同的方式解释世界，而问题在于改变世界。"</blockquote>
          <cite>—— 卡尔·马克思，《关于费尔巴哈的提纲》第十一条</cite>
        </div>

        <button class="intro-start-btn" (click)="startTest()">
          开始测试 →
        </button>
      </div>
    </div>

    <!-- ===== 答题页 ===== -->
    <div class="test-container" *ngIf="state.screen === 'test'">
      <!-- 头部：编号 + 维度标识 -->
      <div class="test-hero">
        <div class="test-hero__no">№ X — TEST</div>
        <div class="test-hero__marquee constr-marquee" aria-hidden="true">
          <div class="constr-marquee__track">
            <span>激进社会思想家人格测试</span><span>·</span><span>批判</span><span>·</span><span>建构</span><span>·</span><span>解构</span><span>·</span><span>感知</span><span>·</span><span>星丛</span><span>·</span>
          </div>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-info">
          <span class="progress-info__part">{{ state.partTitles[state.currentPart - 1] }}</span>
          <span class="progress-info__count">第 {{ answeredCount }}/30 题</span>
        </div>
        <div class="progress-rail">
          <div class="progress-rail__fill" [style.width.%]="(answeredCount / 30) * 100"></div>
        </div>
        <div class="progress-dots">
          <span *ngFor="let _ of [].constructor(30); let i = index"
                class="progress-dot"
                [class.progress-dot--done]="state.answers[i] !== ''"
                [class.progress-dot--current]="globalIdx === i"></span>
        </div>
      </div>

      <!-- 题干 -->
      <div class="question-block">
        <div class="question-block__no">{{ pad(question.id) }}</div>

        <!-- 路径切换 tabs -->
        <div class="question-nav">
          <button *ngFor="let part of [1,2,3,4]; let i = index"
                  class="qnav-btn"
                  [class.qnav-btn--active]="state.currentPart === part"
                  [class.qnav-btn--done]="partProgress(i) === partTotal(i)"
                  (click)="goToPart(+part)">
            {{ state.partTitles[i] }}
          </button>
        </div>

        <p class="question-text">{{ question.question }}</p>
        <p class="question-context" *ngIf="question.context">{{ question.context }}</p>
      </div>

      <!-- 选项 -->
      <div class="options-grid">
        <button *ngFor="let opt of shuffledOptions"
                class="option-card"
                [class.option-card--selected]="state.selectedOptionId === opt.id"
                (click)="selectOption(opt)">
          <span class="option-card__badge">{{ opt.id.toUpperCase() }}</span>
          <div class="option-card__body">
            <strong class="option-card__label">{{ opt.label }}</strong>
            <p class="option-card__arg">{{ opt.argument }}</p>
          </div>
        </button>
      </div>

      <!-- 操作栏 -->
      <div class="action-bar">
        <button class="constr-btn-outline"
                (click)="prevQuestion()"
                *ngIf="!isFirstQuestion">
          ← 上一题
        </button>
        <div class="action-bar__spacer"></div>
        <button class="constr-btn"
                (click)="nextQuestion()"
                *ngIf="!isLastQuestion">
          下一题 →
        </button>
        <button class="constr-btn constr-btn--submit"
                (click)="submit()"
                *ngIf="isLastQuestion && allAnswered">
          提交 · 生成星丛 →
        </button>
      </div>
    </div>

    <!-- 加载过渡 -->
    <div class="test-loading" *ngIf="state.screen === 'submitted'">
      <div class="constr-sect-label">
        <span class="constr-sect-label__no">计算中</span>
        <span class="constr-sect-label__rule constr-sect-label__rule--thick"></span>
        <span class="constr-sect-label__title">正在排列你的思想星丛……</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ===== 入口介绍页 ===== */
    .intro-screen {
      max-width: 700px;
      margin: 0 auto;
    }
    .intro-hero {
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
    .intro-hero__no {
      flex: 0 0 auto;
      padding: 0.7rem 1.25rem;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      white-space: nowrap;
    }
    .intro-hero__marquee {
      flex: 1;
      padding: 0.7rem 0;
      color: var(--accent-yellow);
    }

    .intro-body {
      position: relative;
      padding: 3rem 0 4rem;
    }
    .intro-deco {
      position: absolute;
      top: 0;
      right: 0;
      width: 160px;
      height: 160px;
      opacity: 0.3;
      pointer-events: none;
    }
    .intro-deco > * { position: absolute; }
    .intro-deco__circle {
      top: 0; right: 0;
      width: 80px; height: 80px;
      background: var(--accent);
      border-radius: 50%;
    }
    .intro-deco__circle--sm {
      top: 60px; right: 70px;
      width: 40px; height: 40px;
      background: var(--accent-yellow);
    }
    .intro-deco__circle--xs {
      top: 20px; right: 90px;
      width: 16px; height: 16px;
      background: var(--accent-black);
    }
    .intro-deco__bar {
      top: 100px; left: 10px;
      width: 100px; height: 10px;
      background: var(--accent-ink);
    }
    .intro-deco__tri {
      bottom: 0; right: 20px;
      width: 0; height: 0;
      border-style: solid;
      border-width: 0 0 40px 40px;
      border-color: transparent transparent var(--accent-black) transparent;
    }

    .intro-text {
      font-size: 1.05rem;
      line-height: 1.85;
      color: var(--text);
      margin: 0 0 1.25rem;
      position: relative;
      z-index: 1;
    }
    .intro-text strong {
      font-weight: 700;
      color: var(--accent);
    }

    .intro-meta {
      display: flex;
      gap: 2rem;
      margin: 2rem 0;
      position: relative;
      z-index: 1;
    }
    .intro-meta__item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .intro-meta__num {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1;
      color: var(--accent);
    }
    .intro-meta__label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      margin-top: 0.25rem;
    }

    .intro-caveat {
      margin: 2.5rem 0;
      padding: 1.25rem;
      border-left: 4px solid var(--accent-yellow);
      background: var(--paper);
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--muted);
      position: relative;
      z-index: 1;
    }
    .intro-caveat p { margin: 0 0 0.5rem; }
    .intro-caveat blockquote {
      margin: 0 0 0.25rem;
      font-style: italic;
      font-weight: 600;
      color: var(--text);
    }
    .intro-caveat cite {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--muted);
    }

    .intro-start-btn {
      display: block;
      width: 100%;
      padding: 1rem 2rem;
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      color: #fff;
      background: var(--accent);
      border: none;
      cursor: pointer;
      position: relative;
      z-index: 1;
      transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    }
    @media (hover: hover) {
      .intro-start-btn:hover {
        background: var(--accent-black);
        transform: translate(-3px, -3px);
        box-shadow: 6px 6px 0 0 var(--accent-yellow);
      }
    }

    @media (max-width: 600px) {
      .intro-hero { font-size: 0.65rem; }
      .intro-hero__no { padding: 0.5rem 0.75rem; white-space: normal; }
      .intro-body { padding: 2rem 0 3rem; }
      .intro-text { font-size: 0.95rem; line-height: 1.7; }
      .intro-deco { width: 100px; height: 100px; opacity: 0.2; }
      .intro-deco__circle { width: 50px; height: 50px; }
      .intro-deco__circle--sm { top: 40px; right: 45px; width: 28px; height: 28px; }
      .intro-deco__circle--xs { top: 12px; right: 60px; width: 12px; height: 12px; }
      .intro-deco__bar { top: 65px; left: 5px; width: 60px; height: 6px; }
      .intro-meta { gap: 1.5rem; }
      .intro-meta__num { font-size: 2rem; }
      .intro-start-btn { font-size: 1rem; padding: 0.85rem 1.5rem; }
      .intro-caveat { font-size: 0.82rem; }
    }

    @media (max-width: 400px) {
      .intro-text { font-size: 0.88rem; }
      .intro-meta { gap: 1rem; }
      .intro-meta__num { font-size: 1.6rem; }
      .intro-deco { display: none; }
    }

    /* ===== 顶部带 ===== */
    .test-hero {
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
    .test-hero__no {
      flex: 0 0 auto;
      padding: 0.7rem 1.25rem;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      white-space: nowrap;
    }
    .test-hero__marquee {
      flex: 1;
      padding: 0.7rem 0;
      color: var(--accent-yellow);
    }

    /* ===== 进度条 ===== */
    .progress-section {
      margin: 2.5rem 0 2rem;
    }
    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.75rem;
    }
    .progress-info__part {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.1rem;
      letter-spacing: -0.01em;
    }
    .progress-info__count {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--muted);
      letter-spacing: 0.1em;
    }
    .progress-rail {
      height: 8px;
      background: var(--bg-deep);
      border: 1px solid var(--border);
      margin-bottom: 0.6rem;
    }
    .progress-rail__fill {
      height: 100%;
      background: var(--accent);
      transition: width 0.3s ease;
    }
    .progress-dots {
      display: flex;
      gap: 5px;
    }
    .progress-dot {
      flex: 1;
      min-width: 2px;
      height: 6px;
      background: var(--bg-deep);
    }
    .progress-dot--done { background: var(--accent-black); }
    .progress-dot--current { background: var(--accent-yellow); }

    /* ===== 题干 ===== */
    .question-block {
      margin-bottom: 2rem;
    }
    .question-block__no {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 3.5rem;
      line-height: 0.85;
      color: var(--accent);
      letter-spacing: -0.05em;
      margin-bottom: 0.5rem;
    }
    .question-nav {
      display: flex;
      gap: 0;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .qnav-btn {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      border: 2px solid var(--border);
      background: transparent;
      color: var(--muted);
      cursor: pointer;
      margin-left: -2px;
      transition: background 0.15s, color 0.15s;
    }
    .qnav-btn:first-child { margin-left: 0; }
    @media (hover: hover) {
      .qnav-btn:hover { background: var(--accent-black); color: #fff; position: relative; z-index: 1; }
    }
    .qnav-btn--active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      position: relative;
      z-index: 2;
    }
    .qnav-btn--done {
      border-color: var(--accent-black);
      color: var(--text);
      opacity: 0.7;
    }
    .question-text {
      font-family: var(--font-sans);
      font-size: 1.35rem;
      font-weight: 600;
      line-height: 1.6;
      letter-spacing: -0.01em;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    .question-context {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      color: var(--muted);
      font-style: italic;
      border-left: 4px solid var(--accent-yellow);
      padding-left: 1rem;
    }

    /* ===== 选项 ===== */
    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .option-card {
      display: flex;
      gap: 1rem;
      background: #fff;
      border: 3px solid var(--border);
      padding: 1.25rem;
      cursor: pointer;
      text-align: left;
      transition: transform 0.12s, box-shadow 0.12s, border-color 0.12s, background 0.12s;
      font-family: inherit;
      color: var(--text);
    }
    @media (hover: hover) {
      .option-card:hover {
        transform: translate(-3px, -3px);
        box-shadow: 6px 6px 0 0 var(--accent-yellow);
        border-color: var(--accent-black);
      }
    }
    .option-card--selected {
      background: var(--paper);
      border-color: var(--accent);
      border-left-width: 10px;
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0 0 var(--accent-black);
    }
    .option-card__badge {
      flex: 0 0 auto;
      font-family: var(--font-mono);
      font-weight: 900;
      font-size: 0.75rem;
      color: var(--muted);
      letter-spacing: 0.1em;
      padding-top: 0.15rem;
      width: 2rem;
    }
    .option-card--selected .option-card__badge {
      color: var(--accent);
    }
    .option-card__body { flex: 1; min-width: 0; }
    .option-card__label {
      display: block;
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      margin-bottom: 0.4rem;
    }
    .option-card__arg {
      font-size: 0.92rem;
      line-height: 1.6;
      color: #333;
      margin: 0;
    }

    /* ===== 操作栏 ===== */
    .action-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
      padding-bottom: 3rem;
    }
    .action-bar__spacer { flex: 1; }

    .constr-btn--submit {
      background: var(--accent-black);
      border-color: var(--accent-black);
    }
    @media (hover: hover) {
      .constr-btn--submit:hover {
        background: var(--accent-yellow);
        color: var(--accent-black);
        border-color: var(--accent-yellow);
      }
    }

    /* ===== 加载 ===== */
    .test-loading {
      padding: 6rem 0;
      text-align: center;
    }

    /* ===== 响应式 ===== */
    @media (max-width: 600px) {
      .test-hero { font-size: 0.65rem; }
      .test-hero__no { padding: 0.5rem 0.75rem; white-space: normal; }
      .progress-section { margin: 1.5rem 0 1.25rem; }
      .question-block__no { font-size: 2rem; }
      .question-text { font-size: 1.1rem; }
      .question-context { font-size: 0.85rem; }
      .qnav-btn {
        font-size: 0.7rem;
        padding: 0.55rem 0.65rem;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }
      .option-card {
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        -webkit-tap-highlight-color: transparent;
      }
      .option-card__badge { width: auto; font-size: 0.7rem; }
      .option-card__label { font-size: 0.95rem; }
      .option-card__arg { font-size: 0.85rem; }
      .action-bar { flex-wrap: wrap; gap: 0.75rem; }
      .action-bar .constr-btn,
      .action-bar .constr-btn-outline,
      .action-bar .constr-btn--submit {
        flex: 1 1 auto;
        min-width: 120px;
        text-align: center;
        justify-content: center;
      }
    }

    @media (max-width: 400px) {
      .question-block__no { font-size: 1.6rem; }
      .question-text { font-size: 1rem; }
      .option-card__label { font-size: 0.88rem; }
      .option-card__arg { font-size: 0.82rem; }
      .action-bar .constr-btn,
      .action-bar .constr-btn-outline,
      .action-bar .constr-btn--submit {
        flex: 1 1 100%;
        min-width: unset;
      }
      .progress-dots { gap: 3px; }
    }
  `]
})
export class PersonalityTestComponent implements OnInit {
  state: UIState = {
    screen: 'intro',
    currentPart: 1,
    questionIdx: 0,
    answers: new Array(30).fill(''),
    selectedOptionId: null,
    partTitles: ['维度一：你与世界的关系', '维度二：你与技术的关系', '维度三：你与共同体的关系', '维度四：你与生态的关系']
  };

  shuffledOptions: TestOption[] = [];

  private readonly partRanges = [
    { part: 1 as const, start: 0, end: 7 },
    { part: 2 as const, start: 7, end: 14 },
    { part: 3 as const, start: 14, end: 22 },
    { part: 4 as const, start: 22, end: 30 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // 尝试从 sessionStorage 恢复进度
    const saved = sessionStorage.getItem('test_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state.answers = parsed.answers || this.state.answers;
        this.state.currentPart = parsed.currentPart || 1;
        this.state.questionIdx = parsed.questionIdx || 0;
        this.state.screen = parsed.screen || 'intro';
      } catch { /* ignore */ }
    }
    if (this.state.screen === 'test') {
      this.syncSelection();
    }
  }

  get globalIdx(): number {
    return this.partRanges[this.state.currentPart - 1].start + this.state.questionIdx;
  }

  get question(): TestQuestion {
    return QUESTIONS[this.globalIdx];
  }

  get answeredCount(): number {
    return this.state.answers.filter(a => a !== '').length;
  }

  get allAnswered(): boolean {
    return this.answeredCount === 30;
  }

  get isLastQuestion(): boolean {
    return this.globalIdx === 29;
  }

  get isFirstQuestion(): boolean {
    return this.globalIdx === 0;
  }

  partProgress(partIdx: number): number {
    const range = this.partRanges[partIdx];
    return this.state.answers.slice(range.start, range.end).filter(a => a !== '').length;
  }

  partTotal(partIdx: number): number {
    const range = this.partRanges[partIdx];
    return range.end - range.start;
  }

  selectOption(opt: TestOption): void {
    this.state.selectedOptionId = opt.id;
    this.state.answers[this.globalIdx] = opt.id;
  }

  prevQuestion(): void {
    this.saveCurrentAnswer();
    const gIdx = this.globalIdx - 1;
    if (gIdx < 0) return;
    this.goToGlobal(gIdx);
  }

  nextQuestion(): void {
    if (!this.state.selectedOptionId) return;
    this.saveCurrentAnswer();
    const gIdx = this.globalIdx + 1;
    if (gIdx >= 30) return;
    this.goToGlobal(gIdx);
  }

  goToPart(part: number): void {
    this.saveCurrentAnswer();
    this.state.currentPart = part as 1 | 2 | 3 | 4;
    this.state.questionIdx = 0;
    this.syncSelection();
    this.saveProgress();
  }

  startTest(): void {
    this.state.screen = 'test';
    this.syncSelection();
    this.saveProgress();
  }

  submit(): void {
    if (!this.state.selectedOptionId) return;
    this.saveCurrentAnswer();
    if (!this.allAnswered) return;
    const encoded = encodeAnswers(this.state.answers);
    sessionStorage.removeItem('test_progress');
    this.state.screen = 'submitted';
    this.router.navigate(['/test/result'], { queryParams: { answers: encoded } });
  }

  private goToGlobal(gIdx: number): void {
    const range = this.partRanges.find(r => gIdx >= r.start && gIdx < r.end)!;
    this.state.currentPart = range.part;
    this.state.questionIdx = gIdx - range.start;
    this.syncSelection();
    this.saveProgress();
  }

  private saveCurrentAnswer(): void {
    if (this.state.selectedOptionId) {
      this.state.answers[this.globalIdx] = this.state.selectedOptionId;
    }
  }

  private syncSelection(): void {
    this.state.selectedOptionId = this.state.answers[this.globalIdx] || null;
    this.shuffledOptions = this.shuffle([...this.question.options]);
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private saveProgress(): void {
    sessionStorage.setItem('test_progress', JSON.stringify({
      screen: this.state.screen,
      answers: this.state.answers,
      currentPart: this.state.currentPart,
      questionIdx: this.state.questionIdx
    }));
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }
}
