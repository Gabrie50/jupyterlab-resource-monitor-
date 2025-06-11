import pynvml as nvidia_smi

def get_gpu_info():
    try:
        nvidia_smi.nvmlInit()
        device_count = nvidia_smi.nvmlDeviceGetCount()

        def _create_gpu_info(idx):
            handle = nvidia_smi.nvmlDeviceGetHandleByIndex(idx)
            util = nvidia_smi.nvmlDeviceGetUtilizationRates(handle)
            mem = nvidia_smi.nvmlDeviceGetMemoryInfo(handle)

            return dict(
                gpu=idx,
                name=nvidia_smi.nvmlDeviceGetName(handle).decode(),
                util=util.gpu,
                mem=dict(used=mem.used, total=mem.total)
            )

        return [_create_gpu_info(idx) for idx in range(device_count)]
    except Exception:
        return []
      
