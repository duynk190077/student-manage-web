export interface Timetable {
    id?: string,
    semester: string,
    week: string | null,
    class: string | null,
    monday: string[] | null,
    tusday: string[] | null,
    wednesday: string[] | null,
    thursday: string[] | null,
    friday: string[] | null,
    saturday: string[] | null,
}

export const defaultTimetable: Timetable = {
    id: '',
    semester: '20222',
    week: null,
    class: null,
    monday: [],
    tusday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
}

export interface TimetableField {
    name: string,
    field: keyof Timetable,
    editable: boolean,
    input?: boolean,
    radio?: boolean,
    select?: boolean,
    multiple?: boolean,
    listRadio?: any[],
    listSelect: readonly any[],
}