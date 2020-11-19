export const constants = {
    greenTitle : '#529e1f',
    greenCard: '#286400',
    greenText: '#06f555',
    blueTitle: '#45a7c0',
    blueCard: '#22768b',
    blueText : '#7ee1fa',
    yearIds : [1, 2, 3, 4, 20, 30, 21, 102]
};

export const util = {
    getYearTitle : (yearId) => {
        switch (parseInt(yearId)){
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
    },
    formatAnnouncementDate:(date:string)=>{
        if(date){
            let dateSplit = date.split('T');
            let dateString = dateSplit[0];
            let timeString = dateSplit[1].split('.')[0];
            let dateStringSplit = dateString.split("-");
            let timeSplit = timeString.split(':');
            timeString = timeSplit[0]+":"+timeSplit[1];
            let newDateString = dateStringSplit[2]+". " + util.mapMonth(dateStringSplit[1]) + " " + dateStringSplit[0];
            return newDateString + " " + timeString;
        }
        return null;
    },
    mapMonth:(month)=>{
        switch(month){
            case '1': return 'januar';
            case '2': return 'februar';
            case '3': return 'mart';
            case '4': return 'april';
            case '5': return 'maj';
            case '6': return 'jun';
            case '7': return 'jul';
            case '8': return 'avgust';
            case '9': return 'septembar';
            case '10': return 'oktobar';
            case '11': return 'novembar';
            case '12': return 'decembar';
        }
    }
};


export const adSample = {id:2559,
naslov:"Први колоквијум из предмета Основи рачунарске технике",
uvod:"",
sadrzaj:"Први колоквијум (провјера знања) из предмета Основи рачунарске технике ће се одржати у четвртак 26.11.2020. године и петак 27.11.2020. године на Електротехничком факултету у сали 1110.\n\nПредавања из предмета Основи рачунарске технике неће бити одржана 26.11.2020. због одржавања колоквијума.\n\nСтуденти из групе К4 ће радити колоквијум од 8 часова и 15 минута до 9 часова и 15 минута, дана 26.11.2020. године.\nСтуденти из групе К3 ће радити колоквијум од 9 часова и 30 минута до 10 часова и 30 минута, дана 26.11.2020. године.\nСтуденти из групе К1 ће радити колоквијум од 9 часова и 15 минута до 10 часова и 15 минута, дана 27.11.2020. године.\nСтуденти из групе К2 ће радити колоквијум од 10 часова и 30 минута до 11 часова и 30 минута, дана 27.11.2020. године.\n\nКолоквијум се ради 60 минута.\n\nКолоквијум обухвата градиво рађено на аудиторним вјежбама и то:\n- Бројни системи\n- Представљање података\n- Комбинационе логичке мреже (минимизација и пројектовање)\n",
potpis:"Са катедре за електронику",
vrijemeKreiranja:"2020-11-18T11:39:31.824121",
vrijemeIsteka:"2020-11-28T00:00:00",
oglasnaPloca:{
    id:1,naziv:"Прва година",opis:
    " ",
    napomena:" "
},
korisnickiNalog:null,
oglasPrilozi:[]
}