export const constants = {
    greenTitle : '#529e1f',
    greenCard: '#286400',
    greenText: '#06f555',
    blueTitle: '#45a7c0',
    blueCard: '#22768b',
    blueText : '#7ee1fa'
}

export const util = {
    getYearTitle : (yearId)=>{
        switch(parseInt(yearId)){
            case 1 : return 'Prva godina';
            case 2 : return 'Druga godina';
            case 3 : return 'Treca godina';
            case 4 : return 'Cetvrta godina';
            case 20 : return 'Drugi ciklus';
            case 30 : return 'Treci ciklus';
            case 21 : return 'Odbrane zavrsnih radova';
            case 102 : return 'Postdiplomski studij';
            default : return 'Greska';
        }
    }
}