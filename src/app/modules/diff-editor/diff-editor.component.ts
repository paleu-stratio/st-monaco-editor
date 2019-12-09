import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-diff-editor',
  templateUrl: './diff-editor.component.html',
  styleUrls: ['./diff-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiffEditorComponent {

  public language = 'json';

  public originalModel = (`{
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "description": "First name."
      },
      "lastName": {
        "type": "string",
        "description": "Last name."
      }
    }
  }`);

  public modifiedModel = `{
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "description": "First name."
      },
      "lastName": {
        "type": "string",
        "description": "Last name description."
      },
      "age": {
        "description": "Age in years",
        "type": "integer",
        "minimum": 0
      }
    }
  }`;

}
