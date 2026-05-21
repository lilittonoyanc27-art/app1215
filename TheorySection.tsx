import React, { useState } from "react";
import { theoryData } from "../theory";
import { BookOpen, Star, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export const TheorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"intro" | "regular" | "irregular" | "signals">("intro");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto">
      {/* Banner Area */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 opacity-10 pointer-events-none">
          <BookOpen size={240} />
        </div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <BookOpen className="text-yellow-400 w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight font-sans">
              {theoryData.title}
            </h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1 max-w-2xl font-light">
              Իդեալական ուղեցույց՝ հայերեն բացատրություններով և օրինակներով
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50 p-2 gap-1">
        <button
          onClick={() => setActiveTab("intro")}
          className={`flex-1 min-w-[120px] text-center py-2.5 px-3 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === "intro"
              ? "bg-white text-indigo-900 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-indigo-900 hover:bg-slate-100"
          }`}
        >
          <HelpCircle size={16} /> Ի՞նչ է սա
        </button>
        <button
          onClick={() => setActiveTab("regular")}
          className={`flex-1 min-w-[120px] text-center py-2.5 px-3 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === "regular"
              ? "bg-white text-indigo-900 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-indigo-900 hover:bg-slate-100"
          }`}
        >
          <Sparkles size={16} /> Կանոնավոր բայեր
        </button>
        <button
          onClick={() => setActiveTab("irregular")}
          className={`flex-1 min-w-[120px] text-center py-2.5 px-3 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === "irregular"
              ? "bg-white text-indigo-900 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-indigo-900 hover:bg-slate-100"
          }`}
        >
          <Star size={16} /> Անկանոն բայեր
        </button>
        <button
          onClick={() => setActiveTab("signals")}
          className={`flex-1 min-w-[120px] text-center py-2.5 px-3 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeTab === "signals"
              ? "bg-white text-indigo-900 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-indigo-900 hover:bg-slate-100"
          }`}
        >
          <CheckCircle2 size={16} /> Ժամանականիշեր
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="p-6 md:p-8 min-h-[350px]">
        {activeTab === "intro" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-5 rounded-2xl border border-blue-100/50">
              <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-2 font-sans">
                <Sparkles className="text-yellow-500" /> Ներածություն
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                {theoryData.introduction}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide">
                Կիրառության դեպքերն ու օրինակները.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {theoryData.usages.map((u, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-2">
                        {u.title.split('.')[0]}. {u.title.split('.').slice(1).join('.').trim()}
                      </h4>
                      <p className="text-slate-500 text-xs italic mb-4">
                        {u.title.split('.')[0] === "1" ? "Սովորություններ" : u.title.split('.')[0] === "2" ? "Նկարագրություն" : "Զուգահեռ գործողություն"}
                      </p>
                    </div>
                    <div className="bg-indigo-50/80 p-3 rounded-lg border border-indigo-100">
                      <p className="text-indigo-950 font-mono text-xs font-semibold">
                        {u.spanish}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-1 leading-normal">
                        {u.armenian}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "regular" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* -AR verbs */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center space-x-2 border-b-2 border-blue-100 pb-2">
                <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-md font-mono text-xs font-bold uppercase">
                  -ar
                </span>
                <h3 className="text-base font-bold text-slate-800">
                  {theoryData.regularVerbs.AR.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {theoryData.regularVerbs.AR.endings.map((end, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-blue-50/35 border border-blue-100/70 rounded-xl flex flex-col justify-between"
                  >
                    <span className="text-xs font-medium text-slate-500">{end.pronoun}</span>
                    <span className="font-mono text-base font-extrabold text-blue-600 mt-1">
                      {end.ending}
                    </span>
                    <span className="text-[11px] text-slate-600 mt-1 bg-white/80 px-1.5 py-0.5 rounded font-mono border border-slate-100">
                      {end.example}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* -ER & -IR verbs */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center space-x-2 border-b-2 border-amber-100 pb-2">
                <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded-md font-mono text-xs font-bold uppercase">
                  -er / -ir
                </span>
                <h3 className="text-base font-bold text-slate-800">
                  {theoryData.regularVerbs.ER_IR.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {theoryData.regularVerbs.ER_IR.endings.map((end, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-amber-50/40 border border-amber-100/50 rounded-xl flex flex-col justify-between"
                  >
                    <span className="text-xs font-medium text-slate-500">{end.pronoun}</span>
                    <span className="font-mono text-base font-extrabold text-amber-600 mt-1">
                      {end.ending}
                    </span>
                    <span className="text-[11px] text-slate-600 mt-1 bg-white/80 px-1.5 py-0.5 rounded font-mono border border-slate-100">
                      {end.example}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "irregular" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-rose-100 pb-2">
              <h3 className="text-lg font-bold text-slate-800">
                {theoryData.irregularVerbs.title}
              </h3>
              <span className="bg-rose-100 text-rose-700 font-semibold px-3 py-1 rounded-full text-xs">
                Ինչպիսի՛ հեշտություն. Միայն 3 անկանոն բայ!
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {theoryData.irregularVerbs.verbs.map((v, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden"
                >
                  <div className="bg-slate-900 text-white px-4 py-2.5 flex justify-between items-center font-mono">
                    <span className="font-extrabold text-white text-sm tracking-wide">{v.name}</span>
                    <span className="text-[11px] text-slate-400 font-sans italic">սովորական</span>
                  </div>

                  <div className="p-3 bg-slate-50/50 text-[11px] text-slate-500 text-center border-b border-slate-100 font-sans">
                    {v.translation}
                  </div>

                  <div className="p-4 space-y-2 font-mono text-xs">
                    {v.forms.map((f, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                        <span className="text-slate-400 font-semibold">{f.pronoun}</span>
                        <span className="font-bold text-slate-900 bg-indigo-50/50 px-2 py-0.5 rounded text-right min-w-[65px]">
                          {f.form}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "signals" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            <motion.div variants={itemVariants} className="border-b border-teal-100 pb-2">
              <h3 className="text-lg font-bold text-slate-800">
                Ժամանակային ցուցիչներ (Signal Words)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Այս բառերը տեսնելիս անմիջապես կհասկանաք, որ պետք է օգտագործել Pretérito Imperfecto
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {theoryData.signalWords.map((sig, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex justify-between items-center p-3 bg-teal-50/20 hover:bg-teal-50/40 rounded-xl border border-teal-100/50 transition-all font-sans"
                >
                  <span className="font-mono font-bold text-indigo-950 text-sm">{sig.word}</span>
                  <span className="text-xs text-slate-600 bg-white shadow-sm border border-slate-100 px-3 py-1 rounded-lg">
                    {sig.translation}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
