import React, { FC, ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Interface para props
interface HallazgoStatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  colorClass?: string;
}

const HallazgoStatCard: FC<HallazgoStatCardProps> = ({ 
  title, 
  value, 
  icon, 
  colorClass = 'bg-gray-500' 
}) => {
  return (
    <Card className={`text-white ${colorClass}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default HallazgoStatCard;