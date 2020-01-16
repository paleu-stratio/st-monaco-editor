import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-input-editor",
  templateUrl: "./input-editor.component.html",
  styleUrls: ["./input-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputEditorComponent {
  public formControl = new FormControl(
    `{
      "widget": {
        "debug": "on",
        "window": {
            "title": "Sample Konfabulator Widget",
            "name": "main_window",
            "width": 500,
            "height": 500
        },
        "image": {
            "src": "Images/Sun.png",
            "name": "sun1",
            "hOffset": 250,
            "vOffset": 250,
            "alignment": "center"
        },
        "text": {
            "data": "Click Here",
            "size": 36,
            "style": "bold",
            "name": "text1",
            "hOffset": 250,
            "vOffset": 100,
            "alignment": "center",
            "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
        }
      }
    }`,
    [Validators.required]
  );

  public setValue() {
    this.formControl.setValue(
      `{
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
      }`);
  }

  public reset() {
    this.formControl.reset();
  }
}
