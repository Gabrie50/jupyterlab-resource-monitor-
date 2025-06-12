def _jupyter_server_extension_paths():
    return [{
        "module": "jupyterlab_resource_monitor"
    }]

def load_jupyter_server_extension(nbapp):
    from .backend.handler import ResourceHandler
    nbapp.web_app.add_handlers(".*", [
        (r"/jlab-resource-monitor/api/status", ResourceHandler)
    ])
    
