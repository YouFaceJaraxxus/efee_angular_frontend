export const constants = {
    greenTitle : '#529e1f',
    greenCard: '#286400',
    greenText: '#06f555',
    blueTitle: '#45a7c0',
    blueCard: '#22768b',
    blueText : '#7ee1fa',
    yearIds : [1, 2, 3, 4, 20, 21, 30, 102],
    SHARE_ANNOUNCEMENT_LINK : 'http://localhost:4200/oglas/',
    SHARE_ZAVRSNI_RAD_LINK: 'http://localhost:4200/zavrsni-rad/',
    itemsPerPage : 10
};

export const util = {
    getYearTitle : (yearId) => {
        switch (parseInt(yearId)){
            case 1 : return 'Prva godina';
            case 2 : return 'Druga godina';
            case 3 : return 'Treća godina';
            case 4 : return 'Četvrta godina';
            case 20 : return 'Drugi ciklus';
            case 30 : return 'Treći ciklus';
            case 21 : return 'Odbrane završnih radova';
            case 102 : return 'Postdiplomski studij';
            default : return 'Greška';
        }
    },
    getTypeIdTitle : (typeId) => {
      switch (parseInt(typeId)){
        case 2 : return 'Odobreni završni radovi';
        case 3 : return 'Dodjeljeni završni radovi';
        case 4 : return 'Odbranjeni završni radovi';
        default : return 'Greška';
    }
    },
    formatAnnouncementDate: (date: string, language: string) => {
        if (date){
            const dateSplit = date.split('T');
            const dateString = dateSplit[0];
            let timeString = dateSplit[1].split('.')[0];
            const dateStringSplit = dateString.split('-');
            const timeSplit = timeString.split(':');
            timeString = timeSplit[0] + ':' + timeSplit[1];
            const newDateString = dateStringSplit[2] + '. ' + util.mapMonth(dateStringSplit[1]);
            return util.transliterate(newDateString + ' - ' + timeString, language);
        }
        return null;
    },
    mapMonth: (month) => {
        switch (parseInt(month)){
            case 1: return 'januar';
            case 2: return 'februar';
            case 3: return 'mart';
            case 4: return 'april';
            case 5: return 'maj';
            case 6: return 'jun';
            case 7: return 'jul';
            case 8: return 'avgust';
            case 9: return 'septembar';
            case 10: return 'oktobar';
            case 11: return 'novembar';
            case 12: return 'decembar';
        }
    },
    transliterate : (text, direction) => {
        if (text != null){
          const cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ж_З_И_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_а_б_в_г_д_ђ_е_ж_з_и_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_Њ_Џ_Љ'.split('_');
          const latin = 'A_B_V_G_D_Đ_E_Ž_Z_I_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_a_b_v_g_d_đ_e_ž_z_i_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_NJ_DŽ_LJ'.split('_');

          if (direction === 'cyrillic'){
            return fixTime(text.split('').map(function(char) {
                const index = latin.indexOf(char);
                if (!~index) {
                  return char;
                }
                return cyrillic[index];
              }).join('')
              .replace(/нј/g, 'њ')
              .replace(/лј/g, 'љ')
              .replace(/дж/g, 'џ')
              .replace(/НЈ/g, 'Њ')
              .replace(/ЛЈ/g, 'Љ')
              .replace(/ДЖ/g, 'Џ')
              .replace(/Нј/g, 'Њ')
              .replace(/Лј/g, 'Љ')
              .replace(/Дж/g, 'Џ')
              .replace(/Мудл/ig, 'Moodle')
              .replace(/Гугл/ig, 'Google')
              .replace(/Зум/ig, 'Zoom')
              .replace(/Моодле/ig, 'Moodle')
              .replace(/Гоогле/ig, 'Google')
              .replace(/Меет/ig, 'Meet')
              .replace(/Уплоад/g, 'Upload')
              .replace(/Онлине/g, 'Online')
              .replace(/уплоад/g, 'upload')
              .replace(/онлине/g, 'online'))
              .replace(/БББ/g, 'BBB')
              .replace(/БигБлуеБуттон/ig, 'BigBlueButton')
              .replace(/ ИВ /g, 'IV')
              .replace(/ИИИ/g, 'III')
              .replace(/ИИ/g, 'II')
              .replace(/ И+$/g, ' I')
              .replace(/маин/ig, 'main')
              .replace(/\.ц/ig, '.c')
              .replace(/\.јава/ig, '.java')
              .replace(/зип/ig, '.zip')
              .replace(/рар/ig, '.rar')
              .replace(/YАКИНДУ/ig, 'YAKINDU')
              .replace(/Статецхарт/ig, 'Statechart')
              .replace(/Тоолс/ig, 'Tools')
              .replace(/Профессионал/ig, 'Professional')
              .replace(/Едитион/ig, 'Edition')
              .replace(/<\/?табле>/ig, '')
              .replace(/<\/?тр>/ig, '')
              .replace(/<\/?тд>/ig, '')
              .replace(/<\/?тх>/ig, '')
              .replace(/<\/?п>/ig, '')
              .replace(/<\\н*\\н>/ig, '');
        }
        else{
            return text.split('')
            .map(function(char) {
              const index = cyrillic.indexOf(char);
              if (!~index) {
                return char;
              }
              return latin[index];
            }).join('')
            .replace(/<\/?table>/ig, '')
            .replace(/<\/?tr>/ig, '')
            .replace(/<\/?td>/ig, '')
            .replace(/<\/?th>/ig, '')
            .replace(/<\/?p>/ig, '');
        }

        }
        else { return null; }

    },
    getItemById : (array, id) => {

        for (const i in array){
          if (array[i].id == id) { return array[i]; }
        }
    },
    getDownloadLink : (id) => {
        if (id == null){
          id = 1;
        }
        return `https://efee.etf.unibl.org:8443/api/public/oglasi/${id}/download`;
      },
       copyToClipboard : (text, language) => {

        if (language == null) { language = 'cyrillic'; }
        text = util.transliterate(text, language);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();



        try {
            const successful = document.execCommand('copy');
            successful ? alert(util.transliterate('Tekst kopiran', language)) : alert(util.transliterate('Tekst nije kopiran', language));
        } catch (err) {
            alert(util.transliterate('Tekst nije kopiran', language));
        }

        document.body.removeChild(textArea);
        return;
    },

     copyLinkToClipboard : (link, language) => {

        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();



        try {
            const successful = document.execCommand('copy');
            successful ? alert(util.transliterate('Link kopiran', language)) : alert(util.transliterate('Link nije kopiran', language));
        } catch (err) {
            alert(util.transliterate('Link nije kopiran', language));
        }

        document.body.removeChild(textArea);
        return;
    },
    getZavrsniRadoviFilterString : (where, orderBy, fetchSize, fetchOffset) => {
      // encodes characters such as ?,=,/,&,:
      if (where == null) { where = [{operator: 'equal', field: 'trenutniStatus.statusZavrsnogRada.id', value: '2'}]; }
      if (orderBy == null) { orderBy = [{operator: 'desc', field: 'id'}]; }
      if (fetchSize == null) { fetchSize = 10; }
      if (fetchOffset == null) { fetchOffset = 0; }
      const query = {
        where,
        orderBy,
        fetchSize,
        fetchOffset
      };
      const queryEncoded = encodeURIComponent(encodeURIComponent(JSON.stringify(query)));
      return queryEncoded;
    }
};


