import React from "react";
import s from './FormControls.module.css'
import {WrappedFieldMetaProps} from "redux-form"
import {FormControlLabel, TextField} from "@material-ui/core"
import { Input } from '@material-ui/core'
import { Checkbox } from '@material-ui/core';

export const Textarea = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <TextField {...field.input} placeholder={field.placeholder} color={"secondary"}/>
        <div>
            {hasError && <span>{field.meta.error}</span>}
        </div>
    </div>
}

export const FormInput = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error

    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <Input {...field.input} placeholder={field.placeholder} type={field.type} color={"secondary"}/>
        <div>
            {hasError && <span>{field.meta.error}</span>}
        </div>
    </div>
}
export const FormCheckbox = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error

    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <FormControlLabel
            {...field.input}
            control={<Checkbox name={field.name} color={"secondary"}/>}
            label={field.label}
        />
        <div>
            {hasError && <span>{field.meta.error}</span>}
        </div>
    </div>
}

type FieldType = {
    meta: WrappedFieldMetaProps
    placeholder: string | undefined
    type: string
    input: string
    name: string
    label: string
}