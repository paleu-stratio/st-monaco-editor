import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StMonacoEditorComponent } from './st-monaco-editor.component';

describe('StMonacoEditorComponent', () => {
  let component: StMonacoEditorComponent;
  let fixture: ComponentFixture<StMonacoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StMonacoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StMonacoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
