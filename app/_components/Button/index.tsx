type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
    type = "button",
    className,
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            style={{ cursor: "pointer" }}
            type={type}
            className={className}
            {...rest}
        >
            {children}
        </button>
    );
}
