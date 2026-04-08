import { cx } from "class-variance-authority";
import React from "react";
import Text from "../components/text";

import SunIcon from "../assets/icons/sun.svg?react";
import CloudIcon from "../assets/icons/cloud.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import ScheduleItem from "./schedule-item";
import type { Schedule } from "../models/schedule";

export enum ScheduleType {
    MORNING = "morning",
    AFTERNOON = "afternoon",
    EVENING = "evening"
};

const scheduleDict = {
    morning: {
        icon: <SunIcon className="fill-yellow-dark w-4.5 h-4.5" />,
        title: "Manhã",
        scheduleRange: "09h-12h"
    },
    afternoon: {
        icon: <CloudIcon className="fill-yellow-dark w-4.5 h-4.5" />,
        title: "Tarde",
        scheduleRange: "13h-18h"
    },
    evening: {
        icon: <MoonIcon className="fill-yellow-dark w-4.5 h-4.5" />,
        title: "Noite",
        scheduleRange: "19h-21h"
    }
}

interface ScheduleListProps extends React.ComponentProps<"div"> {
    scheduleType: ScheduleType;
    schedules: Schedule[];
}

export default function ScheduleList({
    className,
    scheduleType,
    schedules,
    ...props
}: ScheduleListProps) {
    return (
        <div
            className={cx("w-full max-w-170.5 h-full rounded-lg border border-gray-600 bg-transparent", className)}
            {...props}
        >
            <div className="flex h-11 items-center gap-3 px-5 border-b border-b-gray-600">
                {scheduleDict[scheduleType].icon}
                <Text variant="text-sm" className="flex-1 text-gray-300">{scheduleDict[scheduleType].title}</Text>
                <Text variant="text-sm" className="text-gray-400">{scheduleDict[scheduleType].scheduleRange}</Text>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5">
                {schedules.length === 0 ?
                    (
                        <div className="flex items-center w-full max-w-160.5 h-8">
                            <Text variant="text-sm" className="text-gray-300">Nenhum agendamento para este período</Text>
                        </div>
                    )
                    :
                    (
                        schedules.map(schedule => (
                            <ScheduleItem
                                key={schedule.id}
                                id={schedule.id}
                                hours={schedule.time}
                                clientName={schedule.clientName}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}