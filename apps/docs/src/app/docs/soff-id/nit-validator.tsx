'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { validateNIT, formatNIT, calculateNITCheckDigit, cleanNIT } from 'soff-id/locales/co';

export function NITValidator() {
  const [value, setValue] = useState('');

  const cleaned = cleanNIT(value);
  const isValid = value.length > 0 ? validateNIT(value) : null;
  const formatted = cleaned.length >= 9 ? formatNIT(cleaned) : '';
  const checkDigit =
    cleaned.length >= 9 ? calculateNITCheckDigit(cleaned.slice(0, -1) || cleaned) : '';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nit" className="mb-2 block text-sm font-medium">
          Enter a Colombian NIT
        </label>
        <Input
          id="nit"
          placeholder="900123456-7 or 9001234567"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="max-w-sm font-mono"
        />
      </div>

      {value.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Validation</p>
            <div className="mt-1 flex items-center gap-2">
              {isValid ? (
                <Badge className="bg-green-500">✓ Valid</Badge>
              ) : (
                <Badge variant="destructive">✗ Invalid</Badge>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Cleaned</p>
            <p className="mt-1 font-mono">{cleaned || '-'}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Formatted</p>
            <p className="mt-1 font-mono">{formatted || '-'}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Check Digit</p>
            <p className="mt-1 font-mono">{checkDigit || '-'}</p>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Try: <code className="rounded bg-muted px-1">900123456-7</code> (valid) or{' '}
        <code className="rounded bg-muted px-1">900123456-0</code> (invalid)
      </p>
    </div>
  );
}
