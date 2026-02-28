import React, { useState, useMemo } from 'react';
import { 
  Calculator, Home, Truck, Ruler, CheckCircle2, Building2, Hammer, Send, 
  ShieldCheck, Users, Wrench, ChevronDown, MapPin, ArrowRight,
  FileText, HardHat, Trash2, CheckSquare, Info
} from 'lucide-react';
import { motion } from 'motion/react';

type StructureType = 'wood' | 'steel' | 'rc';
type MachineAccessType = 'possible' | 'impossible' | 'unknown';

const UNIT_PRICES: Record<StructureType, number> = {
  wood: 30000,
  steel: 50000,
  rc: 70000,
};

const MULTIPLIERS: Record<MachineAccessType, number> = {
  possible: 1.0,
  impossible: 1.5,
  unknown: 1.2,
};

export default function App() {
  // Estimation State
  const [structure, setStructure] = useState<StructureType>('wood');
  const [area, setArea] = useState<number>(30);
  const [machineAccess, setMachineAccess] = useState<MachineAccessType>('possible');
  const [showResult, setShowResult] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculation Logic
  const { minPrice, maxPrice } = useMemo(() => {
    const basePrice = UNIT_PRICES[structure] * area;
    const totalPrice = basePrice * MULTIPLIERS[machineAccess];
    const min = Math.round(totalPrice);
    const max = Math.round(totalPrice * 1.2);
    return { minPrice: min, maxPrice: max };
  }, [structure, area, machineAccess]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP').format(price);
  };

  const scrollToEstimate = () => {
    const element = document.getElementById('estimate-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartEstimate = () => {
    setShowResult(true);
    setTimeout(() => {
      const element = document.getElementById('result-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
            <Hammer className="w-6 h-6" />
            <span>安心解体工業</span>
          </div>
          <button 
            onClick={scrollToEstimate}
            className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
          >
            <Calculator className="w-4 h-4" />
            無料仮見積もり
          </button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/house/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/50 border border-blue-400 text-sm font-bold tracking-wider mb-4">
              はじめての解体工事でも安心
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              明朗会計と近隣配慮で<br className="hidden md:block" />
              選ばれています。
            </h1>
            <p className="text-blue-100 text-base md:text-xl mb-10 leading-relaxed max-w-2xl">
              ご実家の解体、建て替えに伴う取り壊しなど、お気軽にご相談ください。
              不透明な追加費用は一切なし。まずは1分でわかる仮見積もりから！
            </p>
            <button 
              onClick={scrollToEstimate}
              className="group flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] w-full md:w-auto"
            >
              <Calculator className="w-6 h-6" />
              1分でわかるカンタン仮見積もりへ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. 3 Reasons */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">当社が選ばれる3つの理由</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
                title: "明朗会計",
                desc: "不透明な追加費用は一切なし。事前のお見積もりで納得の価格をご提示します。追加工事が必要な場合も必ず事前にご相談します。"
              },
              {
                icon: <Users className="w-10 h-10 text-blue-600" />,
                title: "近隣への徹底配慮",
                desc: "騒音・粉塵対策はもちろん、着工前の近隣へのご挨拶も私たちが責任を持って行います。クレームゼロを目指す丁寧な施工をお約束します。"
              },
              {
                icon: <Wrench className="w-10 h-10 text-blue-600" />,
                title: "自社施工による適正価格",
                desc: "下請けを使わず中間マージンをカット。自社の熟練職人と自社保有の重機を使用することで、高品質かつ適正価格を実現しています。"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base text-left">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Estimation Tool */}
      <section id="estimate-section" className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">1分でわかる！解体費用カンタン仮見積もり</h2>
            <p className="text-slate-600">建物の情報を入力するだけで、おおよその解体費用がすぐにわかります。</p>
          </div>

          <div className="space-y-8">
            {/* Estimation Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">建物の情報を入力してください</h3>
              </div>
              
              <div className="p-6 md:p-8 space-y-8">
                {/* Structure */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Home className="w-4 h-4 text-slate-400" />
                    建物の構造
                  </label>
                  <div className="relative">
                    <select
                      value={structure}
                      onChange={(e) => setStructure(e.target.value as StructureType)}
                      className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-4 pr-10 transition-colors cursor-pointer font-medium"
                    >
                      <option value="wood">木造</option>
                      <option value="steel">鉄骨造</option>
                      <option value="rc">RC（鉄筋コンクリート）造</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Area */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Ruler className="w-4 h-4 text-slate-400" />
                      広さ（坪数）
                    </label>
                    <span className="text-2xl font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-lg border border-blue-100">
                      {area} <span className="text-sm font-bold text-blue-600/80">坪</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-bold px-1">
                    <span>10坪</span>
                    <span>100坪</span>
                  </div>
                </div>

                {/* Machine Access */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Truck className="w-4 h-4 text-slate-400" />
                    重機の搬入可否
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'possible', label: '可能', desc: '道幅が広い' },
                      { id: 'impossible', label: '不可', desc: '手壊しが必要' },
                      { id: 'unknown', label: 'わからない', desc: '現地確認が必要' },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`
                          relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all
                          ${machineAccess === option.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'}
                        `}
                      >
                        <input
                          type="radio"
                          name="machineAccess"
                          value={option.id}
                          checked={machineAccess === option.id}
                          onChange={(e) => setMachineAccess(e.target.value as MachineAccessType)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold ${machineAccess === option.id ? 'text-blue-700' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                          {machineAccess === option.id && (
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <span className={`text-xs font-medium ${machineAccess === option.id ? 'text-blue-600/80' : 'text-slate-500'}`}>
                          {option.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                {!showResult && (
                  <div className="pt-6 border-t border-slate-100">
                    <button
                      onClick={handleStartEstimate}
                      className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-lg"
                    >
                      <Calculator className="w-6 h-6" />
                      見積もりスタート
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Result Section */}
            {showResult && (
              <div id="result-section" className="space-y-8">
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-sm border border-orange-200 overflow-hidden relative"
                  key={`${structure}-${area}-${machineAccess}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
                  <div className="p-8 text-center">
                    <h3 className="text-orange-800 font-bold text-lg mb-6 flex items-center justify-center gap-2">
                      <Building2 className="w-5 h-5" />
                      概算のお見積もり金額
                    </h3>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                          {formatPrice(minPrice)}
                        </span>
                        <span className="text-lg font-bold text-slate-600">円</span>
                      </div>
                      <span className="text-2xl font-bold text-slate-400">〜</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-black text-red-600 tracking-tight">
                          {formatPrice(maxPrice)}
                        </span>
                        <span className="text-lg font-bold text-red-600/80">円</span>
                      </div>
                    </div>
                    
                    <p className="mt-6 text-sm font-medium text-slate-500 bg-white/60 inline-block px-4 py-2 rounded-full">
                      ※上記はあくまで目安です。実際の金額は現地調査後に確定いたします。
                    </p>
                  </div>
                </motion.div>

                {/* Contact Form Section */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="bg-slate-800 px-6 py-5 flex items-center justify-center gap-2">
                    <h2 className="text-lg font-bold text-white text-center">
                      より正確な金額を知るための無料本見積もりはこちら
                    </h2>
                  </div>

                  <div className="p-6 md:p-8">
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">お問い合わせを受け付けました</h3>
                        <p className="text-slate-600 font-medium">
                          担当者より、ご入力いただいた連絡先へ折り返しご連絡いたします。<br/>
                          今しばらくお待ちくださいませ。
                        </p>
                        <button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setShowResult(false);
                            scrollToEstimate();
                          }}
                          className="mt-8 text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4"
                        >
                          最初からやり直す
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">
                            お名前 <span className="text-red-500 text-xs ml-1 font-normal">必須</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors"
                            placeholder="山田 太郎"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">
                            メールアドレス <span className="text-red-500 text-xs ml-1 font-normal">必須</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors"
                            placeholder="taro@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">
                            電話番号 <span className="text-red-500 text-xs ml-1 font-normal">必須</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 transition-colors"
                            placeholder="090-1234-5678"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-lg"
                          >
                            <Send className="w-5 h-5" />
                            この内容で送信する
                          </button>
                          <p className="text-center text-xs font-medium text-slate-500 mt-3">
                            ※送信しても費用は一切発生しません。
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Construction Examples */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">施工事例と参考費用</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-600">これまでに手がけた解体工事の一部をご紹介します。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "木造2階建て住宅",
                specs: "木造 / 30坪 / 重機搬入可",
                price: "約90万円",
                img: "https://picsum.photos/seed/woodhouse/600/400"
              },
              {
                title: "鉄骨造倉庫",
                specs: "鉄骨造 / 50坪 / 重機搬入可",
                price: "約250万円",
                img: "https://picsum.photos/seed/warehouse/600/400"
              },
              {
                title: "店舗内装解体",
                specs: "RC造 / 15坪 / 手壊し",
                price: "約50万円",
                img: "https://picsum.photos/seed/interior/600/400"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    施工事例 {idx + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <Info className="w-4 h-4" />
                    {item.specs}
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-500">参考費用</span>
                    <span className="text-2xl font-black text-red-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Supported Works */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">対応可能な工事一覧</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Home className="w-8 h-8" />, title: "木造家屋解体" },
              { icon: <Building2 className="w-8 h-8" />, title: "鉄骨・RC造解体" },
              { icon: <Hammer className="w-8 h-8" />, title: "内装解体（店舗等）" },
              { icon: <Trash2 className="w-8 h-8" />, title: "外構・ブロック撤去" },
            ].map((work, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
                  {work.icon}
                </div>
                <h3 className="font-bold text-slate-800">{work.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Flow */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">お問い合わせから完了までの流れ</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[
              { title: "お問い合わせ・仮見積もり", desc: "まずは当サイトのフォームよりお気軽にご相談ください。", icon: <Calculator /> },
              { title: "現地調査", desc: "担当者が現地へ伺い、建物の状態や周辺環境を確認します。", icon: <MapPin /> },
              { title: "お見積もり・ご契約", desc: "詳細なお見積もりをご提示します。ご納得いただけましたら契約となります。", icon: <FileText /> },
              { title: "近隣へのご挨拶", desc: "着工前に、当社スタッフが近隣住民の皆様へご挨拶と説明に伺います。", icon: <Users /> },
              { title: "着工・解体工事", desc: "安全第一で、騒音や粉塵に配慮しながら丁寧に解体を進めます。", icon: <HardHat /> },
              { title: "廃棄物の適正処理", desc: "発生した廃材は、法令に基づき適正に分別・運搬・処理を行います。", icon: <Trash2 /> },
              { title: "整地・完了報告", desc: "更地を綺麗に整地し、お客様にご確認いただいて工事完了となります。", icon: <CheckSquare /> },
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-600">{step.icon}</div>
                    <h3 className="font-bold text-lg text-slate-800">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">よくあるご質問</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "見積もりは本当に無料ですか？",
                a: "はい、当サイトでの仮見積もりはもちろん、現地調査から正式なお見積もりのご提示まで完全無料で行っております。お気軽にご相談ください。"
              },
              {
                q: "近隣からクレームが来ないか心配です。",
                a: "着工前に必ず近隣の皆様へご挨拶に伺い、工事のスケジュールや安全対策について丁寧にご説明いたします。防音・防塵シートの設置など、対策も徹底しております。"
              },
              {
                q: "家の中に不用品が残っていても大丈夫ですか？",
                a: "はい、家具や家電などの不用品の処分も合わせて承ることが可能です。お見積もり時にご相談いただければ、処分費用を含めた金額をご提示いたします。"
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex gap-4 items-start">
                    <span className="text-blue-600 font-black text-xl leading-none">Q</span>
                    <span className="font-bold text-slate-800">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50">
                    <div className="flex gap-4 items-start pt-4">
                      <span className="text-orange-500 font-black text-xl leading-none">A</span>
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Company Overview & Area */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              会社概要
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <dl className="space-y-4 text-sm md:text-base">
                <div className="flex border-b border-slate-200 pb-4">
                  <dt className="w-32 font-bold text-slate-700">会社名</dt>
                  <dd className="flex-1 text-slate-600">株式会社 安心解体工業</dd>
                </div>
                <div className="flex border-b border-slate-200 pb-4">
                  <dt className="w-32 font-bold text-slate-700">所在地</dt>
                  <dd className="flex-1 text-slate-600">〒100-0000<br/>東京都千代田区〇〇 1-2-3</dd>
                </div>
                <div className="flex border-b border-slate-200 pb-4">
                  <dt className="w-32 font-bold text-slate-700">電話番号</dt>
                  <dd className="flex-1 text-slate-600">0120-000-000</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-bold text-slate-700">許可番号</dt>
                  <dd className="flex-1 text-slate-600">建設業許可 〇〇県知事（般-〇）第〇〇〇〇号</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              対応エリア
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-[calc(100%-3.5rem)] flex flex-col justify-center">
              <p className="text-slate-600 leading-relaxed mb-6">
                東京都内全域を中心に、以下の周辺エリアまで幅広く対応しております。エリア外の場合でもお気軽にご相談ください。
              </p>
              <ul className="grid grid-cols-2 gap-3 text-slate-700 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" />東京都内全域</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" />埼玉県南部</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" />千葉県西部</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" />神奈川県東部</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} 安心解体工業 All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

