export interface ConjugationTable {
  pronoun: string;
  ending: string;
  example: string;
}

export interface VerbTheory {
  type: string;
  endings: ConjugationTable[];
  descriptionArm: string;
}

export const theoryData = {
  title: "Pretérito Imperfecto (Իսպաներենի Անկատար Անցյալ Ժամանակաձև)",
  introduction: "Pretérito Imperfecto-ն օգտագործվում է անցյալում կատարված երկարատև, պարբերաբար կրկնվող գործողությունները, սովորությունները, իրավիճակները կամ մարդկանց/առարկաները նկարագրելու համար, երբ գործողության սկիզբն ու ավարտը հստակ նշված չեն։",
  
  usages: [
    {
      title: "1. Պարբերաբար կրկնվող գործողություններ (Սովորություններ անցյալում)",
      example: "Siempre cantábamos juntos. (Մենք միշտ միասին երգում էինք։)",
      spanish: "Siempre cantábamos juntos.",
      armenian: "Մենք միշտ միասին երգում էինք։"
    },
    {
      title: "2. Նկարագրություններ անցյալում (Եղանակ, տարիք, արտաքին, զգացմունքներ)",
      example: "Hacía frío y yo tenía 10 años. (Ցուրտ էր, և ես 10 տարեկան էի։)",
      spanish: "Hacía frío y yo tenía 10 años.",
      armenian: "Ցուրտ էր, և ես 10 տարեկան էի։"
    },
    {
      title: "3. Զուգահեռ կատարվող գործողություններ անցյալում",
      example: "Mientras yo leía, él cantaba. (Մինչ ես կարդում էի, նա երգում էր։)",
      spanish: "Mientras yo leía, él cantaba.",
      armenian: "Մինչ ես կարդում էի, նա երգում էր։"
    }
  ],

  regularVerbs: {
    AR: {
      title: "-AR խմբի բայեր (Օրինակ՝ Cantar - Երգել)",
      endings: [
        { pronoun: "Yo (Ես)", ending: "-aba", example: "cantaba (երգում էի)" },
        { pronoun: "Tú (Դու)", ending: "-abas", example: "cantabas (երգում էիր)" },
        { pronoun: "Él / Ella / Usted (Նա / Դուք հարգ.)", ending: "-aba", example: "cantaba (երգում էր)" },
        { pronoun: "Nosotros / -as (Մենք)", ending: "-ábamos", example: "cantábamos (երգում էինք)" },
        { pronoun: "Vosotros / -as (Դուք)", ending: "-abais", example: "cantabais (երգում էիք)" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք / Դուք հարգ.)", ending: "-aban", example: "cantaban (երգում էին)" }
      ]
    },
    ER_IR: {
      title: "-ER և -IR խմբի բայեր (Օրինակ՝ Comer - Ուտել, Vivir - Ապրել)",
      endings: [
        { pronoun: "Yo (Ես)", ending: "-ía", example: "comía / vivía (ուտում / ապրում էի)" },
        { pronoun: "Tú (Դու)", ending: "-ías", example: "comías / vivías" },
        { pronoun: "Él / Ella / Usted (Նա / Դուք հարգ.)", ending: "-ía", example: "comía / vivía" },
        { pronoun: "Nosotros / -as (Մենք)", ending: "-íamos", example: "comíamos / vivíamos" },
        { pronoun: "Vosotros / -as (Դուք)", ending: "-íais", example: "comíais / vivíais" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք / Դուք հարգ.)", ending: "-ían", example: "comían / vivían" }
      ]
    }
  },

  irregularVerbs: {
    title: "Անկանոն Բայեր (Միայն 3-ն են!)",
    verbs: [
      {
        name: "SER (լինել)",
        forms: [
          { pronoun: "Yo", form: "era" },
          { pronoun: "Tú", form: "eras" },
          { pronoun: "Él/Ella", form: "era" },
          { pronoun: "Nosotros", form: "éramos" },
          { pronoun: "Vosotros", form: "erais" },
          { pronoun: "Ellos/Ellas", form: "eran" }
        ],
        translation: "էի, էիր, էր, էինք, էիք, էին"
      },
      {
        name: "IR (գնալ)",
        forms: [
          { pronoun: "Yo", form: "iba" },
          { pronoun: "Tú", form: "ibas" },
          { pronoun: "Él/Ella", form: "iba" },
          { pronoun: "Nosotros", form: "íbamos" },
          { pronoun: "Vosotros", form: "ibais" },
          { pronoun: "Ellos/Ellas", form: "iban" }
        ],
        translation: "գնում էի, գնում էիր..."
      },
      {
        name: "VER (տեսնել)",
        forms: [
          { pronoun: "Yo", form: "veía" },
          { pronoun: "Tú", form: "veías" },
          { pronoun: "Él/Ella", form: "veía" },
          { pronoun: "Nosotros", form: "veíamos" },
          { pronoun: "Vosotros", form: "veíais" },
          { pronoun: "Ellos/Ellas", form: "veían" }
        ],
        translation: "տեսնում էի, տեսնում էիր..."
      }
    ]
  },

  signalWords: [
    { word: "Antes", translation: "Առաջ / Նախկինում" },
    { word: "Siempre", translation: "Միշտ" },
    { word: "Todos los días", translation: "Ամեն օր" },
    { word: "A menudo", translation: "Հաճախ" },
    { word: "Muchas veces", translation: "Շատ անգամներ" },
    { word: "Mientras", translation: "Մինչդեռ / Մինչ" },
    { word: "Cada año / mes", translation: "Ամեն տարի / ամիս" },
    { word: "De pequeño / pequeña", translation: "Մանկության տարիներին (փոքր ժամանակ)" }
  ]
};
