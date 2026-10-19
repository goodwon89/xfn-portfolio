---
id: problem
order: 3
nav: 문제
eyebrow: "Problem"         # 렌더링: (Problem) 03
title: "아홉 문장 중, 절반만 알고 있었습니다"
lead: "그룹은 Mission과 핵심가치를 매일의 행동으로 바꾸는 9개의 행동강령을 만들었습니다. 그런데 구성원의 일상에는 아직 들어가지 못했습니다."
layout: quiz-baseline           # DESIGN.md §5
quiz:
  prompt: "빈칸을 채워 보시겠습니까?"
  items:
    - q: "변화를 이끌거나, ________."
      a: "비키거나"
    - q: "동료의 의견을 듣는 것도 ________에 포함이다."
      a: "월급"
  reveal: "클릭하면 정답 공개"
values:
  mission: "상상으로 세상을 이롭게"
  groups:
    - value: 도전
      en: CHALLENGE
      rules:
        - { no: "01", key: Lead, text: "변화를 이끌거나, 비키거나." }
        - { no: "02", key: Sprint, text: "완성보다 속도, 성공보다 시도." }
        - { no: "03", key: Learn, text: "배움은 생존을 위한 가장 공격적인 투자다." }
    - value: 연결
      en: CONNECTION
      rules:
        - { no: "04", key: Insight, text: "외부 인사이트를 내부 자산으로 연결한다." }
        - { no: "05", key: Horizon, text: "직급에 상관없이 전원이 의사결정에 참여해야 한다." }
        - { no: "06", key: Sync, text: "우리 팀을 넘어 우리 회사의 답을 찾는다." }
    - value: 존중
      en: RESPECT
      rules:
        - { no: "07", key: Face-up, text: "우리는 뒤에서 말하지 않는다." }
        - { no: "08", key: Listen, text: "동료의 의견을 듣는 것도 월급에 포함이다." }
        - { no: "09", key: Open, text: "다름을 인정해라. 내가 틀릴 수도 있다." }
stats:
  - value: "56.7%"
    label: "평균 인지율"
    sub: "9개 문항 평균 정답률"
  - value: "18.2%"
    label: "9문항 모두 정답"
    sub: "132명 중 24명"
  - value: "2.88 / 5"
    label: "팀 내 WR 대화 빈도"
    sub: "\"우리 팀에서 WR 관련 대화가 자주 이루어진다\""
goal:
  label: "공식 KPI"
  value: "인지율 80% 이상"
sources: [survey-t0]
---

2026년 5월, 프로젝트에 참여한 5개 계열사 구성원에게 아홉 개 행동강령을 객관식으로 물었습니다.

평균 정답률은 **56.7%** 였습니다. 아홉 문장을 모두 아는 사람은 다섯 명 중 한 명이 되지 않았습니다. 팀 안에서 행동강령 이야기를 나누는 빈도는 5점 만점에 2.88점이었습니다.

행동강령은 만들어져 있었지만, 구성원이 기억하지도 쓰지도 않는 문장이었습니다.
