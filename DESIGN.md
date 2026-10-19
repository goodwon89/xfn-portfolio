# DESIGN — 모노크롬 에디토리얼 디자인 명세 (XFN 포트폴리오 적용판)

> **참조**: MAKERVIL Design Replication Spec (makervil.com/en, 2026-10-19 분석본)
> **적용 원칙**: 디자인 **언어**(색·타입·그리드·간격·모션 패턴)만 차용합니다. MAKERVIL의 로고, 워드마크, 크롬 3D 렌더, 사진, 카피, 주소 등 **고유 자산은 쓰지 않습니다.** 이 문서의 컴포넌트명은 포트폴리오용으로 다시 정의했습니다.
> **이 문서의 역할**: `content/sections/*.md`의 `layout` 값이 어떤 컴포넌트로 렌더링되는지, 그 컴포넌트를 어떤 수치로 만드는지 정합니다. 원고(내용)와 디자인(형식)은 이 문서를 경계로 분리됩니다.

---

## 0. 핵심 규칙 10가지

1. **색은 두 개뿐입니다.** `#111111`과 `#FFFFFF`. 포인트 컬러가 없습니다. 차트도 흰색 실선과 흰색 반투명으로만 그립니다.
2. **숫자가 곧 비주얼입니다.** MAKERVIL에서 크롬 렌더가 하던 역할을 이 포트폴리오에서는 **초대형 수치**(56.7% → 88.7%)가 맡습니다.
3. **폰트는 Pretendard 1종**만 씁니다. 디스플레이 500 / 라벨 700 / 본문 500 / 워드마크 800.
4. **모서리 반경 0, 그림자 0.** 경계는 1px 헤어라인(white 18~42%)으로만 만듭니다.
5. **모든 섹션은 블랙 캔버스**입니다. 라이트 테마는 채널을 반전합니다.
6. **섹션 라벨은 `(Problem)` 형태**로, 12컬럼의 1~2열에 작게 둡니다. 타이틀은 3열부터 시작합니다.
7. **등장 모션은 한 가지**만 씁니다: `translateY(112%) rotateX(-84deg)` → `0`, 1000ms, `cubic-bezier(0.16,1,0.3,1)`.
8. **사진은 전부 그레이스케일**입니다. 현장 사진과 화면 캡처 모두 `grayscale(1)`을 적용합니다.
9. **헤더는 `mix-blend-mode: difference`**를 써서 어떤 배경 위에서도 반전됩니다.
10. **푸터는 fixed reveal**입니다. 스크롤 끝에서 이름 워드마크가 글자 단위로 올라옵니다.

---

## 1. 컨셉

| 항목 | 정의 |
|---|---|
| 한 줄 정의 | "숫자로 증명하는 HR 프로젝트를 보여주는 모노크롬 에디토리얼 케이스 스터디" |
| 키워드 | Monochrome · Oversized Numbers · Editorial Type · 12-Column · Hairline · Scroll Choreography · Evidence-first |
| 질감 | 무광 블랙 배경 + 그레이스케일 현장 사진 + 초대형 수치 |
| 톤 | 조용하지만 단정합니다. 카피는 짧은 선언형으로 씁니다 |
| 금지 | 컬러 포인트, 라운드 카드, 드롭섀도, 그라디언트, 아이콘 남용, 일러스트, 이모지 |

### 카피 장치 — "This is not X. It is Y."
MAKERVIL의 브랜드 카드 문형을 **실행 사례 카드의 호버 카피**로 바꿔 씁니다. 원고의 `hover_copy` 필드가 이 문형입니다.
- "포스터가 아닙니다. 매일 지나치는 접점입니다."
- "잠금 화면이 아닙니다. 하루 26번의 반복입니다."
- "시상식이 아닙니다. 동료가 고른 일하는 방식입니다."

---

## 2. 디자인 토큰

### 2.1 컬러

| 토큰 | 값 | 용도 |
|---|---|---|
| `--mv-black` | `#111111` | 기본 캔버스 |
| `--mv-white` | `#FFFFFF` | 텍스트 · 라인 · 강조 수치 · 차트 주 계열 |
| `--mv-pure-black` | `#000000` | 푸터 전용 |
| `--line-strong` | `rgb(255 255 255 / .42)` | 리스트 · 표 행 경계 |
| `--line-weak` | `rgb(255 255 255 / .18)` | 푸터 하단 바 · 보조 경계 · 차트 그리드 |
| `--card-bg` | `rgb(255 255 255 / .035)` | 카드 배경 |
| `--text-sub` | `rgb(255 255 255 / .68)` | 보조 텍스트 · 출처 각주 · `sub` |
| `--text-mute` | `rgb(255 255 255 / .42)` | 비교 대상 수치 (T0, 미참여사 등) |
| `--marquee` | `rgb(255 255 255 / .28)` | 컨택트 배경 마퀴 |

