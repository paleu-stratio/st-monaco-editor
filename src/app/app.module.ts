import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderModule } from './layout/header/header.module';
import { SimpleEditorModule } from './modules/simple-editor/simple-editor.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.router';
import { DiffEditorModule } from './modules/diff-editor/diff-editor.module';
import { InputEditorModule } from './modules/input-editor/input-editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HeaderModule,
    RouterModule.forRoot(routes),
    DiffEditorModule,
    SimpleEditorModule,
    InputEditorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
