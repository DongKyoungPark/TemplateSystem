import '@testing-library/jest-dom';
import { vi } from 'vitest';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
} as unknown as Storage;

window.localStorage = localStorageMock;

Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => '123e4567-e89b-12d3-a456-426614174000',
  },
});
