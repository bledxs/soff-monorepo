// Core exports
export {
  mask,
  unmask,
  maskWithResult,
  createDynamicMask,
  parsePattern,
  isComplete,
  getPatternLength,
  getPlaceholder,
  isValidFormat,
  getNextCursorPosition,
  extractRaw,
} from './core/engine.js';

export type {
  MaskPattern,
  MaskToken,
  TokenType,
  MaskResult,
  MaskOptions,
  DynamicMaskRule,
} from './core/types.js';

// Pre-built masks
export * from './masks/index.js';

// DOM utilities (only for browser environments)
export { maskInput, createMaskController } from './dom/index.js';
export type { MaskInputOptions } from './dom/index.js';
