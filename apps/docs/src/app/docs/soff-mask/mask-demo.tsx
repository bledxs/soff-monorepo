'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mask, maskWithResult } from 'soff-mask';
import { phoneCO, cpf, creditCard, nit } from 'soff-mask';

const masks = [
  { name: 'Phone (CO)', pattern: phoneCO, placeholder: '(300) 123 4567' },
  { name: 'CPF (BR)', pattern: cpf, placeholder: '123.456.789-09' },
  { name: 'Credit Card', pattern: creditCard, placeholder: '4111 1111 1111 1111' },
  { name: 'NIT (CO)', pattern: nit, placeholder: '900.123.456-7' },
];

export function MaskDemo() {
  const [selectedMask, setSelectedMask] = useState(masks[0]);
  const [value, setValue] = useState('');

  const result = maskWithResult(value, selectedMask.pattern);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const masked = mask(rawInput, selectedMask.pattern);
    setValue(masked);
  };

  const handleMaskChange = (maskItem: (typeof masks)[0]) => {
    setSelectedMask(maskItem);
    setValue('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {masks.map((m) => (
          <button
            key={m.name}
            onClick={() => handleMaskChange(m)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              selectedMask.name === m.name
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <Input
        value={value}
        onChange={handleChange}
        placeholder={selectedMask.placeholder}
        className="font-mono text-lg"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Masked Value</p>
          <p className="font-mono">{result.value || '—'}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Raw Value</p>
          <p className="font-mono">{result.raw || '—'}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge variant={result.complete ? 'default' : 'secondary'}>
            {result.complete ? 'Complete' : 'Incomplete'}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Pattern: <code className="rounded bg-muted px-1">{selectedMask.pattern}</code>
      </p>
    </div>
  );
}
