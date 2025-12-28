export interface Errors {
    first: string | undefined,
    second: string | undefined,
    new: string | undefined,
}

export interface ChangePassword {
    current_password: string,
    new_password: string,
}

export interface ChangePasswordProps {
    onError: (error: string) => void;
    onSuccess: () => void;
}