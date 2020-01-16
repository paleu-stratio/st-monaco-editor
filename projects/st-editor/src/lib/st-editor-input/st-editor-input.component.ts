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
  forwardRef,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { IEditorConstructionOptions, StEditorThemes } from '../models/editor';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'st-editor-input',
  templateUrl: './st-editor-input.component.html',
  styleUrls: ['./st-editor-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StEditorInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StEditorInputComponent),
      multi: true
    }
  ]
})
export class StEditorInputComponent implements OnChanges, ControlValueAccessor, Validator {
  /** @Input {boolean} [thin] Option for a thinner header and an arrow marker under active option */
  @Input() language: string;
  @Input() label: string;
  @Input() contextualHelp: string;
  @Input() name: string;
  @Input() qaTag: string;
  @Input() forceValidations = false;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() isFocused = false;
  @Input() errorMessages: { [errorName: string]: string } = {};
  @Input() resizable = true;
  @Input() readonly = false;
  @Input() value: string;
  @Input() theme: StEditorThemes = StEditorThemes.vs;

  @Output() blur: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('scrollElement', { static: false }) scrollElement: ElementRef;
  @ViewChild('editorElement', { static: true, read: ElementRef }) editor: ElementRef;

  public isDisabled = false; // To check disable
  public code: string;
  public focus: boolean;
  public errorMessage: string;
  public hasErrors: boolean;

  public monacoConfig: IEditorConstructionOptions;

  private _position: number;
  private _initialHeight: number;

  public onChange = (_: any) => { };
  public onTouched = () => { };

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _cd: ChangeDetectorRef,
    private _renderer: Renderer2) {
    this._onDrag = this._onDrag.bind(this);
    this._onRelease = this._onRelease.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.code = this.value;
    }

    if (changes.language) {
      this.monacoConfig = {
        language: this.language,
        automaticLayout: true,
        lineNumbersMinChars: 2
      };
    }
  }

  public codeChange(value: string) {
    this.onChange(value);
  }

  public writeValue(value: string): void {
    const _value = value === null ? '' : value;
    this.code = _value;
  }

  // Registry the change function to propagate internal model changes
  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  // Registry the touch function to propagate internal touch events
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Update current internal disabled state
   * @param isDisabled: new disabled state value
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Change input focus state and emits when its blurred
   * @param isFocused: new focus state
   */
  public changeFocus(isFocused: boolean) {
    this.focus = isFocused;
    if (!isFocused) {
      this.blur.emit();
    }
  }

  public validate(control: FormControl): ValidationErrors {
    setTimeout(() => this._getErrorMessage(control.errors));
    if (this.maxLength && control.value && control.value.length > this.maxLength) {
      return {
        maxLength: true
      };
    }

    if (this.minLength && control.value && control.value.length < this.minLength) {
      return {
        minLength: true
      };
    }
  }

  /**
   * Init resize dragging triggers
   * @param event: current mousedown event
   */
  public onResize(event: MouseEvent) {
    this._position = event.pageY;
    this._initialHeight = this.editor.nativeElement.offsetHeight;
    this._document.addEventListener('mousemove', this._onDrag);
    this._document.addEventListener('mouseup', this._onRelease);
  }


  /**
   * Set new height into editor textarea
   * @param e: mousemove event
   */
  private _onDrag(e: MouseEvent) {

    // safe style update value with Renderer2
    this._renderer.setStyle(this.editor.nativeElement, 'height', (this._initialHeight - this._position + e.pageY) + 'px');
  }

  /**
   * Removes current document's mousemove and mouseup eventListeners
   */
  private _onRelease() {
    this._document.removeEventListener('mousemove', this._onDrag);
    this._document.removeEventListener('mouseup', this._onRelease);
  }

  private _getErrorMessage(errors: ValidationErrors) {
    this.errorMessage = '';
    this.hasErrors = false;

    if (errors && Object.keys(errors).length > 0) {
      this.hasErrors = true;
      // First, show required error message
      if (errors.required) {
        this.errorMessage = this.errorMessages['required'] || '';
      } else {
        Object.keys(errors).forEach((error: string) => {
          this.errorMessage = this.errorMessages[error] || '';
          this._cd.markForCheck();
          return;
        });
      }
    }

    this._cd.markForCheck();
  }

}
