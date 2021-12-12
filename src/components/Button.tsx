import { CgSpinner } from "react-icons/cg";

interface ButtonProps { 
    text: string,
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    type: 'button' | 'submit' | 'reset' | undefined,
    loading: boolean,
    disabled?: boolean,
    className?: string,
    children?: any,
    onClick?: any
}

export default function Button({ text, color, type = 'button', loading, disabled, className, onClick, children }: ButtonProps) {
    return (
        <button className={`btn btn-${color} ${className} d-flex-center`} type={type} disabled={loading || disabled} onClick={onClick}>
            {loading ? <CgSpinner className="fa-spin me-2" /> : children} {text}
        </button>
    )
}