**라이트 테마**: `:root[data-site-theme="light"]` 블록에서 채널을 반전합니다(`#FFF` 캔버스, `#111` 텍스트). 푸터만 예외로 `#F7F7F7`을 씁니다.

### 2.2 타이포그래피 (Pretendard 단일)

| 역할 | 웨이트 | 크기 | 1440px | 행간 | 자간 | 이 사이트에서 쓰는 곳 |
|---|---|---|---|---|---|---|
| 히어로 디스플레이 | 500 | `max(56px, min(8vw, 14.2svh))` | 115px | 0.95 | -0.035em | 01 hero 4라인 |
| 메가 수치 | 500 | `max(88px, 11vw)` | 158px | 0.9 | -0.04em | 09 results 헤드라인 88.7% |
| 섹션 타이틀 | 500 | `max(44px, 5.1vw)` | 73px | 1.05 | -0.03em | 각 섹션 `title` |
| 인덴트 헤드라인 | 500 | `max(40px, 5.3cqw)` | 76px | 1.12 | -0.025em | 02 glance · 04 root-cause 리드 |
| 카드 타이틀 | 500 | `max(24px, 2.4vw)` | 35px | 1.08 | -0.02em | 카드 · 모델 단계명 |
| 스탯 숫자 | 500 | `max(64px, 6.2vw)` | 89px | 1.0 | -0.02em | `stats[].value` |
| 스탯 단위 | 500 | `max(40px, 4vw)` | 58px | 1.0 | -0.02em | %, 회, 명, 건 |
| 섹션 라벨 | 700 | `max(14px, 1.0417vw)` | 15px | 1.2 | -0.01em | `eyebrow` → `(Problem)` |
| 본문 | 500 | `max(15px, .9375vw)` | 15px | 1.6 | -0.005em | 본문 · `lead` |
| 리스트 행 | 500 | `max(16px, 1.0417vw)` | 16px | 1.4 | -0.015em | hairline-list 행 |
| 각주 | 500 | `13px` | 13px | 1.5 | 0 | `sources` 출처 |
| 마퀴 | 500 | `clamp(120px, 15.625vw, 300px)` | 225px | 1.0 | -0.05em | 15 closing 배경 |
| 워드마크 | 800 | 컨테이너 폭 기준 | — | 0.72 | -0.05em | 푸터 이름 |

**국문 보정**
- 원 명세보다 크기를 3~4% 낮췄습니다. 국문은 글자 폭이 넓어 `nowrap` 상태로 두면 1440px에서 넘칩니다.
- 모든 텍스트에 `word-break: keep-all; text-wrap: balance;`를 적용합니다.
- 클리핑 마스크는 `clip-path: inset(-0.12em 0 0 0)`으로 둡니다(국문 받침과 어센더 보호).
- 수치, 날짜, 카운터에는 `font-variant-numeric: tabular-nums`를 적용합니다.

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
```

### 2.3 그리드 · 간격

| 토큰 | CSS | 1440px |
|---|---|---|
| `--mv-page-padding` | `max(20px, 1.0417vw)` | 20px |
| `--mv-grid-gap` | `max(8px, .8333vw)` | 12px |
| `--mv-header-height` | `max(64px, 4.4792vw)` | 64px |
| `--section-pad` | `max(96px, 10.4167vw)` | 150px |
| `--section-pad-tight` | `max(72px, 6.25vw)` | 90px |
| `--block-gap` | `max(64px, 6.25vw)` | 90px — 섹션 내부 블록 간격 |

- 12컬럼: `grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: var(--mv-grid-gap);`
- `border-radius: 0` (예외: 테마 토글, 커서 도트·필은 `999px`)
- 그림자 없음

### 2.4 이징 · 듀레이션

| 이름 | 값 | 용도 |
|---|---|---|
| `--ease-expo` | `cubic-bezier(.16,1,.3,1)` | 텍스트 리빌 · 카드 · 이미지 |
| `--ease-quint` | `cubic-bezier(.22,1,.36,1)` | 헤더 · 링크 · 테마 |
| `--ease-clip` | `cubic-bezier(.65,0,.35,1)` | 클립 · 마스크 확장 · 차트 그리기 |
| `--ease-digit` | `cubic-bezier(.22,.74,.28,1)` | 숫자 카운터 |
| 빠름 / 기본 / 리빌 / 대형 | 180–360 / 520–760 / 920–1200 / 1900ms | |

---

## 3. 페이지 골격

```
<body>
  <header class="site-header">            // sticky · difference
  <div class="theme-toggle">              // 뷰포트 상단 중앙
  <main>
    <section class="intro">               // 1회성 로더 · 카운터 56.7 → 88.7
    <section id="hero">                   // 01 · 100svh
    <section id="glance">                 // 02
    … 03 ~ 14 …
    <section id="closing">                // 15 · contact-marquee
  </main>
  <div class="footer-spacer">             // 100svh
  <footer class="site-footer">            // fixed reveal · 이름 워드마크
  <div class="cursor">                    // 십자선 + 도트
