"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    customerFormSchema,
    CustomerFormSchemaType,
} from "../_schemas/customerForm";

export default function TestForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormSchemaType>({
        resolver: zodResolver(customerFormSchema),
    });
    const onSubmit = (data: CustomerFormSchemaType) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("lastName")} />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <button type="submit">送信</button>
        </form>
    );
}
