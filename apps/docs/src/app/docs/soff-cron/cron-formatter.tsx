'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { validateCron, formatCron } from 'soff-cron';

export function CronFormatter() {
  const [expression, setExpression] = useState('0 9 * * 1-5');
  const [locale, setLocale] = useState<'en' | 'es'>('en');

  const validation = validateCron(expression);
  const formatted = validation.isValid ? formatCron(expression, { locale }) : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cron-input">Cron Expression</Label>
        <Input
          id="cron-input"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="0 9 * * 1-5"
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label>Language / Idioma</Label>
        <RadioGroup value={locale} onValueChange={(v) => setLocale(v as 'en' | 'es')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="en" />
            <Label htmlFor="en" className="font-normal">
              English
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="es" id="es" />
            <Label htmlFor="es" className="font-normal">
              Español
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="rounded-lg border p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Validation:</span>
            {validation.isValid ? (
              <span className="text-sm text-green-600 dark:text-green-400">✓ Valid</span>
            ) : (
              <span className="text-sm text-red-600 dark:text-red-400">✗ Invalid</span>
            )}
          </div>
          {validation.error && (
            <p className="text-sm text-red-600 dark:text-red-400">{validation.error}</p>
          )}
          {formatted && (
            <div className="mt-4 rounded-md bg-muted p-3">
              <p className="text-sm font-medium text-muted-foreground">Human-readable:</p>
              <p className="mt-1 text-lg font-semibold">{formatted}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
