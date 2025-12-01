import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'soff-phone - Phone Validation',
  description: 'Lightweight phone number validation and formatting for LATAM',
};

export default function SoffPhonePage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <JsonLd
        name="soff-phone"
        description="Lightweight phone number validation and formatting for LATAM."
        package="soff-phone"
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
              name: 'soff-phone',
              item: 'https://soff.dev/docs/soff-phone',
            },
          ],
        }}
      />
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            soff-phone
          </h1>
          <p className="text-xl text-muted-foreground">
            Lightweight phone number validation and formatting for LATAM.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            v0.0.1
          </Badge>
          <Badge variant="outline" className="text-sm">
            ~0.5KB Core
          </Badge>
        </div>
      </div>

      <hr className="my-8" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card id="features">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Why use soff-phone?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
              <li>Tree-shakeable architecture</li>
              <li>Zero dependencies</li>
              <li>Mobile & Landline validation</li>
              <li>E.164 formatting support</li>
              <li>Type-safe interfaces</li>
            </ul>
          </CardContent>
        </Card>

        <Card id="installation">
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>Add to your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <code className="text-sm">npm install soff-phone</code>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10" id="usage">
        <Tabs defaultValue="co" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="co">Colombia 🇨🇴</TabsTrigger>
            <TabsTrigger value="mx">Mexico 🇲🇽</TabsTrigger>
          </TabsList>

          <TabsContent value="co" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">Usage</h3>
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { validate } from 'soff-phone/co';

// Validate mobile number
const mobile = validate('3001234567');
console.log(mobile);
// Output:
// { 
//   isValid: true, 
//   type: 'mobile', 
//   formatted: '3001234567' 
// }

// Validate landline (new format)
const landline = validate('6011234567');
console.log(landline);
// Output:
// { 
//   isValid: true, 
//   type: 'landline', 
//   formatted: '6011234567' 
// }

// Format to E.164
const e164 = validate('3001234567', { format: 'e164' });
console.log(e164.formatted); // +573001234567`}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mx" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">Usage</h3>
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { validate } from 'soff-phone/mx';

// Validate number (10 digits)
const result = validate('5512345678');
console.log(result);
// Output:
// { 
//   isValid: true, 
//   type: 'unknown', 
//   formatted: '5512345678' 
// }

// Format to E.164
const e164 = validate('5512345678', { format: 'e164' });
console.log(e164.formatted); // +525512345678`}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
