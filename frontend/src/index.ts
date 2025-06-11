import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import ResourceMonitor from './components/ResourceMonitor';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-resource-monitor',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const widget = new MainAreaWidget({ content: ResourceMonitor() });
    widget.id = 'resource-monitor';
    widget.title.label = 'Resource Monitor';
    widget.title.closable = true;

    const command = 'resource-monitor:open';
    app.commands.addCommand(command, {
      label: 'Open Resource Monitor',
      execute: () => {
        if (!widget.isAttached) app.shell.add(widget, 'main');
        app.shell.activateById(widget.id);
      }
    });

    app.contextMenu.addItem({
      command,
      selector: 'body',
      rank: 0
    });
  }
};

export default plugin;
