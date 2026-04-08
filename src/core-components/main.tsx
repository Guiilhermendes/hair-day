import { cx } from "class-variance-authority";
import React, { useState, useEffect } from "react";
import Text from "../components/text";
import DateSelect from "../components/date-select";
import ScheduleList, { ScheduleType } from "./schedule-list";
import useSchedule from "../hooks/use-schedule";
import type { Schedule } from "../models/schedule";

interface SchedulesPeriod {
    morning: Schedule[];
    afternoon: Schedule[];
    evening: Schedule[];
}

interface MainProps extends React.ComponentProps<"main"> {}

export default function Main({
    className,
    ...props
}: MainProps) {
    const { showScheduleAppointments, schedules } = useSchedule();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [schedulesPeriod, setSchedulesPeriod] = useState<SchedulesPeriod>({
        morning: [],
        afternoon: [],
        evening: []
    });

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
    }

    useEffect(() => {
        setSchedulesPeriod(showScheduleAppointments(selectedDate));
    }, [selectedDate, schedules]);

    return (
        <main
            className={
                cx(`flex flex-col w-full max-w-226.5 max-h-219 py-20 px-28 gap-8`,
                    className
                )
            }
            {...props}
        >
            <header className="flex justify-between gap-3">
                <div className="flex flex-col flex-1 gap-1">
                    <Text variant="title-lg" className="text-gray-100">Sua agenda</Text>
                    <Text variant="text-sm" className="text-gray-300">Consulte os seus cortes de cabelo agendados por dia</Text>
                </div>
                <DateSelect 
                    variant="secondary" 
                    doesAllDate
                    onDateChange={handleDateChange}
                />
            </header>

            <div className="flex flex-col gap-3">
                <ScheduleList scheduleType={ScheduleType.MORNING} schedules={schedulesPeriod.morning} />
                <ScheduleList scheduleType={ScheduleType.AFTERNOON} schedules={schedulesPeriod.afternoon} />
                <ScheduleList scheduleType={ScheduleType.EVENING} schedules={schedulesPeriod.evening} />
            </div>
        </main>
    )
}