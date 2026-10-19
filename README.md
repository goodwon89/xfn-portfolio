# Winning Rules, 일상의 언어가 되다 — XFN PJT 케이스 스터디

> 그룹 9개 계열사의 행동강령(Winning Rules) 인지율을 **4개월 만에 56.7% → 88.7%**로 끌어올린 문화 내재화 프로젝트을 정리한 포트폴리오 원페이지 사이트입니다. Next.js 정적 사이트로, `content/`의 Markdown 원고를 그대로 읽어 렌더링합니다.

- **작성자**: 장근원 · 상상인그룹 인재경영실 · 프로젝트 PM
- **기간**: 2026.04.20 ~ 2026.08.31 (19주)
- **형식**: 원페이지 스크롤형 케이스 스터디 (이직·커리어용)

---

## 빠른 시작

```bash
npm install
npm run dev        # http://localhost:3000 — 원고를 고치면 바로 반영
npm run build      # out/ 에 정적 사이트 생성
npm run preview    # out/ 미리보기
```

원고 수정 → `git push` 하면 GitHub Actions가 자동으로 빌드·배포합니다.

## GitHub Pages 배포 (최초 1회)

1. GitHub에서 새 레포를 만듭니다. (예: `xfn-portfolio` → 주소는 `https://<아이디>.github.io/xfn-portfolio/`)
2. 이 폴더를 그 레포의 `main` 브랜치에 push 합니다. (이 레포: https://github.com/goodwon89/xfn-portfolio → https://goodwon89.github.io/xfn-portfolio/)
   ```bash
   git init && git add . && git commit -m "XFN 포트폴리오 초기 버전"
   git branch -M main
   git remote add origin https://github.com/<아이디>/xfn-portfolio.git
   git push -u origin main
   ```
3. 레포 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 바꿉니다.
4. **Actions** 탭에서 `Deploy to GitHub Pages` 가 초록색이 되면 위 주소로 접속합니다.

> 하위 경로(`/xfn-portfolio`)는 워크플로가 자동으로 맞춥니다. `<아이디>.github.io` 이름의 레포에 올리면 루트 주소로 배포됩니다.

## 이 레포의 구성

```
xfn-portfolio/
├─ README.md                 ← 지금 이 파일
├─ CONTENT_GUIDE.md          ← 공개 기준(마스킹 규칙) · 출처 목록(사이트 각주가 이 표를 읽음) · 공개 전 확인 목록
├─ DESIGN.md                 ← 모노크롬 에디토리얼 디자인 명세 (토큰 · layout ↔ 컴포넌트 · 모션 · 반응형)
├─ content/                  ← ✏️ 원고 (여기만 고치면 됨)
│  ├─ site.md                ← 사이트 메타(SEO·OG) · 내비게이션 · 디자인 옵션 · 푸터
│  └─ sections/01~15-*.md    ← 원페이지 섹션 원고 (order 순으로 렌더링)
├─ public/images/            ← 이미지 자산. 파일을 넣으면 자리표시자 대신 자동 표시
├─ app/                      ← Next.js 페이지 · 전역 스타일(globals.css = DESIGN.md 토큰)
├─ components/               ← 섹션 컴포넌트(sections.jsx) · 공통 UI(ui.jsx) · 인터랙션(client.jsx)
├─ lib/content.js            ← Markdown 원고 로더
└─ .github/workflows/        ← GitHub Pages 자동 배포
```

## 이미지

`public/images/`의 이미지는 실제 프로젝트 산출물(사이니지·배너·포스터·명패·화면 캡처·Arcade 플레이 영상)을 960×1080(8:9) webp로 가공한 것입니다. 사이트에서는 흑백으로 보이고, 카드에 마우스를 올리면 원래 색으로 돌아옵니다.

- 공개 기준에 따라 **얼굴이 식별되는 현장 사진(드레스코드 이벤트·Matchday 현장)은 넣지 않았습니다.** Matchday는 베스트 드레서 폼보드 그래픽으로 대신했습니다.
- 해당 사진이 없는 항목(WR BGM · 공용 비밀번호 · 체크리스트 · Insight Out · Spotlight · 컬처덱)은 사이트 톤에 맞춘 **타이포그래픽 카드**로 만들었습니다. 개념도는 카드 하단에 "개념도"로 표기했습니다.
- 이미지를 바꾸려면 같은 파일명으로 덮어쓰거나, 원고의 `media`/`asset` 값을 새 파일명으로 바꾸면 됩니다. 영상은 `.mp4`와 같은 이름의 `.webm`·`.poster.webp`를 함께 두면 자동으로 사용합니다.

## 스토리 구조

원고는 **문제 → 원인 → 제안 → 사례 → 비교 우위 → 진행 → 성과** 흐름을 따릅니다. 읽는 사람이 "무엇이 문제였고, 왜 이렇게 풀었고, 정말 효과가 있었는가"를 차례로 확인할 수 있게 짰습니다.

| 흐름 | 섹션 |
|---|---|
| 도입 | 01 Hero · 02 At a Glance |
| 1. 문제 | 03 Problem |
| 2. 원인 | 04 Root Cause |
| 3. 제안 | 05 Approach (SEE·DO·SHARE·EMBED 모델) |
| 4-1. 사례(실행) | 06 SEE · 07 DO · 08 SHARE |
| 6. 성과(검증) | 09 Results |
| 4-2. 비교 우위 | 10 Advantage · 11 Made with AI |
| 5. 진행 | 12 Timeline & Cost |
| 마무리 | 13 Lessons & Next · 14 My Role · 15 Closing |

> 결과(09)를 비교 우위(10)보다 앞에 둔 이유: 포트폴리오 독자는 "효과가 있었나"를 먼저 확인한 뒤에야 "왜 이 방법이 나았나"에 관심을 갖습니다. 보고서 순서를 원하면 09와 10~11의 `order`만 바꾸면 됩니다.

## 섹션 파일 규칙

각 섹션은 **YAML frontmatter(구조 데이터) + 본문(Markdown 원고)** 으로 되어 있습니다.

```yaml
---
id: results            # 앵커 ID (#results)
order: 9               # 렌더링 순서
nav: 결과              # 상단 내비게이션 라벨 (없으면 내비에 미노출)
eyebrow: Results       # 섹션 라벨 → (Results) 09
title: 섹션 헤드라인
lead: 헤드라인 아래 한 줄 요약
layout: evidence       # DESIGN.md §5 컴포넌트명
stats: [...]           # 숫자 카드 데이터
sources: [...]         # 이 섹션 수치의 출처 (페이지 하단 각주로 렌더링)
assets: [...]          # 필요한 이미지 · 영상과 마스킹 지침
---
본문 원고 …
```

- `layout` 값은 `DESIGN.md §5`의 컴포넌트 9종(hero-display · indent-stats · quiz-baseline · sticky-cards · case-cards · evidence · hairline-table · hairline-list · contact-marquee) 중 하나입니다. 디자인을 바꿀 때는 DESIGN.md만 고치고 원고는 그대로 둡니다.
- `eyebrow`는 `(Problem) 03` 형식으로 렌더링됩니다. `hover_copy`는 사례 카드 호버 시 보이는 "~가 아닙니다. ~입니다." 2줄 카피입니다.
- 숫자는 frontmatter의 `stats`·`chart`에 **한 번만** 적고, 본문에서는 해석만 씁니다. (수치 수정 시 한 곳만 고치면 됨)
- 모든 수치에는 `sources`가 붙어 있습니다. 출처 없는 숫자는 넣지 않습니다.

## 공개 전 꼭 확인

공개 레포입니다. 올리기 전에 **`CONTENT_GUIDE.md`의 "공개 전 확인 목록"** 을 반드시 점검하세요. 원고는 이미 부분 마스킹을 적용했지만, 이미지 자산(현장 사진·스크린샷)은 별도 처리가 필요합니다.
