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
  Output, EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  NgZone,
  Inject,
  Optional,
  OnDestroy
} from '@angular/core';

import { EditorBase } from './../shared/editor-base';
import { IEditorConstructionOptions, StEditorThemes, ILineNumbers } from '../models/editor';
import { ST_MONACO_EDITOR_CONFIG, StMonacoEditorConfig } from '../st-monaco-editor.config';

@Component({
  selector: 'st-monaco-editor',
  template: '',
  styleUrls: ['./st-monaco-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StMonacoEditorComponent extends EditorBase implements OnChanges, OnDestroy {

  /** */
  @Input() code: string;
  @Input() language: string;
  @Input() minimapEnabled = true;
  @Input() config: IEditorConstructionOptions = {};
  @Input() lineNumbers: ILineNumbers = 'on';
  @Input() theme: StEditorThemes = StEditorThemes.vs;
  @Input() readonly: boolean;

  @Output() codeChange = new EventEmitter<String>();
  @Output() changeFocus = new EventEmitter<boolean>();

  private _codeEditorInstance: monaco.editor.IStandaloneCodeEditor;

  constructor(
    protected _elementRef: ElementRef,
    @Optional()
    @Inject(ST_MONACO_EDITOR_CONFIG) editorConfig: StMonacoEditorConfig,
    private _ngZone: NgZone) {
    super(_elementRef, editorConfig);
  }

  ngOnChanges(changes: SimpleChanges) {

    // if monaco editor is initilized
    if (this._codeEditorInstance) {

      // if only change the code input field, updates value
      if (changes.code && Object.keys(changes).length === 1) {
        // prevents repaint on double binding
        if (this.code !== null || this.code !== undefined) {
          this._codeEditorInstance.setValue(this.code);
        }

        // Restart monaco editor with the updated config
      } else {
        this._codeEditorInstance.dispose();
        this.initMonaco();
      }
    }
  }

  ngOnDestroy(): void {
    if (this._codeEditorInstance) {
      this._codeEditorInstance.dispose();
    }
  }


  public initMonaco(): void {
    const config: monaco.editor.IEditorConstructionOptions = {
      automaticLayout: true,
      value: this.code,
      language: this.language,
      lineNumbers: this.lineNumbers,
      theme: this.theme,
      readOnly: this.readonly,
      minimap: {
        enabled: this.minimapEnabled
      },
      ...this.config
    };

    if (this._codeEditorInstance) {
      this._codeEditorInstance.dispose();
    }

    this._ngZone.runOutsideAngular(() => {

      this._codeEditorInstance = monaco.editor.create(this._elementRef.nativeElement, config);

      this._codeEditorInstance.getModel().onDidChangeContent(e => {
        const value = this._codeEditorInstance.getValue();
        this._ngZone.run(() => {
          this.codeChange.emit(value);
        });
      });

      this._codeEditorInstance.onDidFocusEditorText(() => {
        this._ngZone.run(() => {
          this.changeFocus.emit(true);
        });
      });

      this._codeEditorInstance.onDidBlurEditorText(() => {
        this._ngZone.run(() => {
          this.changeFocus.emit(false);
        });
      });
    });
  }
}
