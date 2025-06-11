// src/components/ResourceMonitor.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="grid gap-4 p-4">
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-2">CPU</h2>
          <p>Usage: {data.cpu.usage.toFixed(2)}%</p>
          <p>Limit: {data.cpu.limit}%</p>
          <Progress value={data.cpu.usage} max={data.cpu.limit} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-2">RAM</h2>
          <p>Usage: {(data.memory.usage / 1024 / 1024).toFixed(2)} MiB</p>
          <p>Limit: {(data.memory.limit / 1024 / 1024 / 1024).toFixed(2)} GiB</p>
          <Progress value={data.memory.usage} max={data.memory.limit} />
        </CardContent>
      </Card>

      {data.gpu.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-2">GPU</h2>
            {data.gpu.map((gpu) => (
              <div key={gpu.gpu} className="mb-2">
                <p>{gpu.name}</p>
                <p>Utilization: {gpu.util}%</p>
                <Progress value={gpu.util} max={100} />
                <p>
                  Memory: {(gpu.mem.used / 1024 / 1024 / 1024).toFixed(2)} /{' '}
                  {(gpu.mem.total / 1024 / 1024 / 1024).toFixed(2)} GiB
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResourceMonitor;
