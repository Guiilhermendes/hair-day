import { cva, type VariantProps } from "class-variance-authority"
import type React from "react";
import Text from "./text";

export const timeSelectVariants = cva(
    `
        group flex items-center justify-center w-full max-w-[78.5px] h-10
        transition rounded-lg border border-solid
    `, 
    {
        variants: {
            variant: {
                primary: `bg-gray-600 border-gray-500 cursor-pointer
                hover:bg-gray-500 aria-pressed:border-yellow aria-pressed:bg-gray-600
                aria-pressed:hover:bg-gray-600 aria-pressed:pointer-events-none`
            },
            disabled: {
                true: "pointer-events-none bg-transparent border-gray-600"
            }
        },
        defaultVariants: {
            variant: "primary",
            disabled: false
        }
    }
);

export const timeSelectTextVariants = cva("", {
    variants: {
        variant: {
            primary: "text-gray-200 group-aria-pressed:text-yellow"
        },
        disabled: {
            true: "pointer-events-none text-gray-500"
        }
    },
    defaultVariants: {
        variant: "primary",
        disabled: false
    }
});

interface TimeSelectProps extends
Omit<React.ComponentProps<"button">, "disabled">,
VariantProps<typeof timeSelectVariants> {}

export default function TimeSelect({
    variant,
    disabled,
    className,
    children,
    ...props
}: TimeSelectProps) {
    return (
        <button
            className={
                timeSelectVariants({
                    variant,
                    disabled,
                    className
                })
            }
            {...props}
        >
            <Text 
                className={timeSelectTextVariants({variant, disabled})}
                variant="text-md"
            >
                {children}
            </Text>
        </button>
    )
}