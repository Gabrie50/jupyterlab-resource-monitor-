# backend/handler.py
import json
import psutil
from pathlib import Path
import math
from nvidia import nvidia_smi
from notebook.base.handlers import APIHandler
import tornado.web

class ResourceHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps({
            "cpu": {
                "usage": self.get_curr_cpu_usage(),
                "limit": self.get_cpu_quota_within_docker()
            },
            "memory": {
                "usage": self.get_curr_memory_usage(),
                "limit": self.get_memory_quota_within_docker()
            },
            "gpu": self.get_gpu_info()
        }))

    def get_curr_cpu_usage(self):
        return sum(p.cpu_percent(interval=0.1) for p in psutil.process_iter())

    def get_cpu_quota_within_docker(self):
        try:
            p = int(Path("/sys/fs/cgroup/cpu/cpu.cfs_period_us").read_text())
            q = int(Path("/sys/fs/cgroup/cpu/cpu.cfs_quota_us").read_text())
            return math.ceil(q / p) * 100.0 if q > 0 and p > 0 else 0
        except:
            return 0

    def get_curr_memory_usage(self):
        return sum(p.memory_info().rss for p in psutil.process_iter())

    def get_memory_quota_within_docker(self):
        try:
            return int(Path("/sys/fs/cgroup/memory/memory.limit_in_bytes").read_text())
        except:
            return 0

    def get_gpu_info(self):
        try:
            nvidia_smi.nvmlInit()
            return [{
                "gpu": i,
                "name": nvidia_smi.nvmlDeviceGetName(nvidia_smi.nvmlDeviceGetHandleByIndex(i)).decode(),
                "util": nvidia_smi.nvmlDeviceGetUtilizationRates(nvidia_smi.nvmlDeviceGetHandleByIndex(i)).gpu,
                "mem": {
                    "used": nvidia_smi.nvmlDeviceGetMemoryInfo(nvidia_smi.nvmlDeviceGetHandleByIndex(i)).used,
                    "total": nvidia_smi.nvmlDeviceGetMemoryInfo(nvidia_smi.nvmlDeviceGetHandleByIndex(i)).total
                }
            } for i in range(nvidia_smi.nvmlDeviceGetCount())]
        except:
            return []
          
