// frontend/src/index.ts
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import React from 'react';
import ReactDOM from 'react-dom';
import ResourceMonitor from './components/ResourceMonitor';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-resource-monitor',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    const content = <ResourceMonitor />;
    const widget = new MainAreaWidget({ content });
    widget.title.label = 'Resource Monitor';
    widget.title.closable = true;
    app.shell.add(widget, 'main');
  },
};

export default extension;