</body>
```

---

## 4. 공통 컴포넌트

### 4.1 헤더
- 12컬럼, 높이 `--mv-header-height`, `position:sticky; top:0; mix-blend-mode:difference; color:#fff`
- 1~3열: 브랜드 텍스트 `site.md › nav.brand` (Pretendard 700, 15px). 로고 SVG는 쓰지 않습니다.
- 4~12열 우측 정렬: 섹션 `nav` 값이 있는 항목만 표시하고(최대 6개), 마지막에 `nav.cta`를 둡니다.
- 링크 호버: 라벨이 위로 100% 빠지고 복제 라벨이 아래에서 올라오는 롤오버(560ms).
- 현재 섹션 표시: 해당 링크 앞에 `●` 6px 도트(흰색)를 붙입니다. 색으로 구분하지 않습니다.
- 푸터에 닿으면 `translateY(-100%)`로 퇴장합니다(520ms).
- 960px 미만: 브랜드와 `MENU`만 표시하고, 우측에서 전체 화면 패널이 슬라이드 인합니다(680ms). 링크는 30–36px, 터치 영역은 최소 44px입니다.

### 4.2 섹션 라벨 (`eyebrow`)
- 원고의 `eyebrow` 값을 괄호로 감싸 렌더링합니다: `Problem` → **`(Problem)`**
- 1~2열, Pretendard 700, 15px. 타이틀 첫 줄 베이스라인에 맞춥니다.
- 번호는 라벨 오른쪽 끝에 `--text-mute` 색으로 붙입니다: `(Problem) 01`

### 4.3 출처 각주 (`sources`)
- 각 섹션 맨 아래에 `border-top: 1px var(--line-weak)`를 두고, 그 아래 3~12열에 13px `--text-sub` 텍스트로 놓습니다.
- 형식: `출처 — WR 인지도 설문 T0 · 2026.05.12~19 · n=132 / …` (출처 키 → 문구 매핑은 `CONTENT_GUIDE.md §2`)

### 4.4 시그니처 CTA
- 라벨과 화살표(→) 아래에 1px 하단 라인을 둡니다. 폭은 `max(160px, 9.84vw)`.
- 호버: 라벨이 우측으로 이동하고, 화살표가 교체되며, 라인이 좌→우로 와이프됩니다(560ms).

### 4.5 커스텀 커서
| 상태 | 표현 |
|---|---|
| 기본 | 1px 십자선 `rgba(255,255,255,.24)` + 10px 흰 도트, difference |
| 링크 호버 | 도트 28px |
| 사례 카드(`case-cards`) 호버 | 200×32px 흰색 필 + 내부 마퀴 `카드명 · 기간 ·` (5.6s) |
| 터치 · reduced-motion | 비활성 |

---

## 5. 레이아웃 컴포넌트 (원고 `layout` 값 ↔ 컴포넌트)

| `layout` 값 | 섹션 | MAKERVIL 원형 | 요약 |
|---|---|---|---|
| `hero-display` | 01 | Hero | 4라인 초대형 타이포, 좌상단·우하단 대각 배치 |
| `indent-stats` | 02, 13 | About | 첫 줄 들여쓰기 헤드라인 + 본문 7–10열 + 스탯 행 |
| `quiz-baseline` | 03 | Hero 변형 + About 스탯 + News 리스트 | 빈칸 퀴즈, 출발점 수치, 9개 규칙 리스트 |
| `sticky-cards` | 04, 05, 13의 embed | Services | 100svh sticky + 카드 3~4개 순차 리빌 |
| `case-cards` | 06, 07, 08, 11 | Brands | 비대칭 8:9 카드 + 호버 카피 |
| `evidence` | 09 | About 스탯 + 리스트 | 메가 수치 · 슬로프/막대 · 근거 2개 |
| `hairline-table` | 10, 12 | News 리스트 | 1px 42% 라인 행, 흰색 fill 호버 |
| `hairline-list` | 14 | News 리스트 | 아코디언 행 |
| `contact-marquee` | 15 | Contact | 배경 마퀴 + 대형 타이틀 + 연락처 |

