import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Upload, Filter, FileText, Calendar, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockRFPs = [
  { id: 1, title: "Home Appliances RFP - Q1 2025", status: "in-progress" as const, deadline: "2025-02-15", source: "Government Portal", category: "Appliances" },
  { id: 2, title: "Air Conditioning & Cooling Systems", status: "waiting-approval" as const, deadline: "2025-02-20", source: "Direct Email", category: "Cooling" },
  { id: 3, title: "Electronics & Entertainment Devices", status: "new" as const, deadline: "2025-02-28", source: "Tender Portal", category: "Electronics" },
  { id: 4, title: "Kitchen Appliances Package", status: "submitted" as const, deadline: "2025-01-30", source: "Direct Contact", category: "Kitchen" },
  { id: 5, title: "Washing Machines & Laundry RFP", status: "in-progress" as const, deadline: "2025-03-05", source: "Government Portal", category: "Laundry" },
  { id: 6, title: "Water Heaters & Geysers Bulk Order", status: "new" as const, deadline: "2025-03-10", source: "Direct Email", category: "Heating" },
];

export default function RFPIntake() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredRFPs = mockRFPs.filter(rfp =>
    rfp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rfp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">RFP Intake & Management</h1>
          <p className="text-muted-foreground text-lg">Manage all incoming and active RFPs</p>
        </div>
        <Button size="lg" className="shadow-lg">
          <Upload className="h-5 w-5 mr-2" />
          Upload RFP
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="px-4 py-2 text-sm">
          <FileText className="h-3 w-3 mr-2" />
          {filteredRFPs.length} Total RFPs
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Tag className="h-3 w-3 mr-2" />
          6 Categories
        </Badge>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                All RFPs
              </CardTitle>
              <CardDescription className="mt-2">Search, filter, and manage your RFP pipeline</CardDescription>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base shadow-sm"
                />
              </div>
              <Button variant="outline" size="lg" className="shadow-sm">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Source</TableHead>
                <TableHead className="font-semibold">Deadline</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRFPs.map((rfp) => (
                <TableRow
                  key={rfp.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/rfp-details/${rfp.id}`)}
                >
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {rfp.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={rfp.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      <Tag className="h-3 w-3 mr-1" />
                      {rfp.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{rfp.source}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(rfp.deadline).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/rfp-details/${rfp.id}`);
                    }}>
                      View Details
                    </Button>
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
