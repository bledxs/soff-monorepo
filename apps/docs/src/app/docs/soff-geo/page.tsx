import { Map, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/code-block';
import { GeoSearch } from './geo-search';
import { getVersion } from '@/lib/versions';
import { JsonLd } from '@/components/json-ld';

export const metadata = {
  title: 'soff-geo - Geographic Data',
};

export default function SoffGeoPage() {
  const version = getVersion('soff-geo');

  return (
    <article className="space-y-8">
      <JsonLd
        name="soff-geo"
        description="Lightweight geographic data library for LATAM - Departments, municipalities, postal codes and more."
        package="soff-geo"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://soff.dev',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Documentation',
              item: 'https://soff.dev/docs',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'soff-geo',
              item: 'https://soff.dev/docs/soff-geo',
            },
          ],
        }}
      />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-soff-geo/10 p-2">
            <Map size={36} className="text-soff-geo" />
          </div>
          <h1 className="bg-linear-to-r from-soff-geo to-soff-geo/70 bg-clip-text text-3xl font-bold text-transparent">
            soff-geo
          </h1>
          <Badge className="bg-soff-geo/20 text-soff-geo">v{version}</Badge>
          <Badge variant="outline">~2KB Core</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Lightweight geographic data library for LATAM - Departments, municipalities, postal codes
          and more.
        </p>
      </div>

      {/* Live Demo */}
      <Card className="border-soff-geo/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio size={18} className="text-red-500" /> Live Demo - Municipality Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GeoSearch />
        </CardContent>
      </Card>

      <Separator />

      {/* Installation */}
      <section>
        <h2 id="installation" className="mb-4 text-2xl font-semibold">
          Installation
        </h2>
        <CodeBlock code="npm install soff-geo">npm install soff-geo</CodeBlock>
      </section>

      {/* Quick Start */}
      <section>
        <h2 id="quick-start" className="mb-4 text-2xl font-semibold">
          Quick Start
        </h2>
        <CodeBlock
          code={`// Import only what you need
import { getDepartments, getMunicipalities, searchMunicipalities } from 'soff-geo/co';

// Get all departments
const departments = getDepartments();
// [{ code: '05', name: 'Antioquia', ... }, ...]

// Get municipalities for a department
const antioquiaMunis = getDepartmentMunicipalities('05');
// [{ code: '05001', name: 'Medellín', ... }, ...]

// Search
const results = searchMunicipalities('medellin');
// [{ item: { name: 'Medellín', ... }, score: 1 }]`}
        >{`// Import only what you need
import { getDepartments, getMunicipalities, searchMunicipalities } from 'soff-geo/co';

// Get all departments
const departments = getDepartments();
// [{ code: '05', name: 'Antioquia', ... }, ...]

// Get municipalities for a department
const antioquiaMunis = getDepartmentMunicipalities('05');
// [{ code: '05001', name: 'Medellín', ... }, ...]

// Search
const results = searchMunicipalities('medellin');
// [{ item: { name: 'Medellín', ... }, score: 1 }]`}</CodeBlock>
      </section>

      {/* Available Locales */}
      <section>
        <h2 id="available-locales" className="mb-4 text-2xl font-semibold">
          Available Locales
        </h2>
        <div className="grid gap-2">
          {[
            {
              flag: '🇨🇴',
              name: 'Colombia',
              import: 'soff-geo/co',
              data: ['Departments', 'Municipalities'],
              features: ['search', 'validate codes'],
            },
            {
              flag: '🇲🇽',
              name: 'México',
              import: 'soff-geo/mx',
              data: ['States', 'Municipalities'],
              features: ['search', 'validate codes'],
            },
          ].map((locale) => (
            <div
              key={locale.name}
              className="flex flex-col gap-2 rounded-lg border border-border p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{locale.flag}</span>
                  <span className="font-medium">{locale.name}</span>
                </div>
                <code className="text-xs text-muted-foreground sm:text-sm">{locale.import}</code>
              </div>
              <div className="flex flex-wrap gap-1">
                {locale.data.map((d) => (
                  <Badge key={d} variant="outline">
                    {d}
                  </Badge>
                ))}
                {locale.features.map((feat) => (
                  <Badge key={feat} variant="secondary" className="text-xs">
                    {feat}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section>
        <h2 id="api-reference" className="mb-4 text-2xl font-semibold">
          API Reference
        </h2>

        <Tabs defaultValue="co">
          <TabsList className="flex-wrap">
            <TabsTrigger value="co">Colombia</TabsTrigger>
            <TabsTrigger value="mx">México</TabsTrigger>
          </TabsList>

          <TabsContent value="co" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Colombia</h3>
            <CodeBlock
              code={`import { 
  getDepartments, 
  getMunicipalities, 
  getDepartment, 
  getMunicipality, 
  getDepartmentMunicipalities, 
  searchDepartments, 
  searchMunicipalities, 
  validateDepartmentCode, 
  validateMunicipalityCode 
} from 'soff-geo/co';

// Get all departments
const depts = getDepartments();

// Get specific department
const antioquia = getDepartment('05');

// Get municipalities of a department
const munis = getDepartmentMunicipalities('05');

// Search
const results = searchMunicipalities('medellin', { limit: 5 });`}
            >{`import { 
  getDepartments, 
  getMunicipalities, 
  getDepartment, 
  getMunicipality, 
  getDepartmentMunicipalities, 
  searchDepartments, 
  searchMunicipalities, 
  validateDepartmentCode, 
  validateMunicipalityCode 
} from 'soff-geo/co';

// Get all departments
const depts = getDepartments();

// Get specific department
const antioquia = getDepartment('05');

// Get municipalities of a department
const munis = getDepartmentMunicipalities('05');

// Search
const results = searchMunicipalities('medellin', { limit: 5 });`}</CodeBlock>
          </TabsContent>

          <TabsContent value="mx" className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">México</h3>
            <CodeBlock
              code={`import { 
  getStates, 
  getMunicipalities, 
  getState, 
  getMunicipality, 
  getStateMunicipalities, 
  searchStates, 
  searchMunicipalities, 
  validateStateCode, 
  validateMunicipalityCode 
} from 'soff-geo/mx';

// Get all states
const states = getStates();

// Get specific state
const jalisco = getState('14');

// Get municipalities of a state
const munis = getStateMunicipalities('14');

// Search
const results = searchMunicipalities('guadalajara', { limit: 5 });`}
            >{`import { 
  getStates, 
  getMunicipalities, 
  getState, 
  getMunicipality, 
  getStateMunicipalities, 
  searchStates, 
  searchMunicipalities, 
  validateStateCode, 
  validateMunicipalityCode 
} from 'soff-geo/mx';

// Get all states
const states = getStates();

// Get specific state
const jalisco = getState('14');

// Get municipalities of a state
const munis = getStateMunicipalities('14');

// Search
const results = searchMunicipalities('guadalajara', { limit: 5 });`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
