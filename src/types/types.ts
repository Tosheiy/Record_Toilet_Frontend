export interface Record {
    Id: string;
    Description: string;
    Created_at: string;
    Length_time: number;
    Location_at: string;
    Feeling: number;
}

export interface User {
    utid: string;
    apikey: string;
};