import { Routes } from '@angular/router';
import { SimpleEditorComponent } from './modules/simple-editor/simple-editor.component';
import { DiffEditorComponent } from './modules/diff-editor/diff-editor.component';
import { InputEditorComponent } from './modules/input-editor/input-editor.component';

export const routes: Routes = [
    {
      path: '',
      component: SimpleEditorComponent
    },
    {
      path: 'diff-editor',
      component: DiffEditorComponent
    },
    {
      path: 'input-editor',
      component: InputEditorComponent
    }
];
