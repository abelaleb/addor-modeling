import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </h3>
          <div className="opacity-50">
            {icon}
          </div>
        </div>
        <div className="text-4xl font-bold">
          {count.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
