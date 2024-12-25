// src/components/StatsWidget.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsWidgetProps } from "@/types";

export const StatsWidget = ({ title, value, icon }: StatsWidgetProps) => (
  <Card className="bg-[#1F3528] border-none">
    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
      <div className="text-gray-200 h-8 w-8">
        {icon}
      </div>
      <CardTitle className="text-sm font-medium text-gray-200 ml-2">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-200 ml-10">{value}</div>
    </CardContent>
  </Card>
);