import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputEditorComponent } from './input-editor.component';
import { StMonacoEditorModule } from '@stratio/st-monaco-editor';
import { StTextareaModule } from '@stratio/egeo';

@NgModule({
  declarations: [InputEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StMonacoEditorModule,
    StTextareaModule
  ],
  exports: [InputEditorComponent],
  providers: [],
})
export class InputEditorModule {}
