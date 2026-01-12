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
  Stethoscope,
  Activity,
  Zap,
  Microscope,
  Info,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  Waves,
  Wind,
  ThermometerSnowflake,
  ShieldHalf,
  Syringe,
  Target
} from 'lucide-react';
import { DRUG_DATA } from './constants';
import { DrugCategory, DrugInfo, SearchResult } from './types';
import { getEvidenceData } from './geminiService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'All'>('All');
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Intro states for special categories
  const [showOncologyIntro, setShowOncologyIntro] = useState(false);
  const [showBiologicIntro, setShowBiologicIntro] = useState(false);
  const [showAbuseIntro, setShowAbuseIntro] = useState(false);
  const [showCardioIntro, setShowCardioIntro] = useState(false);
  const [showRespiratoryIntro, setShowRespiratoryIntro] = useState(false);
  
  const [aiEvidence, setAiEvidence] = useState<SearchResult | null>(null);
  const [isSearchingEvidence, setIsSearchingEvidence] = useState(false);

  const categories = ['All', ...Object.values(DrugCategory)];

  const filteredAndSortedDrugs = useMemo(() => {
    let list = DRUG_DATA.filter(drug => {
      const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || drug.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
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
      setShowBiologicIntro(false);
      setShowAbuseIntro(false);
      setShowCardioIntro(false);
      setShowRespiratoryIntro(false);
    }
  }, [selectedDrug]);

  const getRecommendationStyle = (level?: string) => {
    switch(level) {
      case 'Mandatory': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Strongly recommended': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Recommended': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Selective': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Emerging': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-slate-200 overflow-y-auto z-30 flex flex-col`}>
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
                  setSelectedDrug(null);
                  setShowOncologyIntro(cat === DrugCategory.ANTICANCER);
                  setShowBiologicIntro(cat === DrugCategory.BIOLOGIC);
                  setShowAbuseIntro(cat === DrugCategory.SUBSTANCE_ABUSE);
                  setShowCardioIntro(cat === DrugCategory.CARDIOVASCULAR);
                  setShowRespiratoryIntro(cat === DrugCategory.RESPIRATORY);
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
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Zap size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Sync</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Grounding data from IATDMCT, ECCO, and international medical consortia.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors">
              <Menu size={22} />
            </button>
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search A-Z drugs (e.g. Digoxin, Sildenafil, Tacrolimus...)"
                className="w-full pl-12 pr-6 py-3 bg-slate-100 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end">
             <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
               <ShieldCheck size={16} /> Protocol Verified
             </span>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* List */}
          <div className="w-80 border-r border-slate-200 overflow-y-auto bg-white/40">
            <div className="p-4 space-y-3">
              <div className="px-2 py-1 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Drugs (A-Z)</span>
                <span>{filteredAndSortedDrugs.length}</span>
              </div>
              {filteredAndSortedDrugs.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedDrug?.id === drug.id ? 'bg-white border-indigo-200 shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{drug.name}</h4>
                    <ChevronRight size={16} className={selectedDrug?.id === drug.id ? 'text-indigo-500' : 'text-slate-300'} />
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-tighter border ${getRecommendationStyle(drug.recommendationLevel)}`}>
                    {drug.recommendationLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 overflow-y-auto bg-white relative scroll-smooth">
            {showOncologyIntro ? (
              <div className="p-10 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <TrendingUp size={40} className="mb-6 text-indigo-200" />
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Oncology Excellence</h2>
                  <p className="text-indigo-100 opacity-90 leading-relaxed text-lg font-medium">Monitoring Methotrexate (HD), Busulfan, and TKIs to ensure therapeutic outcomes while managing toxic ceilings.</p>
                </div>
              </div>
            ) : showCardioIntro ? (
              <div className="p-10 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-rose-700 to-rose-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <HeartPulse size={40} className="mb-6 text-rose-200" />
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Cardiovascular Precision</h2>
                  <p className="text-rose-100 opacity-90 leading-relaxed text-lg font-medium">Critical metrics for Anti-arrhythmics, Digoxin, and the latest DOAC considerations in renal impairment and emergency surgery.</p>
                </div>
              </div>
            ) : showRespiratoryIntro ? (
              <div className="p-10 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <Wind size={40} className="mb-6 text-teal-200" />
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Respiratory Health</h2>
                  <p className="text-teal-100 opacity-90 leading-relaxed text-lg font-medium">Focused monitoring for Theophylline, Nintedanib, and emerging biologics like Mepolizumab and Omalizumab.</p>
                </div>
              </div>
            ) : selectedDrug ? (
              <div className="p-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-start gap-6 mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">{selectedDrug.category}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRecommendationStyle(selectedDrug.recommendationLevel)}`}>{selectedDrug.recommendationLevel}</span>
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-2">{selectedDrug.name}</h2>
                  </div>
                  <button onClick={() => handleSearchEvidence(selectedDrug.name)} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-xl">
                    {isSearchingEvidence ? <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div> : <Zap size={18} />}
                    Live Evidence
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Target size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-widest">Clinical Indication</h4>
                    </div>
                    <p className="text-slate-900 font-bold text-lg leading-snug">{selectedDrug.indication || 'Not specified'}</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Syringe size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-widest">Recommended Dosing</h4>
                    </div>
                    <p className="text-slate-900 font-bold text-lg leading-snug">{selectedDrug.dosing || 'Refer to protocol'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Clock size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-widest">Sampling Protocol</h4>
                    </div>
                    <p className="text-slate-900 font-bold text-xl leading-snug mb-6">{selectedDrug.timing}</p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Steady State</span>
                      <p className="text-sm text-slate-700 font-black">{selectedDrug.steadyState}</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                      <Microscope size={24} />
                      <h4 className="font-black uppercase text-[10px] tracking-widest">Lab Requirements</h4>
                    </div>
                    <div className="space-y-4 text-sm font-bold">
                      <div className="flex items-center gap-3"><FlaskConical size={18} /> {selectedDrug.container}</div>
                      <div className="flex items-center gap-3"><Activity size={18} /> {selectedDrug.sampleType}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] text-white mb-12 shadow-2xl">
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-indigo-400 mb-8">Therapeutic Range</h4>
                  <div className="text-6xl font-black tracking-tighter">{selectedDrug.therapeuticRange}</div>
                </div>

                {selectedDrug.notes && (
                  <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 flex gap-6">
                    <Info size={24} className="text-indigo-600 shrink-0" />
                    <div><h4 className="font-bold text-indigo-900 mb-2 text-sm">Critical Clinical Insights</h4><p className="text-slate-700 text-sm leading-relaxed font-medium">{selectedDrug.notes}</p></div>
                  </div>
                )}

                {(aiEvidence || isSearchingEvidence) && (
                  <div className="mt-20 pt-16 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg"><Zap size={24} /></div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Evidence-Based Sync</h3>
                    </div>
                    {isSearchingEvidence ? (
                      <div className="space-y-4"><div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse"></div><div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div></div>
                    ) : aiEvidence && (
                      <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200">
                        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium whitespace-pre-wrap mb-10">{aiEvidence.text}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {aiEvidence.sources.map((source, idx) => (
                            <a key={idx} href={source.web.uri} target="_blank" className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 transition-all">
                              <span className="text-xs font-bold text-slate-700 truncate pr-6">{source.web.title}</span>
                              <ExternalLink size={16} className="text-slate-300" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/20">
                <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center text-indigo-600 mb-10"><Stethoscope size={64} /></div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">TDM Navigator Pro</h3>
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-lg font-medium mb-12">Consolidating the world's leading TDM databases into a single clinical point-of-care reference.</p>
                <div className="grid grid-cols-3 gap-6 max-w-2xl w-full">
                  <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm"><span className="text-2xl font-black text-indigo-600 block mb-1">Live</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Grounding</span></div>
                  <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm"><span className="text-2xl font-black text-rose-600 block mb-1">TDM</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocols</span></div>
                  <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm"><span className="text-2xl font-black text-emerald-600 block mb-1">IATDMCT</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evidence</span></div>
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