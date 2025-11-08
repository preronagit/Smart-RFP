import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, XCircle, AlertCircle, Sparkles, Download, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const mockMatches = [
  { id: 1, requirement: "Energy-efficient Refrigerator 650L", sku: "REF-SC-650", product: "SmartCool 650L Refrigerator", score: 98, status: "excellent" },
  { id: 2, requirement: "Front-load Washing Machine 8kg", sku: "WM-EW-8FL", product: "EcoWash 8kg Front Load", score: 95, status: "excellent" },
  { id: 3, requirement: "Split AC 1.5 Ton Inverter", sku: "AC-CB-1.5S", product: "CoolBreeze 1.5T Split AC", score: 88, status: "good" },
  { id: 4, requirement: "55-inch 4K Smart TV", sku: "TV-VP-55-4K", product: "VisionPro 55\" 4K LED TV", score: 92, status: "excellent" },
  { id: 5, requirement: "Convection Microwave 2000W", sku: "MW-QH-2000", product: "QuickHeat 2000W Microwave", score: 85, status: "good" },
  { id: 6, requirement: "50L Storage Water Heater", sku: "WH-TS-50", product: "ThermoSafe 50L Geyser", score: 65, status: "moderate" },
];

export default function ProductMatching() {
  const [sensitivity, setSensitivity] = useState([80]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    return "text-warning";
  };

  const getStatusIcon = (status: string) => {
    if (status === "excellent") return <CheckCircle className="h-4 w-4 text-success" />;
    if (status === "good") return <CheckCircle className="h-4 w-4 text-primary" />;
    return <AlertCircle className="h-4 w-4 text-warning" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Product Matching
          </h1>
          <p className="text-muted-foreground text-lg">AI-powered matching of RFP requirements to available products</p>
        </div>
        <Badge variant="secondary" className="px-4 py-2 text-base">
          <Package className="h-4 w-4 mr-2" />
          Home Appliances RFP
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Matches</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">6</div>
            <p className="text-xs text-muted-foreground mt-1">Products identified</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Excellent Matches</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">4</div>
            <p className="text-xs text-muted-foreground mt-1">≥90% match score</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Good Matches</CardTitle>
            <div className="p-2 rounded-lg bg-accent/10">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">2</div>
            <p className="text-xs text-muted-foreground mt-1">75-89% match score</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Match Score</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Matching Sensitivity</CardTitle>
          </div>
          <CardDescription>Adjust the AI matching threshold to control result precision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold min-w-28 text-foreground">Threshold:</span>
              <Slider
                value={sensitivity}
                onValueChange={setSensitivity}
                max={100}
                step={5}
                className="flex-1"
              />
              <Badge variant="default" className="min-w-20 justify-center text-base py-2">
                {sensitivity[0]}%
              </Badge>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Pro tip:</span> Higher values show only the closest matches. Lower values include more alternatives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Product Match Results
              </CardTitle>
              <CardDescription className="mt-2">Compare RFP requirements with available SKUs</CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Table
              </Button>
              <Button size="lg" className="shadow-md">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFP Requirement</TableHead>
                <TableHead>Matched Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.requirement}</TableCell>
                  <TableCell>{match.product}</TableCell>
                  <TableCell className="font-mono text-sm">{match.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getScoreColor(match.score)}`}>
                        {match.score}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(match.status)}
                      <span className="capitalize text-sm">{match.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
