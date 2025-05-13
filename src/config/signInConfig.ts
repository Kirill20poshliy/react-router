export interface IField {
    id: number,
    label?: string;
    placeholder?: string,
    type: string,
    name: string,
    required?: boolean,
    disabled?: boolean,
}

export interface IForm {
    title: string,
    submitLabel: string,
    fields: IField[]
}

export const signInConfig: IForm = {
    title: "Войти",
    submitLabel: "Войти",
    fields: [
        {
            id: 1,
            label: "Login",
            placeholder: "Login",
            type: "text",
            name: "login",
            required: true,
        },
        {
            id: 2,
            label: "Password",
            placeholder: "Password",
            type: "password",
            name: "password",
            required: true,
        }
    ]
}