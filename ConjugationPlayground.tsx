import React, { useState } from "react";
import { Sparkles, HelpCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ConjugatorForm {
  pronoun: string;
  form: string;
  transArm: string;
}

const PRESET_VERBS = [
  { Spanish: "cantar", arm: "երգել", type: "ar" },
  { Spanish: "hablar", arm: "խոսել", type: "ar" },
  { Spanish: "estudiar", arm: "սովորել", type: "ar" },
  { Spanish: "comer", arm: "ուտել", type: "er" },
  { Spanish: "escribir", arm: "գրել", type: "ir" },
  { Spanish: "vivir", arm: "ապրել", type: "ir" },
  { Spanish: "ser", arm: "լինել (անկանոն)", type: "irregular" },
  { Spanish: "ir", arm: "գնալ (անկանոն)", type: "irregular" },
  { Spanish: "ver", arm: "տեսնել (անկանոն)", type: "irregular" },
];

export const ConjugationPlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState("cantar");
  const [customVerb, setCustomVerb] = useState("");
  const [errorText, setErrorText] = useState("");

  const handlePresetSelect = (verb: string) => {
    setSelectedPreset(verb);
    setCustomVerb("");
    setErrorText("");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customVerb.toLowerCase().trim();
    if (!cleaned) return;

    if (cleaned.length < 3) {
      setErrorText("Բայը պետք է ունենա առնվազն 3 տառ (օրինակ՝ amar)։");
      return;
    }

    if (cleaned === "ser" || cleaned === "ir" || cleaned === "ver") {
      setSelectedPreset(cleaned);
      setCustomVerb("");
      setErrorText("");
      return;
    }

    if (cleaned.endsWith("ar") || cleaned.endsWith("er") || cleaned.endsWith("ir")) {
      setSelectedPreset(cleaned);
      setErrorText("");
    } else {
      setErrorText("Բայը պետք է ավարտվի -ar, -er կամ -ir վերջավորությամբ։");
    }
  };

  // Logic to process the conjugation dynamically
  const getConjugation = (rawVerb: string): ConjugatorForm[] => {
    const verb = rawVerb.toLowerCase().trim();

    // 1. Handle Irregular presets
    if (verb === "ser") {
      return [
        { pronoun: "Yo (Ես)", form: "era", transArm: "էի" },
        { pronoun: "Tú (Դու)", form: "eras", transArm: "էիր" },
        { pronoun: "Él / Ella / Usted (Նա / Դուք)", form: "era", transArm: "էր / էիք" },
        { pronoun: "Nosotros / -as (Մենք)", form: "éramos", transArm: "էինք" },
        { pronoun: "Vosotros / -as (Դուք)", form: "erais", transArm: "էիք" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք)", form: "eran", transArm: "էին" },
      ];
    }
    if (verb === "ir") {
      return [
        { pronoun: "Yo (Ես)", form: "iba", transArm: "գնում էի" },
        { pronoun: "Tú (Դու)", form: "ibas", transArm: "գնում էիր" },
        { pronoun: "Él / Ella / Usted (Նա / Դուք)", form: "iba", transArm: "գնում էր" },
        { pronoun: "Nosotros / -as (Մենք)", form: "íbamos", transArm: "գնում էինք" },
        { pronoun: "Vosotros / -as (Դուք)", form: "ibais", transArm: "գնում էիք" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք)", form: "iban", transArm: "գնում էին" },
      ];
    }
    if (verb === "ver") {
      return [
        { pronoun: "Yo (Ես)", form: "veía", transArm: "տեսնում էի" },
        { pronoun: "Tú (Դու)", form: "veías", transArm: "տեսնում էիր" },
        { pronoun: "Él / Ella / Usted (Նա / Դուք)", form: "veía", transArm: "տեսնում էր" },
        { pronoun: "Nosotros / -as (Մենք)", form: "veíamos", transArm: "տեսնում էինք" },
        { pronoun: "Vosotros / -as (Դուք)", form: "veíais", transArm: "տեսնում էիք" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք)", form: "veían", transArm: "տեսնում էին" },
      ];
    }

    // 2. Regular verbs (ar, er, ir)
    const stem = verb.substring(0, verb.length - 2);
    const suffix = verb.substring(verb.length - 2);

    if (suffix === "ar") {
      return [
        { pronoun: "Yo (Ես)", form: `${stem}aba`, transArm: `կատարում էի (${rawVerb})` },
        { pronoun: "Tú (Դու)", form: `${stem}abas`, transArm: "կատարում էիր" },
        { pronoun: "Él / Ella / Usted (Նա)", form: `${stem}aba`, transArm: "կատարում էր" },
        { pronoun: "Nosotros / -as (Մենք)", form: `${stem}ábamos`, transArm: "կատարում էինք" },
        { pronoun: "Vosotros / -as (Դուք)", form: `${stem}abais`, transArm: "կատարում էիք" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք)", form: `${stem}aban`, transArm: "կատարում էին" },
      ];
    } else {
      // er or ir
      return [
        { pronoun: "Yo (Ես)", form: `${stem}ía`, transArm: `կատարում էի (${rawVerb})` },
        { pronoun: "Tú (Դու)", form: `${stem}ías`, transArm: "կատարում էիր" },
        { pronoun: "Él / Ella / Usted (Նա)", form: `${stem}ía`, transArm: "կատարում էր" },
        { pronoun: "Nosotros / -as (Մենք)", form: `${stem}íamos`, transArm: "կատարում էինք" },
        { pronoun: "Vosotros / -as (Դուք)", form: `${stem}íais`, transArm: "կատարում էիք" },
        { pronoun: "Ellos / Ellas / Ustedes (Նրանք)", form: `${stem}ían`, transArm: "կատարում էին" },
      ];
    }
  };

  const forms = getConjugation(selectedPreset);
  const matchedPreset = PRESET_VERBS.find(v => v.Spanish === selectedPreset);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-amber-500" /> Խաղային Խոնարհիչ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Ընտրիր պատրաստի բայերից կամ ձևավորիր քո սեփականը՝ անմիջապես տեսնելու համար conjugation-ը
          </p>
        </div>

        {/* Custom Verb Form */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <input
              type="text"
              placeholder="Մուտքագրիր բայ (օր.՝ cantar)"
              value={customVerb}
              onChange={(e) => setCustomVerb(e.target.value)}
              className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errorText && (
              <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-sans truncate pr-2">
                {errorText}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow transition"
          >
            Խոնարհել
          </button>
        </form>
      </div>

      {/* Preset Verbs Selector */}
      <div className="flex flex-wrap gap-2">
        {PRESET_VERBS.map((v, i) => (
          <button
            key={i}
            onClick={() => handlePresetSelect(v.Spanish)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              selectedPreset === v.Spanish
                ? "bg-slate-900 text-white shadow-sm border border-slate-900"
                : "bg-slate-50 text-slate-700 hover:bg-slate-150 border border-slate-200"
            }`}
          >
            <span className="font-mono font-bold mr-1">{v.Spanish}</span>
            <span className="text-[10px] text-slate-400 font-sans">({v.arm})</span>
          </button>
        ))}
      </div>

      {/* Displays Outcomes in visually luxurious cards */}
      <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-150 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left column: Verb Card showcase */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold text-indigo-700 font-mono tracking-wider uppercase">
              {matchedPreset ? `${matchedPreset.type.toUpperCase()} բայախումբ` : "Սեփական բայ"}
            </span>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-900 capitalize font-mono tracking-tight">
              {selectedPreset}
            </h2>
            <p className="text-slate-500 text-sm font-sans mt-0.5">
              {matchedPreset ? `Նշանակում է՝ ${matchedPreset.arm}` : "Համապատասխանում է իսպաներենի կանոններին"}
            </p>
          </div>

          <p className="text-xs text-slate-500 max-w-md leading-relaxed">
            Իսպաներենի Pretérito Imperfecto-ն ունի խիստ կայուն վերջավորություններ։ Ուշադրություն դարձրեք, որ
            <span className="font-semibold text-indigo-900 font-mono"> Nosotros </span>դերանունը միշտ կրում է գրավոր շեշտ (á կամ ի)։
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedPreset("cantar");
                setCustomVerb("");
                setErrorText("");
              }}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center justify-center md:justify-start gap-1 justify-items-center"
            >
              <RefreshCw size={14} /> Սկսել սկզբից
            </button>
          </div>
        </div>

        {/* Right column: Conjugations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100 font-mono text-xs">
          {forms.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-3 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
            >
              <span className="font-semibold font-sans text-slate-500">{item.pronoun}</span>
              <div className="text-right">
                <span className="font-extrabold text-slate-900 bg-indigo-50/60 transition-colors hover:bg-indigo-100 border border-indigo-100/50 px-3 py-1 rounded-lg">
                  {item.form}
                </span>
                <span className="block text-[10px] text-slate-400 mt-1 font-sans">
                  {matchedPreset ? `${item.form} (${item.transArm})` : item.form}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
