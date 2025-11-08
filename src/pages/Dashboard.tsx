import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Clock, TrendingUp, CheckCircle, AlertCircle, Upload, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const mockRFPs = [
  { id: 1, title: "Home Appliances RFP - Q1 2025", status: "in-progress" as const, deadline: "2025-02-15", source: "Government Portal" },
  { id: 2, title: "Air Conditioning & Cooling Systems", status: "waiting-approval" as const, deadline: "2025-02-20", source: "Direct Email" },
  { id: 3, title: "Electronics & Entertainment Devices", status: "new" as const, deadline: "2025-02-28", source: "Tender Portal" },
  { id: 4, title: "Kitchen Appliances Package", status: "submitted" as const, deadline: "2025-01-30", source: "Direct Contact" },
];

const stats = [
  { title: "Active RFPs", value: "12", icon: FileText, color: "text-primary" },
  { title: "Avg Response Time", value: "4.2 days", icon: Clock, color: "text-accent" },
  { title: "Win Rate", value: "68%", icon: TrendingUp, color: "text-success" },
  { title: "Submitted This Month", value: "8", icon: CheckCircle, color: "text-warning" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your RFPs today</p>
        </div>
        <Button size="lg" className="shadow-lg">
          <Upload className="h-5 w-5 mr-2" />
          Upload New RFP
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/50 hover:border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Recent RFPs</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">{mockRFPs.length} active</Badge>
            </div>
            <CardDescription>Latest RFPs requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRFPs.map((rfp) => (
                <div
                  key={rfp.id}
                  className="group relative flex items-center justify-between p-5 border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer bg-card"
                  onClick={() => navigate(`/rfp-details/${rfp.id}`)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{rfp.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {rfp.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(rfp.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={rfp.status} />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-dashed" onClick={() => navigate("/rfp-intake")}>
              View All RFPs
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle className="text-xl">Urgent Notifications</CardTitle>
            </div>
            <CardDescription>Items requiring immediate action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 border-l-4 border-warning rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Deadline in 2 days</p>
                    <p className="text-xs text-muted-foreground mt-1">Home Appliances RFP needs final review</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">New RFP Detected</p>
                    <p className="text-xs text-muted-foreground mt-1">Electronics & Entertainment Procurement</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-l-4 border-success rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Approval Received</p>
                    <p className="text-xs text-muted-foreground mt-1">Air Conditioning Systems proposal approved</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </div>
          <CardDescription>Jump to key tasks and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button size="lg" className="h-auto py-6 flex-col gap-2 shadow-md" onClick={() => navigate("/rfp-intake")}>
              <Upload className="h-6 w-6" />
              <span className="font-semibold">Upload New RFP</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2 hover:shadow-md transition-shadow" onClick={() => navigate("/product-matching")}>
              <CheckCircle className="h-6 w-6" />
              <span className="font-semibold">View Matching Queue</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2 hover:shadow-md transition-shadow" onClick={() => navigate("/pricing")}>
              <FileText className="h-6 w-6" />
              <span className="font-semibold">Generate Proposals</span>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2 hover:shadow-md transition-shadow" onClick={() => navigate("/analytics")}>
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
