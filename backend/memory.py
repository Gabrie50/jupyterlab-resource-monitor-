import psutil
from pathlib import Path

def get_curr_memory_usage():
    return sum([p.memory_info().rss for p in psutil.process_iter()])

def get_memory_quota_within_docker():
    mem_limit_path = Path("/sys/fs/cgroup/memory/memory.limit_in_bytes")
    if mem_limit_path.exists():
        with mem_limit_path.open('rb') as mem_limit_file:
            return int(mem_limit_file.read())
    return None
  
