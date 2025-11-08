import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, CheckCircle, Calendar, Tag, Building2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function RFPDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - would come from API/database
  const rfp = {
    id,
    title: "Lab Equipment RFP - Q1 2025",
    status: "in-progress" as const,
    deadline: "2025-02-15",
    source: "Government Portal",
    category: "Appliances",
    submittedDate: "2025-01-10",
  };

  const aiSummary = `This RFP requests FMEG products for a retail chain expansion project. Key requirements include:

• Refrigerators (15 units) - 650L capacity, energy-efficient, frost-free with BEE 5-star rating
• Washing Machines (20 units) - 8kg front-load, inverter technology, quick wash feature
• Split Air Conditioners (25 units) - 1.5 ton, inverter, energy-saving mode
• LED TVs (30 units) - 55-inch, 4K resolution, smart features with Wi-Fi connectivity
• Microwave Ovens (18 units) - 2000W, convection mode, child safety lock

Total estimated quantity: 108 units across 5 categories
Budget range: $45,000 - $55,000
Delivery timeline: 45 days from award
Compliance requirements: BEE rating, ISI mark, safety certifications`;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/rfp-intake")} className="hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-foreground">{rfp.title}</h1>
            <StatusBadge status={rfp.status} />
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Submitted {new Date(rfp.submittedDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {rfp.source}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              RFP Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Source</p>
              <p className="font-semibold text-foreground text-lg">{rfp.source}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <Badge variant="outline" className="text-base font-normal">
                <Tag className="h-4 w-4 mr-2" />
                {rfp.category}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Deadline</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-warning" />
                <p className="font-semibold text-foreground text-lg">{new Date(rfp.deadline).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  AI-Generated Summary
                </CardTitle>
                <CardDescription className="mt-2">Automated extraction of key requirements</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aiSummary}
              className="min-h-[300px] font-mono text-sm"
              readOnly
            />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            Original Document
          </CardTitle>
          <CardDescription className="mt-2">Full RFP document content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">Lab_Equipment_RFP_Q1_2025.pdf</p>
                <p className="text-sm text-muted-foreground">12 pages • 2.4 MB</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="text-base text-foreground font-medium">Document Preview</p>
              <p>
                The document viewer would show the complete RFP with all sections including
                background, scope, specifications, submission requirements, and evaluation criteria.
              </p>
              <Button variant="outline" className="mt-4">
                <FileText className="h-4 w-4 mr-2" />
                View Full Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-success/5 to-accent/5 border-l-4 border-l-success">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Ready for next steps</h3>
                <p className="text-sm text-muted-foreground mt-1">Proceed to product matching and pricing</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="shadow-sm" onClick={() => navigate("/product-matching")}>
                <Sparkles className="h-4 w-4 mr-2" />
                Product Matching
              </Button>
              <Button size="lg" className="shadow-md" onClick={() => navigate("/pricing")}>
                Generate Pricing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
