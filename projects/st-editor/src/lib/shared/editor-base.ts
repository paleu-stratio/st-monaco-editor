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

import { AfterViewInit, ElementRef } from '@angular/core';
import { StMonacoEditorConfig } from '../st-monaco-editor.config';

let loadedMonaco = false;
let loadPromise: Promise<void>;

export abstract class EditorBase implements AfterViewInit {

  constructor(
    protected _elementRef: ElementRef,
    protected _editorConfig: StMonacoEditorConfig
  ) { }

  ngAfterViewInit() {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco();
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });

          (<any>window).require(['vs/editor/editor.main'], () => {
            if (this._editorConfig && this._editorConfig.onMonacoLoad) {
              this._editorConfig.onMonacoLoad();
            }
            this.initMonaco();
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = 'assets/monaco/vs/loader.js';
          loaderScript.addEventListener('load', onAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onAmdLoader();
        }
      });
    }

  }

  public abstract initMonaco(): void;

}
