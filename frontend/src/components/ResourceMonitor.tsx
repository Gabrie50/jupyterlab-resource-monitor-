import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type Metric = {
  usage: number;
  total?: number;
};

type StatusData = {
  cpu: Metric;
  memory: Metric;
  gpu?: {
    [gpuId: string]: Metric;
  };
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-xl h-3">
    <div
      className="bg-green-500 h-3 rounded-xl"
      style={{ width: `${value}%` }}
    />
  </div>
);

const MetricCard = ({ label, metric }: { label: string; metric: Metric }) => (
  <Card className="mb-4 shadow-md">
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-sm mb-2">
        {metric.usage}%
        {metric.total !== undefined ? ` of ${metric.total}%` : ''}
      </p>
      <ProgressBar value={metric.usage} />
    </CardContent>
  </Card>
);

export const ResourceMonitor = () => {
  const [data, setData] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/jlab-resource-monitor/api/status');
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Tabs defaultValue="cpu">
      <TabsList>
        <TabsTrigger value="cpu">CPU</TabsTrigger>
        <TabsTrigger value="memory">RAM</TabsTrigger>
        {data.gpu && <TabsTrigger value="gpu">GPU</TabsTrigger>}
      </TabsList>

      <TabsContent value="cpu">
        <MetricCard label="CPU Usage" metric={data.cpu} />
      </TabsContent>
      <TabsContent value="memory">
        <MetricCard label="Memory Usage" metric={data.memory} />
      </TabsContent>
      <TabsContent value="gpu">
        {data.gpu &&
          Object.entries(data.gpu).map(([id, metric]) => (
            <MetricCard key={id} label={`GPU ${id}`} metric={metric} />
          ))}
      </TabsContent>
    </Tabs>
  );
};
  
