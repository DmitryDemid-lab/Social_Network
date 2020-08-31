export const requiredField = (value: any) =>  value ? undefined : 'field is required'

export const maxLength = (maxLength: number) =>
    (value: any) => (value && value.length > maxLength) ? `Max length is ${maxLength} symbols` : undefined
