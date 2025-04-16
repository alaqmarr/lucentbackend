import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="flex flex-col w-full h-full items-center justify-center space-y-4"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Connecting to the server...
          </CardTitle>
          <Loader2 className="animate-spin" size={20} />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mt-1">Developed and Powered by https://alaqmar.dev</p>
        </CardContent>
      </Card>
    </div>
  )
}