export const adSample = {id: 2257,
naslov: 'Први колоквијум из предмета Основи рачунарске технике',
uvod: '',
sadrzaj: 'Први колоквијум (провјера знања) из предмета Основи рачунарске технике ће се одржати у четвртак 26.11.2020. године и петак 27.11.2020. године на Електротехничком факултету у сали 1110.\n\nПредавања из предмета Основи рачунарске технике неће бити одржана 26.11.2020. због одржавања колоквијума.\n\nСтуденти из групе К4 ће радити колоквијум од 8 часова и 15 минута до 9 часова и 15 минута, дана 26.11.2020. године.\nСтуденти из групе К3 ће радити колоквијум од 9 часова и 30 минута до 10 часова и 30 минута, дана 26.11.2020. године.\nСтуденти из групе К1 ће радити колоквијум од 9 часова и 15 минута до 10 часова и 15 минута, дана 27.11.2020. године.\nСтуденти из групе К2 ће радити колоквијум од 10 часова и 30 минута до 11 часова и 30 минута, дана 27.11.2020. године.\n\nКолоквијум се ради 60 минута.\n\nКолоквијум обухвата градиво рађено на аудиторним вјежбама и то:\n- Бројни системи\n- Представљање података\n- Комбинационе логичке мреже (минимизација и пројектовање)\n',
potpis: 'Са катедре за електронику',
vrijemeKreiranja: '2020-11-18T11:39:31.824121',
vrijemeIsteka: '2020-11-28T00:00:00',
oglasnaPloca: {
    id: 1, naziv: 'Прва година', opis:
    ' ',
    napomena: ' '
},
korisnickiNalog: null,
oglasPrilozi: [{id: 867, naziv: 'Prilog oglasa 2257', velicina: 101879, originalniNaziv: 'raspored_19_10.pdf', ekstenzija: 'pdf'}]
};


const fixTime = (text) => {
  for (let i = 0; i < text.length; i++){
    const code = text.charCodeAt(i);
    if (code > 47 && code < 58 && (text.charAt(i + 1) === 'х' || text.charAt(i + 1) === 'Х')){
      text = setCharAt(text, i + 1, 'h');
    }
  }
  return text;
};

function setCharAt(str, index, chr) {
    if (index > str.length - 1) { return str; }
    return str.substr(0, index) + chr + str.substr(index + 1);
}

const getCurrentYear = () => {
  return (
    new Date().getFullYear()
  );
};













// a function that served no purpose after a better way of parsing nonwanted html tags
const stripHtml = (html) =>
{
   /*var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";*/
   return html;
};


const replaceSpaces = (text) => {
  if (text == null) { return null; }
  else{
    let split = text.split('\n');
    if (!split || split.length <= 1) { split = text.split('\н'); }
    if (!split || split.length <= 1) { return text; }
    else { return split.map((item, index) => {
      return(
        '<p>{{item}}</p>'
      );
    });
    }
  }
};
