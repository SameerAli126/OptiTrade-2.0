import React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import DashHeader from '../components/DashHeader';
import { Header } from '../components';
import { EditorData } from '../data/dummy.jsx';
const Editor = () => (
  <div className=" bg-white rounded-3xl">
      <DashHeader category="Tools" title="Editor" />
    <RichTextEditorComponent>
      <EditorData />
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent>
  </div>
);
export default Editor;
