import React from "react";

interface AvatarProps {
  type: "gor" | "gayane";
  size?: "sm" | "md" | "lg" | "xl";
  active?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ type, size = "md", active = false }) => {
  const isGor = type === "gor";
  
  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-24 h-24 text-base",
    xl: "w-32 h-32 text-lg",
  };

  const ringColor = isGor ? "ring-blue-500 shadow-blue-500/30" : "ring-amber-500 shadow-amber-500/30";
  const avatarBg = isGor 
    ? "bg-gradient-to-br from-blue-50 to-blue-200" 
    : "bg-gradient-to-br from-amber-50 to-amber-200";

  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${sizeClasses[size]} ${
        isGor ? "border-blue-300" : "border-amber-300"
      } ${avatarBg} ${active ? `ring-4 ${ringColor} scale-105` : "scale-100 shadow-md"}`}
    >
      {isGor ? (
        // Gor SVG Avatar: Scholar-Adventurer with book, glasses/pennant, blue theme
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-2 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hair/Head protection or hair style */}
          <path d="M25,45 C20,25 45,15 75,25 C85,35 80,55 75,60 C70,65 30,65 25,45 Z" fill="#2b3a4a" />
          {/* Face */}
          <circle cx="50" cy="53" r="28" fill="#fbd38d" />
          {/* Hair Front */}
          <path d="M25,40 C35,25 65,25 75,38 C65,30 35,30 25,40 Z" fill="#1e293b" />
          {/* Eyes with Glasses */}
          <circle cx="42" cy="51" r="7" fill="none" stroke="#2563eb" strokeWidth="3" />
          <circle cx="58" cy="51" r="7" fill="none" stroke="#2563eb" strokeWidth="3" />
          <line x1="49" y1="51" x2="51" y2="51" stroke="#2563eb" strokeWidth="3" />
          {/* Pupils */}
          <circle cx="42" cy="51" r="3" fill="#1e293b" />
          <circle cx="58" cy="51" r="3" fill="#1e293b" />
          {/* Cheeks */}
          <circle cx="34" cy="58" r="3" fill="#f56565" opacity="0.4" />
          <circle cx="66" cy="58" r="3" fill="#f56565" opacity="0.4" />
          {/* Happy smile */}
          <path d="M43,62 Q50,69 57,62" fill="none" stroke="#2d3748" strokeWidth="3" strokeLinecap="round" />
          {/* Cap / Crown representation of intelligence */}
          <path d="M40,22 L50,12 L60,22 L50,26 Z" fill="#3b82f6" />
          <circle cx="50" cy="12" r="3" fill="#f59e0b" />
        </svg>
      ) : (
        // Gayane SVG Avatar: Scholar with quill, scroll, flower/star, warm theme
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-2 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Beautiful dark/burgundy hair frame */}
          <path d="M20,40 C15,15 85,15 80,40 C85,65 75,80 70,80 C60,70 40,70 30,80 C25,80 15,65 20,40 Z" fill="#4a1525" />
          {/* Face */}
          <circle cx="50" cy="50" r="28" fill="#fce8e6" />
          {/* Hair bangs */}
          <path d="M22,38 C35,24 65,24 78,38 C70,30 30,30 22,38 Z" fill="#310c18" />
          <path d="M20,45 C24,40 28,50 26,60 Z" fill="#310c18" />
          <path d="M80,45 C76,40 72,50 74,60 Z" fill="#310c18" />
          {/* Elegant expressional large eyes */}
          <ellipse cx="40" cy="49" rx="5" ry="6" fill="#1a202c" />
          <ellipse cx="60" cy="49" rx="5" ry="6" fill="#1a202c" />
          {/* Eye sparkles */}
          <circle cx="38" cy="47" r="1.5" fill="#ffffff" />
          <circle cx="58" cy="47" r="1.5" fill="#ffffff" />
          <circle cx="41" cy="51" r="0.8" fill="#ffffff" />
          <circle cx="61" cy="51" r="0.8" fill="#ffffff" />
          {/* Blush */}
          <circle cx="34" cy="58" r="4" fill="#f43f5e" opacity="0.3" />
          <circle cx="66" cy="58" r="4" fill="#f43f5e" opacity="0.3" />
          {/* Smiling lips */}
          <path d="M44,61 Q50,67 56,61" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
          {/* Hair Ornament / Star Flower */}
          <circle cx="28" cy="28" r="5" fill="#f59e0b" />
          <circle cx="28" cy="28" r="2" fill="#ffffff" />
        </svg>
      )}

      {/* Character Name Tag overlay at bottom */}
      <div
        className={`absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow ${
          isGor ? "bg-blue-600 border border-blue-400" : "bg-amber-600 border border-amber-400"
        }`}
      >
        {isGor ? "ԳՈՌ (GOR)" : "ԳԱՅԱՆԵ (GAYANE)"}
      </div>
    </div>
  );
};