### 5.1 `hero-display` (01)
- 100svh, `overflow:hidden`.
- 좌상단(헤더 아래 +20px): `hero_display.opening` 2라인.
- 우하단: `lead` 2줄(15px, 우측 정렬, 최대 28ch) + `hero_display.closing` 2라인(우측 정렬).
- 좌하단: `meta` 4개를 hairline 2×2로 배치(각 13px 라벨 + 15px 값).
- 우상단(데스크톱만): `hero_metric`을 작게 표시합니다 — `56.7% → 88.7%` 32px + 배지(1px 테두리, 반경 0).
- 리빌: 라인별 1200ms, 딜레이 60/130/230/320ms. 이어서 헤더가 위에서 내려옵니다(800ms).
- 스크롤 힌트: 좌하단 아래 화살표 SVG(solid), 호버 시 4px 내려갑니다.
- **글래스 WebGL은 쓰지 않습니다.** 원하면 2차 개선 과제로 둡니다. 대신 라인 리빌과 스크롤 시 라인별 패럴랙스(위 라인 -6%, 아래 라인 +6%)만 적용합니다.

### 5.2 `indent-stats` (02)
```
row1: [(At a Glance) 1–2] [title 1–12, 첫 줄 text-indent 16.667%]
row2: [skills 1–4, 칩 나열] [empty] [tldr 7–11, 3문단]
row3: [stats 1–12, span 4 × 2행]
```
- `tldr`의 굵은 라벨(**문제**, **해법**, **결과**)은 700 웨이트로 쓰고, 문단 사이는 18px.
- `skills`: 1px 테두리 칩(반경 0, 패딩 6×10, 13px).
- `stats`: 숫자 89px + 라벨 15px + `sub` 13px `--text-sub`. 각 스탯 위에 1px `--line-strong`을 둡니다.
- 진입 시 `translateY(36px) rotateX(-14deg)` → 0, 90ms 스태거로 들어오고, 숫자는 카운트업합니다.
- **최종값을 DOM에 먼저 둡니다.** 카운터는 Progressive Enhancement로 붙입니다.

### 5.2-1 하이라이트 영상 블록 (02 `video`)
- 위치: `indent-stats`의 row2와 row3 사이, 1–12열 풀폭, `aspect-ratio:16/9`, 상하 `--block-gap`.
- **파사드 방식**: 처음에는 `poster` 이미지만 보여줍니다(`grayscale(1)`, 반경 0). 중앙에 흰 1px 원형 테두리 88px 재생 버튼과 `(Play) 하이라이트` 라벨을 둡니다. 클릭하면 `embed` iframe(`youtube-nocookie`, `?autoplay=1&rel=0`)으로 교체합니다. 첫 로드 성능을 지키고, 재생 전까지 모노크롬을 유지하기 위함입니다.
- 재생 후에는 컬러로 둡니다(iframe에 필터를 적용하지 않음).
- 하단 메타: 좌측 `title`(16px) · 우측 `caption`(13px `--text-sub`), 위에 1px `--line-weak`.
- 커서: 영상 위에서 도트가 200×32 흰 필로 바뀌고 `PLAY · HIGHLIGHT ·` 마퀴를 보여줍니다.
- 접근성: 버튼 `aria-label="프로젝트 하이라이트 영상 재생"`, iframe `title` 지정.

### 5.3 `quiz-baseline` (03)
- **블록 A · 퀴즈**: 문장 2개를 히어로 디스플레이 크기의 70%로 씁니다. 빈칸은 `________` 대신 하단 1px 라인이 있는 빈 박스(폭 4em)로 둡니다. 클릭하거나 스크롤 진행도 60%에 이르면 정답이 아래에서 리빌됩니다.
- **블록 B · 출발점**: `stats` 3개(span 4)와 `goal` 박스(1px 테두리, 우측 정렬)를 둡니다.
- **블록 C · 9개 규칙**: hairline 리스트로 씁니다. 행 = `no`(1열, `--text-mute`) · `key`(2–3열, 700) · `text`(4–10열) · `value`(11–12열, 우측). 그룹(도전/연결/존중) 사이에는 `--block-gap`을 두고, 그룹명은 섹션 라벨 스타일로 씁니다. 호버하면 흰색 fill이 아래에서 차오르고(560ms) 텍스트가 검정으로 바뀝니다.

