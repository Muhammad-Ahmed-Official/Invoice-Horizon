import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { FileText, Search, Filter } from "lucide-react";

export default function InvoicesSkeleton() {
  return (
    <div className="px-4 py-6 md:px-8 animate-fade-in">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-9 w-32 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse mb-2"></div>
          <div className="flex items-center gap-2 mt-1">
            <FileText className="h-4 w-4 text-muted-foreground opacity-40" />
            <div className="h-5 w-48 bg-charcoal-light rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="h-10 w-32 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse"></div>
      </div>

      {/* Filters Card */}
      <Card className="mx-auto mb-6 max-w-6xl bg-gradient-card shadow-md border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground opacity-40" />
              <div className="h-10 pl-11 bg-input border border-border rounded-md animate-pulse"></div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <div className="w-44 h-10 bg-input border border-border rounded-md animate-pulse flex items-center px-3">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground opacity-40" />
              </div>
              <div className="h-10 w-28 bg-charcoal-light rounded-md animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="mx-auto max-w-6xl bg-gradient-card shadow-lg border border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-charcoal-light">
                  {['Invoice #', 'Client', 'Issue Date', 'Due Date', 'Amount', 'Status', 'Actions'].map((head) => (
                    <TableHead key={head} className="h-12">
                      <div className="h-4 w-20 bg-muted-foreground/20 rounded-md"></div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((index) => (
                  <TableRow key={index} className="hover:bg-accent/5 transition animate-pulse">
                    <TableCell>
                      <div className="h-5 w-24 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-28 bg-charcoal-light rounded-md mb-1"></div>
                      <div className="h-4 w-20 bg-charcoal-light rounded-md"></div>
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
                    <TableCell>
                      <div className="h-8 w-16 bg-charcoal-light rounded-md"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}