
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  FlaskConical, 
  Clock, 
  ShieldAlert, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X,
  Stethoscope,
  Activity,
  Zap,
  Microscope,
  Info,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Dna,
  HeartPulse,
  Scale
} from 'lucide-react';
import { DRUG_DATA } from './constants';
import { DrugCategory, DrugInfo, SearchResult } from './types';
import { getEvidenceData } from './geminiService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'All'>('All');
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showOncologyIntro, setShowOncologyIntro] = useState(false);
  
  const [aiEvidence, setAiEvidence] = useState<SearchResult | null>(null);
  const [isSearchingEvidence, setIsSearchingEvidence] = useState(false);

  const categories = ['All', ...Object.values(DrugCategory)];

  const filteredDrugs = useMemo(() => {
    return DRUG_DATA.filter(drug => {
      const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || drug.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchEvidence = async (drugName: string) => {
    setIsSearchingEvidence(true);
    setAiEvidence(null);
    try {
      const result = await getEvidenceData(drugName);
      setAiEvidence(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingEvidence(false);
    }
  };

  useEffect(() => {
    if (selectedDrug) {
      setAiEvidence(null);
      setShowOncologyIntro(false);
    }
  }, [selectedDrug]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 bg-white border-r border-slate-200 overflow-y-auto z-30 flex flex-col`}
      >
        <div className="p-6 flex-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-100">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">TDM Navigator</h1>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Clinical Expert System</span>
            </div>
          </div>

          <div className="space-y-1 mb-8">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Therapeutic Areas</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat as any);
                  if (cat === DrugCategory.ANTICANCER) {
                    setShowOncologyIntro(true);
                    setSelectedDrug(null);
                  } else {
                    setShowOncologyIntro(false);
                  }
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <button 
              onClick={() => {
                setSelectedDrug(null);
                setShowOncologyIntro(true);
                setSelectedCategory(DrugCategory.ANTICANCER);
              }}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl text-amber-900 hover:shadow-md transition-all group"
            >
              <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold uppercase tracking-tight">Oncology Focus</div>
                <div className="text-[11px] opacity-70">Essential TDM Insights</div>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Zap size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Grounding</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real-time synchronization with IATDMCT & AGNP clinical consensus.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search protocols (e.g. Busulfan, Methotrexate, Lithium...)"
                className="w-full pl-12 pr-6 py-3 bg-slate-100 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evidence Level</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck size={16} /> IATDMCT Tier 1
                </span>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* List View */}
          <div className="w-80 border-r border-slate-200 overflow-y-auto bg-white/40">
            <div className="p-4 space-y-3">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => {
                      setSelectedDrug(drug);
                      setShowOncologyIntro(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedDrug?.id === drug.id
                      ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-500/10'
                      : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 text-sm">{drug.name}</h4>
                      <ChevronRight size={16} className={selectedDrug?.id === drug.id ? 'text-indigo-500' : 'text-slate-300'} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg font-bold uppercase tracking-tight">
                        {drug.category.split(' ')[0]}
                      </span>
                      {drug.recommendationLevel && (
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-tighter ${
                          drug.recommendationLevel === 'Mandatory' ? 'bg-rose-100 text-rose-700' :
                          drug.recommendationLevel === 'Strongly recommended' ? 'bg-orange-100 text-orange-700' :
                          'bg-indigo-100 text-indigo-700'
                        }`}>
                          {drug.recommendationLevel}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-20 text-center px-6">
                  <div className="bg-slate-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <BookOpen size={28} />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">No Protocols Found</h5>
                  <p className="text-slate-500 text-xs leading-relaxed">Try adjusting your filters or searching for a generic name.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="flex-1 overflow-y-auto bg-white relative scroll-smooth">
            {showOncologyIntro ? (
              <div className="p-10 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl shadow-indigo-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/20 inline-block w-fit">
                      <TrendingUp size={40} className="text-indigo-200" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black tracking-tight mb-2">TDM in Modern Oncology</h2>
                      <p className="text-indigo-200 text-lg font-medium opacity-90">Precision Medicine Beyond Genomics</p>
                    </div>
                  </div>
                  
                  <p className="text-indigo-50/80 text-lg leading-relaxed mb-8 max-w-3xl">
                    In oncology, the "One-Size-Fits-All" dosing approach is rapidly being replaced by TDM-guided therapy. 
                    Monitoring plasma concentrations ensures maximum efficacy while preventing dose-limiting toxicities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <Scale size={20} className="text-amber-300" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Narrow Index</h4>
                      <p className="text-xs text-indigo-100/70 leading-relaxed">Cytotoxic agents have a razor-thin margin between killing tumor cells and causing organ failure.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <Dna size={20} className="text-emerald-300" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Genetic Variability</h4>
                      <p className="text-xs text-indigo-100/70 leading-relaxed">Metabolic polymorphisms (CYP3A4/2D6) cause up to 10-fold variance in drug exposure for the same dose.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <HeartPulse size={20} className="text-rose-300" />
                      </div>
                      <h4 className="font-bold text-white mb-2">Survival Outcomes</h4>
                      <p className="text-xs text-indigo-100/70 leading-relaxed">Evidence shows TDM-guided dosing for drugs like Busulfan directly improves engraftment and survival.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase text-xs tracking-[0.2em]">
                      <Activity size={18} className="text-indigo-600" /> Critical Drivers
                    </h3>
                    <div className="space-y-6">
                      <div className="flex gap-5">
                        <div className="shrink-0 w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-sm italic">01</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm mb-1">TKIs & Targeted Therapy</p>
                          <p className="text-xs text-slate-600 leading-relaxed">Oral drugs like Imatinib suffer from adherence issues and variable absorption. Cmin monitoring is now standard.</p>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="shrink-0 w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-sm italic">02</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm mb-1">HD-Methotrexate Rescue</p>
                          <p className="text-xs text-slate-600 leading-relaxed">Real-time levels are mandatory to prevent catastrophic nephrotoxicity via Leucovorin rescue optimization.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="text-indigo-600" size={24} />
                      <h3 className="font-black text-indigo-900 text-xl italic uppercase tracking-tighter">Essential Standard</h3>
                    </div>
                    <p className="text-indigo-800/80 text-sm leading-relaxed mb-6 font-medium">
                      "TDM is not just a tool for avoiding toxicity; it is a fundamental requirement for optimizing the efficacy of modern curative oncology regimens."
                    </p>
                    <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest border-t border-indigo-200 pt-4">
                      Reference: IATDMCT Oncology Guidelines 2024
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedDrug ? (
              <div className="p-10 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        {selectedDrug.category}
                      </span>
                      {selectedDrug.recommendationLevel && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          selectedDrug.recommendationLevel === 'Mandatory' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {selectedDrug.recommendationLevel}
                        </span>
                      )}
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedDrug.name}</h2>
                  </div>
                  <button 
                    onClick={() => handleSearchEvidence(selectedDrug.name)}
                    disabled={isSearchingEvidence}
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 hover:scale-105 active:scale-95"
                  >
                    {isSearchingEvidence ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div>
                    ) : (
                      <Zap size={18} />
                    )}
                    Ground with Live Evidence
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Clock size={80} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Clock size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">Sample Timeline</h4>
                    </div>
                    <p className="text-slate-800 font-bold text-lg leading-snug mb-6">{selectedDrug.timing}</p>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Steady State Reached</span>
                      <p className="text-sm text-slate-700 font-black">{selectedDrug.steadyState}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Microscope size={80} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Microscope size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">Laboratory Matrix</h4>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <FlaskConical size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Primary Container</span>
                          <p className="text-sm text-slate-800 font-black leading-tight">{selectedDrug.container}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <ShieldCheck size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Specimen Type</span>
                          <p className="text-sm text-slate-800 font-black leading-tight">{selectedDrug.sampleType}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950 p-10 rounded-[2.5rem] border border-emerald-900 mb-10 relative overflow-hidden shadow-2xl shadow-emerald-100">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  <div className="flex items-center gap-4 mb-6 text-emerald-400">
                    <div className="bg-white/5 p-2 rounded-lg backdrop-blur-md">
                      <HeartPulse size={24} />
                    </div>
                    <h4 className="font-black uppercase text-[10px] tracking-[0.3em]">Therapeutic Window</h4>
                  </div>
                  <div className="text-5xl font-black text-white tracking-tighter mb-4 flex items-baseline gap-2">
                    {selectedDrug.therapeuticRange}
                  </div>
                  {selectedDrug.toxicLevel && (
                    <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 px-5 py-3 rounded-2xl w-fit">
                      <ShieldAlert size={18} className="text-rose-400" />
                      <span className="text-rose-100 font-black text-sm uppercase tracking-tighter italic">
                        Panic/Toxic Threshold: {selectedDrug.toxicLevel}
                      </span>
                    </div>
                  )}
                </div>

                {selectedDrug.notes && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-5 text-slate-900">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <Info size={18} />
                      </div>
                      <h4 className="font-bold uppercase text-[10px] tracking-widest">Clinical Protocol Notes</h4>
                    </div>
                    <div className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-8 rounded-[2rem] border-l-[6px] border-indigo-500 font-medium">
                      {selectedDrug.notes}
                    </div>
                  </div>
                )}

                {/* AI Evidence Area */}
                {(aiEvidence || isSearchingEvidence) && (
                  <div className="mt-16 pt-16 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg">
                          <Zap size={22} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live Evidence Insight</h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Grounding Metadata</span>
                        </div>
                      </div>
                    </div>
                    
                    {isSearchingEvidence ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse delay-75"></div>
                        <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse delay-150"></div>
                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest mt-8">
                          <Activity size={16} className="animate-spin text-indigo-500" />
                          Indexing latest IATDMCT journals...
                        </div>
                      </div>
                    ) : aiEvidence && (
                      <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 shadow-inner">
                        <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                          {aiEvidence.text}
                        </div>

                        {aiEvidence.sources.length > 0 && (
                          <div className="mt-10 pt-10 border-t border-slate-200">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Verified Source Material</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {aiEvidence.sources.map((source, idx) => (
                                <a 
                                  key={idx}
                                  href={source.web.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 transition-all group"
                                >
                                  <span className="text-xs font-bold text-slate-700 truncate pr-6 group-hover:text-indigo-600">{source.web.title}</span>
                                  <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/50">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-indigo-100 flex items-center justify-center text-indigo-600 mb-8 border border-slate-100">
                  <Stethoscope size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Clinical Decision Support</h3>
                <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm font-medium">
                  Select a drug from the left panel to access the global standard for sampling timing, matrix requirements, and therapeutic concentration ranges.
                </p>
                <div className="mt-12 grid grid-cols-2 gap-4">
                  <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xl font-black text-indigo-600 block mb-0.5">150+</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Protocols</span>
                  </div>
                  <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xl font-black text-emerald-600 block mb-0.5">Real-time</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Grounding</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
