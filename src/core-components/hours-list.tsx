import { cx } from "class-variance-authority";
import type React from "react";
import Text from "../components/text";
import TimeSelect from "../components/time-select";
import useSchedule from "../hooks/use-schedule";

export enum HoursType {
    MORNING = "morning",
    AFTERNOON = "afternoon",
    EVENING = "evening"
};

const hoursDict = {
    morning: {
        title: "Manhã",
        options: ["09:00", "10:00", "11:00", "12:00"]
    },
    afternoon: {
        title: "Tarde",
        options: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
    },
    evening: {
        title: "Noite",
        options: ["19:00", "20:00", "21:00"]
    }
}

interface HoursListProps extends React.ComponentProps<"div"> {
    hoursType: HoursType,
    isDisabled: boolean,
    selectedTime: string | null,
    onTimeSelect: (time: string) => void,
    selectedDate: Date | null
}

export default function HoursList({
    className,
    hoursType,
    isDisabled = false,
    selectedTime,
    onTimeSelect,
    selectedDate,
    ...props
}: HoursListProps) {
    const { isTimeOccupied } = useSchedule();

    return (
        <div
            className={cx("flex flex-col gap-2", className)}
            {...props}
        >
            <Text variant="text-sm" className="text-gray-300">{hoursDict[hoursType].title}</Text>
            <div className="flex flex-wrap gap-2">
                {hoursDict[hoursType].options.map((item, index) => {
                    const isOccupied = selectedDate && isTimeOccupied(selectedDate, item);
                    const isTimeDisabled = isDisabled || isOccupied;
                    
                    return (
                        <TimeSelect 
                            key={`${index}-${item}`}
                            children={item}
                            disabled={isTimeDisabled}
                            type="button"
                            aria-pressed={selectedTime === item}
                            onClick={() => onTimeSelect(item)}
                        />
                    );
                })}
            </div>
        </div>
    )
}