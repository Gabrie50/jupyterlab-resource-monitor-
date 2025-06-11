import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface GPUInfo {
  gpu: number;
  name: string;
  util: number;
  mem: {
    used: number;
    total: number;
  };
}

interface ResourceData {
  cpu: {
    usage: number;
    limit: number;
  };
  memory: {
    usage: number;
    limit: number;
  };
  gpu: GPUInfo[];
}

const ResourceMonitor: React.FC = () => {
  const [data, setData] = useState<ResourceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/jlab-resource-monitor/api/status');
      const result = await response.json();
      setData(result);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Tabs defaultValue="gpu" className="w-full p-4">
      <TabsList>
        <TabsTrigger value="gpu">GPU</TabsTrigger>
        <TabsTrigger value="cpu">CPU</TabsTrigger>
        <TabsTrigger value="ram">RAM</TabsTrigger>
      </TabsList>

      <TabsContent value="gpu">
        {data.gpu.map(gpu => (
          <div key={gpu.gpu} className="mb-4">
            <p className="font-bold">{gpu.name}</p>
            <p>Utilization: {gpu.util}%</p>
            <Progress value={gpu.util} max={100} />
            <p>
              Memory: {(gpu.mem.used / 1024 ** 3).toFixed(2)} / {(gpu.mem.total / 1024 ** 3).toFixed(2)} GiB
            </p>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="cpu">
        <p>Usage: {data.cpu.usage.toFixed(2)}%</p>
        <p>Limit: {data.cpu.limit}%</p>
        <Progress value={data.cpu.usage} max={data.cpu.limit} />
      </TabsContent>

      <TabsContent value="ram">
        <p>Usage: {(data.memory.usage / 1024 ** 2).toFixed(2)} MiB</p>
        <p>Limit: {(data.memory.limit / 1024 ** 3).toFixed(2)} GiB</p>
        <Progress value={data.memory.usage} max={data.memory.limit} />
      </TabsContent>
    </Tabs>
  );
};

export default ResourceMonitor;
        
