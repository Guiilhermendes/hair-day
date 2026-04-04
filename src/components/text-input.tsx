import { cva, cx, type VariantProps } from "class-variance-authority";
import type React from "react";
import { textVariants } from "./text";
import UserIcon from "../assets/icons/user.svg?react"

const textInputVariants = cva(
    `
        rounded-lg border-solid border border-gray-500 focus:border-yellow-dark
        bg-transparent outline-none flex items-center justify-center
    `, 
    {
        variants: {
            size: {
                md: "w-full max-w-85 h-12 px-3"
            },
        },
        defaultVariants: {
            size: "md"
        }
    }
);

interface TextInputProps extends 
Omit<React.ComponentProps<"input">, "size">,
VariantProps<typeof textInputVariants> {}

export default function TextInput({
    size,
    className,
    ...props
}: TextInputProps) {
    return (
        <div className="relative w-full max-w-85">
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 fill-yellow"/>
            <input
                placeholder="Guilherme Mendes"
                className={cx(
                    textInputVariants({size}),
                    textVariants({
                        className: "text-gray-400"
                    }),
                    "pl-10",
                    className
                )}
                {...props}
            />
        </div>
    )
}