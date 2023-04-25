import { NgModule } from '@angular/core';
import { FormlyEditorComponent } from './formly-editor.component';
import { TestViewComponent } from './test-view/test-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    FormlyEditorComponent,
    TestViewComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    FormlyEditorComponent,
    TestViewComponent
  ]
})
export class FormlyEditorModule { }
