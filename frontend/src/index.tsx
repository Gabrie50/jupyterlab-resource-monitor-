import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget, WidgetTracker } from '@jupyterlab/apputils';
import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import ResourceMonitor from './components/ResourceMonitor';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-resource-monitor',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('✅ Resource Monitor extension activated');

    const command = 'resource-monitor:open';

    app.commands.addCommand(command, {
      label: 'Open Resource Monitor',
      execute: () => {
        const content = ReactWidget.create(<ResourceMonitor />);
        const widget = new MainAreaWidget({ content });
        widget.title.label = 'Resource Monitor';
        app.shell.add(widget, 'main');
      }
    });

    palette.addItem({ command, category: 'Monitoring' });
  }
};

export default extension;
