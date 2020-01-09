
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

import { NgModule, ModuleWithProviders } from '@angular/core';

import { StMonacoEditorComponent } from './st-editor/st-monaco-editor.component';
import { StMonacoDiffEditorComponent } from './st-diff-editor/st-monaco-diff-editor.component';
import { StEditorInputComponent } from './st-editor-input/st-editor-input.component';
import { StMonacoEditorConfig, ST_MONACO_EDITOR_CONFIG } from './st-monaco-editor.config';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StMonacoEditorComponent,
    StMonacoDiffEditorComponent,
    StEditorInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StMonacoEditorComponent,
    StMonacoDiffEditorComponent,
    StEditorInputComponent
  ],
  providers: []
})

export class StMonacoEditorModule {

  public static forRoot(config: StMonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: StMonacoEditorModule,
      providers: [{ provide: ST_MONACO_EDITOR_CONFIG, useValue: config }],
    };
  }

}
