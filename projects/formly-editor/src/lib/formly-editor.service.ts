import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Injectable({
    providedIn: 'root'
})
export class FormlyEditorService {
    public model: Object = {};
    public fields: FormlyFieldConfig[] = [];

    constructor() {
    }

    addField(field: FormlyFieldConfig) {
        this.fields = [...this.fields, field];
    }

    updateField(keyName: string, field: FormlyFieldConfig){
        this.fields.find((value,index) => {
            if(value.key === keyName){
                this.fields[index] = field;
            }
        });
    }

    removeField(keyName: string) {
        let itemToRemove = {};
        this.fields = this.fields.filter(
            (value, index) => value.key !== keyName
        )
    }

    getField(keyName: string) {
        return this.fields.find(f => f.key === keyName);
    }


}
