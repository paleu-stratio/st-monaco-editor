import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StCheckboxModule } from '@stratio/egeo';

import { SimpleEditorComponent } from './simple-editor.component';
import { StMonacoEditorModule } from '@stratio/st-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SimpleEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StCheckboxModule,
    StMonacoEditorModule
  ],
  exports: [SimpleEditorComponent],
  providers: [],
})
export class SimpleEditorModule { }
