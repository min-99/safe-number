# 🛡️ safe-number

> "JavaScript의 `Number` 한계를 넘어, 금융/알고리즘 연산을 안전하고 편리하게."
>
> Type-Safe BigInt Utility Library for Modern TypeScript Projects

[![CI Status](https://img.shields.io/github/actions/workflow/status/min-99/safe-number/ci.yml?style=flat-square&logo=github)](https://github.com/min-99/safe-number/actions)
[![npm version](https://img.shields.io/npm/v/@min-99/safe-number.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/@min-99/safe-number)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

<!-- [![Coverage](https://img.shields.io/codecov/c/github/your-username/safe-number?style=flat-square&logo=codecov)](https://codecov.io/gh/min-99/safe-number) -->

<br/>

## 🧐 Motivation (왜 만들었나요?)

JavaScript의 기본 `Number` 타입은 2^{53}-1을 넘어가면 정밀도를 잃습니다(Safe Integer Overflow). 이를 해결하기 위해 `BigInt`가 도입되었지만, 실제 개발 환경에서는 다음과 같은 불편함(Pain Points)이 존재했습니다.

1.  **Strict Type Mixing:** `10n + 1` 처럼 `BigInt`와 `Number`를 섞어서 연산하면 런타임 에러(`TypeError`)가 발생합니다.
2.  **Algorithmic Limitation:** `Math.max()` 등에 `BigInt` 배열을 넣을 수 없거나, Spread Operator 사용 시 Call Stack 초과 위험이 있습니다.
3.  **JSON Serialization:** `BigInt`는 `JSON.stringify()` 시 직렬화되지 않고 에러를 뱉습니다.

**`safe-number`**는 이러한 문제를 해결하기 위해 탄생했습니다. 입력 타입(`string | number | bigint`)에 구애받지 않는 **안전한 사칙연산**, **통계 유틸리티**, 그리고 **JSON 직렬화 헬퍼**를 제공합니다.

<br/>

## ✨ Features

- **Type-Safe Arithmetic:** `plus(10, "200")` 처럼 서로 다른 타입을 넣어도 내부적으로 추론하여 안전하게 계산합니다.
- **Robust Statistics:** 대량의 데이터 배열에서도 스택 오버플로우 없이 `sum`, `max`, `min`을 계산합니다.
- **JSON Helper:** `BigInt`가 포함된 객체를 안전하게 직렬화/역직렬화(stringify/parse) 합니다.
- **Zero Dependency:** 외부 의존성 없이 가볍고 빠릅니다.
- **Tree Shaking:** 필요한 함수만 import 하여 번들 사이즈를 최소화할 수 있습니다.

<br/>

## 📦 Installation

```bash
# pnpm (Recommended)
pnpm add @min-99/safe-number

# npm
npm install @min-99/safe-number

# yarn
yarn add @min-99/safe-number
```

<br/>

## 🚀 Usage

### 1. 안전한 사칙연산 (SafeMath)

입력값이 Number인지 BigInt인지 고민하지 마세요. @min-99/safe-number가 알아서 처리합니다.

### 사용가능한 함수 목록

a,b가 될 수 있는 타입: number, bigint, string

| 함수                | 설명                 | 반환 타입 |
| ------------------- | -------------------- | --------- |
| `plus(a, b)`        | 덧셈                 | `bigint`  |
| `subtraction(a, b)` | 뺄셈                 | `bigint`  |
| `multiply(a, b)`    | 곱셈                 | `bigint`  |
| `divide(a, b)`      | 나눗셈               | `bigint`  |
| `gt(a, b)`          | 크다 (a > b)         | `boolean` |
| `gte(a, b)`         | 크거나 같다 (a >= b) | `boolean` |
| `lt(a, b)`          | 작다 (a < b)         | `boolean` |
| `lte(a, b)`         | 작거나 같다 (a <= b) | `boolean` |
| `equal(a, b)`       | 같다 (a === b)       | `boolean` |

```ts
// 코드 예시

import { plus, divide, gt } from '@min-99/safe-number';

// 1. 서로 다른 타입 연산 (Number + String)
const result1 = plus(10, '9007199254740992');
console.log(result1); // 9007199254741002n

// 2. 나눗셈 (정수 반환)
const result2 = divide(100n, 3);
console.log(result2); // 33n

// 3. 비교 연산
const isLarger = gt(10, 5n); // true
```

<br/>

### 2. 통계 유틸리티 (BigStats)

알고리즘 문제나 데이터 분석 시, Math.max(...arr)의 한계를 극복합니다.

### 사용가능한 함수 목록

a,b가 될 수 있는 타입: number, bigint, string

| 함수       | 설명           | 반환 타입 |
| ---------- | -------------- | --------- |
| `max(arr)` | 배열 내 최대값 | `bigint`  |
| `sum(arr)` | 배열 내 합계   | `bigint`  |
| `min(arr)` | 배열 내 최소값 | `bigint`  |

```ts
// 코드 예시

import { max, sum, min } from '@min-99/safe-number';

const data = [10, '500', 5n, '999999999999999999'];

// 배열 내 최대값 찾기 (타입 혼용 가능)
const maxValue = max(data);
console.log(maxValue); // 999999999999999999n

// 합계
const total = sum(data);
console.log(total); // 500000000000000014n

// 최소값
const minValue = min(data);
console.log(minValue); // 5n
```

### 3. JSON 변환 (SafeJson)

서버 통신 시 BigInt 필드가 있어도 당황하지 마세요. `JSON.stringify`와 호환되며, 함수와 심볼은 표준과 동일하게 제거됩니다.

**참고:** `parse` 함수는 객체(`{}`)만 반환합니다. 배열이나 원시값을 파싱하면 에러가 발생합니다.

### 사용가능한 함수 목록

| 함수             | 설명                               | 반환 타입 |
| ---------------- | ---------------------------------- | --------- |
| `stringify(obj)` | 객체를 JSON 문자열로 변환          | `string`  |
| `parse(jsonStr)` | JSON 문자열을 파싱하여 객체로 변환 | `object`  |

```ts
// 코드 예시

import { stringify, parse } from '@min-99/safe-number';

const payload = {
  id: 100n,
  balance: 999999999999999999n,
  user: 'toss',
  fn: () => {}, // 함수는 제거됨 (JSON.stringify와 동일)
  sym: Symbol('test'), // 심볼도 제거됨 (JSON.stringify와 동일)
};

// ❌ JSON.stringify(payload) -> TypeError: Do not know how to serialize a BigInt
// ✅ stringify(payload)
const jsonStr = stringify(payload);
// Output: '{"id":100n,"balance":999999999999999999n,"user":"toss"}'

// 역직렬화
const parsed = parse(jsonStr);
// { id: 100n, balance: 999999999999999999n, user: 'toss' }
```

<br/>

## 🏗️ Architecture & Code Quality

이 프로젝트는 유지보수성과 개발자 경험(DX)을 최우선으로 고려하여 설계되었습니다. <br/>

### Directory Structure

기능별로 모듈을 분리하여 응집도를 높이고, 테스트 코드를 인접하게 배치했습니다. <br/>

```
safe-number/
├── .github/workflows/   # CI, publish 자동화
├── src/
│   ├── core/            # 핵심 연산 로직 (SafeMath)
│   ├── stats/           # 통계 유틸리티 (BigStats)
│   ├── json/            # JSON 처리기 (SafeJson)
│   ├── types/           # 공용 타입 정의 (NumberLike 등)
│   ├── error/           # 에러 메시지 중앙 관리
│   └── index.ts         # Entry Point
├── tests/               # 통합 테스트 및 엣지 케이스 검증
├── tsup.config.ts       # 번들링 설정
├── vitest.config.ts     # 테스트 설정
└── ...
```

### Tech Stack & Tools

- Build: tsup (esbuild 기반의 초고속 번들러, ESM/CJS 듀얼 패키지 지원)

- Test: Vitest (Vite 기반의 빠르고 현대적인 Unit Testing)

- Lint/Format: Prettier와 ESLint, husky (pre-commit hook 사용)

- Package Manager: pnpm (빠르고 효율적인 의존성 관리)

### Continuous Integration (CI)

- GitHub Actions를 통해 모든 PR과 Push에 대해 다음 체크를 수행합니다.

1. Lint Check: Prettier와 ESLint를 통한 코드 스타일 검증

2. Build Check: tsup 빌드 정상 여부

3. Test Coverage: vitest run --coverage로 로직 검증 (목표 커버리지 90%)

### 🤝 Contributing

기여는 언제나 환영합니다! 새로운 기능 제안이나 버그 제보는 Issue를 등록해 주세요.

1. Fork this repository

2. Create your feature branch (git checkout -b feature/{기능명})

3. Commit your changes (git commit -m 'feat: {기능명}')

4. Push to the branch (git push origin feature/{기능명})

5. Open a Pull Request