### 5.4 `sticky-cards` (04 · 05 · 13의 P4)
- 섹션 높이 `100svh + max(1100px, 180svh)`, 내부 프레임은 `sticky; top:0`.
- 상단: 라벨 + 타이틀 2줄. 하단: 카드 N개(04·05·13은 4개 → span 3 / 3개면 span 4).
- 카드: `--card-bg`, 패딩 `max(20px, 2.083vw)`, 높이 `max(300px, min(56svh, 60vw))`.
  - 상단: 코드(`P1` / `01`) 15px 700 + 키(`SEE`) 카드 타이틀 크기
  - 중단: 이름 · 질문 · 본문 15px
  - 하단: `evidence` 또는 `tools` 13px, 위에 1px `--line-weak`
- 스크롤 시퀀스: 진행도에 따라 카드 1→N의 **흰색 면이 아래에서 50%→0%로 올라오며** 카드를 덮고, 텍스트는 검정으로 반전됩니다. MAKERVIL의 이미지 리빌 자리를 흰색 면 반전으로 바꾼 것입니다.
- `status: 방향 제안` 카드(P4 EMBED)는 흰 면 대신 1px 점선 테두리로 두고, 끝까지 반전하지 않습니다. 실행 범위 밖이라는 표시입니다.
- 960px 미만 또는 reduced-motion: sticky를 해제하고 세로로 쌓습니다.
- 05의 `principles`는 카드 아래 `hairline-list`(4행)로 이어 붙입니다.
- 04의 `insight`는 섹션 끝에 인덴트 헤드라인 크기로 한 줄 배치합니다.

### 5.5 `case-cards` (06 · 07 · 08 · 11)
- 헤딩: `[(SEE) 1–2] [title 3–8, 2줄] [lead 9–11, margin-top 36px]`
- 카드 배치 (MAKERVIL Brands 비대칭 패턴):

| 카드 순번 | 컬럼 | 추가 여백 |
|---|---|---|
| 1 | 1–5 | — |
| 2 | 9–12 | `margin-top: max(180px, 25vw)` |
| 3 | 4–8 | `margin-top: max(120px, 11.46vw)` |
| 4 이후 | 1–5 / 9–12 / 4–8 반복 | 같은 규칙 |

- 미디어 `aspect-ratio: 8/9`, `object-fit:cover`, `filter: grayscale(1) contrast(1.05)`, 배경 `#111`.
- 카드 하단 메타: 좌측 이름(16px) · 우측 기간 또는 대표 수치(16px, tabular-nums).
- **호버 카피**: 이미지 중앙에 `hover_copy` 2줄이 페이드 인합니다(16–24px, 600, 가운데 정렬). 배경에는 `rgba(17,17,17,.55)` 딤을 깝니다.
- 카드 아래(데스크톱은 우측 빈 열)에는 해당 카드의 `stats`를 작은 스탯(48px)으로 둡니다.
- 스크롤 패럴랙스: 카드별 `--drift-y` ±40px.
- 섹션별 카드 구성:
  - **06 SEE**: `cards` 3장(접점 · BGM · 제약→대안). 8개 접점은 카드 아래 4×2 hairline 그리드 텍스트로, `constraints`는 `hairline-table`로 둡니다.
  - **07 DO**: `routines` 3장 → `programs` 4장 순서. `learning` 비교는 섹션 끝에 2열 대형 수치(26회 vs 2.4회)로 둡니다. 2.4회는 `--text-mute`로 씁니다.
  - **08 SHARE**: `process` 4단계는 hairline 4열, `funnel`은 3단 대형 수치(43 → 9 → 146), `blind_quiz`는 A/B/C 3열 카드(클릭하면 정답 A 반전), `quote`는 풀폭 인덴트 헤드라인으로 둡니다.
  - **11 AI**: `items` 5장을 카드로 둡니다. `owner`/`stack`은 카드 메타에 13px로 씁니다.
- 모바일(<960): 카드 1열 block, 카드 간 48px, 패럴랙스는 해제합니다.

