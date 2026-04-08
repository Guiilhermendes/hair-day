import { cx } from "class-variance-authority";
import type React from "react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Text from "../components/text";
import useSchedule from "../hooks/use-schedule";

interface ScheduleItemProps extends React.ComponentProps<"div"> {
    id: string;
    hours: string;
    clientName: string;
}

export default function ScheduleItem({
    id,
    hours,
    clientName,
    className,
    ...props
}: ScheduleItemProps) {
    const { deleteSchedule } = useSchedule();

    return (
        <div 
            className={cx("flex items-center w-full max-w-160.5 h-8 gap-5", className)}
            {...props}
        >
            <Text variant="title-md" className="text-gray-200">{hours}</Text>
            <Text variant="text-md" className="flex-1 text-gray-200">{clientName}</Text>
            <TrashIcon className="w-3 h-3 fill-yellow cursor-pointer" onClick={() => deleteSchedule(id)}/>
        </div>
    )
}