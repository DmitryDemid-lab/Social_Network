export const requiredField: FieldValidatorType = (value) =>  value ? undefined : 'field is required'

export const maxLength = (maxLength: number): FieldValidatorType =>
    (value: string) => (value && value.length > maxLength) ? `Max length is ${maxLength} symbols` : undefined

export type FieldValidatorType = (value: string) => string | undefined