### 5.6 `evidence` (09)
- **블록 A · 메가 수치**: `56.7%`(`--text-mute`, 스탯 크기) → `88.7%`(메가 수치 158px, 흰색). 우측에 `delta`와 목표선 문구를 둡니다. 진입 시 숫자가 56.7부터 88.7까지 카운트업합니다(1600ms, `--ease-digit`).
- **블록 B · 측정 설계**: `design.rows`를 `hairline-table` 2열로 둡니다.
- **블록 C · 근거 2개**: 6열씩 나란히 둡니다. 각 블록에 `claim`(카드 타이틀) + 막대 2개 + `caveat`(13px).
  - 막대: 높이 2px짜리 **가로 막대**입니다. 주 계열(참여사, 경험 집단)은 흰색 실선, 비교 계열은 `--text-mute`로 씁니다. 막대 끝에 값 라벨을 직접 붙이고, 범례는 쓰지 않습니다.
  - 진입 시 막대가 `scaleX(0→1)`로 그려집니다(900ms, `--ease-clip`).
- **블록 D · 회사별 / 문항별**: **덤벨 차트**입니다(구현 시 슬로프 차트에서 변경 — 문항별 T1 값이 84~95%에 몰려 슬로프 라벨이 겹치기 때문). 행마다 0–100% 트랙 위에 T0(빈 원) → T1(채운 원)을 1px 선으로 잇고, `highlight` 행만 2px 흰선, 나머지는 `--text-mute`. 80% 기준선은 1px 점선. 회사별과 문항별을 탭 2개(텍스트 탭 + 하단 1px 라인)로 전환합니다.
- **블록 E · gap / what_worked / behavior**: gap은 2행 미니 슬로프, what_worked는 가로 막대 5개(1위만 흰색), behavior는 인용 3개를 3열 인덴트 텍스트로 둡니다.
- **블록 F · 데이터의 한계**: `hairline-list`로 두고 번호를 `--text-mute`로 씁니다. 숨기지 않고 본문과 같은 크기로 씁니다.
- 차트는 SVG로 그리고, 모든 수치를 `<title>`과 표 대체 텍스트로 함께 제공합니다.

### 5.7 `hairline-table` (10 · 12)
- `border-top: 1px var(--line-strong)`, 각 행 `border-bottom` 동일, 행 최소 높이 76px.
- **10 advantage**: 열 = `axis`(1–2, 700) · `common`(3–5, `--text-mute`) · `ours`(6–9) · `proof`(10–12, 13px). 호버하면 흰색 fill이 아래에서 차오르고, `ours`가 우측으로 10px 이동합니다.
- **12 timeline**: `milestones`는 행 = `label`(1–9) · `date`(10–12, 우측, tabular-nums)로 둡니다(MAKERVIL 뉴스 리스트와 같은 구조). `phases`는 리스트 위에 가로 1px 바 2구간(계획 12주 흰색 실선 / 연장 7주 점선)으로 표시합니다. `plan_vs_actual`은 3열 표, `cost.breakdown`은 2px 가로 막대 5개(비중 % 직접 라벨)로 둡니다.

### 5.8 `hairline-list` (14)
- `contributions`의 `area`가 행 제목이고, 클릭하면 `items`가 펼쳐지는 아코디언입니다(520ms).
- 행 우측에는 항목 수를 `05`처럼 tabular-nums로 둡니다.
- 데스크톱 기본 상태는 모두 펼침입니다(채용 담당자가 클릭 없이 읽도록). 모바일은 첫 행만 펼칩니다.
- `role`은 리스트 위에 인덴트 헤드라인으로, `credit`은 리스트 아래 13px로 둡니다.

### 5.9 `contact-marquee` (15)
- 100svh. 배경 이미지는 쓰지 않고 `#111` 단색으로 둡니다.
- 상단 마퀴: `site.md › marquee` 반복, `clamp(120px,15.625vw,300px)`, `--marquee` 색, 42s linear infinite, 뷰포트 근처에서만 재생.
- 하단 정렬 콘텐츠: 라벨 `(Contact)` → `title` 2줄(섹션 타이틀 크기) → `profile.summary`(본문 7–11열) → `contact` 3개를 시그니처 CTA로(이메일 · LinkedIn · GitHub).
- `credits`는 CTA 아래 13px `--text-sub`로 둡니다.

