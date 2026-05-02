import React, { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Navbar({
  onLoginClick,
  onSignupClick
}: {
  onLoginClick: () => void;
  onSignupClick: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const allLinks = [
    { name: "HOME", hasDropdown: false },
    { name: "PLATFORM", hasDropdown: true },
    { name: "SOLUTIONS", hasDropdown: true },
    { name: "ABOUT US", hasDropdown: false },
    { name: "CONTACT", hasDropdown: false },
  ];

  return (
    <header className="w-full relative z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0">
      <nav className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 group cursor-pointer mr-8 shrink-0">
          <span className="text-xl font-bold text-slate-800 tracking-tight">Sevasetu</span>
          <div className="w-6 h-1.5 bg-brand-green rounded-full mt-auto -ml-1 transition-all group-hover:w-8"></div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-8 flex-1 justify-center">
          {allLinks.map((link) => (
            <div key={link.name} className="relative group cursor-pointer py-1">
              <div className="flex items-center gap-1 text-[12px] 2xl:text-[14px] font-bold tracking-widest text-slate-500 group-hover:text-brand-green transition-colors whitespace-nowrap">
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="opacity-40" />}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full"></div>
            </div>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-4 shrink-0 ml-6">
          {user ? (
            <button
              onClick={() => navigate("/app")}
              className="bg-brand-green text-white px-5 py-2.5 rounded-lg text-[12px] font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="px-4 py-2 text-[12px] font-bold tracking-widest text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors uppercase"
              >
                LOGIN
              </button>
              <button
                onClick={onSignupClick}
                className="bg-brand-green text-white px-5 py-2.5 rounded-lg text-[12px] font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase"
              >
                SIGNUP
              </button>
            </>
          )}
          <div className="w-px h-6 bg-slate-100 mx-2 hidden sm:block"></div>
          <button className="p-2 text-slate-400 hover:text-brand-green transition-colors" aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-brand-green transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <button 
            className="p-2 text-slate-600" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4">
          {allLinks.map((link) => (
            <div key={link.name} className="py-2 border-b border-slate-50 flex items-center justify-between text-slate-600 font-bold text-sm tracking-widest cursor-pointer hover:text-brand-green">
              {link.name}
              {link.hasDropdown && <ChevronDown size={16} className="opacity-40" />}
            </div>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => navigate("/app")}
                className="w-full bg-brand-green text-white px-4 py-3 rounded-lg text-sm font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase text-center"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onLoginClick(); }}
                  className="w-full px-4 py-3 text-sm font-bold tracking-widest text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors uppercase text-center"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onSignupClick(); }}
                  className="w-full bg-brand-green text-white px-4 py-3 rounded-lg text-sm font-bold tracking-widest hover:brightness-110 transition-all shadow-sm uppercase text-center"
                >
                  SIGNUP
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
