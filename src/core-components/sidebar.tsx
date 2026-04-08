import { cx } from "class-variance-authority";
import React, { useRef, useState } from "react";
import Text from "../components/text";
import DateSelect from "../components/date-select";
import HoursList, { HoursType } from "./hours-list";
import TextInput from "../components/text-input";
import Button from "../components/button";
import useSchedule from "../hooks/use-schedule";

interface SidebarProps extends React.ComponentProps<"aside"> {}

export default function Sidebar({
    className,
    ...props
}: SidebarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const clientNameRef = useRef<HTMLInputElement>(null);
    const { createSchedule, isTimeOccupied } = useSchedule();

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
        setSelectedTime(null);
    }

    function handleTimeSelect(time: string) {
        if (selectedDate && !isTimeOccupied(selectedDate, time)) {
            setSelectedTime(time === selectedTime ? null : time);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!selectedDate || !selectedTime || !clientNameRef.current?.value.trim()) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        try {
            createSchedule(clientNameRef.current.value, selectedDate, selectedTime);
            setSelectedDate(null);
            setSelectedTime(null);
            if (clientNameRef.current) clientNameRef.current.value = "";
        } catch (error) {
            alert(error instanceof Error ? error.message : "Erro ao criar agendamento");
        }
    }

    return (
        <aside 
            className={
                cx(`bg-gray-700 w-full max-w-124.5 rounded-xl
                    flex flex-col gap-6 p-20`,
                className)
            }
            {...props}
        >
            <header className="flex flex-col gap-1">
                <Text variant="title-lg" className="text-gray-100">Agende um atendimento</Text>
                <Text variant="text-sm" className="text-gray-300">Selecione data, horário e informe o nome do cliente para criar o agendamento</Text>
            </header>

            <form
                className="flex flex-col gap-8 w-full max-w-84.5"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <Text variant="title-md" className="text-gray-200">Data</Text>
                    <DateSelect
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Text variant="title-md" className="text-gray-200">Horários</Text>
                    <div className="flex flex-col gap-3">
                        <HoursList 
                            hoursType={HoursType.MORNING} 
                            isDisabled={selectedDate === null}
                            selectedTime={selectedTime}
                            onTimeSelect={handleTimeSelect}
                            selectedDate={selectedDate}
                        />
                        <HoursList 
                            hoursType={HoursType.AFTERNOON} 
                            isDisabled={selectedDate === null}
                            selectedTime={selectedTime}
                            onTimeSelect={handleTimeSelect}
                            selectedDate={selectedDate}
                        />
                        <HoursList 
                            hoursType={HoursType.EVENING} 
                            isDisabled={selectedDate === null}
                            selectedTime={selectedTime}
                            onTimeSelect={handleTimeSelect}
                            selectedDate={selectedDate}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Text variant="title-md" className="text-gray-200">Cliente</Text>
                    <TextInput ref={clientNameRef} />
                </div>

                <Button type="submit">AGENDAR</Button>
            </form>
        </aside>
    )
}