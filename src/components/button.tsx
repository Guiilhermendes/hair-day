import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

export const buttonVariants = cva(
    `
        flex items-center justify-center cursor-pointer
        transition rounded-lg
    `, 
    {
        variants: {
            variant: {
                primary: "bg-yellow border-2 border-transparent hover:border-yellow-light hover:ring-1 hover:ring-yellow-light"
            },
            size: {
                md: "w-full max-w-85 h-14"
            },
            disabled: {
                true: "opacity-30 pointer-events-none"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            disabled: false
        }
    }
);

export const buttonTextVariants = cva("", {
    variants: {
        variant: {
            primary: "text-gray-900"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

interface ButtonProps extends 
Omit<React.ComponentProps<"button">, "size" | "disabled">, 
VariantProps<typeof buttonVariants> {}

export default function Button({
    variant,
    size,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={
                buttonVariants({
                    variant,
                    size,
                    disabled,
                    className
                })
            }
            {...props}
        >
            <Text 
                className={buttonTextVariants({variant})}
                variant="title-sm"
            >
                {children}
            </Text>
        </button>
    )
}