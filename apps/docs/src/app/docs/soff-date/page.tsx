import { Calendar, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';
import { HolidaysList } from './holidays-list';
import { getVersion } from '@/lib/versions';
import { JsonLd } from '@/components/json-ld';

export const metadata = {
  title: 'soff-date - Holiday Calculator',
};

function getHolidayData() {
  const year = new Date().getFullYear();
  const today = new Date();

  const holidays = getHolidays(year);
  const todayHoliday = isHoliday(today);
  const nextHoliday = getNextHoliday(today);

  return {
    year,
    holidays,
    todayHoliday,
    nextHoliday,
    todayStr: today.toISOString().split('T')[0],
  };
}

export default function SoffDatePage() {
  const { year, holidays, todayHoliday, nextHoliday, todayStr } = getHolidayData();
  const version = getVersion('soff-date');

  return (
    <article className="space-y-8">
      <JsonLd
        name="soff-date"
        description="Lightweight, tree-shakeable holiday calculator with algorithmic date computation."
        package="soff-date"
      />
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <Calendar size={36} className="text-soff-date" />
          <h1 className="text-3xl font-bold">soff-date</h1>
          <Badge>v{version}</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Lightweight, tree-shakeable holiday calculator with algorithmic date computation.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio size={18} className="text-red-500" /> Live Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Today ({todayStr})</p>
              <p className="text-lg font-semibold">
                {todayHoliday ? `🎉 ${todayHoliday.name}` : 'Not a holiday'}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Next Holiday</p>
              <p className="text-lg font-semibold">
                {nextHoliday ? `${nextHoliday.name} (${nextHoliday.date})` : 'None found'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-semibold">Installation</h2>
        <CodeBlock code="npm install soff-date">npm install soff-date</CodeBlock>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
        <CodeBlock
          code={`import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';

// Get all holidays for a year
const holidays = getHolidays(${year});
// → [{ date: '${year}-01-01', key: 'newYear', name: 'Año Nuevo' }, ...]

// Check if today is a holiday
const today = isHoliday(new Date());
// → { date: '...', key: '...', name: '...' } or null

// Get the next upcoming holiday
const next = getNextHoliday(new Date());
// → { date: '...', key: '...', name: '...' }`}
        >{`import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';

// Get all holidays for a year
const holidays = getHolidays(${year});
// → [{ date: '${year}-01-01', key: 'newYear', name: 'Año Nuevo' }, ...]

// Check if today is a holiday
const today = isHoliday(new Date());
// → { date: '...', key: '...', name: '...' } or null

// Get the next upcoming holiday
const next = getNextHoliday(new Date());
// → { date: '...', key: '...', name: '...' }`}</CodeBlock>
      </section>

      {/* Available Locales */}
      <section id="available-locales">
        <h2 className="mb-4 text-2xl font-semibold">Available Locales</h2>
        <div className="grid gap-2">
          {[
            { flag: '🇨🇴', name: 'Colombia', import: 'soff-date/locales/co', holidays: 18 },
            { flag: '🇺🇸', name: 'USA', import: 'soff-date/locales/us', holidays: 10 },
            { flag: '🇲🇽', name: 'México', import: 'soff-date/locales/mx', holidays: 8 },
            { flag: '🇦🇷', name: 'Argentina', import: 'soff-date/locales/ar', holidays: 16 },
            { flag: '🇧🇷', name: 'Brasil', import: 'soff-date/locales/br', holidays: 13 },
          ].map((locale) => (
            <div
              key={locale.name}
              className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{locale.flag}</span>
                <span className="font-medium">{locale.name}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <code className="text-xs text-muted-foreground sm:text-sm">{locale.import}</code>
                <Badge variant="outline">{locale.holidays} holidays</Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holidays List */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Colombia Holidays {year}</h2>
        <HolidaysList holidays={holidays} />
      </section>

      {/* API Reference */}
      <section id="api-reference">
        <h2 className="mb-4 text-2xl font-semibold">API Reference</h2>

        <Tabs defaultValue="getHolidays">
          <TabsList>
            <TabsTrigger value="getHolidays">getHolidays</TabsTrigger>
            <TabsTrigger value="isHoliday">isHoliday</TabsTrigger>
            <TabsTrigger value="getNextHoliday">getNextHoliday</TabsTrigger>
            <TabsTrigger value="isBusinessDay">isBusinessDay</TabsTrigger>
          </TabsList>

          <TabsContent value="getHolidays" className="mt-4 space-y-4">
            <p className="text-muted-foreground">Returns all holidays for a given year.</p>
            <CodeBlock
              code={`function getHolidays(year: number, options?: { lang?: HolidayNames }): Holiday[]

interface Holiday {
  date: string;      // ISO date: '2025-01-01'
  key: string;       // Identifier: 'newYear'
  name: string;      // Display name: 'Año Nuevo'
  isShifted?: boolean; // True if moved by shift rule
}`}
            >{`function getHolidays(year: number, options?: { lang?: HolidayNames }): Holiday[]

interface Holiday {
  date: string;      // ISO date: '2025-01-01'
  key: string;       // Identifier: 'newYear'
  name: string;      // Display name: 'Año Nuevo'
  isShifted?: boolean; // True if moved by shift rule
}`}</CodeBlock>
          </TabsContent>

          <TabsContent value="isHoliday" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Check if a date is a holiday. Returns the holiday info or null.
            </p>
            <CodeBlock
              code={`function isHoliday(date: Date, options?: { lang?: HolidayNames }): Holiday | null`}
            >{`function isHoliday(date: Date, options?: { lang?: HolidayNames }): Holiday | null`}</CodeBlock>
          </TabsContent>

          <TabsContent value="getNextHoliday" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Get the next holiday from a given date (defaults to today).
            </p>
            <CodeBlock
              code={`function getNextHoliday(from?: Date, options?: { lang?: HolidayNames }): Holiday | null`}
            >{`function getNextHoliday(from?: Date, options?: { lang?: HolidayNames }): Holiday | null`}</CodeBlock>
          </TabsContent>

          <TabsContent value="isBusinessDay" className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Check if a date is a business day (not weekend, not holiday).
            </p>
            <CodeBlock
              code={`function isBusinessDay(date: Date): boolean
function businessDays(date: Date, amount: number): Date`}
            >{`function isBusinessDay(date: Date): boolean
function businessDays(date: Date, amount: number): Date`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