### 5.10 인트로 로더
- MAKERVIL의 3D 큐브는 쓰지 않습니다. **카운터만** 씁니다.
- 흰 화면(`#FFF` / `#111`) 우하단에 3자리 카운터가 **`56.7` → `88.7`**로 롤링하고(1400ms, `--ease-digit`), 좌하단에 `Winning Rules, loading .`(15px)을 둡니다.
- 2000ms에 커버가 위로 슬라이드 아웃되고 히어로 리빌이 시작됩니다.
- 세션당 1회만 실행합니다(`sessionStorage`, try/catch). 모바일과 reduced-motion에서는 생략합니다.

### 5.11 푸터 (fixed reveal)
- 100svh 스페이서 뒤에 `position:fixed; bottom:0; height:100svh` 푸터를 둡니다. 배경 `#000`.
- row1: 섹션 목록(1–3) · Contact(7–9) · Back to Top(12)
- row2: **이름 워드마크** `site.md › wordmark`(기본 `GOODWON`). Pretendard 800 텍스트를 글자 단위 `span`으로 쪼개 각 `overflow:hidden` 마스크에 넣고, `translateY(116%) rotateX(-66deg)` → 0, 1900ms, 글자당 55ms 스태거로 올립니다. 폭은 컨테이너 100%에 맞춥니다(`font-size`를 JS로 fit).
- row3: 하단 바(1px `--line-weak`) — `footer.copyright` · `footer.disclaimer`(13px) · `Back to Top ↑`
- 라이트 테마: 배경 `#F7F7F7`, 워드마크 `#111`.

---

## 6. 모션

### 6.1 시그니처 리빌
```css
.reveal { overflow: hidden; perspective: max(900px, 62.5vw); }
.reveal__inner {
  display: block; transform-origin: 50% 0; transform-style: preserve-3d;
  transform: translate3d(0,112%,0) rotateX(-84deg);
  transition: transform 1000ms var(--ease-expo);
}
.reveal.is-visible .reveal__inner { transform: none; }
```
- 타이틀은 라인 단위로 쪼개고, 라인별 딜레이는 60–110ms입니다. 라벨·CTA·각주는 블록 단위로 같은 패턴을 씁니다.
- 트리거: `IntersectionObserver` threshold 0.2, 한 번 발동하면 unobserve.

### 6.2 스크롤 연동
| 요소 | 방식 |
|---|---|
| 히어로 라인 | 라인별 패럴랙스 ±6% |
| `case-cards` | 카드별 `--drift-y` |
| `sticky-cards` | 진행도 → 카드별 흰 면 `50% → 0%` |
| 스탯 · 메가 수치 | 진입 시 1회 카운트업 |
| 차트 막대 · 슬로프 | 진입 시 1회 그리기 |
| 헤더 | 푸터에 닿으면 퇴장 |
| 푸터 워드마크 | 진입 시 글자 리빌 |

- 스무스 스크롤: Lenis(`lenis@1.1.13`, jsDelivr), RAF 단일 루프.
- **한 번에 하나만 움직입니다.** 텍스트 리빌과 카드 등장 사이는 딜레이로 분리합니다.

### 6.3 reduced-motion
`prefers-reduced-motion: reduce`에서는 모든 transition과 animation을 1ms로 바꾸고, sticky·패럴랙스·커서·마퀴·인트로를 해제합니다. 카운터는 최종값을 즉시 표시합니다.

---

## 7. 반응형

| 브레이크포인트 | 변화 |
|---|---|
| ≥1280 | 12컬럼, 비대칭 카드, sticky 카드, 커서 |
| 960–1279 | 12컬럼 유지, 본문 열을 1–12로 확장, 카드 폭 확대 |
| ≤959 | 모바일 메뉴, 스탯 2열, 카드 1열, 커서 제거 |
| ≤768 | sticky 해제, 표를 카드형 세로 배치로 전환(행 = 카드, 열 라벨을 각 값 앞에 13px로) |
| ≤560 | 섹션 패딩 `clamp(48px,14.9vw,56px)`, 히어로 40–52px, 섹션 타이틀 32–40px, 메가 수치 `max(72px,22vw)` |

- 가로 스크롤 없음. 좌우 거터는 최소 16px(모바일 `--mv-page-padding` 16px로 재정의).

---

## 8. 이미지 처리

