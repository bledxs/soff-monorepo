import { describe, it, expect, vi, beforeEach } from 'vitest';
import { maskInput, createMaskController } from '../../src/dom/index.js';

describe('DOM Integration', () => {
  describe('maskInput()', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
    });

    it('should apply mask on input event', () => {
      const cleanup = maskInput(input, '(###) ###-####');

      // Simulate typing - mask only adds literals when next char would go there
      input.value = '3001';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('(300) 1');

      cleanup();
    });

    it('should apply mask on change event when onInput is false', () => {
      const cleanup = maskInput(input, '(###) ###-####', { onInput: false });

      input.value = '3001234567';
      input.dispatchEvent(new Event('change'));

      expect(input.value).toBe('(300) 123-4567');

      cleanup();
    });

    it('should call onChange callback', () => {
      const onChange = vi.fn();
      const cleanup = maskInput(input, '(###) ###-####', { onChange });

      input.value = '3001';
      input.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith('(300) 1', '3001');

      cleanup();
    });

    it('should apply initial mask if value exists', () => {
      input.value = '3001234567';
      const cleanup = maskInput(input, '(###) ###-####');

      expect(input.value).toBe('(300) 123-4567');

      cleanup();
    });

    it('should return cleanup function that removes listener', () => {
      const onChange = vi.fn();
      const cleanup = maskInput(input, '(###) ###-####', { onChange });

      cleanup();

      // After cleanup, onChange should not be called
      input.value = '300';
      input.dispatchEvent(new Event('input'));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should handle empty input', () => {
      const cleanup = maskInput(input, '(###) ###-####');

      input.value = '';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('');

      cleanup();
    });

    it('should handle partial input', () => {
      const cleanup = maskInput(input, '##/##/####');

      input.value = '251';
      input.dispatchEvent(new Event('input'));
      expect(input.value).toBe('25/1');

      input.value = '25121';
      input.dispatchEvent(new Event('input'));
      expect(input.value).toBe('25/12/1');

      cleanup();
    });
  });

  describe('createMaskController()', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
    });

    it('should apply mask programmatically', () => {
      const controller = createMaskController('(###) ###-####');

      const result = controller.apply('3001234567');

      expect(result).toBe('(300) 123-4567');
      expect(controller.value).toBe('(300) 123-4567');
      expect(controller.raw).toBe('3001234567');
    });

    it('should track state across multiple applies', () => {
      const controller = createMaskController('##/##/####');

      controller.apply('251');
      expect(controller.value).toBe('25/1');
      expect(controller.raw).toBe('251');

      controller.apply('25122024');
      expect(controller.value).toBe('25/12/2024');
      expect(controller.raw).toBe('25122024');
    });

    it('should bind to input element', () => {
      const controller = createMaskController('(###) ###-####');
      const cleanup = controller.bind(input);

      input.value = '3001234567';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('(300) 123-4567');
      expect(controller.value).toBe('(300) 123-4567');
      expect(controller.raw).toBe('3001234567');

      cleanup();
    });

    it('should call onChange when bound', () => {
      const onChange = vi.fn();
      const controller = createMaskController('(###) ###-####');
      const cleanup = controller.bind(input, { onChange });

      input.value = '3001';
      input.dispatchEvent(new Event('input'));

      expect(onChange).toHaveBeenCalledWith('(300) 1', '3001');

      cleanup();
    });

    it('should update controller state when input changes', () => {
      const controller = createMaskController('##/##');

      // First apply programmatically
      controller.apply('1234');
      expect(controller.value).toBe('12/34');

      // Then bind and type
      const cleanup = controller.bind(input);
      input.value = '5678';
      input.dispatchEvent(new Event('input'));

      expect(controller.value).toBe('56/78');
      expect(controller.raw).toBe('5678');

      cleanup();
    });

    it('should work with different patterns', () => {
      const cpfController = createMaskController('###.###.###-##');
      const phoneController = createMaskController('(##) #####-####');

      cpfController.apply('12345678909');
      expect(cpfController.value).toBe('123.456.789-09');

      phoneController.apply('11912345678');
      expect(phoneController.value).toBe('(11) 91234-5678');
    });

    it('should handle empty values', () => {
      const controller = createMaskController('(###) ###-####');

      controller.apply('');
      expect(controller.value).toBe('');
      expect(controller.raw).toBe('');
    });

    it('should provide correct raw value for partial inputs', () => {
      const controller = createMaskController('####-####');

      controller.apply('123');
      expect(controller.value).toBe('123');
      expect(controller.raw).toBe('123');

      controller.apply('12345');
      expect(controller.value).toBe('1234-5');
      expect(controller.raw).toBe('12345');
    });
  });
});
