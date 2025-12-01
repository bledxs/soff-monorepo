'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Money, COP, USD, MXN, BRL, ARS } from 'soff-money';

const currencies = [
  { name: 'COP', currency: COP, flag: '🇨🇴' },
  { name: 'USD', currency: USD, flag: '🇺🇸' },
  { name: 'MXN', currency: MXN, flag: '🇲🇽' },
  { name: 'BRL', currency: BRL, flag: '🇧🇷' },
  { name: 'ARS', currency: ARS, flag: '🇦🇷' },
];

export function MoneyCalculator() {
  const [amount, setAmount] = useState('1500000');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [splitParts, setSplitParts] = useState('3');

  const numericAmount = parseFloat(amount) || 0;
  const money = Money.fromDecimal(numericAmount, selectedCurrency.currency);
  const parts = parseInt(splitParts) || 1;
  const distribution = money.distribute(Math.max(1, Math.min(10, parts)));

  return (
    <div className="space-y-6">
      {/* Currency selector */}
      <div className="flex flex-wrap gap-2">
        {currencies.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedCurrency(c)}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
              selectedCurrency.name === c.name
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <span>{c.flag}</span>
            {c.name}
          </button>
        ))}
      </div>

      {/* Amount input */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Amount (decimal)</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="font-mono text-lg"
        />
      </div>

      {/* Formatted output */}
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm text-muted-foreground">Formatted</p>
        <p className="font-mono text-2xl font-bold">{money.format()}</p>
      </div>

      {/* Split calculator */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-muted-foreground">Split between</label>
          <Input
            type="number"
            min="1"
            max="10"
            value={splitParts}
            onChange={(e) => setSplitParts(e.target.value)}
            className="w-20 font-mono"
          />
          <span className="text-sm text-muted-foreground">people</span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {distribution.map((share, i) => (
            <div key={i} className="rounded-lg border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground">Person {i + 1}</p>
              <p className="font-mono font-semibold">{share.format()}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Total:{' '}
          <span className="font-mono">
            {distribution
              .reduce((sum, m) => sum.add(m), Money.zero(selectedCurrency.currency))
              .format()}
          </span>{' '}
          (no cents lost!)
        </p>
      </div>

      {/* Internal representation */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Cents (internal)</p>
          <p className="font-mono">{money.cents}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Decimal</p>
          <p className="font-mono">{money.toDecimal()}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">Currency</p>
          <p className="font-mono">{selectedCurrency.currency.code}</p>
        </div>
      </div>
    </div>
  );
}
