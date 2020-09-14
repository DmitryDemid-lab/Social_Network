import React from "react";
import s from './FormControls.module.css'
import {WrappedFieldMetaProps} from "redux-form";

export const Textarea = (field: FieldType) => {
    const hasError = field.meta.touched && field.meta.error
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <textarea {...field.input} placeholder={field.placeholder}/>
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