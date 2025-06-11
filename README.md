# jupyterlab-resource-monitor

Extensão JupyterLab que exibe uso atual de CPU, memória e GPU dentro de ambientes Docker/Kubernetes. Ideal para uso com MyBinder ou GESIS.

## Recursos
- Monitoramento de CPU com limites via cgroups
- Monitoramento de memória (usada vs limite)
- Informações da GPU via `nvidia-ml-py3`

## Backend
Em Python, baseado em `psutil`, `pynvml` e leitura direta dos arquivos do cgroup.

## Frontend
Interface em JupyterLab (React ou Vanilla JS).

## Rodar via Binder
Incluído `binder/environment.yml` para facilitar execução no MyBinder.org
