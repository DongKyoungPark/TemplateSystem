# 템플릿 관리 애플리케이션

## 프로젝트 소개

템플릿을 생성하고 관리하며 미리보기할 수 있는 React 기반의 웹 애플리케이션입니다.

## 시스템 아키텍처

### 사용 기술

- 프론트엔드: React + TypeScript
- 상태관리: Zustand
- 스타일링: Tailwind CSS
- 라우팅: React Router
- 테스트: Vitest + React Testing Library

### 프로젝트 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
├── store/            # Zustand 상태 관리
├── types/            # TypeScript 타입 정의
└── */__tests__/        # 테스트 파일
```

## 기능 명세서

### 템플릿 목록 화면 (/)

- 템플릿 검색 기능
- 템플릿 카드형 목록 표시
- 템플릿별 편집/미리보기/삭제 기능
- 반응형 레이아웃 지원

### 템플릿 편집 화면 (/edit/:id)

- 템플릿 내용 수정
- 변경사항 저장
- 템플릿 구성시 실시간 미리보기

### 템플릿 미리보기 화면 (/preview/:id)

- 템플릿 결과물 미리보기
- 읽기 전용 모드

## 사용된 주요 라이브러리

### 핵심 라이브러리

- **React**: 사용자 인터페이스 구축
- **TypeScript**: 타입 안정성 확보
- **Zustand**: 상태 관리
- **React Router**: 페이지 라우팅
- **Tailwind CSS**: UI 스타일링

### UI 구성요소

- **React Icons**: 아이콘 컴포넌트

## 설치 및 실행 방법

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 또는 yarn 패키지 관리자

### 설치하기

```bash
# npm 사용 시
npm install

# yarn 사용 시
yarn install
```

### 개발 서버 실행

```bash
# npm 사용 시
npm run dev

# yarn 사용 시
yarn dev
```

### 테스트 실행

```bash
# npm 사용 시
npm run test

# yarn 사용 시
yarn test
```

### 배포용 빌드

```bash
# npm 사용 시
npm run build

# yarn 사용 시
yarn build
```
