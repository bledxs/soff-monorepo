'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Holiday {
  date: string;
  key: string;
  name: string;
  isShifted?: boolean;
}

interface HolidaysListProps {
  holidays: Holiday[];
}

export function HolidaysList({ holidays }: HolidaysListProps) {
  const [filter, setFilter] = useState('');

  const filteredHolidays = holidays.filter(
    (h) => h.name.toLowerCase().includes(filter.toLowerCase()) || h.date.includes(filter)
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter holidays..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Key</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredHolidays.map((holiday) => (
              <tr
                key={`${holiday.date}-${holiday.key}`}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-mono">{holiday.date}</td>
                <td className="px-4 py-3">{holiday.name}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{holiday.key}</td>
                <td className="px-4 py-3">
                  {holiday.isShifted && <Badge variant="secondary">Shifted</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredHolidays.length === 0 && (
          <p className="p-4 text-center text-muted-foreground">No holidays found</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Showing {filteredHolidays.length} of {holidays.length} holidays
      </p>
    </div>
  );
}
