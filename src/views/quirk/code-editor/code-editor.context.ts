import * as React from 'react';
import { ICodeEditorContext } from '../../../shared/types';

const CodeEditorContext = React.createContext<ICodeEditorContext>({
  editorProps: {},
  // tslint:disable-next-line: no-empty
  onConfigurationChange: () => {},
});

export default CodeEditorContext;
