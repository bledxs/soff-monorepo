import { Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JsonLd } from '@/components/json-ld';
import { getVersion } from '@/lib/versions';

export const metadata = {
  title: 'soff-phone - Phone Validation',
  description: 'Lightweight phone number validation and formatting for LATAM',
};

export default function SoffPhonePage() {
  const version = getVersion('soff-phone');

  return (
    <article className="space-y-8">
      <JsonLd
        name="soff-phone"
        description="Lightweight phone number validation and formatting for LATAM."
        package="soff-phone"
      />
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-soff-phone/10 p-2">
            <Phone size={36} className="text-soff-phone" />
          </div>
          <h1 className="bg-linear-to-r from-soff-phone to-soff-phone/70 bg-clip-text text-3xl font-bold text-transparent">
            soff-phone
          </h1>
          <Badge className="bg-soff-phone/20 text-soff-phone">v{version}</Badge>
          <Badge variant="outline">~0.5KB Core</Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          Lightweight phone number validation and formatting for LATAM.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card id="features" className="border-soff-phone/20">
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

        <Card id="installation" className="border-soff-phone/20">
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
    </article>
  );
}
