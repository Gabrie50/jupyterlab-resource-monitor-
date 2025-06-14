from setuptools import setup, find_packages

setup(
    name="jupyterlab-resource-monitor",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=["psutil", "pynvml"],
    entry_points={
        "notebook.serverextension": [
            "jupyterlab_resource_monitor = backend.handler"
        ]
    },
)
