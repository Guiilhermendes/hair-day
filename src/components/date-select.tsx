import { cva, type VariantProps } from "class-variance-authority"
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import CalenderIcon from "../assets/icons/calendar.svg?react"
import DownIcon from "../assets/icons/down.svg?react"

export const dateSelectDivVariants = cva("relative w-full cursor-pointer", {
    variants: {
        variant: {
            primary: "max-w-85",
            secondary: "max-w-38",
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

interface DateSelectProps extends
React.ComponentProps<"div">,
VariantProps<typeof dateSelectDivVariants> {
    doesAllDate?: boolean
    selectedDate?: Date | null
    onDateChange: (date: Date | null) => void
}

export default function DateSelect({
    variant,
    className,
    doesAllDate = false,
    selectedDate,
    onDateChange,
    ...props
}: DateSelectProps) {
    const [startDate, setStartDate] = useState<Date | null>(variant === "secondary" ? new Date() : null);

    useEffect(() => {
        if (selectedDate !== undefined) {
            setStartDate(selectedDate);
        }
    }, [selectedDate]);

    function handleSelectDate(date: Date | null) {
        setStartDate(date);
        onDateChange(date);
    }
    
    return (
        <div className={dateSelectDivVariants({variant, className})} {...props}>
            <CalenderIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-yellow"/>
            <DownIcon className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 fill-gray-300"/>
            <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => handleSelectDate(date)}
                onChangeRaw={e => e?.preventDefault()}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/aaaa"
                locale={ptBR}
                wrapperClassName="!block !w-full"
                calendarClassName="date-picker-dark"
                minDate={doesAllDate ? undefined : new Date()}
                className={
                    `w-full h-12 rounded-lg border border-gray-500 bg-transparent 
                    pl-9 text-gray-200 outline-none focus:border-yellow-dark
                    text-base leading-6 cursor-pointer placeholder:text-gray-200`
                }
            />
        </div>
    )
}