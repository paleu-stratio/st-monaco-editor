import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffEditorComponent } from './diff-editor.component';
import { StMonacoEditorModule } from '@stratio/st-monaco-editor';

@NgModule({
  declarations: [DiffEditorComponent],
  imports: [
    CommonModule,
    StMonacoEditorModule
  ],
  exports: [DiffEditorComponent],
  providers: [],
})
export class DiffEditorModule {}
