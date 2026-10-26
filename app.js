/**
 * ============================================================================
 * BizPilot AI (مشروعي AI) — Core Simulation Engine & Application Controller
 * Version: 2.0.0
 * Architecture: Digital Business Twin, Deterministic Financial Model,
 *               Dynamic Events & Decision Trees, What-If Sandbox,
 *               Context-Aware AI Business Advisor, Web Audio Synthesizer.
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Audio Synthesizer (Web Audio API)
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playCash() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc1.frequency.setValueAtTime(1046.50, now + 0.24); // C6

      osc2.frequency.setValueAtTime(1046.50, now);
      osc2.frequency.setValueAtTime(1318.51, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    playWarning() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(370, now + 0.12);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    }
  }

  const sound = new SoundEngine();

  // ==========================================================================
  // 2. Preset Industry Templates
  // ==========================================================================
  const PRESET_TEMPLATES = {
    cafe: {
      id: 'cafe',
      icon: '☕',
      title: 'مقهى ومحمصة مختصة (Specialty Cafe)',
      titleEn: 'Specialty Coffee Roastery',
      desc: 'مشروع كافيه عصري يقدم مشروبات القهوة الساخنة والباردة والمخبوزات الخفيفة مع جلسات شبابية.',
      location: 'دمشق — أوتوستراد المزة',
      initialCapital: 12000,
      rent: 850,
      utilities: 180,
      internet: 40,
      marketing: 350,
      taxes: 120,
      misc: 160,
      products: [
        { id: 'p1', name: 'قهوة عربية / إسبريسو', price: 2.0, cogs: 0.45, baseDemand: 900, elasticity: 1.1, unit: 'كوب' },
        { id: 'p2', name: 'لاتيه / كابتشينو كلاسيك', price: 3.5, cogs: 0.85, baseDemand: 1100, elasticity: 1.3, unit: 'كوب' },
        { id: 'p3', name: 'قهوة باردة (Iced V60 / Cold Brew)', price: 4.5, cogs: 1.10, baseDemand: 650, elasticity: 1.4, unit: 'كوب' },
        { id: 'p4', name: 'كيك الشوكولا والتشيز كيك', price: 4.0, cogs: 1.25, baseDemand: 480, elasticity: 1.6, unit: 'قطعة' },
        { id: 'p5', name: 'ساندويش كرواسون تركي', price: 5.0, cogs: 1.60, baseDemand: 320, elasticity: 1.5, unit: 'قطعة' }
      ],
      inventory: [
        { id: 'inv1', name: 'حبوب بن مختص (Coffee Beans)', unit: 'كغ', quantity: 120, unitCost: 16.0, minThreshold: 30, reorderQty: 80 },
        { id: 'inv2', name: 'حليب طازج كامل الدسم', unit: 'لتر', quantity: 300, unitCost: 1.2, minThreshold: 60, reorderQty: 200 },
        { id: 'inv3', name: 'أكواب ورقية وأغطية مصممة', unit: 'قطعة', quantity: 3500, unitCost: 0.12, minThreshold: 800, reorderQty: 3000 },
        { id: 'inv4', name: 'نكهات وسيروب طبيعي', unit: 'عبوة', quantity: 24, unitCost: 8.5, minThreshold: 6, reorderQty: 18 }
      ],
      staff: [
        { id: 's1', name: 'سامر النجار', role: 'رئيس الباريستا (Head Barista)', salary: 500, productivity: 0.95, hours: 8, absentProb: 0.04 },
        { id: 's2', name: 'نور الدين', role: 'باريستا ومساعد', salary: 380, productivity: 0.88, hours: 8, absentProb: 0.06 },
        { id: 's3', name: 'ميساء خليل', role: 'كاشير وخدمة عملاء', salary: 360, productivity: 0.90, hours: 8, absentProb: 0.05 }
      ],
      competitors: [
        { id: 'c1', name: 'Artisan Brew Hub', priceIndex: 1.1, marketingSpend: 600, marketShare: 35, strategy: 'جودة فائقة وسعر مرتفع' },
        { id: 'c2', name: 'QuickCup Express', priceIndex: 0.85, marketingSpend: 250, marketShare: 25, strategy: 'أسعار منخفضة وخدمة سريعة' },
        { id: 'c3', name: 'Cafe Relax', priceIndex: 1.0, marketingSpend: 300, marketShare: 20, strategy: 'جلسات عائلية هادئة' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'الطلاب والجامعيون', share: 0.40, priceSensitivity: 1.6, qualitySensitivity: 0.9, avgTicket: 3.8 },
        { id: 'seg2', name: 'المهنيون ورواد الأعمال', share: 0.35, priceSensitivity: 0.8, qualitySensitivity: 1.7, avgTicket: 7.5 },
        { id: 'seg3', name: 'العائلات والأصدقاء', share: 0.25, priceSensitivity: 1.1, qualitySensitivity: 1.2, avgTicket: 12.0 }
      ]
    },

    restaurant: {
      id: 'restaurant',
      icon: '🍔',
      title: 'مطعم برجر ووجبات سريعة (Burger Diner)',
      titleEn: 'Gourmet Burger Diner',
      desc: 'مطعم وجبات سريعة راقية يقدم سندويشات البرجر الطازج، البطاطا المقرمشة والمشروبات.',
      location: 'الرياض — حي الصحافة',
      initialCapital: 30000,
      rent: 2200,
      utilities: 450,
      internet: 60,
      marketing: 800,
      taxes: 350,
      misc: 400,
      products: [
        { id: 'p1', name: 'سماش برجر كلاسيك', price: 7.5, cogs: 2.40, baseDemand: 1400, elasticity: 1.2, unit: 'وجبة' },
        { id: 'p2', name: 'دبل تشيز برجر تروبل', price: 9.5, cogs: 3.10, baseDemand: 950, elasticity: 1.4, unit: 'وجبة' },
        { id: 'p3', name: 'برجر دجاج كرسبي حار', price: 6.5, cogs: 1.90, baseDemand: 1200, elasticity: 1.1, unit: 'وجبة' },
        { id: 'p4', name: 'بطاطا مبهرة مع صوص خاص', price: 3.0, cogs: 0.60, baseDemand: 2100, elasticity: 1.3, unit: 'علبة' },
        { id: 'p5', name: 'ميلك شيك لوتس وفراولة', price: 4.5, cogs: 1.10, baseDemand: 800, elasticity: 1.5, unit: 'كوب' }
      ],
      inventory: [
        { id: 'inv1', name: 'لحم أنجوس مفروم طازج', unit: 'كغ', quantity: 280, unitCost: 9.0, minThreshold: 60, reorderQty: 200 },
        { id: 'inv2', name: 'خبز بريوش طازج يومي', unit: 'قطعة', quantity: 3500, unitCost: 0.35, minThreshold: 600, reorderQty: 2500 },
        { id: 'inv3', name: 'أجبان وصلصات خاصة', unit: 'عبوة', quantity: 150, unitCost: 4.5, minThreshold: 30, reorderQty: 100 },
        { id: 'inv4', name: 'بطاطا مجمدة وتوابل', unit: 'كغ', quantity: 450, unitCost: 1.5, minThreshold: 100, reorderQty: 350 }
      ],
      staff: [
        { id: 's1', name: 'الشيف كريم', role: 'رئيس الطهاة (Head Chef)', salary: 900, productivity: 0.94, hours: 8, absentProb: 0.03 },
        { id: 's2', name: 'طارق', role: 'طباخ شواية (Grill Cook)', salary: 600, productivity: 0.90, hours: 8, absentProb: 0.05 },
        { id: 's3', name: 'فادي', role: 'مساعد تجهيز وتغليف', salary: 450, productivity: 0.85, hours: 8, absentProb: 0.06 },
        { id: 's4', name: 'ريان', role: 'كاشير وخدمة صالة', salary: 500, productivity: 0.92, hours: 8, absentProb: 0.04 }
      ],
      competitors: [
        { id: 'c1', name: 'Burger Shack Master', priceIndex: 1.05, marketingSpend: 1200, marketShare: 40, strategy: 'حملات تيك توك ومشاهير' },
        { id: 'c2', name: 'Smash & Go', priceIndex: 0.90, marketingSpend: 500, marketShare: 30, strategy: 'عروض وجبات كومبو موفرة' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'الشباب وعشاق البرجر', share: 0.55, priceSensitivity: 1.2, qualitySensitivity: 1.5, avgTicket: 11.5 },
        { id: 'seg2', name: 'العائلات وطلبات التوصيل', share: 0.35, priceSensitivity: 1.0, qualitySensitivity: 1.1, avgTicket: 24.0 },
        { id: 'seg3', name: 'موظفو المكاتب بالغداء', share: 0.10, priceSensitivity: 1.4, qualitySensitivity: 0.9, avgTicket: 8.5 }
      ]
    },

    retail: {
      id: 'retail',
      icon: '👗',
      title: 'بوتيك ملابس وأزياء (Fashion Boutique)',
      titleEn: 'Urban Fashion Boutique',
      desc: 'متجر ملابس أنيق للملابس الكاجوال والقطع الحصرية مع مبيعات صالة ومتجر إنستغرام.',
      location: 'دبي — مول دبي مارينا',
      initialCapital: 20000,
      rent: 1600,
      utilities: 220,
      internet: 50,
      marketing: 600,
      taxes: 180,
      misc: 200,
      products: [
        { id: 'p1', name: 'هودي وكنزة شتوية مطرزة', price: 38.0, cogs: 14.0, baseDemand: 160, elasticity: 1.3, unit: 'قطعة' },
        { id: 'p2', name: 'تي شيرت كاجوال قطن 100%', price: 22.0, cogs: 6.5, baseDemand: 340, elasticity: 1.4, unit: 'قطعة' },
        { id: 'p3', name: 'بنطال جينز عصري', price: 45.0, cogs: 17.0, baseDemand: 180, elasticity: 1.2, unit: 'قطعة' },
        { id: 'p4', name: 'إكسسوارات وحقائب قماشية', price: 15.0, cogs: 4.0, baseDemand: 220, elasticity: 1.5, unit: 'قطعة' }
      ],
      inventory: [
        { id: 'inv1', name: 'مخزون ملابس جاهزة للموسم', unit: 'قطعة', quantity: 950, unitCost: 11.0, minThreshold: 200, reorderQty: 500 },
        { id: 'inv2', name: 'أكياس وتغليف هدايا راقي', unit: 'علبة', quantity: 1200, unitCost: 0.8, minThreshold: 250, reorderQty: 800 }
      ],
      staff: [
        { id: 's1', name: 'لينا الباشا', role: 'مديرة مبيعات ومصممة', salary: 750, productivity: 0.94, hours: 8, absentProb: 0.03 },
        { id: 's2', name: 'مايا', role: 'أخصائية مبيعات وإنستغرام', salary: 500, productivity: 0.90, hours: 8, absentProb: 0.05 }
      ],
      competitors: [
        { id: 'c1', name: 'Zara & Fast Fashion', priceIndex: 1.15, marketingSpend: 2500, marketShare: 50, strategy: 'تنوع هائل وعلامة عالمية' },
        { id: 'c2', name: 'Local Vibe Store', priceIndex: 0.95, marketingSpend: 400, marketShare: 20, strategy: 'تصاميم محلية وشبابية' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'عشاق الموضة والإنستغرام', share: 0.50, priceSensitivity: 0.9, qualitySensitivity: 1.6, avgTicket: 65.0 },
        { id: 'seg2', name: 'المتسوقون الباحثون عن عروض', share: 0.35, priceSensitivity: 1.7, qualitySensitivity: 0.9, avgTicket: 32.0 },
        { id: 'seg3', name: 'مشترو الهدايا', share: 0.15, priceSensitivity: 0.7, qualitySensitivity: 1.4, avgTicket: 85.0 }
      ]
    },

    salon: {
      id: 'salon',
      icon: '💇',
      title: 'صالون حلاقة وعناية (Beauty & Grooming)',
      titleEn: 'VIP Grooming Lounge',
      desc: 'مركز عناية شخصية وحلاقة راقية مع خدمات متكاملة، مساج، وعناية بالبشرة.',
      location: 'عمان — عبدون',
      initialCapital: 15000,
      rent: 900,
      utilities: 250,
      internet: 40,
      marketing: 300,
      taxes: 110,
      misc: 180,
      products: [
        { id: 'p1', name: 'قص شعر وتصفيف VIP', price: 12.0, cogs: 1.20, baseDemand: 380, elasticity: 1.1, unit: 'خدمة' },
        { id: 'p2', name: 'عناية بالبشرة وتنظيف عميق', price: 25.0, cogs: 3.50, baseDemand: 160, elasticity: 1.3, unit: 'خدمة' },
        { id: 'p3', name: 'باقة العناية الشاملة للرجل', price: 35.0, cogs: 5.00, baseDemand: 110, elasticity: 1.2, unit: 'باقة' },
        { id: 'p4', name: 'منتجات وزيوت تصفيف مبيعات', price: 18.0, cogs: 8.00, baseDemand: 95, elasticity: 1.5, unit: 'عبوة' }
      ],
      inventory: [
        { id: 'inv1', name: 'مستحضرات وكريمات عناية بالبشرة', unit: 'عبوة', quantity: 180, unitCost: 4.5, minThreshold: 30, reorderQty: 100 },
        { id: 'inv2', name: 'فوط وأدوات تعقيم للاستخدام الواحد', unit: 'طقم', quantity: 1500, unitCost: 0.25, minThreshold: 300, reorderQty: 1000 }
      ],
      staff: [
        { id: 's1', name: 'مصفف رئيسي أيهم', role: 'خبير تصفيف (Master Barber)', salary: 650, productivity: 0.95, hours: 9, absentProb: 0.04 },
        { id: 's2', name: 'مساعد حلاق بلال', role: 'مساعد وغسيل', salary: 380, productivity: 0.88, hours: 9, absentProb: 0.07 }
      ],
      competitors: [
        { id: 'c1', name: 'The Executive Lounge', priceIndex: 1.3, marketingSpend: 500, marketShare: 35, strategy: 'خدمات فاخرة جداً' },
        { id: 'c2', name: 'Classic Barber', priceIndex: 0.75, marketingSpend: 100, marketShare: 40, strategy: 'حلاقة شعبية سريعة' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'زبائن اشتراكات شهرية دائمة', share: 0.45, priceSensitivity: 0.8, qualitySensitivity: 1.8, avgTicket: 22.0 },
        { id: 'seg2', name: 'الشباب والزيارات الدورية', share: 0.40, priceSensitivity: 1.2, qualitySensitivity: 1.2, avgTicket: 14.0 },
        { id: 'seg3', name: 'عرسان ومناسبات خاصة', share: 0.15, priceSensitivity: 0.6, qualitySensitivity: 1.9, avgTicket: 55.0 }
      ]
    },

    home: {
      id: 'home',
      icon: '🏠',
      title: 'مشروع حلويات ومخبوزات منزلي (Home Bakery)',
      titleEn: 'Artisan Home Bakery',
      desc: 'مشروع منزلي لصناعة كيك المناسبات والسينابون والمعجنات الفاخرة عبر الطلب المسبق.',
      location: 'القاهرة — المعادي',
      initialCapital: 4000,
      rent: 0, // No retail rent
      utilities: 90,
      internet: 30,
      marketing: 200,
      taxes: 40,
      misc: 80,
      products: [
        { id: 'p1', name: 'كيك عيد ميلاد مخصص (Custom Cake)', price: 32.0, cogs: 9.00, baseDemand: 55, elasticity: 1.2, unit: 'قالب' },
        { id: 'p2', name: 'بوكس سينابون كلاسيك (6 قطع)', price: 14.0, cogs: 3.50, baseDemand: 160, elasticity: 1.4, unit: 'بوكس' },
        { id: 'p3', name: 'تارت فواكه وميني تشيز كيك', price: 18.0, cogs: 4.80, baseDemand: 90, elasticity: 1.3, unit: 'طبق' }
      ],
      inventory: [
        { id: 'inv1', name: 'دقيق فاخر وزبدة فرنسية', unit: 'كغ', quantity: 90, unitCost: 3.5, minThreshold: 20, reorderQty: 60 },
        { id: 'inv2', name: 'شوكولا بلجيكية وعجينة سكر', unit: 'كغ', quantity: 35, unitCost: 12.0, minThreshold: 8, reorderQty: 25 },
        { id: 'inv3', name: 'علب كيك وتغليف فاخر', unit: 'قطعة', quantity: 300, unitCost: 1.1, minThreshold: 60, reorderQty: 200 }
      ],
      staff: [
        { id: 's1', name: 'الشيف منى (صاحبة المشروع)', role: 'شيف حلويات وتسويق', salary: 450, productivity: 0.98, hours: 8, absentProb: 0.02 }
      ],
      competitors: [
        { id: 'c1', name: 'Sweet Bakery Shop', priceIndex: 1.1, marketingSpend: 400, marketShare: 45, strategy: 'محل تجاري ومبيعات فورية' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'أمهات وحفلات أعياد ميلاد', share: 0.60, priceSensitivity: 1.0, qualitySensitivity: 1.7, avgTicket: 38.0 },
        { id: 'seg2', name: 'طلبات هدايا وجمعات الأصدقاء', share: 0.40, priceSensitivity: 1.3, qualitySensitivity: 1.3, avgTicket: 19.0 }
      ]
    },

    electronics: {
      id: 'electronics',
      icon: '📱',
      title: 'متجر إلكترونيات وصيانة (Gadgets & Repair)',
      titleEn: 'Tech & Repair Hub',
      desc: 'بيع ملحقات الهواتف، الشواحن، السماعات، وخدمات الصيانة الفورية للشاشات والبطاريات.',
      location: 'دمشق — الصالحية',
      initialCapital: 18000,
      rent: 1100,
      utilities: 190,
      internet: 50,
      marketing: 400,
      taxes: 140,
      misc: 220,
      products: [
        { id: 'p1', name: 'صيانة وتبديل شاشات وبطاريات', price: 35.0, cogs: 14.0, baseDemand: 130, elasticity: 1.1, unit: 'خدمة' },
        { id: 'p2', name: 'شواحن وبنوك طاقة أصلية', price: 20.0, cogs: 9.0, baseDemand: 220, elasticity: 1.3, unit: 'قطعة' },
        { id: 'p3', name: 'سماعات بلوتوث ولاسلكية', price: 28.0, cogs: 12.5, baseDemand: 140, elasticity: 1.4, unit: 'قطعة' },
        { id: 'p4', name: 'كفرات وحماية زجاجية للشاشة', price: 8.0, cogs: 1.5, baseDemand: 450, elasticity: 1.5, unit: 'قطعة' }
      ],
      inventory: [
        { id: 'inv1', name: 'قطع غيار شاشات وبطاريات', unit: 'قطعة', quantity: 140, unitCost: 12.0, minThreshold: 30, reorderQty: 80 },
        { id: 'inv2', name: 'إكسسوارات وسماعات معبأة', unit: 'قطعة', quantity: 500, unitCost: 6.0, minThreshold: 100, reorderQty: 300 }
      ],
      staff: [
        { id: 's1', name: 'فني صيانة مهندس وسيم', role: 'فني صيانة إلكترونيات', salary: 650, productivity: 0.94, hours: 8, absentProb: 0.04 },
        { id: 's2', name: 'كاشير مبيعات حمزة', role: 'مسؤول مبيعات', salary: 400, productivity: 0.90, hours: 8, absentProb: 0.05 }
      ],
      competitors: [
        { id: 'c1', name: 'Digital City Express', priceIndex: 1.05, marketingSpend: 800, marketShare: 40, strategy: 'إعلانات ممولة وموقع كبير' }
      ],
      customerSegments: [
        { id: 'seg1', name: 'مستخدمو هواتف يبحثون عن صيانة فورية', share: 0.50, priceSensitivity: 1.0, qualitySensitivity: 1.8, avgTicket: 36.0 },
        { id: 'seg2', name: 'عشاق الإكسسوارات والشواحن', share: 0.50, priceSensitivity: 1.4, qualitySensitivity: 1.1, avgTicket: 16.0 }
      ]
    }
  };

  // ==========================================================================
  // 3. Gamified Business Challenges
  // ==========================================================================
  const CHALLENGES = [
    {
      id: 'ch1',
      tag: 'تحدي #001',
      title: '🛡️ تحدي البقاء مع رأس مال $10,000',
      desc: 'ابدأ مقهى بميزانية محدودة ($10,000). هدفك هو الوصول إلى نهاية الشهر 12 برصيد كاش لا يقل عن $13,000 دون الوقوع في عجز سيولة.',
      xp: 500,
      rules: ['رأس المال الأولي $10k فقط', 'عدم نفاذ المخزون أكثر من مرتين', 'إنهاء السنة بربح تشغيلي إيجابي'],
      presetId: 'cafe',
      capitalOverride: 10000
    },
    {
      id: 'ch2',
      tag: 'تحدي #002',
      title: '⚔️ حرب الأسعار وحصار المنافسين',
      desc: 'منافس ضخم يفتح بجوارك ويخفض أسعاره بنسبة 20% مع حملات دعائية شرسة. هل تستطيع الصمود وحماية حصتك السوقية؟',
      xp: 750,
      rules: ['انخفاض الطلب الأولي 25%', 'مطلوب استراتيجية تسعير وتسويق ذكية', 'تحقيق هامش ربح لا يقل عن 18%'],
      presetId: 'restaurant',
      capitalOverride: 25000
    },
    {
      id: 'ch3',
      tag: 'تحدي #003',
      title: '📈 معضلة التوسع وفتح الفرع الثاني',
      desc: 'بعد 6 أشهر من الأرباح القوية، يعرض عليك المستثمر التوسع وفتح فرع جديد. هل التوقيت مناسب أم ستستنزف سيولتك؟',
      xp: 900,
      rules: ['إدارة تدفقات الكاش بدقة', 'مضاعفة الإيرادات مع التحكم بالتكاليف', 'تجنب فخ النمو المتسرع'],
      presetId: 'cafe',
      capitalOverride: 18000
    },
    {
      id: 'ch4',
      tag: 'تحدي #004',
      title: '⚡ أزمة سلاسل التوريد وارتفاع التكاليف 15%',
      desc: 'ارتفعت أسعار المواد الخام العالمية بنسبة 15%. مطلوب إعادة هندسة المنتجات والتسعير دون خسارة الزبائن.',
      xp: 650,
      rules: ['ارتفاع COGS بنسبة 15%', 'مطلوب الحفاظ على رضا الزبائن', 'الوصول إلى نقطة التعادل قبل الشهر 6'],
      presetId: 'retail',
      capitalOverride: 15000
    }
  ];

  // ==========================================================================
  // 4. Dynamic Market Events Library (Events Engine)
  // ==========================================================================
  const MARKET_EVENTS = [
    {
      id: 'evt_supplier_hike',
      monthTrigger: [2, 3, 5],
      title: '⚠️ ارتفاع مفاجئ في أسعار المواد الخام (+15%)',
      desc: 'أبلغك المورد الرئيسي بارتفاع تكلفة المواد الخام بنسبة 15% نتيجة تقلبات الاستيراد وأسعار الشحن.',
      impactSummary: 'سيرتفع COGS بمقدار 15% ما لم تتخذ إجراءً مضاداً.',
      options: [
        {
          letter: 'A',
          text: 'قبول الزيادة وامتصاص التكلفة من هامش الربح',
          impact: { cogsMult: 1.15, priceMult: 1.0, satisfaction: 1.05, desc: 'حماية الزبائن مع تراجع مؤقت في الأرباح' }
        },
        {
          letter: 'B',
          text: 'البحث عن مورد بديل محلي أرخص قليلاً',
          impact: { cogsMult: 1.02, priceMult: 1.0, satisfaction: 0.94, desc: 'توفير التكلفة مع انخفاض طفيف في جودة بعض المواد' }
        },
        {
          letter: 'C',
          text: 'رفع أسعار المنتجات بنسبة 8% لتغطية التكلفة',
          impact: { cogsMult: 1.15, priceMult: 1.08, demandMult: 0.92, desc: 'حماية الهامش مع احتمال انخفاض طفيف في حجم المبيعات' }
        },
        {
          letter: 'D',
          text: 'تقليل حجم الحصص بنسبة 5% دون تغيير السعر (Shrinkflation)',
          impact: { cogsMult: 1.05, priceMult: 1.0, satisfaction: 0.88, desc: 'توفير المواد لكن بعض الزبائن الدائمين قد يلاحظون ذلك' }
        }
      ]
    },
    {
      id: 'evt_competitor_war',
      monthTrigger: [3, 4, 7],
      title: '📉 افتتاح منافس جديد وحرب أسعار قريبة',
      desc: 'افتتح منافس جديد في نفس الشارع ويقدم خصماً ترويجياً بنسبة 20% مع توزيع هدايا مجانية.',
      impactSummary: 'خطر سحب 20% إلى 30% من زبائنك خلال الشهرين القادمين.',
      options: [
        {
          letter: 'A',
          text: 'مطابقة الخصم وتخفيض الأسعار بنسبة 15%',
          impact: { priceMult: 0.85, demandMult: 1.15, desc: 'حماية حجم المبيعات على حساب هامش الربح' }
        },
        {
          letter: 'B',
          text: 'مضاعفة الإنفاق التسويقي وإبراز الجودة الحصرية',
          impact: { marketingDelta: 400, demandMult: 1.10, desc: 'جذب شريحة الزبائن الباحثة عن التميز بدلاً من الرخص' }
        },
        {
          letter: 'C',
          text: 'إطلاق برنامج ولاء (اشترِ 5 واحصل على 1 مجاناً)',
          impact: { cogsMult: 1.06, demandMult: 1.20, satisfaction: 1.15, desc: 'تعزيز ولاء الزبائن الدائمين ورفع معدل تكرار الزيارة' }
        },
        {
          letter: 'D',
          text: 'تجاهل المنافس والتركيز على ثبات التجربة',
          impact: { demandMult: 0.85, desc: 'انخفاض مؤقت بالطلب حتى انتهاء فترة عروض المنافس الافتتاحية' }
        }
      ]
    },
    {
      id: 'evt_staff_crisis',
      monthTrigger: [4, 6, 9],
      title: '👥 غياب مفاجئ لواحد من الكوادر الأساسية',
      desc: 'تعرض أحد موظفيك لوعكة صحية وسيغيب لمدة أسبوعين في فترة ذروة الطلب.',
      impactSummary: 'انخفاض الطاقة الاستيعابية وبطء الخدمة.',
      options: [
        {
          letter: 'A',
          text: 'الاستعانة بموظف مؤقت بدوام جزئي بتكلفة إضافية $200',
          impact: { cashDelta: -200, capacityMult: 1.0, desc: 'الحفاظ على سرعة الخدمة ورضا الزبائن بالكامل' }
        },
        {
          letter: 'B',
          text: 'توزيع الساعات على بقية الفريق مع دفع مكافأة ساعات إضافية $100',
          impact: { cashDelta: -100, capacityMult: 0.95, desc: 'ضغط عمل متوسط على الكادر مع الحفاظ على الإنتاجية' }
        },
        {
          letter: 'C',
          text: 'عدم اتخاذ إجراء والاعتماد على الكادر الحالي فقط',
          impact: { capacityMult: 0.78, satisfaction: 0.88, desc: 'تأخر في تلبية الطلبات وارتفاع طوابير الانتظار' }
        }
      ]
    },
    {
      id: 'evt_viral_trend',
      monthTrigger: [5, 8, 10],
      title: '🚀 انتشار إيجابي واسع على وسائل التواصل (Viral Post)',
      desc: 'نشر صانع محتوى شهير مراجعة إيجابية جداً عن منتجك المميز وتجاوز الفيديو 200 ألف مشاهدة!',
      impactSummary: 'تدفق غير مسبوق للزبائن الجدد (+35% زيادة في الطلب).',
      options: [
        {
          letter: 'A',
          text: 'طلب توريد مخزون إضافي عاجل وتكثيف ساعات العمل',
          impact: { cashDelta: -350, demandMult: 1.40, desc: 'استغلال الموجة بالكامل وتحقيق مبيعات قياسية' }
        },
        {
          letter: 'B',
          text: 'إطلاق منتج حصري محدود بسعر أعلى',
          impact: { priceMult: 1.05, demandMult: 1.25, desc: 'رفع متوسط قيمة الفاتورة وتحقيق أرباح ممتازة' }
        },
        {
          letter: 'C',
          text: 'الاستمرار بالطاقة العادية لتجنب المخاطرة',
          impact: { demandMult: 1.10, desc: 'استيعاب جزء من الطلب مع نفاذ سريع لبعض المنتجات' }
        }
      ]
    },
    {
      id: 'evt_rent_renewal',
      monthTrigger: [6, 11],
      title: '🏢 مطالبة المالك بزيادة الإيجار السنوي 15%',
      desc: 'مع اقتراب تجديد العقد، طلب مالك العقار زيادة في الإيجار الشهري بقيمة $150 بحجة غلاء الأسعار في المنطقة.',
      impactSummary: 'تأثير مباشر على مصاريفك التشغيلية الثابتة ونقطة التعادل.',
      options: [
        {
          letter: 'A',
          text: 'التفاوض وتوقيع عقد لسنتين بزيادة مخفضة $75 فقط',
          impact: { rentDelta: 75, desc: 'حل وسط يوفر استقراراً للمشروع لسنتين' }
        },
        {
          letter: 'B',
          text: 'قبول الزيادة الكاملة $150 للحفاظ على الموقع المميز',
          impact: { rentDelta: 150, desc: 'ارتفاع في مصاريف OPEX الشهرية' }
        },
        {
          letter: 'C',
          text: 'الرفض والبحث عن خيار نقل أو تقليص مساحة',
          impact: { cashDelta: -500, rentDelta: -100, desc: 'تكلفة انتقال وتجهيز لمرة واحدة مع توفير شهري لاحق' }
        }
      ]
    },
    {
      id: 'evt_equipment_breakdown',
      monthTrigger: [7, 10],
      title: '⚡ عطل مفاجئ في إحدى المعدات الرئيسية',
      desc: 'تعطل جهاز التحضير / التبريد الرئيسي ويحتاج صيانة فورية أو استبدال لتجنب إيقاف العمل.',
      impactSummary: 'تكلفة صيانة طارئة أو توقف خط إنتاج.',
      options: [
        {
          letter: 'A',
          text: 'إصلاح عاجل مع قطع غيار أصلية وضمان ($350)',
          impact: { cashDelta: -350, capacityMult: 1.0, desc: 'استئناف العمل بكامل الكفاءة خلال 24 ساعة' }
        },
        {
          letter: 'B',
          text: 'شراء جهاز جديد بالتقسيط بدفعة أولى $200 وقسط $50 شهرياً',
          impact: { cashDelta: -200, rentDelta: 50, capacityMult: 1.05, desc: 'معدة حديثة ترفع سرعة الإنتاج قليلاً' }
        },
        {
          letter: 'C',
          text: 'ترقيع مؤقت رخيص ($80)',
          impact: { cashDelta: -80, capacityMult: 0.85, desc: 'توفير الكاش لكن مع احتمال تكرار العطل بنسبة 40%' }
        }
      ]
    }
  ];

  // Seasonality factors for 12 months (1=Spring, 4=Summer, 7=Autumn, 10=Winter)
  const SEASONALITY_CURVE = [
    { month: 1, name: 'شهر 1 — ربيع معتدل', factor: 1.00, season: 'الربيع', icon: 'fa-leaf' },
    { month: 2, name: 'شهر 2 — نشاط متزايد', factor: 1.05, season: 'الربيع', icon: 'fa-leaf' },
    { month: 3, name: 'شهر 3 — ذروة الربيع', factor: 1.08, season: 'الربيع', icon: 'fa-leaf' },
    { month: 4, name: 'شهر 4 — بداية الصيف والحرارة', factor: 1.15, season: 'الصيف', icon: 'fa-sun' },
    { month: 5, name: 'شهر 5 — ذروة الصيف والمشروبات الباردة', factor: 1.20, season: 'الصيف', icon: 'fa-sun' },
    { month: 6, name: 'شهر 6 — موسم الإجازات', factor: 1.12, season: 'الصيف', icon: 'fa-sun' },
    { month: 7, name: 'شهر 7 — عودة المدارس والجامعات', factor: 1.25, season: 'الخريف', icon: 'fa-tree' },
    { month: 8, name: 'شهر 8 — خريف مستقر', factor: 1.10, season: 'الخريف', icon: 'fa-tree' },
    { month: 9, name: 'شهر 9 — بداية البرد', factor: 1.05, season: 'الخريف', icon: 'fa-tree' },
    { month: 10, name: 'شهر 10 — ذروة الشتاء والمشروبات الساخنة', factor: 1.18, season: 'الشتاء', icon: 'fa-snowflake' },
    { month: 11, name: 'شهر 11 — موسم الأعياد والعروض', factor: 1.30, season: 'الشتاء', icon: 'fa-snowflake' },
    { month: 12, name: 'شهر 12 — اختتام السنة المالية', factor: 1.22, season: 'الشتاء', icon: 'fa-snowflake' }
  ];

  // ==========================================================================
  // 5. Global State
  // ==========================================================================
  const state = {
    business: null, // The active digital twin model
    currentMonth: 1,
    isSimulating: false,
    simSpeed: 1, // 1x or 2x
    history: [], // Month by month snapshots [1..12]
    dilemmas: [], // Active dilemma cards in Decision Center
    decisionHistory: [], // Log of choices made
    alertsStream: [], // Live alerts
    entrepreneurXP: 0,
    entrepreneurLevel: '🌱 صانع مشاريع مبتدئ',
    activeChallenge: null,
    ui: {
      activeTab: 'tabOverview',
      theme: 'dark',
      lang: 'ar',
      sound: true
    },
    whatIf: {
      priceDeltaPct: 0,
      marketingVal: 300,
      staffDelta: 0,
      rentDeltaPct: 0,
      calculated: null
    }
  };

  // ==========================================================================
  // 6. DOM Element References
  // ==========================================================================
  const DOM = {
    topHeader: document.getElementById('topHeader'),
    activeBizPill: document.getElementById('activeBizPill'),
    headerBizIcon: document.getElementById('headerBizIcon'),
    headerBizName: document.getElementById('headerBizName'),
    headerBizMeta: document.getElementById('headerBizMeta'),
    headerMonthNum: document.getElementById('headerMonthNum'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundIcon: document.getElementById('soundIcon'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    langToggleBtn: document.getElementById('langToggleBtn'),
    langText: document.getElementById('langText'),
    btnNewProject: document.getElementById('btnNewProject'),
    btnSaasModal: document.getElementById('btnSaasModal'),

    // Views
    viewLanding: document.getElementById('viewLanding'),
    viewDashboard: document.getElementById('viewDashboard'),

    // Landing Elements
    nlPromptInput: document.getElementById('nlPromptInput'),
    btnNlGenerate: document.getElementById('btnNlGenerate'),
    presetGrid: document.getElementById('presetGrid'),
    challengesGrid: document.getElementById('challengesGrid'),
    btnOpenCustomWizard: document.getElementById('btnOpenCustomWizard'),

    // Dashboard Elements
    seasonBadge: document.getElementById('seasonBadge'),
    seasonIcon: document.getElementById('seasonIcon'),
    seasonName: document.getElementById('seasonName'),
    timelineStepper: document.getElementById('timelineStepper'),
    currentMonthText: document.getElementById('currentMonthText'),
    entrepreneurBadge: document.getElementById('entrepreneurBadge'),
    levelTitle: document.getElementById('levelTitle'),
    xpPill: document.getElementById('xpPill'),
    btnAutoSimulate: document.getElementById('btnAutoSimulate'),
    btnNextMonth: document.getElementById('btnNextMonth'),
    btnResetSim: document.getElementById('btnResetSim'),
    alertsStreamContainer: document.getElementById('alertsStreamContainer'),

    // KPIs
    kpiRevenue: document.getElementById('kpiRevenue'),
    kpiRevenueChange: document.getElementById('kpiRevenueChange'),
    kpiCustomersCount: document.getElementById('kpiCustomersCount'),
    kpiExpenses: document.getElementById('kpiExpenses'),
    kpiCogsVal: document.getElementById('kpiCogsVal'),
    kpiOpexVal: document.getElementById('kpiOpexVal'),
    kpiNetProfit: document.getElementById('kpiNetProfit'),
    cardNetProfit: document.getElementById('cardNetProfit'),
    iconProfit: document.getElementById('iconProfit'),
    kpiProfitMargin: document.getElementById('kpiProfitMargin'),
    kpiProfitStatus: document.getElementById('kpiProfitStatus'),
    kpiCashBalance: document.getElementById('kpiCashBalance'),
    kpiRunway: document.getElementById('kpiRunway'),
    kpiInitialCapital: document.getElementById('kpiInitialCapital'),

    // Sub Metrics
    metricBreakEven: document.getElementById('metricBreakEven'),
    metricROI: document.getElementById('metricROI'),
    metricCapacity: document.getElementById('metricCapacity'),
    metricStockDays: document.getElementById('metricStockDays'),

    // Cockpit Navigation
    cockpitNav: document.querySelector('.cockpit-nav'),
    decisionsBadge: document.getElementById('decisionsBadge'),

    // Tab Contents
    tabOverview: document.getElementById('tabOverview'),
    tabDecisions: document.getElementById('tabDecisions'),
    tabWhatIf: document.getElementById('tabWhatIf'),
    tabAiAdvisor: document.getElementById('tabAiAdvisor'),
    tabInventory: document.getElementById('tabInventory'),
    tabStaff: document.getElementById('tabStaff'),
    tabMarket: document.getElementById('tabMarket'),
    tabReport: document.getElementById('tabReport'),

    // Tab Specific
    timelineChartSvg: document.getElementById('timelineChartSvg'),
    productsSalesTable: document.getElementById('productsSalesTable'),
    overviewAiDiagnostic: document.getElementById('overviewAiDiagnostic'),
    btnGoToAiTab: document.getElementById('btnGoToAiTab'),
    btnQuickOptimize: document.getElementById('btnQuickOptimize'),
    dilemmasContainer: document.getElementById('dilemmasContainer'),
    decisionHistoryList: document.getElementById('decisionHistoryList'),

    // What If
    sliderPriceChange: document.getElementById('sliderPriceChange'),
    valSliderPrice: document.getElementById('valSliderPrice'),
    sliderMarketing: document.getElementById('sliderMarketing'),
    valSliderMarketing: document.getElementById('valSliderMarketing'),
    sliderStaff: document.getElementById('sliderStaff'),
    valSliderStaff: document.getElementById('valSliderStaff'),
    sliderRent: document.getElementById('sliderRent'),
    valSliderRent: document.getElementById('valSliderRent'),
    btnSimulateScenario: document.getElementById('btnSimulateScenario'),
    whatIfCompareTbody: document.getElementById('whatIfCompareTbody'),
    whatIfVerdictText: document.getElementById('whatIfVerdictText'),
    btnApplyWhatIfToMain: document.getElementById('btnApplyWhatIfToMain'),

    // AI Advisor
    aiDiagnosticBreakdown: document.getElementById('aiDiagnosticBreakdown'),
    aiSuggestionsList: document.getElementById('aiSuggestionsList'),
    chatBizName: document.getElementById('chatBizName'),
    chatMessagesScroll: document.getElementById('chatMessagesScroll'),
    chatInputForm: document.getElementById('chatInputForm'),
    chatUserInput: document.getElementById('chatUserInput'),
    btnClearChat: document.getElementById('btnClearChat'),

    // Inventory & Staff & Market
    inventoryMetersGrid: document.getElementById('inventoryMetersGrid'),
    btnRestockAll: document.getElementById('btnRestockAll'),
    wastageReportText: document.getElementById('wastageReportText'),
    staffRosterGrid: document.getElementById('staffRosterGrid'),
    btnHireModal: document.getElementById('btnHireModal'),
    competitorsGrid: document.getElementById('competitorsGrid'),
    segmentsGrid: document.getElementById('segmentsGrid'),

    // Report
    reportBizTitle: document.getElementById('reportBizTitle'),
    reportMetaInfo: document.getElementById('reportMetaInfo'),
    repStartCapital: document.getElementById('repStartCapital'),
    repTotalRevenue: document.getElementById('repTotalRevenue'),
    repTotalExpenses: document.getElementById('repTotalExpenses'),
    repNetResult: document.getElementById('repNetResult'),
    repEndingCash: document.getElementById('repEndingCash'),
    repROI: document.getElementById('repROI'),
    reportPlTable: document.getElementById('reportPlTable'),
    reportDecisionsList: document.getElementById('reportDecisionsList'),
    reportAiRetrospective: document.getElementById('reportAiRetrospective'),
    btnPrintReport: document.getElementById('btnPrintReport'),

    // Modals
    modalCustomWizard: document.getElementById('modalCustomWizard'),
    btnCloseWizard: document.getElementById('btnCloseWizard'),
    btnWizPrev: document.getElementById('btnWizPrev'),
    btnWizNext: document.getElementById('btnWizNext'),
    btnWizFinish: document.getElementById('btnWizFinish'),
    modalSaas: document.getElementById('modalSaas'),
    btnCloseSaas: document.getElementById('btnCloseSaas')
  };

  // ==========================================================================
  // 7. Deterministic Financial Simulation Model
  // ==========================================================================
  class SimulationEngine {
    /**
     * Compute a single month's operation for a given business state.
     * @param {Object} biz Current business state
     * @param {number} monthNum 1 to 12
     * @param {Object} modifiers Dynamic modifiers from events or what-if
     */
    static calculateMonth(biz, monthNum, modifiers = {}) {
      const season = SEASONALITY_CURVE[monthNum - 1] || SEASONALITY_CURVE[0];
      const seasonFactor = season.factor;

      const priceMultiplier = (modifiers.priceMult || 1.0) * (1 + (modifiers.priceDeltaPct || 0) / 100);
      const cogsMultiplier = modifiers.cogsMult || 1.0;
      const demandModifier = modifiers.demandMult || 1.0;
      const marketingBudget = (modifiers.marketingVal !== undefined) ? modifiers.marketingVal : biz.marketing;
      const capacityMultiplier = modifiers.capacityMult || 1.0;

      // 1. Staff Capacity & Productivity Factor
      const staffMembers = biz.staff || [];
      const totalStaff = staffMembers.length + (modifiers.staffDelta || 0);
      let totalProductiveHours = 0;
      staffMembers.forEach(s => {
        const isAbsent = Math.random() < s.absentProb;
        if (!isAbsent) {
          totalProductiveHours += s.hours * 26 * s.productivity;
        } else {
          totalProductiveHours += s.hours * 26 * s.productivity * 0.7; // partial lost capacity
        }
      });
      // Baseline required hours for target demand
      const baseRequiredHours = Math.max(1, staffMembers.length * 8 * 26);
      const staffCapacityFactor = Math.min(1.25, Math.max(0.65, (totalProductiveHours / baseRequiredHours) * capacityMultiplier));

      // 2. Marketing Multiplier
      // Diminishing returns curve: 1 + log10(1 + budget / 200) * 0.4
      const marketingFactor = 1 + (Math.log10(1 + (marketingBudget / 250)) * 0.35);

      // 3. Competitor Price Index Factor
      let avgCompPrice = 1.0;
      if (biz.competitors && biz.competitors.length > 0) {
        avgCompPrice = biz.competitors.reduce((acc, c) => acc + c.priceIndex, 0) / biz.competitors.length;
      }
      // If our price is lower than competitor average, demand increases
      const relativePriceIndex = priceMultiplier / avgCompPrice;
      const competitorImpact = Math.max(0.7, 1 - (relativePriceIndex - 1) * 0.6);

      // 4. Calculate Sales and COGS per Product
      let totalRevenue = 0;
      let totalCOGS = 0;
      let totalUnitsSold = 0;
      const productSales = [];

      biz.products.forEach(p => {
        const adjustedPrice = Math.round((p.price * priceMultiplier) * 100) / 100;
        const adjustedUnitCost = Math.round((p.cogs * cogsMultiplier) * 100) / 100;

        // Price elasticity calculation: Demand drops if price rises above base
        const priceRatio = (adjustedPrice - p.price) / p.price;
        const elasticityFactor = Math.max(0.4, 1 - (p.elasticity * priceRatio));

        // Combined demand
        let monthlyQuantity = Math.round(
          p.baseDemand * seasonFactor * elasticityFactor * marketingFactor * competitorImpact * staffCapacityFactor * demandModifier
        );

        // Check Inventory Constraints
        // If an ingredient is critical and depleted, reduce quantity
        let stockAvailable = true;
        if (biz.inventory && biz.inventory.length > 0) {
          biz.inventory.forEach(inv => {
            if (inv.quantity <= 0) {
              stockAvailable = false;
            }
          });
        }
        if (!stockAvailable) {
          monthlyQuantity = Math.round(monthlyQuantity * 0.65); // 35% sales lost due to stock-out!
        }

        const rev = monthlyQuantity * adjustedPrice;
        const cogs = monthlyQuantity * adjustedUnitCost;

        totalRevenue += rev;
        totalCOGS += cogs;
        totalUnitsSold += monthlyQuantity;

        productSales.push({
          id: p.id,
          name: p.name,
          unit: p.unit,
          price: adjustedPrice,
          unitCost: adjustedUnitCost,
          unitsSold: monthlyQuantity,
          revenue: rev,
          cogs: cogs,
          marginPct: Math.round(((adjustedPrice - adjustedUnitCost) / adjustedPrice) * 100)
        });
      });

      // Spoilage & Wastage factor (approx 3% of COGS)
      const wastage = totalCOGS * 0.035;
      totalCOGS += wastage;

      // 5. Operating Expenses (OPEX)
      const rent = Math.round((biz.rent + (modifiers.rentDelta || 0)) * (1 + (modifiers.rentDeltaPct || 0) / 100));
      const utilities = biz.utilities;
      const internet = biz.internet;
      const taxes = biz.taxes;
      const misc = biz.misc;

      let totalSalaries = 0;
      staffMembers.forEach(s => {
        totalSalaries += s.salary;
      });
      // Add extra staff salary if modifier exists
      if (modifiers.staffDelta && modifiers.staffDelta > 0) {
        totalSalaries += modifiers.staffDelta * 450;
      }

      const totalOpex = rent + utilities + internet + marketingBudget + taxes + misc + totalSalaries;
      const grossProfit = totalRevenue - totalCOGS;
      const netProfit = grossProfit - totalOpex;

      // 6. Cash Flow & Runway
      const prevCash = (biz.history && biz.history.length > 0)
        ? biz.history[biz.history.length - 1].cashBalance
        : biz.initialCapital;

      const oneTimeCashImpact = modifiers.cashDelta || 0;
      const newCashBalance = Math.round(prevCash + netProfit + oneTimeCashImpact);

      // Runway in months (if burning cash)
      let runwayMonths = 999;
      if (netProfit < 0) {
        runwayMonths = Math.max(0, Math.round((newCashBalance / Math.abs(netProfit)) * 10) / 10);
      }

      // Break-even monthly revenue
      const cogsRatio = totalRevenue > 0 ? (totalCOGS / totalRevenue) : 0.35;
      const contributionMarginRatio = Math.max(0.05, 1 - cogsRatio);
      const breakEvenRevenue = Math.round(totalOpex / contributionMarginRatio);

      // ROI %
      const totalROI = Math.round(((newCashBalance - biz.initialCapital) / biz.initialCapital) * 1000) / 10;

      return {
        month: monthNum,
        season: season.season,
        revenue: Math.round(totalRevenue),
        cogs: Math.round(totalCOGS),
        grossProfit: Math.round(grossProfit),
        opex: Math.round(totalOpex),
        breakdownOpex: { rent, utilities, internet, marketing: marketingBudget, taxes, misc, salaries: totalSalaries },
        netProfit: Math.round(netProfit),
        profitMargin: totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 1000) / 10 : 0,
        cashBalance: newCashBalance,
        customersCount: totalUnitsSold,
        runwayMonths: runwayMonths,
        breakEvenRevenue: breakEvenRevenue,
        roi: totalROI,
        productSales: productSales,
        staffCapacityFactor: Math.round(staffCapacityFactor * 100),
        eventTriggered: null,
        decisionTaken: null
      };
    }
  }

  // ==========================================================================
  // 8. Natural Language Prompt Parser
  // ==========================================================================
  class NaturalLanguageBuilder {
    static parse(promptText) {
      const text = promptText.toLowerCase();

      // 1. Detect Category
      let category = 'cafe';
      if (text.includes('مطعم') || text.includes('برجر') || text.includes('وجبات') || text.includes('restaurant') || text.includes('diner') || text.includes('burger')) {
        category = 'restaurant';
      } else if (text.includes('ملابس') || text.includes('أزياء') || text.includes('بوتيك') || text.includes('fashion') || text.includes('clothes') || text.includes('boutique')) {
        category = 'retail';
      } else if (text.includes('صالون') || text.includes('حلاقة') || text.includes('تجميل') || text.includes('salon') || text.includes('barber')) {
        category = 'salon';
      } else if (text.includes('منزل') || text.includes('مخبز') || text.includes('كيك') || text.includes('حلويات منزلية') || text.includes('home') || text.includes('bakery')) {
        category = 'home';
      } else if (text.includes('إلكترون') || text.includes('صيانة') || text.includes('هواتف') || text.includes('mobile') || text.includes('tech')) {
        category = 'electronics';
      }

      // Clone base preset template
      const baseModel = JSON.parse(JSON.stringify(PRESET_TEMPLATES[category]));

      // 2. Extract Capital ($ or numbers)
      const capitalMatch = promptText.match(/(\d+[\d,.]*)\s*(k|k\$|\$|ألف|الف|دولار|usd)?/i);
      if (capitalMatch) {
        let num = parseFloat(capitalMatch[1].replace(/,/g, ''));
        if (text.includes('ألف') || text.includes('الف') || text.includes('k')) {
          num = num * 1000;
        }
        if (num >= 1000 && num <= 500000) {
          baseModel.initialCapital = num;
        }
      }

      // 3. Extract Location
      if (text.includes('دمشق') || text.includes('damascus')) {
        baseModel.location = 'دمشق — الشعلان';
      } else if (text.includes('الرياض') || text.includes('riyadh')) {
        baseModel.location = 'الرياض — طريق الملك فهد';
      } else if (text.includes('دبي') || text.includes('dubai')) {
        baseModel.location = 'دبي — وسط المدينة (Downtown)';
      } else if (text.includes('القاهرة') || text.includes('cairo')) {
        baseModel.location = 'القاهرة — التجمع الخامس';
      } else if (text.includes('عمان') || text.includes('amman')) {
        baseModel.location = 'عمان — شارع الرينبو';
      }

      // 4. Extract Staff Count
      const staffMatch = text.match(/(\d+)\s*(موظف|عمال|أشخاص|staff|employees|workers)/i);
      if (staffMatch) {
        const count = parseInt(staffMatch[1], 10);
        if (count >= 1 && count <= 15) {
          // Adjust staff array length
          while (baseModel.staff.length < count) {
            baseModel.staff.push({
              id: 's' + (baseModel.staff.length + 1),
              name: 'عضو فريق إضافي',
              role: 'مساعد وموظف تشغيل',
              salary: 400,
              productivity: 0.90,
              hours: 8,
              absentProb: 0.05
            });
          }
          if (baseModel.staff.length > count) {
            baseModel.staff = baseModel.staff.slice(0, count);
          }
        }
      }

      return baseModel;
    }
  }

  // ==========================================================================
  // 9. AI Business Advisor Contextual Diagnostic Generator
  // ==========================================================================
  class AIAdvisorEngine {
    static diagnose(biz, currentRecord) {
      if (!currentRecord) return { diagnosticText: '', suggestions: [] };

      const diagnostics = [];
      const suggestions = [];

      const profitMargin = currentRecord.profitMargin;
      const cogsRatio = currentRecord.revenue > 0 ? (currentRecord.cogs / currentRecord.revenue) * 100 : 0;
      const opexBreakdown = currentRecord.breakdownOpex || {};
      const runway = currentRecord.runwayMonths;

      // 1. Margin & Profit Analysis
      if (profitMargin < 0) {
        diagnostics.push({
          type: 'danger',
          title: '🚨 عجز تشغيلي (Net Loss)',
          text: `المشروع يخسر حالياً $${Math.abs(currentRecord.netProfit).toLocaleString()} هذا الشهر. مصاريفك التشغيلية ($${currentRecord.opex.toLocaleString()}) تتجاوز الربح الإجمالي ($${currentRecord.grossProfit.toLocaleString()}).`
        });
      } else if (profitMargin < 15) {
        diagnostics.push({
          type: 'warning',
          title: '⚠️ هامش ربح منخفض (' + profitMargin + '%)',
          text: `هامش الربح ضعيف ومعرض للخطر مع أي تقلب سوقي. المعدل الصحي لهذا النشاط يجب أن يتجاوز 22%.`
        });
      } else {
        diagnostics.push({
          type: 'success',
          title: '✅ هامش ربح ممتاز (' + profitMargin + '%)',
          text: `أداؤك المالي متين ومولد للسيولة. تحقق $${currentRecord.netProfit.toLocaleString()} كصافي ربح شهري.`
        });
      }

      // 2. COGS & Recipe Cost Analysis
      if (cogsRatio > 38) {
        diagnostics.push({
          type: 'warning',
          title: '📦 تكلفة المواد مرتفعة نسبياً (' + Math.round(cogsRatio) + '% من المبيعات)',
          text: `نسبة تكلفة البضاعة المباعة (COGS) مرتفعة. ينصح بمراجعة أسعار الموردين، تقليل الهدر، أو إعادة تسعير المنتجات الأعلى طلباً.`
        });
        suggestions.push({
          id: 'sug_cogs',
          title: 'إعادة التفاوض مع المورد لخفض تكلفة المواد 8%',
          impact: 'يوفر قرابة $' + Math.round(currentRecord.cogs * 0.08) + ' شهرياً',
          action: 'test_cogs_reduction'
        });
      }

      // 3. Marketing & Customer Acquisition
      if (opexBreakdown.marketing && (opexBreakdown.marketing / currentRecord.revenue) > 0.20) {
        diagnostics.push({
          type: 'warning',
          title: '📢 الإنفاق التسويقي يستنزف الهامش',
          text: `حجم الإنفاق على الإعلانات ($${opexBreakdown.marketing}) يشكل أكثر من 20% من إيراداتك. تأكد من جودة العائد على الإنفاق الإعلاني (ROAS).`
        });
      }

      // 4. Runway Warning
      if (runway < 3) {
        diagnostics.push({
          type: 'danger',
          title: '⏳ فترة الأمان النقدي حرجة جداً (' + runway + ' أشهر)',
          text: `رصيد الكاش المتبقي ($${currentRecord.cashBalance.toLocaleString()}) سينفد خلال أقل من 90 يوماً إن لم يتم خفض النفقات فوراً.`
        });
      }

      // Testable suggestions
      suggestions.push({
        id: 'sug_price',
        title: 'رفع أسعار المنتجات بنسبة 10%',
        impact: 'رفع صافي الربح الشهري المتوقع بنسبة 18%',
        action: 'test_price_hike'
      });
      suggestions.push({
        id: 'sug_mkt',
        title: 'زيادة ميزانية التسويق بمقدار $200 لجذب زبائن إضافيين',
        impact: 'زيادة حجم المبيعات المتوقعة بنسبة 12%',
        action: 'test_marketing_boost'
      });

      return { diagnostics, suggestions };
    }

    static answerQuestion(biz, history, userQuestion) {
      const q = userQuestion.toLowerCase();
      const current = history[history.length - 1];
      if (!current) return 'يرجى بدء المحاكاة أولاً للحصول على إجابات دقيقة مبنية على الأرقام.';

      if (q.includes('ربح') || q.includes('انخفض') || q.includes('ليش') || q.includes('لماذا') || q.includes('خسارة')) {
        const cogsPct = Math.round((current.cogs / current.revenue) * 100);
        return `بناءً على بيانات الشهر ${current.month} لمشروعك:\n- إيرادك الحالي: $${current.revenue.toLocaleString()}\n- تكلفة المواد (COGS): $${current.cogs.toLocaleString()} (${cogsPct}% من الدخل)\n- مصاريف التشغيل (OPEX): $${current.opex.toLocaleString()}\n- صافي الربح: $${current.netProfit.toLocaleString()}.\n\nالسبب الأساسي لضغط الأرباح هو تداخل المصاريف الثابتة مع تكلفة المواد. أنصحك باختبار رفع السعر 5% عبر مختبر What-If.`;
      }

      if (q.includes('أفلس') || q.includes('خطر') || q.includes('سيولة') || q.includes('كاش') || q.includes('runway')) {
        if (current.netProfit >= 0) {
          return `وضع السيولة آمن ومستقر! لديك رصيد كاش $${current.cashBalance.toLocaleString()} ومشروعك يولد تدفقاً نقدياً إيجابياً شهرياً ($${current.netProfit.toLocaleString()}). لا يوجد خطر إفلاس حالياً.`;
        } else {
          return `تنبيه: مشروعك يحرق كاش بمعدل $${Math.abs(current.netProfit).toLocaleString()} شهرياً. رصيدك المتبقي $${current.cashBalance.toLocaleString()}، ما يعني أن فترة النجاة (Runway) المتبقية هي ${current.runwayMonths} أشهر فقط. يجب اتخاذ إجراء تقشفي فوراً!`;
        }
      }

      if (q.includes('موظف') || q.includes('أوظف') || q.includes('عمال') || q.includes('توظيف')) {
        const cap = current.staffCapacityFactor;
        if (cap > 95) {
          return `نعم، طاقتك التشغيلية وصلت ${cap}% والموظفون يعملون بأقصى طاقتهم، ما قد يسبب بطء الخدمة وتذمر الزبائن. توظيف عضو إضافي سيزيد الإنتاجية ويتحمل زيادة مبيعاتك.`;
        } else {
          return `طاقتك التشغيلية الحالية هي ${cap}%، وهي كافية جداً لحجم الطلب الحالي. توظيف شخص جديد الآن سيزيد مصاريف الرواتب $450 دون زيادة فعلية في المبيعات.`;
        }
      }

      if (q.includes('تسعير') || q.includes('سعر') || q.includes('أرفع') || q.includes('أرخص')) {
        return `وفق معادلة المرونة لمنتجاتك، الزبائن يتقبلون زيادة 5% إلى 8% دون انخفاض ملحوظ بالطلب. جرب فتح تبويب "مختبر What-If" لاختبار أثر رفع السعر على صافي الربح فوراً.`;
      }

      // Default smart response
      return `قرأت بيانات مشروعك (${biz.title || 'مشروعي'}): لديك حالياً $${current.cashBalance.toLocaleString()} سيولة، ونقطة تعادلك هي $${current.breakEvenRevenue.toLocaleString()} شهرياً. هل تود أن نختبر معاً سيناريو تسويقي أو تعديل في قائمة المنتجات؟`;
    }
  }

  // ==========================================================================
  // 10. Application Controller & Initialization
  // ==========================================================================

  function initApp() {
    renderPresets();
    renderChallenges();
    attachEventListeners();
    setupTimelineDots();
  }

  // Render Category Presets on Landing
  function renderPresets() {
    DOM.presetGrid.innerHTML = '';
    Object.values(PRESET_TEMPLATES).forEach(preset => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.innerHTML = `
        <div class="preset-top">
          <div class="preset-icon">${preset.icon}</div>
          <span class="preset-capital-badge">رأس المال $${preset.initialCapital.toLocaleString()}</span>
        </div>
        <h3>${preset.title}</h3>
        <p class="preset-desc">${preset.desc}</p>
        <div class="preset-metrics-mini">
          <div>
            <span>الموقع المقترح</span>
            <strong>${preset.location.split('—')[0]}</strong>
          </div>
          <div>
            <span>فريق العمل</span>
            <strong>${preset.staff.length} موظفين</strong>
          </div>
          <div>
            <span>الإيجار الشهري</span>
            <strong>$${preset.rent}</strong>
          </div>
          <div>
            <span>عدد المنتجات</span>
            <strong>${preset.products.length} أصناف</strong>
          </div>
        </div>
        <button class="btn btn-primary btn-sm btn-block" data-preset="${preset.id}">
          <i class="fa-solid fa-play"></i> إطلاق التوأم الرقمي
        </button>
      `;

      card.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        launchBusiness(preset.id);
      });
      card.addEventListener('click', () => {
        launchBusiness(preset.id);
      });

      DOM.presetGrid.appendChild(card);
    });
  }

  // Render Challenges on Landing
  function renderChallenges() {
    DOM.challengesGrid.innerHTML = '';
    CHALLENGES.forEach(ch => {
      const card = document.createElement('div');
      card.className = 'challenge-card';
      card.innerHTML = `
        <div class="challenge-header">
          <span class="challenge-tag">${ch.tag}</span>
          <span class="challenge-xp">+${ch.xp} XP</span>
        </div>
        <h3>${ch.title}</h3>
        <p>${ch.desc}</p>
        <ul class="challenge-rules">
          ${ch.rules.map(r => `<li><i class="fa-solid fa-check"></i> ${r}</li>`).join('')}
        </ul>
        <button class="btn btn-outline btn-sm btn-block" data-challenge="${ch.id}">
          <i class="fa-solid fa-flag-checkered"></i> قبول التحدي وبدء المحاكاة
        </button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        launchChallenge(ch);
      });

      DOM.challengesGrid.appendChild(card);
    });
  }

  // Launch a Business Preset
  function launchBusiness(presetId) {
    sound.playSuccess();
    const preset = PRESET_TEMPLATES[presetId] || PRESET_TEMPLATES.cafe;
    state.business = JSON.parse(JSON.stringify(preset));
    state.currentMonth = 1;
    state.history = [];
    state.dilemmas = [];
    state.decisionHistory = [];
    state.entrepreneurXP = 100;
    state.activeChallenge = null;

    // Run Month 1 Initial Snapshot
    const m1Record = SimulationEngine.calculateMonth(state.business, 1);
    state.history.push(m1Record);

    // Switch View
    switchView('viewDashboard');
    updateHeaderBizBanner();
    refreshDashboard();
  }

  // Launch Challenge
  function launchChallenge(challenge) {
    sound.playSuccess();
    const preset = PRESET_TEMPLATES[challenge.presetId] || PRESET_TEMPLATES.cafe;
    state.business = JSON.parse(JSON.stringify(preset));
    if (challenge.capitalOverride) {
      state.business.initialCapital = challenge.capitalOverride;
    }
    state.activeChallenge = challenge;
    state.currentMonth = 1;
    state.history = [];
    state.dilemmas = [];
    state.decisionHistory = [];
    state.entrepreneurXP = 50;

    const m1Record = SimulationEngine.calculateMonth(state.business, 1);
    state.history.push(m1Record);

    switchView('viewDashboard');
    updateHeaderBizBanner();
    refreshDashboard();

    addAlert('info', `🎯 تم تفعيل ${challenge.title} — هدفك تحقيق شروط التحدي وإنهاء الـ 12 شهراً بنجاح.`);
  }

  // Switch App Views
  function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
    }
    if (viewId === 'viewDashboard') {
      DOM.activeBizPill.classList.remove('hidden');
    } else {
      DOM.activeBizPill.classList.add('hidden');
    }
  }

  // Setup Month Stepper Dots
  function setupTimelineDots() {
    DOM.timelineStepper.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
      const dot = document.createElement('div');
      dot.className = 'month-dot' + (i === 1 ? ' current' : '');
      dot.title = `الشهر ${i}`;
      dot.dataset.month = i;
      DOM.timelineStepper.appendChild(dot);
    }
  }

  // Update Header Active Business Pill
  function updateHeaderBizBanner() {
    if (!state.business) return;
    DOM.headerBizIcon.textContent = state.business.icon || '☕';
    DOM.headerBizName.textContent = state.business.title || 'مشروعي';
    DOM.headerBizMeta.textContent = `${state.business.location} • رأس المال $${state.business.initialCapital.toLocaleString()}`;
    DOM.headerMonthNum.textContent = state.currentMonth;
    DOM.chatBizName.textContent = state.business.title || 'مشروعك';
  }

  // Advance Simulation to Next Month
  function advanceSimulationMonth(autoTriggered = false) {
    if (state.currentMonth >= 12) {
      sound.playSuccess();
      addAlert('success', '🏆 اكتملت محاكاة الـ 12 شهراً بنجاح! يمكنك الآن مراجعة تقرير الجدوى الشامل في تبويب التقرير.');
      switchCockpitTab('tabReport');
      return;
    }

    state.currentMonth += 1;
    sound.playCash();

    // Check for random dynamic events in this month
    let triggeredEvent = null;
    const availableEvents = MARKET_EVENTS.filter(e => e.monthTrigger.includes(state.currentMonth));
    if (availableEvents.length > 0 && Math.random() < 0.8) {
      triggeredEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    }

    // Run Calculation for New Month
    const record = SimulationEngine.calculateMonth(state.business, state.currentMonth);
    record.eventTriggered = triggeredEvent ? triggeredEvent.title : null;
    state.history.push(record);

    // If event occurred, add dilemma to Decision Center
    if (triggeredEvent) {
      state.dilemmas.unshift(triggeredEvent);
      DOM.decisionsBadge.textContent = state.dilemmas.length;
      DOM.decisionsBadge.classList.add('pulse');
      sound.playWarning();
      addAlert('warning', `⚠️ حدث طارئ بالشهر ${state.currentMonth}: ${triggeredEvent.title}. توجه لمركز القرار لاتخاذ الإجراء!`);
    }

    // Deplete Inventory Consumption
    depleteInventory(record.customersCount);

    // Update XP and Level
    state.entrepreneurXP += 60;
    updateEntrepreneurLevel();

    // Refresh UI
    refreshDashboard();
  }

  // Deplete Raw Materials Inventory
  function depleteInventory(ordersCount) {
    if (!state.business.inventory) return;
    state.business.inventory.forEach(inv => {
      // rough consumption per order
      const consumption = (ordersCount * 0.05);
      inv.quantity = Math.max(0, Math.round((inv.quantity - consumption) * 10) / 10);
      if (inv.quantity <= inv.minThreshold) {
        addAlert('danger', `📦 تحذير مخزون: كمية [${inv.name}] انخفضت إلى ${inv.quantity} ${inv.unit}. ينصح بإعادة التوريد!`);
      }
    });
  }

  // Auto Simulate 12 Months
  function autoSimulateAll() {
    if (state.isSimulating) return;
    state.isSimulating = true;
    DOM.btnAutoSimulate.disabled = true;
    DOM.btnNextMonth.disabled = true;

    const interval = setInterval(() => {
      if (state.currentMonth < 12) {
        advanceSimulationMonth(true);
      } else {
        clearInterval(interval);
        state.isSimulating = false;
        DOM.btnAutoSimulate.disabled = false;
        DOM.btnNextMonth.disabled = false;
      }
    }, 600 / state.simSpeed);
  }

  // Update Entrepreneur Level
  function updateEntrepreneurLevel() {
    const xp = state.entrepreneurXP;
    DOM.xpPill.textContent = `${xp} XP`;
    if (xp < 200) {
      state.entrepreneurLevel = '🌱 صانع مشاريع مبتدئ';
    } else if (xp < 500) {
      state.entrepreneurLevel = '🔨 رائد أعمال نشط (Builder)';
    } else if (xp < 900) {
      state.entrepreneurLevel = '💼 مدير أعمال تنفيذي (Manager)';
    } else if (xp < 1400) {
      state.entrepreneurLevel = '🎯 مخطط استراتيجي خبير (Strategist)';
    } else {
      state.entrepreneurLevel = '👑 أستاذ الأعمال وإدارة الأزمات (Master)';
    }
    DOM.levelTitle.textContent = state.entrepreneurLevel;
  }

  // Refresh Full Dashboard Cockpit
  function refreshDashboard() {
    const current = state.history[state.history.length - 1];
    if (!current) return;

    // 1. Season & Timeline Stepper
    const season = SEASONALITY_CURVE[state.currentMonth - 1] || SEASONALITY_CURVE[0];
    DOM.seasonName.textContent = season.name;
    DOM.seasonIcon.className = `fa-solid ${season.icon}`;
    DOM.currentMonthText.textContent = `الشهر ${state.currentMonth} من 12`;
    DOM.headerMonthNum.textContent = state.currentMonth;

    document.querySelectorAll('.month-dot').forEach((dot, idx) => {
      dot.className = 'month-dot';
      if (idx + 1 < state.currentMonth) dot.classList.add('passed');
      if (idx + 1 === state.currentMonth) dot.classList.add('current');
    });

    // 2. Primary KPI Cards
    DOM.kpiRevenue.textContent = `$${current.revenue.toLocaleString()}`;
    if (state.history.length > 1) {
      const prev = state.history[state.history.length - 2];
      const diffPct = prev.revenue > 0 ? Math.round(((current.revenue - prev.revenue) / prev.revenue) * 100) : 0;
      DOM.kpiRevenueChange.textContent = `${diffPct >= 0 ? '+' : ''}${diffPct}% مقارنة بالشهر السابق`;
      DOM.kpiRevenueChange.className = `kpi-change ${diffPct >= 0 ? 'positive' : 'negative'}`;
    }
    DOM.kpiCustomersCount.textContent = `${current.customersCount.toLocaleString()} طلب / مبيعات`;

    DOM.kpiExpenses.textContent = `$${(current.cogs + current.opex).toLocaleString()}`;
    DOM.kpiCogsVal.textContent = `$${current.cogs.toLocaleString()}`;
    DOM.kpiOpexVal.textContent = `$${current.opex.toLocaleString()}`;

    DOM.kpiNetProfit.textContent = `${current.netProfit >= 0 ? '+' : ''}$${current.netProfit.toLocaleString()}`;
    DOM.kpiProfitMargin.textContent = `هامش الربح: ${current.profitMargin}%`;
    if (current.netProfit >= 0) {
      DOM.kpiNetProfit.style.color = 'var(--emerald-400)';
      DOM.kpiProfitStatus.textContent = 'أرباح إيجابية';
    } else {
      DOM.kpiNetProfit.style.color = 'var(--rose-400)';
      DOM.kpiProfitStatus.textContent = 'عجز شهري';
    }

    DOM.kpiCashBalance.textContent = `$${current.cashBalance.toLocaleString()}`;
    DOM.kpiInitialCapital.textContent = `رأس المال: $${state.business.initialCapital.toLocaleString()}`;
    if (current.runwayMonths >= 12) {
      DOM.kpiRunway.textContent = `فترة الأمان (Runway): 12+ شهر (آمن)`;
      DOM.kpiRunway.className = 'runway-pill safe';
    } else {
      DOM.kpiRunway.textContent = `فترة الأمان: ${current.runwayMonths} أشهر (خطر)`;
      DOM.kpiRunway.className = 'runway-pill danger';
    }

    // 3. Sub-Metrics Bar
    DOM.metricBreakEven.textContent = `$${current.breakEvenRevenue.toLocaleString()} / شهر`;
    DOM.metricROI.textContent = `${current.roi}%`;
    DOM.metricCapacity.textContent = `${current.staffCapacityFactor}%`;
    DOM.metricStockDays.textContent = `${calculateStockDays()} يوم`;

    // 4. Render Active Tab Specifics
    renderMainTimelineChart();
    renderProductsTable(current.productSales);
    renderMiniAiDiagnostic(current);
    renderDecisionCenter();
    renderInventoryMeters();
    renderStaffRoster();
    renderCompetitorsAndSegments();
    renderWhatIfSandbox();
    renderAiAdvisorTab(current);
    renderExecutiveReport();
  }

  function calculateStockDays() {
    if (!state.business.inventory || state.business.inventory.length === 0) return 30;
    const minRatio = state.business.inventory.reduce((min, inv) => {
      const days = Math.round((inv.quantity / Math.max(1, inv.minThreshold)) * 15);
      return Math.min(min, days);
    }, 45);
    return Math.max(1, minRatio);
  }

  // Render SVG Financial Multi-Line Chart
  function renderMainTimelineChart() {
    const svg = DOM.timelineChartSvg;
    const history = state.history;
    if (!svg || history.length === 0) return;

    const width = 760;
    const height = 280;
    const padX = 50;
    const padY = 30;

    // Determine max value for scaling
    const maxVal = Math.max(
      10000,
      ...history.map(h => Math.max(h.revenue, h.opex + h.cogs, Math.abs(h.cashBalance)))
    );

    const getX = (idx) => padX + (idx / 11) * (width - padX * 2);
    const getY = (val) => height - padY - (Math.max(0, val) / maxVal) * (height - padY * 2);

    let revPoints = '';
    let expPoints = '';
    let profPoints = '';
    let cashPoints = '';

    history.forEach((h, idx) => {
      const x = getX(idx);
      revPoints += `${x},${getY(h.revenue)} `;
      expPoints += `${x},${getY(h.opex + h.cogs)} `;
      profPoints += `${x},${getY(Math.max(0, h.netProfit))} `;
      cashPoints += `${x},${getY(h.cashBalance)} `;
    });

    let gridLines = '';
    for (let i = 0; i <= 4; i++) {
      const yVal = (maxVal / 4) * i;
      const yPos = getY(yVal);
      gridLines += `
        <line x1="${padX}" y1="${yPos}" x2="${width - padX}" y2="${yPos}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
        <text x="${padX - 8}" y="${yPos + 4}" fill="#64748b" font-size="10" text-anchor="end">$${Math.round(yVal / 1000)}k</text>
      `;
    }

    let xLabels = '';
    for (let i = 1; i <= 12; i++) {
      const xPos = getX(i - 1);
      xLabels += `<text x="${xPos}" y="${height - 10}" fill="#94a3b8" font-size="11" text-anchor="middle">ش${i}</text>`;
    }

    svg.innerHTML = `
      ${gridLines}
      ${xLabels}
      <!-- Revenue Curve -->
      <polyline fill="none" stroke="var(--emerald-400)" stroke-width="3" stroke-linecap="round" points="${revPoints.trim()}" />
      <!-- Expenses Curve -->
      <polyline fill="none" stroke="var(--rose-400)" stroke-width="2.5" stroke-linecap="round" points="${expPoints.trim()}" />
      <!-- Cash Curve -->
      <polyline fill="none" stroke="var(--cyan-400)" stroke-width="2" stroke-dasharray="3" points="${cashPoints.trim()}" />
      <!-- Dots -->
      ${history.map((h, idx) => `
        <circle cx="${getX(idx)}" cy="${getY(h.revenue)}" r="4" fill="var(--emerald-400)" />
        <circle cx="${getX(idx)}" cy="${getY(h.opex + h.cogs)}" r="3" fill="var(--rose-400)" />
      `).join('')}
    `;
  }

  // Render Product Sales Breakdown Table
  function renderProductsTable(productSales) {
    if (!productSales) return;
    DOM.productsSalesTable.innerHTML = '';
    productSales.forEach(p => {
      const row = document.createElement('div');
      row.className = 'product-row-item';
      row.innerHTML = `
        <div class="product-meta-left">
          <span>${p.name}</span>
          <span class="product-margin-tag">هامش ${p.marginPct}%</span>
        </div>
        <div>
          <span class="product-price-tag">$${p.price}</span>
          <span class="text-muted" style="font-size:0.75rem; margin-right:0.4rem;">(${p.unitsSold} ${p.unit})</span>
        </div>
      `;
      DOM.productsSalesTable.appendChild(row);
    });
  }

  // Render Mini AI Diagnostic on Overview
  function renderMiniAiDiagnostic(currentRecord) {
    const diag = AIAdvisorEngine.diagnose(state.business, currentRecord);
    if (diag.diagnostics.length > 0) {
      DOM.overviewAiDiagnostic.textContent = diag.diagnostics[0].text;
    }
  }

  // Render Decision Center Dilemmas
  function renderDecisionCenter() {
    DOM.dilemmasContainer.innerHTML = '';
    if (state.dilemmas.length === 0) {
      DOM.dilemmasContainer.innerHTML = `
        <div class="panel-card text-center" style="padding:2.5rem 1rem;">
          <i class="fa-solid fa-circle-check" style="font-size:2.5rem; color:var(--emerald-400); margin-bottom:1rem; display:block;"></i>
          <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:0.5rem;">لا توجد أزمات أو قرارات عالقة حالياً</h3>
          <p style="color:var(--text-secondary); font-size:0.9rem;">العمليات تسير بسلاسة. عند تقدم المحاكاة وظهور أحداث جديدة ستظهر خياراتك الإستراتيجية هنا.</p>
        </div>
      `;
      return;
    }

    state.dilemmas.forEach((dilemma, dIdx) => {
      const card = document.createElement('div');
      card.className = 'dilemma-card';
      card.innerHTML = `
        <div class="dilemma-top">
          <div class="dilemma-title">
            <i class="fa-solid fa-triangle-exclamation" style="color:var(--amber-400);"></i>
            <span>${dilemma.title}</span>
          </div>
          <span class="badge badge-gold">قرار مصيري بالشهر ${state.currentMonth}</span>
        </div>
        <p class="dilemma-desc">${dilemma.desc}</p>
        <div class="dilemma-options-grid">
          ${dilemma.options.map((opt, optIdx) => `
            <button class="decision-option-btn" data-didx="${dIdx}" data-oidx="${optIdx}">
              <span class="option-letter">الخيار ${opt.letter}</span>
              <span class="option-text">${opt.text}</span>
              <span class="option-impact-preview">${opt.impact.desc || 'تأثير مباشر على أرقام الشهر'}</span>
            </button>
          `).join('')}
        </div>
      `;

      card.querySelectorAll('.decision-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const didx = parseInt(btn.dataset.didx, 10);
          const oidx = parseInt(btn.dataset.oidx, 10);
          applyDecision(didx, oidx);
        });
      });

      DOM.dilemmasContainer.appendChild(card);
    });
  }

  // Apply a Decision Chosen by User
  function applyDecision(dilemmaIdx, optionIdx) {
    sound.playClick();
    const dilemma = state.dilemmas[dilemmaIdx];
    const option = dilemma.options[optionIdx];

    // Log decision
    state.decisionHistory.push({
      month: state.currentMonth,
      dilemma: dilemma.title,
      choice: option.text,
      impact: option.impact
    });

    // Apply immediate impact to business state
    if (option.impact.priceMult) {
      state.business.products.forEach(p => {
        p.price = Math.round((p.price * option.impact.priceMult) * 100) / 100;
      });
    }
    if (option.impact.cogsMult) {
      state.business.products.forEach(p => {
        p.cogs = Math.round((p.cogs * option.impact.cogsMult) * 100) / 100;
      });
    }
    if (option.impact.rentDelta) {
      state.business.rent += option.impact.rentDelta;
    }
    if (option.impact.marketingDelta) {
      state.business.marketing += option.impact.marketingDelta;
    }
    if (option.impact.cashDelta) {
      const current = state.history[state.history.length - 1];
      if (current) current.cashBalance += option.impact.cashDelta;
    }

    // Remove from active dilemmas
    state.dilemmas.splice(dilemmaIdx, 1);
    DOM.decisionsBadge.textContent = state.dilemmas.length;
    if (state.dilemmas.length === 0) {
      DOM.decisionsBadge.classList.remove('pulse');
    }

    // Award XP
    state.entrepreneurXP += 120;
    updateEntrepreneurLevel();

    addAlert('success', `🎯 تم اعتماد قرارك: "${option.text}". انعكس الأثر فوراً على التوأم الرقمي.`);
    renderDecisionCenter();
    renderDecisionHistory();
    refreshDashboard();
  }

  // Render Decision History
  function renderDecisionHistory() {
    if (state.decisionHistory.length === 0) return;
    DOM.decisionHistoryList.innerHTML = '';
    state.decisionHistory.forEach(h => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <div>
          <span class="history-month">الشهر ${h.month}:</span>
          <strong>${h.dilemma}</strong> — اخترت: <em>${h.choice}</em>
        </div>
        <span class="text-muted" style="font-size:0.75rem;">${h.impact.desc || 'تم التطبيق'}</span>
      `;
      DOM.decisionHistoryList.appendChild(item);
    });
  }

  // What-If Scenario Sandbox
  function renderWhatIfSandbox() {
    const current = state.history[state.history.length - 1];
    if (!current) return;

    // Run hypothetical scenario
    const hypoModifiers = {
      priceDeltaPct: state.whatIf.priceDeltaPct,
      marketingVal: state.whatIf.marketingVal,
      staffDelta: state.whatIf.staffDelta,
      rentDeltaPct: state.whatIf.rentDeltaPct
    };

    const scenario = SimulationEngine.calculateMonth(state.business, state.currentMonth, hypoModifiers);
    state.whatIf.calculated = scenario;

    // Populate comparison table
    const deltaRev = scenario.revenue - current.revenue;
    const deltaProfit = scenario.netProfit - current.netProfit;
    const deltaCash = scenario.cashBalance - current.cashBalance;

    DOM.whatIfCompareTbody.innerHTML = `
      <tr>
        <td><strong>الإيرادات الشهرية (Revenue)</strong></td>
        <td>$${current.revenue.toLocaleString()}</td>
        <td>$${scenario.revenue.toLocaleString()}</td>
        <td class="${deltaRev >= 0 ? 'text-emerald' : 'text-rose'}"><strong>${deltaRev >= 0 ? '+' : ''}$${deltaRev.toLocaleString()}</strong></td>
        <td>${deltaRev >= 0 ? 'زيادة بالمبيعات' : 'تراجع بالدخل'}</td>
      </tr>
      <tr>
        <td><strong>المصاريف والتكاليف (COGS + OPEX)</strong></td>
        <td>$${(current.cogs + current.opex).toLocaleString()}</td>
        <td>$${(scenario.cogs + scenario.opex).toLocaleString()}</td>
        <td>$${((scenario.cogs + scenario.opex) - (current.cogs + current.opex)).toLocaleString()}</td>
        <td>تأثير الرواتب والتسويق والإيجار</td>
      </tr>
      <tr>
        <td><strong>صافي الربح الشهري (Net Profit)</strong></td>
        <td>$${current.netProfit.toLocaleString()}</td>
        <td><strong>$${scenario.netProfit.toLocaleString()}</strong></td>
        <td class="${deltaProfit >= 0 ? 'text-emerald' : 'text-rose'}"><strong>${deltaProfit >= 0 ? '+' : ''}$${deltaProfit.toLocaleString()}</strong></td>
        <td>${deltaProfit >= 0 ? 'تحسن مباشر بالربحية' : 'تآكل في الهامش'}</td>
      </tr>
      <tr>
        <td><strong>نقطة التعادل (Break-Even)</strong></td>
        <td>$${current.breakEvenRevenue.toLocaleString()}</td>
        <td>$${scenario.breakEvenRevenue.toLocaleString()}</td>
        <td>$${(scenario.breakEvenRevenue - current.breakEvenRevenue).toLocaleString()}</td>
        <td>${scenario.breakEvenRevenue < current.breakEvenRevenue ? 'أمان أعلى (تعادل أسرع)' : 'تتطلب مبيعات أعلى لتغطية التكاليف'}</td>
      </tr>
    `;

    // Verdict explanation
    if (deltaProfit > 0) {
      DOM.whatIfVerdictText.textContent = `💡 التحليل الاقتصادي: هذا السيناريو ممتاز! يرفع صافي أرباحك بمقدار $${deltaProfit.toLocaleString()} شهرياً دون الإضرار بمرونة الطلب.`;
    } else if (deltaProfit === 0) {
      DOM.whatIfVerdictText.textContent = `ℹ️ التحليل الاقتصادي: لا يوجد تغيير جوهري في صافي الربح عند هذه الافتراضات.`;
    } else {
      DOM.whatIfVerdictText.textContent = `⚠️ التحليل الاقتصادي: حذر! هذا السيناريو يؤدي لتراجع صافي الربح بمقدار $${Math.abs(deltaProfit).toLocaleString()} شهرياً. ينصح بتعديل الفرضيات.`;
    }
  }

  // AI Advisor Tab
  function renderAiAdvisorTab(currentRecord) {
    const diag = AIAdvisorEngine.diagnose(state.business, currentRecord);

    DOM.aiDiagnosticBreakdown.innerHTML = '';
    diag.diagnostics.forEach(d => {
      const item = document.createElement('div');
      item.className = `diagnostic-item ${d.type}`;
      item.innerHTML = `<strong>${d.title}</strong><p style="margin-top:0.25rem; color:var(--text-secondary); font-size:0.85rem;">${d.text}</p>`;
      DOM.aiDiagnosticBreakdown.appendChild(item);
    });

    DOM.aiSuggestionsList.innerHTML = '';
    diag.suggestions.forEach(s => {
      const item = document.createElement('div');
      item.className = 'suggestion-item-card';
      item.innerHTML = `
        <div>
          <strong>${s.title}</strong>
          <span style="display:block; font-size:0.75rem; color:var(--emerald-400);">${s.impact}</span>
        </div>
        <button class="btn btn-outline btn-xs" data-action="${s.action}">
          <i class="fa-solid fa-flask"></i> اختبر بالـ What-If
        </button>
      `;

      item.querySelector('button').addEventListener('click', () => {
        switchCockpitTab('tabWhatIf');
        if (s.action === 'test_price_hike') {
          DOM.sliderPriceChange.value = 10;
          DOM.valSliderPrice.textContent = '+10%';
          state.whatIf.priceDeltaPct = 10;
        } else if (s.action === 'test_marketing_boost') {
          DOM.sliderMarketing.value = state.business.marketing + 200;
          DOM.valSliderMarketing.textContent = `$${state.business.marketing + 200}`;
          state.whatIf.marketingVal = state.business.marketing + 200;
        }
        renderWhatIfSandbox();
      });

      DOM.aiSuggestionsList.appendChild(item);
    });
  }

  // Inventory Meters Grid
  function renderInventoryMeters() {
    if (!state.business.inventory) return;
    DOM.inventoryMetersGrid.innerHTML = '';
    state.business.inventory.forEach(inv => {
      const maxCap = inv.reorderQty + inv.minThreshold;
      const pct = Math.min(100, Math.round((inv.quantity / maxCap) * 100));
      let statusClass = 'safe';
      if (pct < 30) statusClass = 'danger';
      else if (pct < 55) statusClass = 'warning';

      const card = document.createElement('div');
      card.className = 'inventory-card';
      card.innerHTML = `
        <div class="inventory-card-top">
          <span class="inventory-name">${inv.name}</span>
          <span class="stock-level-badge ${statusClass}">${inv.quantity} ${inv.unit}</span>
        </div>
        <div class="stock-progress-bar">
          <div class="stock-fill ${statusClass}" style="width: ${pct}%"></div>
        </div>
        <div class="inventory-metrics-mini">
          <span>تكلفة الوحدة: $${inv.unitCost}</span>
          <span>الحد الأدنى: ${inv.minThreshold} ${inv.unit}</span>
        </div>
        <button class="btn btn-outline btn-xs btn-restock" data-invid="${inv.id}">
          <i class="fa-solid fa-cart-plus"></i> توريد عاجل (+${inv.reorderQty} ${inv.unit})
        </button>
      `;

      card.querySelector('.btn-restock').addEventListener('click', () => {
        restockItem(inv);
      });

      DOM.inventoryMetersGrid.appendChild(card);
    });
  }

  function restockItem(inv) {
    sound.playClick();
    const cost = Math.round(inv.reorderQty * inv.unitCost);
    const current = state.history[state.history.length - 1];
    if (current.cashBalance < cost) {
      addAlert('danger', `السيولة النقدية غير كافية لشراء التوريد! التكلفة $${cost} ورصيدك $${current.cashBalance}.`);
      return;
    }
    inv.quantity += inv.reorderQty;
    current.cashBalance -= cost;
    sound.playCash();
    addAlert('success', `📦 تم توريد ${inv.reorderQty} ${inv.unit} من [${inv.name}] بنجاح وتخصيم $${cost} من الكاش.`);
    refreshDashboard();
  }

  // Staff Roster
  function renderStaffRoster() {
    if (!state.business.staff) return;
    DOM.staffRosterGrid.innerHTML = '';
    state.business.staff.forEach(s => {
      const card = document.createElement('div');
      card.className = 'staff-card';
      card.innerHTML = `
        <div class="staff-top">
          <div class="staff-avatar"><i class="fa-solid fa-user-tie"></i></div>
          <div class="staff-info">
            <h4>${s.name}</h4>
            <span>${s.role}</span>
          </div>
        </div>
        <div class="staff-stats">
          <span>الراتب: <strong>$${s.salary}/شهر</strong></span>
          <span>الإنتاجية: <strong>${Math.round(s.productivity * 100)}%</strong></span>
          <span>ساعات العمل: <strong>${s.hours}h</strong></span>
        </div>
      `;
      DOM.staffRosterGrid.appendChild(card);
    });
  }

  // Competitors and Segments
  function renderCompetitorsAndSegments() {
    // Competitors
    if (state.business.competitors) {
      DOM.competitorsGrid.innerHTML = '';
      state.business.competitors.forEach(c => {
        const card = document.createElement('div');
        card.className = 'competitor-card';
        card.innerHTML = `
          <div class="comp-header">
            <h4>${c.name}</h4>
            <span class="badge badge-emerald">حصة ${c.marketShare}%</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">
            مؤشر الأسعار: <strong>${c.priceIndex > 1 ? '+' : ''}${Math.round((c.priceIndex - 1) * 100)}% مقارنة بك</strong>
          </div>
          <p style="font-size:0.78rem; color:var(--text-muted);">${c.strategy}</p>
        </div>`;
        DOM.competitorsGrid.appendChild(card);
      });
    }

    // Segments
    if (state.business.customerSegments) {
      DOM.segmentsGrid.innerHTML = '';
      state.business.customerSegments.forEach(seg => {
        const card = document.createElement('div');
        card.className = 'segment-card';
        card.innerHTML = `
          <div class="seg-header">
            <h4>${seg.name}</h4>
            <span class="badge badge-gold">يشكل ${Math.round(seg.share * 100)}% من الزبائن</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); display:flex; justify-content:space-between; margin-top:0.4rem;">
            <span>حساسية السعر: <strong>${seg.priceSensitivity > 1.3 ? 'عالية' : 'معتدلة'}</strong></span>
            <span>متوسط الفاتورة: <strong>$${seg.avgTicket}</strong></span>
          </div>
        `;
        DOM.segmentsGrid.appendChild(card);
      });
    }
  }

  // 12-Month Executive Report
  function renderExecutiveReport() {
    if (!state.business) return;
    DOM.reportBizTitle.textContent = `مشروع ${state.business.title || 'مشروعي'} — تقرير المحاكاة ودراسة الجدوى`;
    DOM.reportMetaInfo.textContent = `المدينة: ${state.business.location} | رأس المال الابتدائي: $${state.business.initialCapital.toLocaleString()} | الأشهر المحاكاة: ${state.history.length} / 12`;

    const totalRev = state.history.reduce((acc, h) => acc + h.revenue, 0);
    const totalExp = state.history.reduce((acc, h) => acc + (h.cogs + h.opex), 0);
    const netResult = totalRev - totalExp;
    const endingCash = state.history.length > 0 ? state.history[state.history.length - 1].cashBalance : state.business.initialCapital;
    const roi = Math.round(((endingCash - state.business.initialCapital) / state.business.initialCapital) * 100);

    DOM.repStartCapital.textContent = `$${state.business.initialCapital.toLocaleString()}`;
    DOM.repTotalRevenue.textContent = `$${totalRev.toLocaleString()}`;
    DOM.repTotalExpenses.textContent = `$${totalExp.toLocaleString()}`;
    DOM.repNetResult.textContent = `${netResult >= 0 ? '+' : ''}$${netResult.toLocaleString()}`;
    DOM.repEndingCash.textContent = `$${endingCash.toLocaleString()}`;
    DOM.repROI.textContent = `${roi}%`;

    // Monthly P&L Table
    let tableHtml = `
      <thead>
        <tr>
          <th>الشهر</th>
          <th>الإيرادات</th>
          <th>تكلفة المواد (COGS)</th>
          <th>الربح الإجمالي</th>
          <th>المصاريف التشغيلية (OPEX)</th>
          <th>صافي الربح</th>
          <th>رصيد الكاش</th>
        </tr>
      </thead>
      <tbody>
    `;

    state.history.forEach(h => {
      tableHtml += `
        <tr>
          <td><strong>الشهر ${h.month}</strong> (${h.season})</td>
          <td class="text-emerald">$${h.revenue.toLocaleString()}</td>
          <td>$${h.cogs.toLocaleString()}</td>
          <td>$${h.grossProfit.toLocaleString()}</td>
          <td>$${h.opex.toLocaleString()}</td>
          <td class="${h.netProfit >= 0 ? 'text-emerald' : 'text-rose'}"><strong>${h.netProfit >= 0 ? '+' : ''}$${h.netProfit.toLocaleString()}</strong></td>
          <td>$${h.cashBalance.toLocaleString()}</td>
        </tr>
      `;
    });
    tableHtml += '</tbody>';
    DOM.reportPlTable.innerHTML = tableHtml;

    // Decision Audit
    if (state.decisionHistory.length > 0) {
      DOM.reportDecisionsList.innerHTML = state.decisionHistory.map(d => `
        <div style="padding:0.5rem 0; border-bottom:1px solid var(--border-subtle); font-size:0.85rem;">
          <strong class="text-emerald">الشهر ${d.month}:</strong> ${d.dilemma} ➔ <em>تم اختيار: ${d.choice}</em>
        </div>
      `).join('');
    } else {
      DOM.reportDecisionsList.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">لم يتم تسجيل أزمات كبرى خلال فترة المحاكاة.</div>';
    }

    // AI Retrospective
    let retro = `بعد محاكاة تشغيلية لـ ${state.history.length} شهراً: `;
    if (roi > 20) {
      retro += `المشروع أثبت جدوى اقتصادية عالية وقدرة ممتازة على توليد تدفقات نقدية مستدامة مع عائد استثمار (${roi}%). حافظ على ميزانية التسويق واحرص على تطوير برامج ولاء الزبائن للتحضير لمرحلة التوسع والفرع الثاني.`;
    } else if (roi >= 0) {
      retro += `المشروع حقق نقطة التعادل واستطاع تغطية مصاريفه بنجاح دون خسارة رأس المال، إلا أن هامش الربح الصافي بحاجة لتعزيز عبر خفض تكلفة المواد وإعادة تسعير بعض المنتجات الاستراتيجية.`;
    } else {
      retro += `المشروع واجه ضغوطاً سيولية عالية نتيجة ارتفاع المصاريف الثابتة مقارنة بحجم الطلب الأولي. ينصح بإعادة دراسة موقع العقار والتفاوض على الإيجار، وتخفيض الكوادر في الأشهر الأولى قبل الإنطلاق الفعلي.`;
    }
    DOM.reportAiRetrospective.innerHTML = `<p>${retro}</p>`;
  }

  // Add Alert Banner to Stream
  function addAlert(type, message) {
    const banner = document.createElement('div');
    banner.className = `sim-alert ${type}`;
    let icon = 'fa-circle-info';
    if (type === 'danger') icon = 'fa-triangle-exclamation';
    else if (type === 'warning') icon = 'fa-bolt';
    else if (type === 'success') icon = 'fa-circle-check';

    banner.innerHTML = `
      <div class="alert-message">
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="btn btn-ghost btn-xs" style="padding:0.2rem 0.4rem;">&times;</button>
    `;

    banner.querySelector('button').addEventListener('click', () => {
      banner.remove();
    });

    DOM.alertsStreamContainer.prepend(banner);

    // Auto remove after 10s
    setTimeout(() => {
      if (banner.parentNode) banner.remove();
    }, 10000);
  }

  // Cockpit Tab Navigation Switcher
  function switchCockpitTab(tabId) {
    document.querySelectorAll('.cockpit-nav .tab-btn').forEach(b => {
      if (b.dataset.tab === tabId) b.classList.add('active');
      else b.classList.remove('active');
    });

    document.querySelectorAll('.cockpit-tabs-container .tab-content').forEach(c => {
      if (c.id === tabId) c.classList.add('active');
      else c.classList.remove('active');
    });

    state.ui.activeTab = tabId;
  }

  // ==========================================================================
  // 11. Event Listeners & UI Handlers
  // ==========================================================================
  function attachEventListeners() {
    // Sound Toggle
    DOM.soundToggleBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      DOM.soundIcon.className = sound.enabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    });

    // Theme Toggle
    DOM.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      DOM.themeIcon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      sound.playClick();
    });

    // Language Toggle
    DOM.langToggleBtn.addEventListener('click', () => {
      sound.playClick();
      const currentDir = document.documentElement.getAttribute('dir') || 'rtl';
      if (currentDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        DOM.langText.textContent = 'عربي';
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        DOM.langText.textContent = 'English';
      }
    });

    // New Project Button
    DOM.btnNewProject.addEventListener('click', () => {
      sound.playClick();
      switchView('viewLanding');
    });

    // Natural Language Business Generator
    DOM.btnNlGenerate.addEventListener('click', () => {
      const prompt = DOM.nlPromptInput.value.trim();
      if (!prompt) {
        DOM.nlPromptInput.focus();
        return;
      }
      sound.playSuccess();
      const parsed = NaturalLanguageBuilder.parse(prompt);
      state.business = parsed;
      state.currentMonth = 1;
      state.history = [];
      state.dilemmas = [];
      state.decisionHistory = [];
      state.entrepreneurXP = 120;
      state.activeChallenge = null;

      const m1Record = SimulationEngine.calculateMonth(state.business, 1);
      state.history.push(m1Record);

      switchView('viewDashboard');
      updateHeaderBizBanner();
      refreshDashboard();

      addAlert('success', `✨ تم توليد التوأم الرقمي لمشروع [${parsed.title}] بنجاح وفق وصفك الطبيعي.`);
    });

    // Prompt suggestion chips
    document.querySelectorAll('.suggestion-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        DOM.nlPromptInput.value = tag.dataset.prompt;
        DOM.btnNlGenerate.click();
      });
    });

    // Simulation Controls
    DOM.btnNextMonth.addEventListener('click', () => {
      advanceSimulationMonth();
    });

    DOM.btnAutoSimulate.addEventListener('click', () => {
      autoSimulateAll();
    });

    DOM.btnResetSim.addEventListener('click', () => {
      if (!state.business) return;
      sound.playClick();
      state.currentMonth = 1;
      state.history = [];
      state.dilemmas = [];
      state.decisionHistory = [];
      const m1 = SimulationEngine.calculateMonth(state.business, 1);
      state.history.push(m1);
      refreshDashboard();
      addAlert('info', '🔄 تم إعادة تشغيل المحاكاة من الشهر الأول.');
    });

    // Speed Controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.simSpeed = parseInt(btn.dataset.speed, 10) || 1;
      });
    });

    // Cockpit Navigation Tabs
    DOM.cockpitNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn && btn.dataset.tab) {
        sound.playClick();
        switchCockpitTab(btn.dataset.tab);
      }
    });

    // Quick AI Actions on Overview
    DOM.btnGoToAiTab.addEventListener('click', () => {
      switchCockpitTab('tabAiAdvisor');
    });

    DOM.btnQuickOptimize.addEventListener('click', () => {
      switchCockpitTab('tabWhatIf');
      DOM.sliderPriceChange.value = 5;
      DOM.valSliderPrice.textContent = '+5%';
      state.whatIf.priceDeltaPct = 5;
      renderWhatIfSandbox();
    });

    // What-If Sliders
    DOM.sliderPriceChange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      DOM.valSliderPrice.textContent = `${val >= 0 ? '+' : ''}${val}%`;
      state.whatIf.priceDeltaPct = val;
      renderWhatIfSandbox();
    });

    DOM.sliderMarketing.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      DOM.valSliderMarketing.textContent = `$${val}`;
      state.whatIf.marketingVal = val;
      renderWhatIfSandbox();
    });

    DOM.sliderStaff.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      DOM.valSliderStaff.textContent = `${val >= 0 ? '+' : ''}${val} موظف`;
      state.whatIf.staffDelta = val;
      renderWhatIfSandbox();
    });

    DOM.sliderRent.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      DOM.valSliderRent.textContent = `${val >= 0 ? '+' : ''}${val}%`;
      state.whatIf.rentDeltaPct = val;
      renderWhatIfSandbox();
    });

    // Quick Hypotheses buttons
    document.querySelectorAll('.btn-hypo').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const p = parseInt(btn.dataset.price, 10);
        const m = parseInt(btn.dataset.mkt, 10);
        const s = parseInt(btn.dataset.staff, 10);
        const r = parseInt(btn.dataset.rent, 10);

        DOM.sliderPriceChange.value = p;
        DOM.valSliderPrice.textContent = `${p >= 0 ? '+' : ''}${p}%`;
        state.whatIf.priceDeltaPct = p;

        DOM.sliderMarketing.value = m;
        DOM.valSliderMarketing.textContent = `$${m}`;
        state.whatIf.marketingVal = m;

        DOM.sliderStaff.value = s;
        DOM.valSliderStaff.textContent = `${s >= 0 ? '+' : ''}${s} موظف`;
        state.whatIf.staffDelta = s;

        DOM.sliderRent.value = r;
        DOM.valSliderRent.textContent = `${r >= 0 ? '+' : ''}${r}%`;
        state.whatIf.rentDeltaPct = r;

        renderWhatIfSandbox();
      });
    });

    // Apply What-If to Main Business
    DOM.btnApplyWhatIfToMain.addEventListener('click', () => {
      sound.playSuccess();
      if (state.whatIf.priceDeltaPct !== 0) {
        state.business.products.forEach(p => {
          p.price = Math.round((p.price * (1 + state.whatIf.priceDeltaPct / 100)) * 100) / 100;
        });
      }
      if (state.whatIf.marketingVal !== undefined) {
        state.business.marketing = state.whatIf.marketingVal;
      }
      if (state.whatIf.rentDeltaPct !== 0) {
        state.business.rent = Math.round(state.business.rent * (1 + state.whatIf.rentDeltaPct / 100));
      }

      // Reset sliders
      DOM.sliderPriceChange.value = 0;
      DOM.valSliderPrice.textContent = '0%';
      state.whatIf.priceDeltaPct = 0;

      addAlert('success', '✅ تم تطبيق سيناريو What-If واعتماد التعديلات على النموذج الأساسي.');
      refreshDashboard();
    });

    // AI Advisor Chat Form
    DOM.chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = DOM.chatUserInput.value.trim();
      if (!query) return;

      appendChatMessage('user', query);
      DOM.chatUserInput.value = '';

      setTimeout(() => {
        const response = AIAdvisorEngine.answerQuestion(state.business, state.history, query);
        appendChatMessage('ai', response);
      }, 400);
    });

    // Chat quick chips
    document.querySelectorAll('.chat-chips-row .chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.chatUserInput.value = btn.dataset.query;
        DOM.chatInputForm.dispatchEvent(new Event('submit'));
      });
    });

    DOM.btnClearChat.addEventListener('click', () => {
      DOM.chatMessagesScroll.innerHTML = `
        <div class="chat-msg ai-msg">
          <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="msg-body"><p>تم مسح المحادثة. كيف أساعدك اليوم في إدارة مشروعك؟</p></div>
        </div>
      `;
    });

    // Restock All Button
    DOM.btnRestockAll.addEventListener('click', () => {
      sound.playClick();
      if (!state.business.inventory) return;
      let totalCost = 0;
      state.business.inventory.forEach(inv => {
        totalCost += Math.round(inv.reorderQty * inv.unitCost);
        inv.quantity += inv.reorderQty;
      });
      const current = state.history[state.history.length - 1];
      current.cashBalance -= totalCost;
      sound.playCash();
      addAlert('success', `📦 تم التوريد الشامل لجميع المواد بنجاح وتخصيم $${totalCost.toLocaleString()} من الكاش.`);
      refreshDashboard();
    });

    // Custom Business Wizard Modal
    DOM.btnOpenCustomWizard.addEventListener('click', () => {
      sound.playClick();
      DOM.modalCustomWizard.classList.remove('hidden');
    });

    DOM.btnCloseWizard.addEventListener('click', () => {
      DOM.modalCustomWizard.classList.add('hidden');
    });

    // SaaS Modal
    DOM.btnSaasModal.addEventListener('click', () => {
      sound.playClick();
      DOM.modalSaas.classList.remove('hidden');
    });

    DOM.btnCloseSaas.addEventListener('click', () => {
      DOM.modalSaas.classList.add('hidden');
    });

    // Print Report
    DOM.btnPrintReport.addEventListener('click', () => {
      window.print();
    });

    // Custom Wizard Stepper Logic
    let currentWizStep = 1;
    DOM.btnWizNext.addEventListener('click', () => {
      if (currentWizStep < 4) {
        currentWizStep += 1;
        updateWizardStep();
      }
    });

    DOM.btnWizPrev.addEventListener('click', () => {
      if (currentWizStep > 1) {
        currentWizStep -= 1;
        updateWizardStep();
      }
    });

    DOM.btnWizFinish.addEventListener('click', () => {
      const name = document.getElementById('wizBizName').value || 'Custom Business';
      const category = document.getElementById('wizBizType').value || 'cafe';
      const location = document.getElementById('wizBizLocation').value || 'دمشق';
      const capital = parseFloat(document.getElementById('wizBizCapital').value) || 12000;
      const rent = parseFloat(document.getElementById('wizRent').value) || 800;
      const utilities = parseFloat(document.getElementById('wizUtilities').value) || 180;
      const marketing = parseFloat(document.getElementById('wizMarketing').value) || 300;

      const customBiz = JSON.parse(JSON.stringify(PRESET_TEMPLATES[category] || PRESET_TEMPLATES.cafe));
      customBiz.title = name;
      customBiz.location = location;
      customBiz.initialCapital = capital;
      customBiz.rent = rent;
      customBiz.utilities = utilities;
      customBiz.marketing = marketing;

      DOM.modalCustomWizard.classList.add('hidden');
      sound.playSuccess();

      state.business = customBiz;
      state.currentMonth = 1;
      state.history = [];
      state.dilemmas = [];
      state.decisionHistory = [];
      state.entrepreneurXP = 150;
      state.activeChallenge = null;

      const m1Record = SimulationEngine.calculateMonth(state.business, 1);
      state.history.push(m1Record);

      switchView('viewDashboard');
      updateHeaderBizBanner();
      refreshDashboard();
      addAlert('success', `🚀 تم إطلاق التوأم الرقمي المخصص لمشروع [${name}] بنجاح.`);
    });

    function updateWizardStep() {
      document.querySelectorAll('.wizard-stepper .step-item').forEach(s => {
        if (parseInt(s.dataset.step, 10) === currentWizStep) s.classList.add('active');
        else s.classList.remove('active');
      });
      document.querySelectorAll('.wizard-step-pane').forEach((p, idx) => {
        if (idx + 1 === currentWizStep) p.classList.add('active');
        else p.classList.remove('active');
      });

      DOM.btnWizPrev.disabled = (currentWizStep === 1);
      if (currentWizStep === 4) {
        DOM.btnWizNext.classList.add('hidden');
        DOM.btnWizFinish.classList.remove('hidden');
      } else {
        DOM.btnWizNext.classList.remove('hidden');
        DOM.btnWizFinish.classList.add('hidden');
      }
    }
  }

  function appendChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'ai-msg'}`;
    msg.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i></div>
      <div class="msg-body"><p>${text.replace(/\n/g, '<br/>')}</p></div>
    `;
    DOM.chatMessagesScroll.appendChild(msg);
    DOM.chatMessagesScroll.scrollTop = DOM.chatMessagesScroll.scrollHeight;
  }

  // Auto initialize on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
