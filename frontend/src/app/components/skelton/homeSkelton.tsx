import { Card, CardContent, CardHeader } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TrendingUp, DollarSign, FileText, Clock, AlertCircle } from "lucide-react";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="p-8 max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="h-10 w-40 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse mb-2"></div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground opacity-40" />
              <div className="h-5 w-56 bg-charcoal-light rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[1, 2, 3, 4].map((index) => (
            <Card
              key={index}
              className="bg-gradient-card border border-border shadow-md animate-pulse"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-24 bg-charcoal-light rounded-md mb-2"></div>
                    <div className="h-8 w-32 bg-linear-to-r from-charcoal-light to-muted rounded-md mb-1"></div>
                    <div className="h-3 w-36 bg-charcoal-light rounded-md"></div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-charcoal-light flex items-center justify-center">
                    {index === 1 && <DollarSign className="h-5 w-5 text-muted-foreground opacity-40" />}
                    {index === 2 && <FileText className="h-5 w-5 text-muted-foreground opacity-40" />}
                    {index === 3 && <Clock className="h-5 w-5 text-muted-foreground opacity-40" />}
                    {index === 4 && <AlertCircle className="h-5 w-5 text-muted-foreground opacity-40" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Invoices Table */}
        <Card className="glass shadow-lg overflow-hidden animate-slide-up">
          <CardHeader className="bg-gradient-card border-b border-border">
            <div className="flex items-center justify-between">
              <div className="h-7 w-48 bg-charcoal-light rounded-md animate-pulse"></div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  {["Invoice #", "Client", "Issue Date", "Due Date", "Amount", "Status"].map(
                    (header, index) => (
                      <TableHead key={index}>
                        <div className="h-4 w-20 bg-charcoal-light rounded-md"></div>
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {[1, 2, 3, 4, 5].map((index) => (
                  <TableRow key={index} className="hover:bg-accent/10 transition">
                    <TableCell>
                      <div className="h-5 w-24 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-28 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-24 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-24 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-20 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-16 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}