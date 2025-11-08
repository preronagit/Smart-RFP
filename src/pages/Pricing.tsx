import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Send, DollarSign, Package, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useState } from "react";

const mockPricingItems = [
  { id: 1, product: "SmartCool 650L Refrigerator", sku: "REF-SC-650", quantity: 15, unitPrice: 850, total: 12750 },
  { id: 2, product: "EcoWash 8kg Front Load", sku: "WM-EW-8FL", quantity: 20, unitPrice: 420, total: 8400 },
  { id: 3, product: "CoolBreeze 1.5T Split AC", sku: "AC-CB-1.5S", quantity: 25, unitPrice: 380, total: 9500 },
  { id: 4, product: "VisionPro 55\" 4K LED TV", sku: "TV-VP-55-4K", quantity: 30, unitPrice: 650, total: 19500 },
  { id: 5, product: "QuickHeat 2000W Microwave", sku: "MW-QH-2000", quantity: 18, unitPrice: 180, total: 3240 },
];

const mockTests = [
  { id: 1, test: "BEE Energy Rating Certification", cost: 1500 },
  { id: 2, test: "ISI Mark Compliance", cost: 1200 },
  { id: 3, test: "Safety & Performance Testing", cost: 2800 },
];

export default function Pricing() {
  const [items, setItems] = useState(mockPricingItems);
  const [tests, setTests] = useState(mockTests);

  const productSubtotal = items.reduce((sum, item) => sum + item.total, 0);
  const testSubtotal = tests.reduce((sum, test) => sum + test.cost, 0);
  const grandTotal = productSubtotal + testSubtotal;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            Pricing & Proposal
          </h1>
          <p className="text-muted-foreground text-lg">Generate pricing tables and proposal documents</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="shadow-sm">
            <FileDown className="h-5 w-5 mr-2" />
            Export PDF
          </Button>
          <Button size="lg" className="shadow-lg">
            <Send className="h-5 w-5 mr-2" />
            Submit Proposal
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <Package className="h-3 w-3 mr-2" />
          {items.length} Products
        </Badge>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <CheckCircle className="h-3 w-3 mr-2" />
          {tests.length} Tests
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <DollarSign className="h-3 w-3 mr-2" />
          ${grandTotal.toLocaleString()} Total
        </Badge>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Product Pricing</CardTitle>
          </div>
          <CardDescription className="mt-2">Edit quantities and pricing for matched products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.quantity}
                      className="w-20 text-right ml-auto"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 0;
                        setItems(items.map(i =>
                          i.id === item.id
                            ? { ...i, quantity: newQuantity, total: newQuantity * i.unitPrice }
                            : i
                        ));
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">${item.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-semibold">Product Subtotal</TableCell>
                <TableCell className="text-right font-bold">${productSubtotal.toLocaleString()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <CardTitle className="text-xl">Testing & Certification Costs</CardTitle>
          </div>
          <CardDescription className="mt-2">Required tests and compliance certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test/Certification</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.test}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={test.cost}
                      className="w-32 text-right ml-auto"
                      onChange={(e) => {
                        const newCost = parseInt(e.target.value) || 0;
                        setTests(tests.map(t =>
                          t.id === test.id ? { ...t, cost: newCost } : t
                        ));
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-right font-semibold">Testing Subtotal</TableCell>
                <TableCell className="text-right font-bold">${testSubtotal.toLocaleString()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 border-l-4 border-l-primary">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">Grand Total</h3>
                <p className="text-sm text-muted-foreground mt-1">Total proposal value including all costs</p>
              </div>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ${grandTotal.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Proposal Preview</CardTitle>
          <CardDescription>Final proposal document will be generated as PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              The proposal document will include:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li>• Executive summary</li>
              <li>• Technical specifications and compliance details</li>
              <li>• Complete pricing breakdown</li>
              <li>• Delivery timeline and terms</li>
              <li>• Company credentials and certifications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
