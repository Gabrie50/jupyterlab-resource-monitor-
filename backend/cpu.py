import psutil
import math
from pathlib import Path

def get_curr_cpu_usage():
    def get_cpu_percent(p):
        try:
            return p.cpu_percent(interval=0.1)
        except Exception:
            return 0
    return sum([get_cpu_percent(p) for p in psutil.process_iter()])

def get_cpu_quota_within_docker():
    cfs_period = Path("/sys/fs/cgroup/cpu/cpu.cfs_period_us")
    cfs_quota = Path("/sys/fs/cgroup/cpu/cpu.cfs_quota_us")

    if cfs_period.exists() and cfs_quota.exists():
        with cfs_period.open('rb') as p, cfs_quota.open('rb') as q:
            p_val, q_val = int(p.read()), int(q.read())
            if q_val > 0 and p_val > 0:
                return math.ceil(q_val / p_val) * 100.0
    return 0
          
