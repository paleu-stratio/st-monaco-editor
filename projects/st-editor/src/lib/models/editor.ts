import * as monaco from 'monaco-editor';

/**
 * Default editor themes
 */
export enum StEditorThemes {
  vs = 'vs',
  vsDark = 'vs-dark',
  hcBlack = 'hc-black'
}

/**
 * Simple editor construction options
 */
export type IEditorConstructionOptions = monaco.editor.IEditorConstructionOptions;

/**
 * Diff editor construction options
 */
export type IDiffEditorConstructionOptions = monaco.editor.IDiffEditorConstructionOptions;

export type ILineNumbers =  IEditorConstructionOptions['lineNumbers'];
