type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export function FormInput({ label, id, className, ...rest }: InputProps) {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} className={className} {...rest} />
        </div>
    );
}
