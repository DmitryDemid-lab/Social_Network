import React from "react";
import s from './FormControls.module.css'
import {WrappedFieldMetaProps} from "redux-form";
import {TextField} from "@material-ui/core";

export const Textarea = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <TextField {...field.input} placeholder={field.placeholder} color={"secondary"}/>
        <div>
            {hasError && <span>{field.meta.error}</span>}
        </div>
    </div>
}

export const Input = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error

    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <input {...field.input} placeholder={field.placeholder} type={field.type}/>
        <div>
            {hasError && <span>{field.meta.error}</span>}
        </div>
    </div>
}

type FieldType = {
    meta: WrappedFieldMetaProps
    /*{
        touched: boolean
        error: string
    }*/
    placeholder: string | undefined
    type: string
    input: string
}