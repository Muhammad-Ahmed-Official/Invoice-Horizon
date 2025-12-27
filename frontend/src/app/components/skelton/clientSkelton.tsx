import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Search, Building, Mail, Phone } from "lucide-react";

export default function ClientsSkeleton() {
  return (
        <div className="px-4 py-6 md:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div>
          <div className="h-9 w-32 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse"></div>
          <div className="mt-2 h-5 w-48 bg-charcoal-light rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse"></div>
      </div>

      {/* Search Skeleton */}
      <Card className="mb-6 bg-gradient-card border border-border shadow-md">
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              <Search className="opacity-40" />
            </div>
            <div className="h-10 pl-10 bg-input border border-border rounded-md animate-pulse"></div>
          </div>
        </CardContent>
      </Card>

      {/* Client Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card
            key={index}
            className="bg-gradient-card border border-border shadow-md animate-pulse"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                {/* Avatar Skeleton */}
                <div className="h-12 w-12 rounded-full bg-linear-to-r from-charcoal-light to-muted"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-6 w-3/4 bg-charcoal-light rounded-md"></div>
                  <div className="h-4 w-1/2 bg-charcoal-light rounded-md"></div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info Skeleton */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground opacity-40" />
                  <div className="h-4 w-3/4 bg-charcoal-light rounded-md"></div>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground opacity-40" />
                  <div className="h-4 w-2/3 bg-charcoal-light rounded-md"></div>
                </div>
              </div>

              {/* Stats Skeleton */}
              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="h-7 w-12 bg-charcoal-light rounded-md mx-auto mb-1"></div>
                    <div className="h-3 w-16 bg-charcoal-light rounded-md mx-auto"></div>
                  </div>
                  <div>
                    <div className="h-7 w-16 bg-charcoal-light rounded-md mx-auto mb-1"></div>
                    <div className="h-3 w-20 bg-charcoal-light rounded-md mx-auto"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};
