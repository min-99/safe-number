# safe-number

# 🛡️ safe-number

> **"JavaScript의 `Number` 한계를 넘어, 금융/알고리즘 연산을 안전하고 우아하게."**
>
> **Type-Safe BigInt Utility Library for Modern TypeScript Projects**

[![CI Status](https://img.shields.io/github/actions/workflow/status/min-99/safe-number/ci.yml?style=flat-square&logo=github)](https://github.com/min-99/safe-number/actions)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

<br/>

## 🧐 Motivation (왜 만들었나요?)

JavaScript의 기본 `Number` 타입은 $2^{53}-1$을 넘어가면 정밀도를 잃습니다(Safe Integer Overflow). 이를 해결하기 위해 `BigInt`가 도입되었지만, 실제 개발 환경에서는 다음과 같은 불편함(Pain Points)이 존재했습니다.

1.  **Strict Type Mixing:** `10n + 1` 처럼 `BigInt`와 `Number`를 섞어서 연산하면 런타임 에러(`TypeError`)가 발생합니다.
2.  **Algorithmic Limitation:** `Math.max()` 등에 `BigInt` 배열을 넣을 수 없거나, Spread Operator 사용 시 Call Stack 초과 위험이 있습니다.
3.  **JSON Serialization:** `BigInt`는 `JSON.stringify()` 시 직렬화되지 않고 에러를 뱉습니다.

**`safe-number`**는 이러한 문제를 해결하기 위해 탄생했습니다. 입력 타입(`string | number | bigint`)에 구애받지 않는 **안전한 사칙연산**, **통계 유틸리티**, 그리고 **JSON 직렬화 헬퍼**를 제공합니다.

<br/>

## ✨ Features

- **Type-Safe Arithmetic:** `add(10, "200n")` 처럼 서로 다른 타입을 넣어도 내부적으로 추론하여 안전하게 계산합니다.
- **Robust Statistics:** 대량의 데이터 배열에서도 스택 오버플로우 없이 `sum`, `max`, `min`을 계산합니다.
- **JSON Helper:** `BigInt`가 포함된 객체를 안전하게 직렬화/역직렬화(stringify/parse) 합니다.
- **Zero Dependency:** 외부 의존성 없이 가볍고 빠릅니다.
- **Tree Shaking:** 필요한 함수만 import 하여 번들 사이즈를 최소화할 수 있습니다.

<br/>

## 📦 Installation

```bash
# pnpm (Recommended)
pnpm add safe-number

# npm
npm install safe-number

# yarn
yarn add safe-number
```

<br/>
