/// <reference path="../../../../../node_modules/monaco-editor/monaco.d.ts" />

/*
 * © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
 *
 * This software – including all its source code – contains proprietary
 * information of Stratio Big Data Inc., Sucursal en España and
 * may not be revealed, sold, transferred, modified, distributed or
 * otherwise made available, licensed or sublicensed to third parties;
 * nor reverse engineered, disassembled or decompiled, without express
 * written authorization from Stratio Big Data Inc., Sucursal en España.
 */

import {
  Component,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  NgZone,
  Inject,
  Optional} from '@angular/core';

import { EditorBase } from '../shared/editor-base';
import { StEditorThemes, ILineNumbers, IDiffEditorConstructionOptions } from '../models/editor';
import { ST_MONACO_EDITOR_CONFIG, StMonacoEditorConfig } from '../st-monaco-editor.config';

@Component({
  selector: 'st-monaco-diff-editor',
  template: '',
  styleUrls: ['./st-monaco-diff-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StMonacoDiffEditorComponent extends EditorBase implements OnChanges {

  @Input() language: string;
  @Input() theme: StEditorThemes = StEditorThemes.vs;
  @Input() minimapEnabled = true;
  @Input() originalModel = '';
  @Input() modifiedModel = '';
  @Input() lineNumbers: ILineNumbers = 'on';
  @Input() readonly: boolean;
  @Input() config: IDiffEditorConstructionOptions = {};

  @Output() codeChange = new EventEmitter<String>();

  private _codeEditorInstance: monaco.editor.IStandaloneDiffEditor;

  constructor(
    protected _elementRef: ElementRef,
    @Optional()
    @Inject(ST_MONACO_EDITOR_CONFIG) editorConfig: StMonacoEditorConfig,
    private _ngZone: NgZone) {
    super(_elementRef, editorConfig);
  }

  ngOnChanges() {
    if (this._codeEditorInstance) {
      this._codeEditorInstance.setModel({
        original: monaco.editor.createModel(this.originalModel, this.language),
        modified: monaco.editor.createModel(this.modifiedModel, this.language)
      });
    }
  }

  public initMonaco(): void {
    this._codeEditorInstance = monaco.editor.createDiffEditor(this._elementRef.nativeElement, {
      automaticLayout: true,
      theme: this.theme,
      lineNumbers: this.lineNumbers,
      readOnly: this.readonly,
      minimap: {
        enabled: this.minimapEnabled
      },
      ...this.config
    });

    this._codeEditorInstance.setModel({
      original: monaco.editor.createModel(this.originalModel, this.language),
      modified: monaco.editor.createModel(this.modifiedModel, this.language)
    });
    this._codeEditorInstance.getModel().modified.onDidChangeContent(e => {
      this._ngZone.run(() => {
        this.codeChange.emit(this._codeEditorInstance.getModel().modified.getValue());
      });
    });
  }
}
