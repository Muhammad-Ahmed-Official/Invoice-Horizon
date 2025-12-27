import { Card, CardContent, CardHeader } from "../ui/card";


export default function SettingsSkeleton() {
  return (
    <div className="w-full px-4 py-6 md:px-8 animate-fade-in">
      {/* Header Skeleton */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="h-9 w-40 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse mb-2"></div>
        <div className="h-5 w-64 bg-charcoal-light rounded-md animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 pb-24">
        {/* Company Information Card Skeleton */}
        <Card className="bg-gradient-card border border-border shadow-md">
          <CardHeader>
            <div className="h-6 w-48 bg-charcoal-light rounded-md animate-pulse"></div>
            <div className="h-4 w-72 bg-charcoal-light rounded-md animate-pulse mt-1"></div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Company Name */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-charcoal-light rounded-md animate-pulse"></div>
              <div className="h-10 bg-input border border-border rounded-md animate-pulse"></div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-charcoal-light rounded-md animate-pulse"></div>
                <div className="h-10 bg-input border border-border rounded-md animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <div className="h-4 w-24 bg-charcoal-light rounded-md animate-pulse"></div>
                <div className="h-10 bg-input border border-border rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-charcoal-light rounded-md animate-pulse"></div>
              <div className="h-24 bg-input border border-border rounded-md animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Settings Card Skeleton */}
        <Card className="bg-gradient-card border border-border shadow-md">
          <CardHeader>
            <div className="h-6 w-40 bg-charcoal-light rounded-md animate-pulse"></div>
            <div className="h-4 w-64 bg-charcoal-light rounded-md animate-pulse mt-1"></div>
          </CardHeader>
          
          <CardContent className="grid gap-4 md:grid-cols-2">
            {/* Tax Rate */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-charcoal-light rounded-md animate-pulse"></div>
              <div className="h-10 bg-input border border-border rounded-md animate-pulse"></div>
            </div>

            {/* Payment Terms */}
            <div className="space-y-2">
              <div className="h-4 w-40 bg-charcoal-light rounded-md animate-pulse"></div>
              <div className="h-10 bg-input border border-border rounded-md animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Company Logo Card Skeleton */}
        <Card className="bg-gradient-card border border-border shadow-md">
          <CardHeader>
            <div className="h-6 w-44 bg-charcoal-light rounded-md animate-pulse"></div>
            <div className="h-4 w-80 bg-charcoal-light rounded-md animate-pulse mt-1"></div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Logo Image Skeleton */}
              <div className="h-20 w-20 rounded border border-border bg-linear-to-r from-charcoal-light to-muted animate-pulse"></div>
              
              <div>
                {/* Upload Button Skeleton */}
                <div className="h-9 w-28 bg-charcoal-light rounded-md animate-pulse"></div>
                <div className="h-3 w-48 bg-charcoal-light rounded-md animate-pulse mt-2"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-3">
          <div className="h-9 w-20 bg-charcoal-light rounded-md animate-pulse"></div>
          <div className="h-9 w-28 bg-linear-to-r from-charcoal-light to-muted rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}