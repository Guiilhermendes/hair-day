import useLocalStorageState from "use-local-storage-state";
import { SCHEDULES_KEY, type Schedule } from "../models/schedule";

export default function useSchedule() {
    const [schedules, setSchedules] = useLocalStorageState<Schedule[]>(SCHEDULES_KEY, {
        defaultValue: []
    });

    const schedulesWithDates = schedules.map(schedule => ({
        ...schedule,
        date: typeof schedule.date === 'string' ? new Date(schedule.date) : schedule.date
    }));

    function isSameDate(firstDate: Date, secondDate: Date) {
        if (!firstDate || !secondDate || !(firstDate instanceof Date) || !(secondDate instanceof Date)) {
            return false;
        }
        return firstDate.getFullYear() === secondDate.getFullYear()
            && firstDate.getMonth() === secondDate.getMonth()
            && firstDate.getDate() === secondDate.getDate();
    }

    function isTimeOccupied(date: Date, time: string): boolean {
        if (!date || !(date instanceof Date)) {
            return false;
        }

        return schedulesWithDates.some(schedule => 
            isSameDate(schedule.date, date) && schedule.time === time
        );
    }

    function createSchedule(clientName: string, date: Date, time: string): Schedule {
        if (!clientName.trim() || !time) {
            throw new Error("Nome do cliente e horário são obrigatórios");
        }

        if (isTimeOccupied(date, time)) {
            throw new Error("Este horário já está ocupado para esta data");
        }

        const schedule: Schedule = {
            id: crypto.randomUUID(),
            clientName,
            date,
            time
        };

        setSchedules([...schedules, schedule]);
        return schedule;
    }

    function showScheduleAppointments(date: Date | null = new Date()) {
        if (!date) return { morning: [], afternoon: [], evening: [] };
        
        const appointmentsForDate = schedulesWithDates.filter(schedule => isSameDate(schedule.date, date));
        
        const getHourFromTime = (time: string): number => {
            return parseInt(time.split(":")[0], 10);
        };

        const getMinutesFromTime = (time: string): number => {
            const [hours, minutes] = time.split(":").map(Number);
            return (hours * 60) + minutes;
        };

        const sortByTime = (appointments: Schedule[]) => {
            return [...appointments].sort(
                (first, second) => getMinutesFromTime(first.time) - getMinutesFromTime(second.time)
            );
        };
        
        return {
            morning: sortByTime(appointmentsForDate.filter(schedule => {
                const hour = getHourFromTime(schedule.time);
                return hour >= 9 && hour <= 12;
            })),
            afternoon: sortByTime(appointmentsForDate.filter(schedule => {
                const hour = getHourFromTime(schedule.time);
                return hour >= 13 && hour <= 18;
            })),
            evening: sortByTime(appointmentsForDate.filter(schedule => {
                const hour = getHourFromTime(schedule.time);
                return hour >= 19 && hour <= 21;
            }))
        };
    }

    function deleteSchedule(id: string) {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
    }

    return {
        createSchedule,
        isTimeOccupied,
        showScheduleAppointments,
        deleteSchedule,
        isSameDate,
        schedules
    }
}