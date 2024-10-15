// types/dataTypes.ts
export interface BookingData {
    hotel: string;
    arrival_date_year: number;
    arrival_date_month: string;
    arrival_date_day_of_month: number;
    adults: number;
    children: number;
    babies: number;
    country: string;
    [key: string]: any; // This allows for any additional keys with any type
  }
  
  
  export type BookingsResponse = BookingData[];
  