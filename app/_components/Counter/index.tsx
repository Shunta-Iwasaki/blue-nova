"use client";

type Props = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
};

export default function Counter({ value, onChange, min = 1, max = 10 }: Props) {
    const handleIncrease = () => {
        if (value < max) onChange(value + 1);
    };
    const handleDecrease = () => {
        if (value > min) onChange(value - 1);
    };
    return (
        <div>
            <button onClick={handleDecrease}>-</button>
            <span>{value}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
}