| 규칙 | 값 |
|---|---|
| 필터 | 전부 `grayscale(1) contrast(1.05)` — 모노크롬 유지 |
| 비율 | `case-cards` 8:9, 화면 캡처는 8:9 안에 `object-fit:contain` + `#111` 레터박스 |
| 형식 | webp, 카드 960×1080, `loading="lazy" decoding="async"` |
| 영상 | mp4(H.264) 무음 자동재생 루프, `playsinline muted`, 포스터 이미지 필수, 그레이스케일 |
| 개인정보 | `CONTENT_GUIDE.md §1 이미지 처리 기준`을 우선 적용 |
| OG 이미지 | 1200×630, `#111` 배경 + `56.7% → 88.7%` 흰색 메가 수치 + 제목 |

---

## 9. 접근성 · 성능

- 대비: `#FFF` on `#111` 18.9:1. `--text-sub`(68%)는 본문 보조에만, `--text-mute`(42%)는 **수치 비교 대상에만** 쓰고 18px 이상 크기로 씁니다.
- `:focus-visible`: 1px solid currentColor, offset 2px.
- 히어로와 라인 분할 타이틀은 `aria-label`로 전체 문장을 제공하고, 시각 라인은 `aria-hidden`.
- 마퀴·장식·커서는 `aria-hidden`.
- 차트: SVG `role="img"` + `<title>`, 그리고 시각적으로 숨긴 데이터 표를 함께 제공합니다.
- 퀴즈 정답 리빌은 `<button aria-expanded>`로 만듭니다.
- 터치 영역 최소 44px.
- 성능: 모션은 `transform`/`opacity`/`clip-path`만 씁니다. 폰트 `font-display:swap`. LCP 대상은 히어로 텍스트입니다.

---

## 10. 토큰 스캐폴드

```css
:root,
:root[data-site-theme="dark"] {
  --bg: 17 17 17; --fg: 255 255 255; --footer-bg: 0 0 0;
  color-scheme: dark;
}
:root[data-site-theme="light"] {
  --bg: 255 255 255; --fg: 17 17 17; --footer-bg: 247 247 247;
  color-scheme: light;
}
:root {
  --mv-black: rgb(var(--bg));
  --mv-white: rgb(var(--fg));
  --line-strong: rgb(var(--fg) / .42);
  --line-weak: rgb(var(--fg) / .18);
  --card-bg: rgb(var(--fg) / .035);
  --text-sub: rgb(var(--fg) / .68);
  --text-mute: rgb(var(--fg) / .42);
  --marquee: rgb(var(--fg) / .28);

  --mv-page-padding: max(20px, 1.041667vw);
  --mv-grid-gap: max(8px, .833333vw);
  --mv-header-height: max(64px, 4.479167vw);
  --section-pad: max(96px, 10.4167vw);
  --block-gap: max(64px, 6.25vw);

  --ease-expo: cubic-bezier(.16,1,.3,1);
  --ease-quint: cubic-bezier(.22,1,.36,1);
  --ease-clip: cubic-bezier(.65,0,.35,1);
  --ease-digit: cubic-bezier(.22,.74,.28,1);

  --font: "Pretendard","Pretendard Variable",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
}
body { background: var(--mv-black); color: var(--mv-white); font-family: var(--font); word-break: keep-all; }
.mv-grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); column-gap:var(--mv-grid-gap); }
@media (max-width: 559px) { :root { --mv-page-padding: 16px; } }
```

- 테마 초기값은 다크입니다(브랜드 기본). 토글 상태는 `localStorage`에 try/catch로 저장합니다.

---

## 11. 구현 체크리스트

- [ ] `#111`/`#fff` 외 색 0개 (차트 포함)
- [ ] Pretendard 단일, 500/700/800 위계
- [ ] 모든 `layout` 값이 §5 컴포넌트에 매핑됨
- [ ] 섹션 라벨 `(Eyebrow)` 형식 + 출처 각주
- [ ] 스탯·메가 수치 최종값이 DOM에 먼저 존재(JS 실패 대비)
- [ ] `case-cards` 비대칭 배치 + 그레이스케일 + 호버 카피
- [ ] `sticky-cards` 흰 면 반전 시퀀스 + P4 점선 예외
- [ ] 차트: 흰 실선 / 42% 반투명 2계열만, 직접 라벨, 대체 표
- [ ] 인트로 카운터 56.7 → 88.7, 세션 1회
- [ ] 푸터 fixed reveal + 이름 워드마크
- [ ] 960 / 768 / 560 브레이크포인트 검수, 가로 스크롤 0
- [ ] reduced-motion에서 정적 레이아웃
- [ ] MAKERVIL 고유 자산(로고·워드마크·렌더·카피·주소) 0건
