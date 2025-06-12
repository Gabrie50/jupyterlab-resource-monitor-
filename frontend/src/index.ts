import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ILayoutRestorer, MainAreaWidget } from '@jupyterlab/application';
import { ReactWidget } from '@jupyterlab/apputils';
import { ResourceMonitor } from './components/ResourceMonitor';

class ResourceMonitorWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass('jp-ResourceMonitorWidget');
  }

  render() {
    return <ResourceMonitor />;
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-resource-monitor',
  autoStart: true,
  requires: [ILayoutRestorer],
  activate: (app: JupyterFrontEnd, restorer: ILayoutRestorer) => {
    const widget = new MainAreaWidget({ content: new ResourceMonitorWidget() });
    widget.id = 'resource-monitor-widget';
    widget.title.label = 'Resource Monitor';
    widget.title.closable = true;

    app.shell.add(widget, 'left', { rank: 500 });
    restorer.add(widget, widget.id);
  }
};

export default extension;
