export interface Question {
  id: number;
  category: "regular-ar" | "regular-er-ir" | "irregular" | "usage" | "translation";
  questionText: string; // The Spanish sentence with a blank or prompt
  options: string[]; // Options to pick from
  correctIndex: number; // Index of correct option
  translationArm: string; // Armenian translation of the full correct sentence
  explanationArm: string; // Armenian explanation of why this conjugation is correct
  difficulty: "easy" | "medium" | "hard";
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    category: "irregular",
    questionText: "Cuando yo _________ (ser) niño, jugaba mucho en el patio.",
    options: ["fui", "era", "sea", "así"],
    correctIndex: 1,
    translationArm: "Երբ ես երեխա էի, շատ էի խաղում բակում։",
    explanationArm: "SER անկանոն բայի Yo (ես) դերանվան ձևն է (era) անցյալ նկարագրության համար։",
    difficulty: "easy"
  },
  {
    id: 2,
    category: "regular-ar",
    questionText: "Nosotros _________ (hablar) por teléfono todos los días.",
    options: ["hablamos", "hablabais", "hablábamos", "hablaban"],
    correctIndex: 2,
    translationArm: "Մենք ամեն օր խոսում էինք հեռախոսով։",
    explanationArm: "-AR խմբի բայերի համար Nosotros (մենք) վերջավորությունն է -ábamos: (Hablar -> hablábamos):",
    difficulty: "easy"
  },
  {
    id: 3,
    category: "regular-er-ir",
    questionText: "Antes, mi hermano y yo _________ (comer) muchas verduras.",
    options: ["comíamos", "comimos", "comían", "comíais"],
    correctIndex: 0,
    translationArm: "Նախկինում եղբայրս ու ես (մենք) շատ բանջարեղեն էինք ուտում։",
    explanationArm: "-ER խմբի բայերի համար Nosotros (մենք) վերջավորությունն է -íamos: (Comer -> comíamos):",
    difficulty: "easy"
  },
  {
    id: 4,
    category: "irregular",
    questionText: "Ellos _________ (ir) a la biblioteca cada tarde.",
    options: ["iban", "fueron", "irían", "ibas"],
    correctIndex: 0,
    translationArm: "Նրանք ամեն կեսօրից հետո գնում էին գրադարան։",
    explanationArm: "IR անկանոն բայի Ellos (նրանք) դերանվան ձևն է (iban) անցյալի կանոնավոր սովորության համար։",
    difficulty: "easy"
  },
  {
    id: 5,
    category: "regular-er-ir",
    questionText: "Mi abuelo _________ (vivir) en un pueblo muy tranquilo.",
    options: ["vivía", "vivió", "vivías", "vivido"],
    correctIndex: 0,
    translationArm: "Պապիկս ապրում էր մի շատ հանդարտ գյուղում։",
    explanationArm: "-IR խմբի բայերի համար Él/Ella (նա) դերանվան վերջավորությունն է -ía: (Vivir -> vivía):",
    difficulty: "easy"
  },
  {
    id: 6,
    category: "irregular",
    questionText: "De niña, tú siempre _________ (ver) los dibujos animados.",
    options: ["viste", "veías", "veía", "verías"],
    correctIndex: 1,
    translationArm: "Մանուկ հասակում դու միշտ մուլտֆիլմեր էիր դիտում։",
    explanationArm: "VER անկանոն բայի Tú (դու) դերանվան ձևն է (veías)։",
    difficulty: "easy"
  },
  {
    id: 7,
    category: "usage",
    questionText: "Yo _________ (tener) diez años cuando aprendí a montar en bicicleta.",
    options: ["tuve", "tenía", "tendré", "tuviera"],
    correctIndex: 1,
    translationArm: "Ես տասը տարեկան էի, երբ սովորեցի հեծանիվ քշել։",
    explanationArm: "Իսպաներենում անցյալում տարիքը կամ վիճակը նշելու համար միշտ օգտագործվում է Pretérito Imperfecto (tenía)։",
    difficulty: "medium"
  },
  {
    id: 8,
    category: "regular-ar",
    questionText: "¿Vosotros _________ (estudiar) español antes de viajar?",
    options: ["estudiaban", "estudiabais", "estudiábamos", "estudiaron"],
    correctIndex: 1,
    translationArm: "Դուք (ձեզնով) իսպաներե՞ն էիք սովորում նախքան ճանապարհորդելը։",
    explanationArm: "-AR խմբի բայերի համար Vosotros (դուք) դերանվան վերջավորությունն է -abais: (Estudiar -> estudiabais):",
    difficulty: "medium"
  },
  {
    id: 9,
    category: "regular-er-ir",
    questionText: "Mientras yo cocinaba, ellos _________ (escribir) cartas.",
    options: ["escribieron", "escribían", "escribió", "escribías"],
    correctIndex: 1,
    translationArm: "Մինչ ես ուտելիք էի պատրաստում, նրանք նամակներ էին գրում։",
    explanationArm: "Անցյալում երկու զուգահեռ ընթացող գործողությունները նկարագրելիս երկուսն էլ դրվում են Imperfecto-ով։ Ellos-ի համար` escribían:",
    difficulty: "medium"
  },
  {
    id: 10,
    category: "irregular",
    questionText: "Mis tíos siempre _________ (ser) muy amables con nosotros.",
    options: ["fueron", "serían", "eran", "éramos"],
    correctIndex: 2,
    translationArm: "Հորեղբայրներս/մորաքույրներս միշտ շատ բարի էին մեր հանդեպ։",
    explanationArm: "SER անկանոն բայի Ellos (նրանք) դերանվան ձևն է (eran):",
    difficulty: "medium"
  },
  {
    id: 11,
    category: "translation",
    questionText: "Ընտրիր «Նախկինում ես շատ էի կարդում» նախադասության ճիշտ թարգմանությունը.",
    options: [
      "Antes leí mucho.",
      "Antes leía mucho.",
      "Antes leeré mucho.",
      "Antes leyera mucho."
    ],
    correctIndex: 1,
    translationArm: "Antes leía mucho (Նախկինում ես շատ էի կարդում)։",
    explanationArm: "«Կարդում էի»-ն երկարատև անցյալ սովորություն է, ուստի օգտագործում ենք leer-ի Imperfecto ձևը Yo-ի համար` leía:",
    difficulty: "easy"
  },
  {
    id: 12,
    category: "regular-ar",
    questionText: "Tú siempre _________ (cantar) en la ducha, ¿verdad?",
    options: ["cantabas", "cantaste", "cantas", "cantaban"],
    correctIndex: 0,
    translationArm: "Դու միշտ երգում էիր ցնցուղի տակ, չէ՞:",
    explanationArm: "-AR խմբի բայերի համար Tú (դու) դերանվան վերջավորությունն է -abas: (Cantar -> cantabas):",
    difficulty: "easy"
  },
  {
    id: 13,
    category: "regular-er-ir",
    questionText: "¿Por qué usted _________ (beber) tanto café antes?",
    options: ["bebías", "bebía", "bebió", "bebían"],
    correctIndex: 1,
    translationArm: "Ինչո՞ւ էիք Դուք (հարգական) այդքան շատ սուրճ խմում նախկինում։",
    explanationArm: "Usted դերանվան դեպքում (խոնարհվում է 3-րդ դեմքով, ինչպես Él/Ella)` -ER խմբի վերջավորությունն է -ía: (Bebía):",
    difficulty: "medium"
  },
  {
    id: 14,
    category: "irregular",
    questionText: "Nosotros _________ (ir) a las montañas casi todos los veranos.",
    options: ["íbamos", "fuimos", "iríamos", "iban"],
    correctIndex: 0,
    translationArm: "Մենք գրեթե ամեն ամառ գնում էինք լեռներ։",
    explanationArm: "IR անկանոն բայի Nosotros (մենք) դերանվան ձևն է íbamos (կրում է գրավոր շեշտ):",
    difficulty: "medium"
  },
  {
    id: 15,
    category: "usage",
    questionText: "La casa _________ (ser) blanca y _________ (tener) una puerta verde.",
    options: [
      "fue / tuvo",
      "era / tenía",
      "es / tiene",
      "sería / tendría"
    ],
    correctIndex: 1,
    translationArm: "Տունը սպիտակ էր և ուներ կանաչ դուռ։",
    explanationArm: "Անցյալում առարկաների և տեսարանների արտաքին նկարագրության համար միշտ օգտագործվում է Pretérito Imperfecto (era / tenía)։",
    difficulty: "medium"
  },
  {
    id: 16,
    category: "regular-ar",
    questionText: "Mis padres _________ (trabajar) en una fábrica de zapatos.",
    options: ["trabajaban", "trabajaron", "trabajábamos", "trabajabas"],
    correctIndex: 0,
    translationArm: "Ծնողներս աշխատում էին կոշիկի գործարանում։",
    explanationArm: "Ellos (նրանք, mis padres) դերանվան համար -AR խմբի վերջավորությունն է -aban (trabajaban):",
    difficulty: "easy"
  },
  {
    id: 17,
    category: "regular-er-ir",
    questionText: "Vosotros _________ (querer) aprender español rápido.",
    options: ["querían", "queríais", "queríamos", "querías"],
    correctIndex: 1,
    translationArm: "Դուք (ձեզնով) ցանկանում էիք արագ սովորել իսպաներեն։",
    explanationArm: "-ER խմբի բայերի համար Vosotros (դուք) դերանվան վերջավորությունն է -íais (queríais):",
    difficulty: "medium"
  },
  {
    id: 18,
    category: "regular-er-ir",
    questionText: "Yo _________ (saber) que la respuesta era correcta.",
    options: ["supe", "sabía", "sabías", "sabrías"],
    correctIndex: 1,
    translationArm: "Ես գիտեի, որ պատասխանը ճիշտ էր։",
    explanationArm: "Անցյալում մտավոր վիճակ, գիտելիք կամ տիրապետում արտահայտելու համար օգտագործվում է Imperfecto: Saber -> sabía:",
    difficulty: "hard"
  },
  {
    id: 19,
    category: "regular-er-ir",
    questionText: "Ella siempre _________ (perder) sus llaves de casa.",
    options: ["perdía", "perdió", "perderías", "perdería"],
    correctIndex: 0,
    translationArm: "Նա միշտ կորցնում էր տան բանալիները։",
    explanationArm: "Պարբերաբար կրկնվող անցյալ սովորության համար Perder-ի Imperfecto ձևն է perdía (նա):",
    difficulty: "medium"
  },
  {
    id: 20,
    category: "translation",
    questionText: "Ընտրիր «Մենք գնում էինք դպրոց» նախադասության ճիշտ թարգմանությունը.",
    options: [
      "Íbamos a la escuela.",
      "Fuimos a la escuela.",
      "Iremos a la escuela.",
      "Íbais a la escuela."
    ],
    correctIndex: 0,
    translationArm: "Íbamos a la escuela (Մենք գնում էինք դպրոց)։",
    explanationArm: "IR անկանոն բայի Nosotros ձևն է íbamos (կրում է գրավոր շեշտ)՝ անցյալ շարունակական սովորության համար:",
    difficulty: "easy"
  },
  {
    id: 21,
    category: "usage",
    questionText: "Cuando _________ (hacer) buen tiempo, caminábamos por el parque.",
    options: ["hizo", "hacía", "haría", "hace"],
    correctIndex: 1,
    translationArm: "Երբ եղանակը լավ էր լինում, զբոսնում էինք այգով։",
    explanationArm: "Անցյալում եղանակային պայմանները նկարագրելիս օգտագործվում է Hacer բայի Imperfecto տարբերակը՝ hacía:",
    difficulty: "medium"
  },
  {
    id: 22,
    category: "irregular",
    questionText: "Cuando nosotros _________ (ser) jóvenes, nos gustaba el rock.",
    options: ["éramos", "fuimos", "eran", "éramis"],
    correctIndex: 0,
    translationArm: "Երբ մենք երիտասարդ էինք, սիրում էինք ռոք երաժշտություն։",
    explanationArm: "SER անկանոն բայի Nosotros (մենք) դերանվան ձևն է éramos (առաջին վանկի վրա շեշտով):",
    difficulty: "easy"
  },
  {
    id: 23,
    category: "regular-ar",
    questionText: "De pequeño, tú _________ (jugar) con ositos de peluche.",
    options: ["jugaste", "jugabas", "jugabais", "jugaban"],
    correctIndex: 1,
    translationArm: "Փոքր ժամանակ դու խաղում էիր փափուկ արջուկներով։",
    explanationArm: "-AR խմբի բայերի համար Tú (դու) դերանվան վերջավորությունն է -abas: (Jugar -> jugabas):",
    difficulty: "easy"
  },
  {
    id: 24,
    category: "regular-ar",
    questionText: "Las chicas siempre _________ (tomar) el sol en la playa.",
    options: ["tomaban", "tomaron", "tomábamos", "tomabais"],
    correctIndex: 0,
    translationArm: "Աղջիկները միշտ արևայրուք էին ընդունում լողափին։",
    explanationArm: "-AR խմբի բայերի համար Ellos/Ellas դերանվան վերջավորությունն է -aban (tomaban):",
    difficulty: "medium"
  },
  {
    id: 25,
    category: "regular-er-ir",
    questionText: "En invierno, yo siempre _________ (preferir) tomar té caliente.",
    options: ["preferí", "prefería", "preferirá", "prefiero"],
    correctIndex: 1,
    translationArm: "Ձմռանը ես միշտ գերադասում էի տաք թեյ խմել։",
    explanationArm: "-IR խմբի բայերի համար Yo (ես) դերանվան Imperfecto վերջավորությունը -ía է (prefería)։",
    difficulty: "medium"
  },
  {
    id: 26,
    category: "regular-er-ir",
    questionText: "Nosotros _________ (correr) felices por la orilla del mar.",
    options: ["corríamos", "corrimos", "corrían", "corríais"],
    correctIndex: 0,
    translationArm: "Մենք ուրախ վազում էինք ծովափի երկայնքով։",
    explanationArm: "-ER խմբի բայերի համար Nosotros (մենք) վերջավորությունն է -íamos` (correr -> corríamos)։",
    difficulty: "medium"
  },
  {
    id: 27,
    category: "regular-ar",
    questionText: "Mi madre siempre _________ (cocinar) pasteles deliciosos.",
    options: ["cocinó", "cocinara", "cocinaba", "cocinaban"],
    correctIndex: 2,
    translationArm: "Մայրս միշտ համեղ թխվածքաբլիթներ էր պատրաստում։",
    explanationArm: "-AR խմբի բայերի համար Ella (նա - mi madre) դերանվան վերջավորությունն է -aba (cocinaba)։",
    difficulty: "easy"
  },
  {
    id: 28,
    category: "regular-ar",
    questionText: "Antes, ustedes _________ (viajar) a Europa cada año.",
    options: ["viajaban", "viajaron", "viajábamos", "viajabais"],
    correctIndex: 0,
    translationArm: "Նախկինում դուք (հարգական / հոգնակի) ամեն տարի ճանապարհորդում էիք Եվրոպա։",
    explanationArm: "Ustedes (Դուք - հոգնակի) դերանվան դեպքում օգտագործվում է 3-րդ դեմքի հոգնակի վերջավորությունը՝ -aban։",
    difficulty: "medium"
  },
  {
    id: 29,
    category: "regular-er-ir",
    questionText: "Tú te _________ (sentir) muy feliz en esa escuela.",
    options: ["sentías", "sentiste", "sentía", "sentían"],
    correctIndex: 0,
    translationArm: "Դու քեզ շատ երջանիկ էիր զգում այդ դպրոցում։",
    explanationArm: "-IR խմբի անդրադարձ բայերի համար Tú-ի վերջավորությունն է -ías: (Sentirse -> te sentías)։",
    difficulty: "medium"
  },
  {
    id: 30,
    category: "regular-er-ir",
    questionText: "A veces yo _________ (oír) ruidos extraños en el ático.",
    options: ["oí", "oía", "oías", "oían"],
    correctIndex: 1,
    translationArm: "Երբեմն ես տարօրինակ աղմուկներ էի լսում ձեղնահարկում։",
    explanationArm: "Oír բայի Yo (ես) դերանվան Imperfecto ձևն է oía` երկարատև կամ կրկնվող գործողության համար։",
    difficulty: "hard"
  },
  {
    id: 31,
    category: "regular-ar",
    questionText: "Ellos _________ (bailar) salsa muy bien cuando eran jóvenes.",
    options: ["bailaban", "bailaron", "bailábamos", "bailabas"],
    correctIndex: 0,
    translationArm: "Նրանք շատ լավ սալսա էին պարում, երբ երիտասարդ էին։",
    explanationArm: "-AR խմբի բայերի համար Ellos (նրանք) դերանվան վերջավորությունն է -aban (bailaban)։",
    difficulty: "easy"
  },
  {
    id: 32,
    category: "regular-er-ir",
    questionText: "Nosotros _________ (entender) perfectamente las explicaciones del profesor.",
    options: ["entendíamos", "entendimos", "entendían", "entendías"],
    correctIndex: 0,
    translationArm: "Մենք կատարելապես հասկանում էինք ուսուցչի բացատրությունները։",
    explanationArm: "-ER խմբի բայերի համար Nosotros (մենք) դերանվան վերջավորությունն է -íamos: (Entender -> entendíamos)։",
    difficulty: "medium"
  },
  {
    id: 33,
    category: "regular-er-ir",
    questionText: "Vosotros siempre _________ (decir) la verdad.",
    options: ["decíais", "decías", "decían", "dijisteis"],
    correctIndex: 0,
    translationArm: "Դուք միշտ ասում էիք ճշմարտությունը։",
    explanationArm: "-IR խմբի Decir բայի Vosotros (դուք) դերանվան վերջավորությունն է -íais (decíais)։",
    difficulty: "hard"
  },
  {
    id: 34,
    category: "translation",
    questionText: "Ընտրիր «Մենք միշտ ավտոբուսով էինք գնում» նախադասության ճիշտ թարգմանությունը.",
    options: [
      "Siempre fuimos en autobús.",
      "Siempre íbamos en autobús.",
      "Siempre iremos en autobús.",
      "Siempre íbais en autobús."
    ],
    correctIndex: 1,
    translationArm: "Siempre íbamos en autobús (Մենք միշտ ավտոբուսով էինք գնում)։",
    explanationArm: "«Մենք գնում էինք»-ը անցյալի կրկնվող սովորություն է՝ արտահայտված IR բայի Imperfecto-ով (íbamos)։",
    difficulty: "easy"
  },
  {
    id: 35,
    category: "regular-er-ir",
    questionText: "Él _________ (dormir) la siesta cada tarde de verano.",
    options: ["durmió", "dormía", "duerme", "dormías"],
    correctIndex: 1,
    translationArm: "Նա քնում էր կեսօրին ամառվա ամեն օր։",
    explanationArm: "-IR խմբի Dormir բայի Él (նա) դերանվան Imperfecto ձևն է dormía: (Imperfecto-ում ձայնավորի փոփոխություն չի լինում)։",
    difficulty: "hard"
  },
  {
    id: 36,
    category: "regular-ar",
    questionText: "Tú _________ (pensar) en tu futuro profesional constantemente.",
    options: ["pensaste", "pensas", "pensabas", "pensaban"],
    correctIndex: 2,
    translationArm: "Դու անդադար մտածում էիր քո մասնագիտական ապագայի մասին։",
    explanationArm: "-AR խմբի Pensar բայի Tú (դու) դերանվան վերջավորությունն է -abas (pensabas)։",
    difficulty: "medium"
  },
  {
    id: 37,
    category: "regular-ar",
    questionText: "Nosotros _________ (dar) un paseo por la plaza cada tarde.",
    options: ["dábamos", "dimos", "daban", "dabas"],
    correctIndex: 0,
    translationArm: "Մենք ամեն կեսօրից հետո զբոսնում էինք հրապարակով։",
    explanationArm: "Dar բայը -AR խմբից է, Nosotros (մենք) դերանվան համար վերջավորությունն է -ábamos: (Dar -> dábamos)։",
    difficulty: "medium"
  },
  {
    id: 38,
    category: "regular-ar",
    questionText: "Yo _________ (buscar) mis llaves por toda la casa.",
    options: ["busqué", "buscaba", "buscabas", "buscaban"],
    correctIndex: 1,
    translationArm: "Ես փնտրում էի իմ բանալիներն ամբողջ տնով մեկ։",
    explanationArm: "-AR խմբի Buscar բայի Yo (ես) դերանվան համար վերջավորությունն է -aba (buscaba)։",
    difficulty: "medium"
  },
  {
    id: 39,
    category: "translation",
    questionText: "Ընտրիր «Երբ ցուրտ էր, մենք շոկոլադ էինք խմում» նախադասության ճիշտ թարգմանությունը.",
    options: [
      "Cuando hizo frío, bebimos chocolate.",
      "Cuando hacía frío, bebíamos chocolate.",
      "Cuando hará frío, beberemos chocolate.",
      "Cuando hace frío, bebemos chocolate."
    ],
    correctIndex: 1,
    translationArm: "Cuando hacía frío, bebíamos chocolate.",
    explanationArm: "Երկու անցյալ իրավիճակներ/նկարագրություններ են, ուստի երկու մասում էլ օգտագործում ենք Imperfecto (hacía / bebíamos)։",
    difficulty: "hard"
  },
  {
    id: 40,
    category: "regular-er-ir",
    questionText: "Ellos siempre _________ (preferir) viajar en tren.",
    options: ["prefieren", "preferían", "preferieron", "preferirían"],
    correctIndex: 1,
    translationArm: "Նրանք միշտ գերադասում էին ճանապարհորդել գնացքով։",
    explanationArm: "-IR խմբի Preferir բայի Ellos (նրանք) դերանվան Imperfecto ձևն է preferían (ձայնավորի հերթագայություն չի կատարվում)։",
    difficulty: "medium"
  }
];
