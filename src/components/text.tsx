import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("", {
    variants: {
        variant: {
            "title-lg": "text-3xl leading-6 font-bold",
            "title-md": "text-base leading-6 font-bold",
            "title-sm": "text-sm leading-5 font-bold",
            "text-md": "text-base leading-6",
            "text-sm": "text-sm leading-5",
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "text-md",
        disabled: false
    }
});

interface TextProps extends VariantProps<typeof textVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode
}

export default function Text({
    as = "span",
    variant,
    disabled,
    className,
    children,
    ...props
}: TextProps) {
    return React.createElement(
        as,
        {
            className: textVariants({
                variant,
                disabled,
                className
            }),
            ...props
        },
        children
    )
}