


export interface PatronIntf {
    id: number;
    name: string;
    address: string;
    College: string;
    Degree_Course: string;
    User_Class: string;
    Year_Level: string;
    IDnum: string;
    DateApplied: string | null;
    DateExpired: string | null;
    email: string;
    gender: string;
    campus: string;
    Bkloan: string | null;
    telephone: string ;
    Overdue: string | null;
    remarks: string | null;
    suspended: string | null;
    tag: string | null;
    reg_date: string;
    photo: string;
    esig:string;
}


export interface Filename {
    filename: string | null;
}



export type IdMakerForPrintTypes = {
  id: number;
  patron_id: string;
  photo: string | null;
  esig: string | null;
  reg_date?: string | Date | null;
  name:string;
  address:string;  
  Degree_Course: string;   
  patron: {    
    gender: string | null;
  } | null  
  
};


export type IdMakerPrintedTypes = {
  id: number;
  patron_id: string;    
  patron: {    
    photo: string | null;
    esig: string | null;
    reg_date?: string | Date | null;
    name:string;
    address:string;  
    Degree_Course: string; 
    gender: string | null;
  } | null  
  
};