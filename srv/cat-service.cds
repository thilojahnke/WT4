using { AdressODATA.Adress as WT4 } from '../db/schema' ;
service AdressService @(path: '/AdressODATA') {
    entity Adress as select from WT4.ADRESSES{*
    };
    
}