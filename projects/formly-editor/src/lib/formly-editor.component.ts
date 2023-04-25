import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {FormlyEditorService} from './formly-editor.service';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';


interface ControlType {
    key: string,
    type: string,
    props: { label: string, placeholder: string, options: any[], required: boolean }
}

interface Props {
    label?: string
}

@Component({
    selector: 'lib-formly-editor',
    templateUrl: './formly-editor-component.html',
    styleUrls: ['./formly-editor-component.css']
})
export class FormlyEditorComponent implements OnInit, OnChanges {

    @Input() fields: FormlyFieldConfig[] = [];
    @Output() saveForm = new EventEmitter<any>();
    @Input() model: Object={};
    @Output() modelValues = new EventEmitter<any>();

    disabled: boolean = true;
    editing: boolean = false;
    form = new FormGroup({});

    control: ControlType = {
        key: '', type: 'input',
        props: {
            label: '', placeholder: '', options: [], required: false
        }
    };
    optionValue: string = '';
    optionLabel: string = '';
    optionList: any[] = [];

    constructor(public formlyEditorService: FormlyEditorService, public cdr: ChangeDetectorRef) {
        this.initControls();
    }

    initControls() {
        this.control = {key: '', type: 'input', props: {label: '', placeholder: '', options: [], required: false}};

        this.optionList = [];
        this.optionValue = '';
        this.optionLabel = '';
    }

    ngOnInit(): void {
        this.formlyEditorService.fields = this.fields;
        this.formlyEditorService.model = this.model;
    }

    ngOnChanges(changes: any) {
        console.log('Class: FormlyEditorComponent, Function: ngOnChanges, Line 61  changes(): '
        ,  changes);
        if (changes.fields) {
            this.formlyEditorService.fields = changes.fields.currentValue;
        }
        if (changes.model) {
            this.formlyEditorService.model = changes.model.currentValue;
        }

    }
    addOptionListToControl(_control: ControlType){
        if ((_control.type === 'radio' || _control.type === 'select') && (this.optionList.length > 0)) {
            this.control.props.options = [...this.optionList];
        }
    }
    addControl() {
        if(!this.editing) {
            let _control = this.control;
            this.addOptionListToControl(_control)
            console.log('Class: FormlyEditorComponent, Function: addControl, Line 66 _control.props.options(): '
            , _control);
            this.formlyEditorService.addField(_control);

        } else {
            this.addOptionListToControl(this.control)
            this.editing=false;
        }
        this.initControls();
        this.disabled=true;
    }

    newComponent(){
        this.initControls();
        this.disabled=false;
    }

    addOption() {
        let _option = {value: this.optionValue, label: this.optionLabel};
        this.optionList.push(_option);
        this.optionValue = '';
        this.optionLabel = '';
    }

    fieldsJson() {
        return  JSON.stringify(this.formlyEditorService.fields);
    }

    _saveForm() {
        this.saveForm.emit(this.formlyEditorService.fields);
    }

    remove(keyName: any) {
        console.log('quitar ' +  keyName)
        this.formlyEditorService.removeField(keyName);
    }
    edit(keyName: any){
        this.initControls();
        const field = this.formlyEditorService.getField(keyName);
        console.log('Class: FormlyEditorComponent, Function: edit, Line 106 field(): '
        , field);
        for(const property in this.control){
            // @ts-ignore
            this.control[property] = field[property];
        }
        if(this.control.props.options!==undefined){
            this.optionList = this.control.props.options;
        }
        this.editing = true;
        this.disabled=false;
    }
    submit(){
        this.modelValues.emit(this.form.getRawValue());
    }
    resetModel(){
        this.model = {};
        this.formlyEditorService.model = this.model;
    }
    removeOption(index: number){
        console.log('Class: FormlyEditorComponent, Function: removeOption, Line 139  this.optionList(): '
        ,  this.optionList);
        this.optionList.splice(index,1);
    }

}
