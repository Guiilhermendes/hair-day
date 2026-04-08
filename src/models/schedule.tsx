export const SCHEDULES_KEY = "schedules";

export interface Schedule {
    id: string;
    clientName: string;
    date: Date;
    time: string;
}