import React, { useState, useEffect } from "react";
import { 
  Trophy, 
  Play, 
  Users, 
  User, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  X, 
  Award, 
  HelpCircle, 
  Volume2, 
  BookOpen,
  ArrowRight,
  Flame,
  BrainCircuit,
  Settings,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { quizQuestions, Question } from "./questions";
import { Avatar } from "./Avatar";
import { TheorySection } from "./TheorySection";
import { ConjugationPlayground } from "./ConjugationPlayground";

type GameMode = "single" | "multi";
type Difficulty = "easy" | "medium" | "hard";

interface PlayerState {
  name: string;
  avatar: "gor" | "gayane";
  score: number;
  steps: number; // For the racetrack visualization (0-10)
  answersCorrect: number;
  answersTotal: number;
}

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"game" | "theory" | "playground">("game");

  // Game configuration states
  const [gameState, setGameState] = useState<"lobby" | "playing" | "gameover">("lobby");
  const [gameMode, setGameMode] = useState<GameMode>("multi");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("medium");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [totalRounds, setTotalRounds] = useState<number>(10);
  const [userChampion, setUserChampion] = useState<"gor" | "gayane">("gor");

  // Live Gameplay states
  const [questionsPool, setQuestionsPool] = useState<Question[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [turn, setTurn] = useState<"gor" | "gayane">("gor");
  const [gorState, setGorState] = useState<PlayerState>({
    name: "Գոռ",
    avatar: "gor",
    score: 0,
    steps: 0,
    answersCorrect: 0,
    answersTotal: 0,
  });
  const [gayaneState, setGayaneState] = useState<PlayerState>({
    name: "Գայանե",
    avatar: "gayane",
    score: 0,
    steps: 0,
    answersCorrect: 0,
    answersTotal: 0,
  });

  // Turn detail tracking
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [botActionMessage, setBotActionMessage] = useState<string>("");
  const [gameLogs, setGameLogs] = useState<{ player: string; correct: boolean; desc: string }[]>([]);

  // Sound effects / Audio alerts
  const [scoreAlert, setScoreAlert] = useState<{ show: boolean; text: string; success: boolean } | null>(null);

  // Initialize a new game tournament
  const startNewGame = () => {
    // 1. Filter questions based on selected category, block repeats and gracefully pad up to requested quantity
    let filtered = [...quizQuestions];
    if (selectedCategory !== "all") {
      const categoryQuestions = quizQuestions.filter(q => q.category === selectedCategory);
      const otherQuestions = quizQuestions.filter(q => q.category !== selectedCategory);
      
      const shuffledCat = categoryQuestions.sort(() => 0.5 - Math.random());
      const shuffledOther = otherQuestions.sort(() => 0.5 - Math.random());
      
      filtered = [...shuffledCat, ...shuffledOther];
    } else {
      filtered = filtered.sort(() => 0.5 - Math.random());
    }

    // 2. Shuffle questions and pick N * 2 questions so every player/computer turn has a unique question
    const neededQuestions = totalRounds * 2;
    const selectedQuestions = filtered.slice(0, Math.min(neededQuestions, filtered.length));

    // Reset players states
    setGorState({
      name: "Գոռ",
      avatar: "gor",
      score: 0,
      steps: 0,
      answersCorrect: 0,
      answersTotal: 0,
    });
    setGayaneState({
      name: "Գայանե",
      avatar: "gayane",
      score: 0,
      steps: 0,
      answersCorrect: 0,
      answersTotal: 0,
    });

    setQuestionsPool(selectedQuestions);
    setCurrentRoundIndex(0);
    setGameState("playing");
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setBotActionMessage("");
    setIsBotThinking(false);
    setGameLogs([]);

    // Determine initial turn
    if (gameMode === "single") {
      // In single-player, champion user always stars first
      setTurn(userChampion);
    } else {
      // 2-player mode: random turn starting
      setTurn(Math.random() > 0.5 ? "gor" : "gayane");
    }
  };

  // Run computer bot turn
  const runBotTurn = (currentQuestion: Question) => {
    setIsBotThinking(true);
    setBotActionMessage("Համակարգիչը մտածում է պատասխանի շուրջ...");

    setTimeout(() => {
      // Get correct indexes and failure patterns
      const correctIdx = currentQuestion.correctIndex;
      let botChoseCorrect = false;

      // Determine correct chance dynamically based on difficulty
      const rollout = Math.random() * 100;
      const successChance = selectedDifficulty === "easy" ? 45 : selectedDifficulty === "medium" ? 70 : 88;

      if (rollout < successChance) {
        botChoseCorrect = true;
      }

      // Compute chosen index
      let finalIndexChose = correctIdx;
      if (!botChoseCorrect) {
        // Choose any random wrong index
        const wrongIndexes = [0, 1, 2, 3].filter(i => i !== correctIdx);
        finalIndexChose = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
      }

      const isGorBot = userChampion === "gayane";
      const botName = isGorBot ? "Գոռը" : "Գայանեն";
      const maxSteps = Math.max(1, Math.floor(questionsPool.length / 2));

      if (botChoseCorrect) {
        // Correct answer update
        if (isGorBot) {
          setGorState(prev => ({
            ...prev,
            score: prev.score + 10,
            steps: Math.min(prev.steps + 1, maxSteps),
            answersCorrect: prev.answersCorrect + 1,
            answersTotal: prev.answersTotal + 1,
          }));
        } else {
          setGayaneState(prev => ({
            ...prev,
            score: prev.score + 10,
            steps: Math.min(prev.steps + 1, maxSteps),
            answersCorrect: prev.answersCorrect + 1,
            answersTotal: prev.answersTotal + 1,
          }));
        }
        setBotActionMessage(`${botName} ընտրեց ճիշտ տարբերակը՝ "${currentQuestion.options[correctIdx]}" և ստացավ 10 միավոր։`);
        triggerScoreAlert(`${botName} ՃԻՇՏ Է!`, true);
        addLog(botName, true, currentQuestion.questionText);
      } else {
        // Incorrect answer update
         if (isGorBot) {
          setGorState(prev => ({
            ...prev,
            answersTotal: prev.answersTotal + 1,
          }));
        } else {
          setGayaneState(prev => ({
            ...prev,
            answersTotal: prev.answersTotal + 1,
          }));
        }
        setBotActionMessage(`${botName} սխալվեց՝ ընտրելով "${currentQuestion.options[finalIndexChose]}": Ճիշտ պատասխանն էր՝ "${currentQuestion.options[correctIdx]}":`);
        triggerScoreAlert(`${botName} ՍԽԱԼՎԵՑ`, false);
        addLog(botName, false, currentQuestion.questionText);
      }

      setIsBotThinking(false);
      setIsAnswerSubmitted(true);
      setSelectedOption(finalIndexChose);
    }, 1800);
  };

  const addLog = (player: string, correct: boolean, desc: string) => {
    setGameLogs(prev => [{ player, correct, desc: desc.replace(/_________/g, "[...]") }, ...prev]);
  };

  const triggerScoreAlert = (text: string, success: boolean) => {
    setScoreAlert({ show: true, text, success });
    setTimeout(() => {
      setScoreAlert(null);
    }, 2000);
  };

  // Submit answer for active player
  const submitAnswer = (idx: number) => {
    if (isAnswerSubmitted || isBotThinking) return;

    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const currentQuestion = questionsPool[currentRoundIndex];
    const isCorrect = idx === currentQuestion.correctIndex;
    const activeName = turn === "gor" ? "Գոռը" : "Գայանեն";
    const maxSteps = Math.max(1, Math.floor(questionsPool.length / 2));

    if (isCorrect) {
      if (turn === "gor") {
        setGorState(prev => ({
          ...prev,
          score: prev.score + 10,
          steps: Math.min(prev.steps + 1, maxSteps),
          answersCorrect: prev.answersCorrect + 1,
          answersTotal: prev.answersTotal + 1,
        }));
      } else {
        setGayaneState(prev => ({
          ...prev,
          score: prev.score + 10,
          steps: Math.min(prev.steps + 1, maxSteps),
          answersCorrect: prev.answersCorrect + 1,
          answersTotal: prev.answersTotal + 1,
        }));
      }
      triggerScoreAlert("ՃԻՇՏ ՊԱՏԱՍԽԱՆ! +10", true);
      addLog(activeName, true, currentQuestion.questionText);
    } else {
      if (turn === "gor") {
        setGorState(prev => ({
          ...prev,
          answersTotal: prev.answersTotal + 1,
        }));
      } else {
        setGayaneState(prev => ({
          ...prev,
          answersTotal: prev.answersTotal + 1,
        }));
      }
      triggerScoreAlert("ՍԽԱԼ ՊԱՏԱՍԽԱՆ!", false);
      addLog(activeName, false, currentQuestion.questionText);
    }
  };

  // Move to next step or turn
  const handleNextTurn = () => {
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setBotActionMessage("");

    const lastRound = currentRoundIndex === questionsPool.length - 1;

    // Evaluate single-player mode sequence
    if (gameMode === "single") {
      if (turn === userChampion) {
        // Physical player's turn just finished -> Transition to computer's turn on a NEW unique question!
        if (lastRound) {
          setGameState("gameover");
        } else {
          const nextIndex = currentRoundIndex + 1;
          setCurrentRoundIndex(nextIndex);
          setTurn(userChampion === "gor" ? "gayane" : "gor");
          const nextQuestion = questionsPool[nextIndex];
          runBotTurn(nextQuestion);
        }
      } else {
        // Computer just finished -> Progress to user's turn on a NEW unique question!
        if (lastRound) {
          setGameState("gameover");
        } else {
          setCurrentRoundIndex(prev => prev + 1);
          setTurn(userChampion);
        }
      }
    } else {
      // 2 Players mode turn taking alternating with separate, unique questions
      if (lastRound) {
        setGameState("gameover");
      } else {
        if (turn === "gor") {
          setTurn("gayane");
        } else {
          setTurn("gor");
        }
        setCurrentRoundIndex(prev => prev + 1);
      }
    }
  };

  // Determine Game Winner text and data
  const getWinnerInfo = () => {
    if (gorState.score > gayaneState.score) {
      return {
        name: "Գոռ (Gor)",
        avatar: "gor" as const,
        score: gorState.score,
        steps: gorState.steps,
        message: "Շնորհավորո՛ւմ ենք, Գոռը հաղթեց այս իսպաներենի մրցախաղում:",
        color: "text-blue-600",
      };
    } else if (gayaneState.score > gorState.score) {
      return {
        name: "Գայանե (Gayane)",
        avatar: "gayane" as const,
        score: gayaneState.score,
        steps: gayaneState.steps,
        message: "Շնորհավորո՛ւմ ենք, Գայանեն հաղթեց այս իսպաներենի մրցախաղում:",
        color: "text-amber-600",
      };
    } else {
      return {
        name: "Ոչ-ոքի / Ընկերություն",
        avatar: "gor" as const, // displays both/either
        score: gorState.score,
        steps: gorState.steps,
        message: "Հավասար պայքար. Երկուսն էլ հիանալի տիրապետում են Pretérito Imperfecto-ին։",
        color: "text-indigo-600",
      };
    }
  };

  const activeQuestion: Question | undefined = questionsPool[currentRoundIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 pb-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Upper Navigation Header */}
      <span id="header" className="block w-full" />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 select-none">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-200">
              <Trophy className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-extrabold tracking-tight text-slate-900">
                Գոռ vs Գայանե <span className="text-indigo-600 text-xs md:text-sm font-semibold font-mono">Pretérito Imperfecto</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                Իսպաներենի Ուսուցողական Խաղ-Մրցույթ
              </p>
            </div>
          </div>

          {/* Main Workspace Navigation Slider */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200 max-w-sm sm:max-w-md w-full sm:w-auto">
            <button
              id="tab-btn-game"
              onClick={() => setActiveTab("game")}
              className={`flex-1 sm:flex-none text-center px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "game"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-indigo-900"
              }`}
            >
              <Trophy size={15} /> Խաղ / Մրցույթ
            </button>
            <button
              id="tab-btn-theory"
              onClick={() => setActiveTab("theory")}
              className={`flex-1 sm:flex-none text-center px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "theory"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-indigo-900"
              }`}
            >
              <BookOpen size={15} /> Տեսություն (Անվճար)
            </button>
            <button
              id="tab-btn-playground"
              onClick={() => setActiveTab("playground")}
              className={`flex-1 sm:flex-none text-center px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "playground"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-indigo-900"
              }`}
            >
              <Sparkles size={15} /> Խոնարհիչ
            </button>
          </div>
        </div>
      </header>

      {/* Main body canvas */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        
        {/* SCORE BOARD FLOATER NOTIFICATION ALERT */}
        <AnimatePresence>
          {scoreAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 15, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 text-white font-bold text-xs md:text-sm tracking-wide ${
                scoreAlert.success
                  ? "bg-emerald-600 border border-emerald-400"
                  : "bg-rose-600 border border-rose-400"
              }`}
            >
              {scoreAlert.success ? <Check size={18} /> : <X size={18} />}
              <span>{scoreAlert.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. GAMEPLAY SEGMENT */}
        {activeTab === "game" && (
          <div className="space-y-6">
            
            {/* GAME LOBBY CHOOSE CONFIGURATION */}
            {gameState === "lobby" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto"
              >
                {/* Hero Block */}
                <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 px-8 py-10 text-white text-center sm:text-left relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-6 select-none">
                    <Trophy size={200} />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <span className="bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase border border-indigo-500/20">
                      իսպաներենի մրցաշար
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight font-sans">
                      Գոռ և Գայանե
                    </h2>
                    <p className="text-blue-100/90 text-xs md:text-sm font-light max-w-xl">
                      Պատրաստվե՛ք հուզիչ քերականական մրցության։ Սովորեք Spanish <span className="font-semibold font-mono">Pretérito Imperfecto</span> ժամանակաձևը, կատարե՛ք վարժություններ և առաջ անցեք ձեր հակառակորդից։
                    </p>
                  </div>
                </div>

                {/* Settings Configuration Grid */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                    
                    {/* Game Mode Pick */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Users size={16} className="text-indigo-600" /> Ընտրել Խաղի Ռեժիմը
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          id="mode-btn-single"
                          onClick={() => setGameMode("single")}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition ${
                            gameMode === "single"
                              ? "bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20"
                              : "bg-white border-slate-200 hover:border-slate-350"
                          }`}
                        >
                          <User className={gameMode === "single" ? "text-indigo-600" : "text-slate-400"} />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 mt-2">Մեկ Խաղացող</span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">Ընդդեմ Համակարգչի</span>
                          </div>
                        </button>
                        <button
                          id="mode-btn-multi"
                          onClick={() => setGameMode("multi")}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition ${
                            gameMode === "multi"
                              ? "bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20"
                              : "bg-white border-slate-200 hover:border-slate-350"
                          }`}
                        >
                          <Users className={gameMode === "multi" ? "text-indigo-600" : "text-slate-400"} />
                          <div>
                            <span className="block text-xs font-bold text-slate-800 mt-2">Երկու Խաղացող</span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">Գոռ և Գայանե</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Character or Difficulty Setup */}
                    <div className="space-y-3 justify-between flex flex-col">
                      <div>
                        {gameMode === "single" ? (
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                              <BrainCircuit size={16} className="text-indigo-600" /> Համակարգչի Բարդությունը
                            </label>
                            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                                <button
                                  key={diff}
                                  onClick={() => setSelectedDifficulty(diff)}
                                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                                    selectedDifficulty === diff
                                      ? "bg-white text-slate-900 shadow-sm"
                                      : "text-slate-600 hover:text-slate-900"
                                  }`}
                                >
                                  {diff === "easy" ? "Հեշտ" : diff === "medium" ? "Միջին" : "Դժվար"}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl flex items-center space-x-3">
                            <Info className="text-indigo-600 flex-shrink-0" size={18} />
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              Երկու խաղացողի ռեժիմում Գոռն ու Գայանեն խաղում են հերթով միևնույն էկրանի վրա։ Յուրաքանչյուր ճիշտ պատասխանի համար տրվում է 10 միավոր։
                            </p>
                          </div>
                        )}
                      </div>

                      {gameMode === "single" && (
                        <div className="space-y-2 mt-4">
                          <label className="text-sm font-bold text-slate-800">
                            Ընտրե՛ք Ձեր Կերպարը.
                          </label>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setUserChampion("gor")}
                              className={`flex-1 p-2 rounded-xl border flex items-center gap-2 transition ${
                                userChampion === "gor" ? "border-blue-500 bg-blue-50/20" : "border-slate-200"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full overflow-hidden border">
                                <Avatar type="gor" size="sm" active={userChampion === "gor"} />
                              </div>
                              <span className="text-xs font-bold text-slate-700">Գոռ (Դուք)</span>
                            </button>
                            <button
                              onClick={() => setUserChampion("gayane")}
                              className={`flex-1 p-2 rounded-xl border flex items-center gap-2 transition ${
                                userChampion === "gayane" ? "border-amber-500 bg-amber-50/20" : "border-slate-200"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full overflow-hidden border">
                                <Avatar type="gayane" size="sm" active={userChampion === "gayane"} />
                              </div>
                              <span className="text-xs font-bold text-slate-700">Գայանե (Դուք)</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Advanced Settings Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Select */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Settings size={15} className="text-indigo-600" /> Հարցերի Կատեգորիան
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                      >
                        <option value="all">Բոլորը (Խառը)</option>
                        <option value="regular-ar">Կանոնավոր -AR բայեր</option>
                        <option value="regular-er-ir">Կանոնավոր -ER և -IR բայեր</option>
                        <option value="irregular">Անկանոն բայեր (SER, IR, VER)</option>
                        <option value="usage">Կիրառություն և Ժամանակ</option>
                        <option value="translation">Հայերեն-Իսպաներեն Թարգմանություններ</option>
                      </select>
                    </div>

                    {/* Length select */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800">Հարցերի Քանակը</label>
                      <div className="flex gap-2">
                        {[5, 10, 15].map((roundCount) => (
                          <button
                            key={roundCount}
                            onClick={() => setTotalRounds(roundCount)}
                            className={`flex-1 py-2 px-3 border rounded-xl text-xs font-bold transition ${
                              totalRounds === roundCount
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                : "bg-white border-slate-200 hover:border-slate-350"
                            }`}
                          >
                            {roundCount} հարց
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className="pt-4 text-center">
                    <button
                      id="launch-game-btn"
                      onClick={startNewGame}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Play size={18} fill="currentColor" /> ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LIVE PLAYING GAME SCREEN */}
            {gameState === "playing" && activeQuestion && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
                
                {/* Visual Racetrack Tracker at the top of live page (Span 12) */}
                <div className="lg:col-span-12 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Flame size={14} className="text-orange-500" /> Գոռի և Գայանեի Մրցուղին (Racetrack)
                    </h4>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      Ռաունդ {Math.floor(currentRoundIndex / 2) + 1} / {Math.max(1, Math.floor(questionsPool.length / 2))}
                    </span>
                  </div>

                  {/* The visual grid track represent steps */}
                  <div className="relative pt-6 pb-2 px-4 bg-slate-50 rounded-2xl border border-slate-150 overflow-hidden">
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-200/80 -translate-y-1/2 z-0" />
                    
                    {/* Visual Milestones flag lines */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg z-10 flex flex-col justify-around text-[6px] font-black text-slate-800 text-center select-none rotate-3">
                      <span>F</span>
                      <span>I</span>
                      <span>N</span>
                      <span>I</span>
                      <span>S</span>
                      <span>H</span>
                    </div>

                    <div className="relative h-20 z-10 flex flex-col justify-between">
                       {/* Gor Racer Line */}
                       <div className="relative w-full h-8 flex items-center">
                        <motion.div
                          animate={{ left: `${(gorState.steps / Math.max(1, Math.floor(questionsPool.length / 2))) * 85}%` }}
                          transition={{ type: "spring", stiffness: 60 }}
                          className="absolute -translate-y-2 flex flex-col items-center"
                        >
                          <div className="w-10 h-10 bg-white rounded-xl border border-blue-400 p-0.5 shadow-md">
                            <Avatar type="gor" size="sm" active={turn === "gor"} />
                          </div>
                          <span className="text-[9px] font-extrabold text-blue-700 tracking-wide mt-1">
                            {gorState.score} միավոր
                          </span>
                        </motion.div>
                      </div>

                      {/* Gayane Racer Line */}
                      <div className="relative w-full h-8 flex items-center mt-3">
                        <motion.div
                          animate={{ left: `${(gayaneState.steps / Math.max(1, Math.floor(questionsPool.length / 2))) * 85}%` }}
                          transition={{ type: "spring", stiffness: 60 }}
                          className="absolute -translate-y-2 flex flex-col items-center"
                        >
                          <div className="w-10 h-10 bg-white rounded-xl border border-amber-400 p-0.5 shadow-md">
                            <Avatar type="gayane" size="sm" active={turn === "gayane"} />
                          </div>
                          <span className="text-[9px] font-extrabold text-amber-700 tracking-wide mt-1">
                            {gayaneState.score} միավոր
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Side: Question area (Span 8) */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 flex flex-col justify-between space-y-6">
                  
                  {/* Current Active Turn State Display */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shadow">
                        <Avatar type={turn} size="sm" active />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Հերթական Քայլը
                        </h3>
                        <p className="text-sm font-extrabold text-slate-800">
                          {turn === "gor" ? "Գոռի հերթն է (Gor)" : "Գայանեի հերթն է (Gayane)"}
                          {gameMode === "single" && turn !== userChampion && " (Համակարգիչ)"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-100/80 px-3 py-1.5 rounded-xl border text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Բարդություն</span>
                      <span className="text-xs font-black text-slate-700 uppercase">
                        {activeQuestion.difficulty === "easy" ? "Հեշտ" : activeQuestion.difficulty === "medium" ? "Միջին" : "Դժվար"}
                      </span>
                    </div>
                  </div>

                  {/* Core Question Text Showcase */}
                  <div className="space-y-4 pt-2">
                    <div className="inline-block bg-indigo-50 text-indigo-800 text-[10px] font-bold uppercase py-0.5 px-2.5 rounded-md tracking-wider">
                      {activeQuestion.category.replace(/-/g, " ")}
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-snug tracking-tight font-serif min-h-[64px]">
                      {activeQuestion.questionText}
                    </h2>
                  </div>

                  {/* Core Options Panel grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4">
                    {activeQuestion.options.map((option, idx) => {
                      // Visual States computed
                      let optionBg = "bg-slate-50 hover:bg-slate-100 border-slate-200";
                      let optionTextColor = "text-slate-800";
                      let indicatorIcon = null;

                      if (isAnswerSubmitted) {
                        if (idx === activeQuestion.correctIndex) {
                          optionBg = "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/10";
                          optionTextColor = "text-emerald-900 font-extrabold";
                          indicatorIcon = <Check size={16} className="text-emerald-600 flex-shrink-0" />;
                        } else if (idx === selectedOption) {
                          optionBg = "bg-rose-50 border-rose-500 ring-2 ring-rose-500/10";
                          optionTextColor = "text-rose-900";
                          indicatorIcon = <X size={16} className="text-rose-600 flex-shrink-0" />;
                        } else {
                          optionBg = "bg-slate-50/50 border-slate-100 opacity-60";
                          optionTextColor = "text-slate-400";
                        }
                      } else {
                        // Not submitted yet
                        if (selectedOption === idx) {
                          optionBg = "bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600/20";
                          optionTextColor = "text-indigo-900 font-extrabold";
                        }
                      }

                      // Disable interact if submitted or if it is bot thinking
                      const isDisabled = isAnswerSubmitted || isBotThinking || (gameMode === "single" && turn !== userChampion);

                      return (
                        <button
                          key={idx}
                          disabled={isDisabled}
                          onClick={() => submitAnswer(idx)}
                          className={`p-4 rounded-xl border text-left flex items-center justify-between font-mono text-xs md:text-sm transition-all shadow-sm ${optionBg} ${
                            !isDisabled ? "hover:scale-[1.01] hover:shadow cursor-pointer duration-150" : "cursor-default"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold font-sans text-xs">
                              {idx + 1}
                            </span>
                            <span className={`${optionTextColor} font-bold`}>{option}</span>
                          </div>
                          {indicatorIcon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-submission details box / Interactive explanations in Armenian */}
                  <AnimatePresence>
                    {isAnswerSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3 mt-4 overflow-hidden"
                      >
                        <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-xl border">
                          <span className="text-xs font-bold text-slate-500 font-sans">
                            Արդյունքի թարգմանությունը հայերեն.
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                            Pretérito Imperfecto
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800 font-sans tracking-wide leading-relaxed">
                          {activeQuestion.translationArm}
                        </p>
                        
                        <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-normal">
                          <span className="font-extrabold block mb-1">Կանոնի բացատրություն.</span>
                          {activeQuestion.explanationArm}
                        </div>

                        {botActionMessage && (
                          <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 border italic font-sans flex items-center space-x-2">
                            <BrainCircuit size={16} className="text-slate-500 shrink-0" />
                            <span>{botActionMessage}</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submission and Control Navigation Footer buttons */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    {isBotThinking ? (
                      <button
                        disabled
                        className="bg-slate-200 text-slate-500 font-bold text-xs py-3 px-6 rounded-xl flex items-center space-x-2 cursor-wait"
                      >
                        <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-white animate-spin" />
                        <span>Հակառակորդը մտածում է...</span>
                      </button>
                    ) : isAnswerSubmitted ? (
                      <button
                        onClick={handleNextTurn}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-lg transition flex items-center space-x-2"
                      >
                        <span>{currentRoundIndex === questionsPool.length - 1 && (gameMode === "multi" || turn !== userChampion) ? "ԱՎԱՐՏԵԼ ԽԱՂԸ" : "ՀԱՋՈՐԴ ՔԱՅԼԸ"}</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      gameMode === "single" && turn !== userChampion && (
                        <button
                          onClick={() => runBotTurn(activeQuestion)}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-lg transition flex items-center space-x-2"
                        >
                          <span>Թույլ տալ համակարգչին պատասխանել</span>
                          <ArrowRight size={16} />
                        </button>
                      )
                    )}
                  </div>

                </div>

                {/* Right Side: Score overview, progress & recent Logs (Span 4) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Scores Stats Card */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest border-b pb-2">
                      Ընթացիկ Միավորներ
                    </h4>

                    {/* Score summary rows */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50/20 border border-blue-100/30 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden border">
                            <Avatar type="gor" size="sm" active={turn === "gor"} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800">Գոռ</span>
                            <span className="block text-[9px] text-slate-400 font-medium leading-none">
                              Ճիշտ՝ {gorState.answersCorrect}/{gorState.answersTotal}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-lg font-black text-blue-700">
                          {gorState.score}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-amber-50/25 border border-amber-100/30 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden border">
                            <Avatar type="gayane" size="sm" active={turn === "gayane"} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800">Գայանե</span>
                            <span className="block text-[9px] text-slate-400 font-medium leading-none">
                              Ճիշտ՝ {gayaneState.answersCorrect}/{gayaneState.answersTotal}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-lg font-black text-amber-700">
                          {gayaneState.score}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Instant Logs Widget */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest border-b pb-2">
                      Խաղային Գրանցամատյան (Logs)
                    </h4>

                    <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 text-[11px] font-sans divide-y divide-slate-55">
                      {gameLogs.length === 0 ? (
                        <p className="text-slate-400 text-center py-6">Մեկնարկե՛ք պատասխանելը իրադարձությունների լրահոսը տեսնելու համար</p>
                      ) : (
                        gameLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2 py-2 items-start justify-between">
                            <span className="font-bold text-slate-700 whitespace-nowrap">{log.player}.</span>
                            <span className="text-slate-500 text-left line-clamp-1 flex-1 pr-2">{log.desc}</span>
                            <span className={`font-semibold shrink-0 ${log.correct ? "text-emerald-600" : "text-rose-500"}`}>
                              {log.correct ? "Ճիշտ" : "Սխալ"}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Immediate Emergency reset button */}
                  <button
                    onClick={() => {
                      if (window.confirm("Ցանկանո՞ւմ եք դադարեցնել խաղը և վերադառնալ սկիզբ։")) {
                        setGameState("lobby");
                      }
                    }}
                    className="w-full text-center py-2.5 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-200 duration-150 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <RotateCcw size={13} /> Ընդհատել, Ելք դեպի սկիզբ
                  </button>
                </div>

              </div>
            )}

            {/* GAMEOVER PODIUM AND RECAP SECTION */}
            {gameState === "gameover" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100 max-w-3xl mx-auto space-y-8 text-center"
              >
                
                {/* Trophy Head */}
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center p-6 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full shadow-lg text-white">
                    <Award size={48} className="animate-bounce" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      ԽԱՂՆ ԱՎԱՐՏՎԵՑ
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm tracking-wide mt-1">
                      Մրցույթը և վարժանքը բարեհաջող ավարտվեցին
                    </p>
                  </div>
                </div>

                {/* Winner announcement box */}
                <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 max-w-md mx-auto space-y-3">
                  <h3 className={`text-lg font-extrabold ${getWinnerInfo().color}`}>
                    {getWinnerInfo().name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    {getWinnerInfo().message}
                  </p>
                  <div className="flex justify-center mt-3">
                    <Avatar type={getWinnerInfo().avatar} size="lg" active />
                  </div>
                </div>

                {/* Side-by-Side Detailed Breakdown */}
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto border-t border-b border-slate-100 py-6">
                  {/* Gor final */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 block uppercase font-mono">Գոռ</span>
                    <span className="text-2xl font-black text-blue-700">{gorState.score} <span className="text-xs font-normal text-slate-400">միավոր</span></span>
                    <span className="block text-[10px] text-slate-400">Ճիշտ պատասխաններ՝ {gorState.answersCorrect} / {gorState.answersTotal}</span>
                  </div>

                  {/* Gayane final */}
                  <div className="space-y-1 border-l">
                    <span className="text-xs font-bold text-slate-500 block uppercase font-mono">Գայանե</span>
                    <span className="text-2xl font-black text-amber-700">{gayaneState.score} <span className="text-xs font-normal text-slate-400">միավոր</span></span>
                    <span className="block text-[10px] text-slate-400">Ճիշտ պատասխաններ՝ {gayaneState.answersCorrect} / {gayaneState.answersTotal}</span>
                  </div>
                </div>

                {/* Final Interactive Action Row buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    onClick={() => setGameState("lobby")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-6 rounded-xl shadow transition"
                  >
                    Խաղալ Նորից
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("theory");
                      setGameState("lobby");
                    }}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <BookOpen size={14} /> Կարդալ Քերականությունը
                  </button>
                </div>

              </motion.div>
            )}

          </div>
        )}

        {/* 2. GRAMMAR THEORY SEGMENT */}
        {activeTab === "theory" && (
          <div className="space-y-6">
            <TheorySection />
          </div>
        )}

        {/* 3. CONJUGATION PLAYGROUND SEGMENT */}
        {activeTab === "playground" && (
          <div className="space-y-6">
            <ConjugationPlayground />
          </div>
        )}

      </main>

      {/* Decorative clean human footer representation */}
      <footer className="mt-16 border-t border-slate-200 pt-8 pb-4 text-center text-slate-400 text-[10px] tracking-wide max-w-4xl mx-auto font-sans leading-normal">
        <p>Գոռ vs Գայանե — Իսպաներենի Անկատար Անցյալ Ժամանակաձևի (Pretérito Imperfecto) Խաղ-Ուսուցիչ</p>
        <p className="mt-1 text-slate-350">Նախագծված է որպես հայախոսների համար ինտերակտիվ, հարմարավետ քերականական ուղեցույց</p>
      </footer>
    </div>
  );
}
