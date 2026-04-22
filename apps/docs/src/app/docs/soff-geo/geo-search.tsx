'use client';

import * as React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { searchMunicipalities as searchCo } from 'soff-geo/co';
import { searchMunicipalities as searchMx } from 'soff-geo/mx';
import type { SearchResult, Municipality } from 'soff-geo/core';

type Country = 'co' | 'mx';

export function GeoSearch() {
  const [country, setCountry] = React.useState<Country>('co');
  const [query, setQuery] = React.useState('');
  const searchFn = country === 'co' ? searchCo : searchMx;
  const results: SearchResult<Municipality>[] = query ? searchFn(query, { limit: 10 }) : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search municipality..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <RadioGroup
          defaultValue="co"
          value={country}
          onValueChange={(v) => setCountry(v as Country)}
          className="flex items-center gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="co" id="co" />
            <Label htmlFor="co">Colombia 🇨🇴</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mx" id="mx" />
            <Label htmlFor="mx">México 🇲🇽</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-[300px] p-4">
          {results.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {query ? 'No results found' : 'Type to search...'}
            </div>
          ) : (
            <div className="space-y-2">
              {results.map(({ item, score }) => (
                <div
                  key={item.code}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {country === 'co' ? 'Dept: ' : 'State: '}
                        {item.departmentCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs">{item.code}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Score: {Math.round(score * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
