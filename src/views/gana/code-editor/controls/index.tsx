import * as React from 'react';
import config from '../../config';

import ThemeSelector from './theme-selector.component';
import FontSizeSelector from './font-size-selector.component';
import TabSizeSelector from './tab-size-selector.component';
import CodeEditorContext from '../code-editor.context';

interface ICodeEditorControlState {
  theme?: string;
  fontSize?: string;
  tabSize?: any;
}

class CodeEditorControls extends React.Component<{}, ICodeEditorControlState> {
  private settings = ['theme', 'fontSize', 'tabSize'];

  public constructor(props: any) {
    super(props);
    this.state = {};

    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
  }

  public componentDidMount() {
    const state = this.reloadStateFromCache();
    this.setState(state);
    this.context.onConfigurationChange(state);
  }

  private handleConfigurationChange(e: React.FormEvent<HTMLSelectElement>) {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [key]: value });
    localStorage.setItem(
      `${config.editor.localStorageKey}-setting-${key}`,
      value,
    );

    this.context.onConfigurationChange(key, value);
  }

  private reloadStateFromCache() {
    const value = {};
    for (const setting of this.settings) {
      value[setting] =
        localStorage.getItem(
          `${config.editor.localStorageKey}-setting-${setting}`,
        ) ||
        this.context.editorProps[setting] ||
        config.editor.defaultProps[setting];
    }

    return value;
  }

  public render() {
    return (
      <div className={`${config.editor.className}__controls form-row`}>
        <div className="col-xl">
          <ThemeSelector
            handleChange={this.handleConfigurationChange}
            theme={this.state.theme as string}
          />
        </div>
        <div className="col-xs">
          <FontSizeSelector
            handleChange={this.handleConfigurationChange}
            fontSize={this.state.fontSize as string}
          />
        </div>
        <div className="col-xs">
          <TabSizeSelector
            handleChange={this.handleConfigurationChange}
            tabSize={this.state.tabSize as string}
          />
        </div>
      </div>
    );
  }
}

CodeEditorControls.contextType = CodeEditorContext;
export default CodeEditorControls;
