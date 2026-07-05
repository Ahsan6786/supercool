#!/usr/bin/env node
// Batch-generates all English and Arabic service page files
const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "..", "src", "app");

const PAGES = [
  // ── English ────────────────────────────────────────────────────────────────
  {
    dir: "ac-service-al-ahsa",
    title: "AC Service Al Ahsa | Best Air Conditioning Company | Super Cool",
    desc: "Top-rated AC service in Al Ahsa Saudi Arabia. Super Cool offers AC installation, repair, cleaning & maintenance. 30+ years experience. Call +966 56 670 6358.",
    canonical: "/ac-service-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-service-al-ahsa",
    heroTitleEn: "Professional AC Service in Al Ahsa — 30+ Years of Quality",
    heroTitleAr: "خدمات تكييف احترافية في الأحساء - ٣٠+ عاماً من الجودة",
    heroDescEn: "Super Cool is the most trusted HVAC service provider in Al Ahsa. We deliver fast, quality AC installation, repair, and maintenance.",
    heroDescAr: "سوبر كول هي شركة التكييف الأكثر ثقة في الأحساء. نقدم تركيباً وإصلاحاً وصيانة سريعة وعالية الجودة.",
    h2En: "Complete AC Services Across Al Ahsa",
    h2Ar: "خدمات تكييف متكاملة في جميع أنحاء الأحساء",
    bodyEn: "Super Cool Air Conditioning Services has served Al Ahsa since 1989, providing split AC installation, central AC maintenance, emergency repair, deep cleaning, and premium copper piping to homes and businesses across Al Hofuf, Al Mubarraz, and Eastern Province.",
    bodyAr: "تخدم سوبر كول الأحساء منذ عام ١٩٨٩، تقدم تركيب مكيفات اسبليت، صيانة مكيفات مركزية، إصلاح طارئ، تنظيف عميق، وتمديد أنابيب نحاسية فاخرة للمنازل والشركات.",
    body2En: "Every service is backed by 30+ years of local expertise, certified technicians, and a commitment to quality workmanship using only premium materials.",
    body2Ar: "كل خدمة مدعومة بأكثر من ٣٠ عاماً من الخبرة المحلية وفنيين معتمدين وقيوداً على الجودة باستخدام أفضل المواد.",
    bulletEn: ["Split & Central AC Installation", "AC Repair & Gas Refill", "Deep Pressure Wash Cleaning", "Premium Copper Pipe Laying", "24/7 Emergency Response"],
    bulletAr: ["تركيب مكيفات اسبليت ومركزي", "إصلاح المكيفات وتعبئة الفريون", "تنظيف بالغسيل العميق بالضغط", "تمديد أنابيب نحاس فاخرة", "طوارئ على مدار الساعة"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC service work Al Ahsa Saudi Arabia by Super Cool technicians",
    imageAltAr: "أعمال تكييف احترافية في الأحساء من فنيي سوبر كول",
    ctaTitleEn: "Book AC Service in Al Ahsa Today",
    ctaTitleAr: "احجز خدمة تكييف في الأحساء الآن",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Service Al Ahsa", url: "https://supercoolalhasa.shop/ac-service-al-ahsa" }
    ],
  },
  {
    dir: "ac-repair-al-ahsa",
    title: "AC Repair Al Ahsa | Fast AC Technician | Super Cool",
    desc: "Fast professional AC repair service in Al Ahsa. All brands repaired. Gas refill, compressor, water leak. Available 24/7. Call +966 56 670 6358.",
    canonical: "/ac-repair-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-repair-al-ahsa",
    heroTitleEn: "Fast AC Repair Service in Al Ahsa — All Brands Fixed",
    heroTitleAr: "إصلاح مكيفات سريع في الأحساء - جميع الماركات",
    heroDescEn: "Certified AC repair technicians available 24/7 across Al Ahsa. We fix compressors, gas leaks, circuit boards, and water dripping.",
    heroDescAr: "فنيو إصلاح مكيفات معتمدون متاحون على مدار الساعة في الأحساء. نصلح الضواغط وتسربات الغاز ولوحات الدوائر وتسرب المياه.",
    h2En: "Expert AC Repair & Diagnostics Al Ahsa",
    h2Ar: "إصلاح وتشخيص أعطال المكيفات في الأحساء",
    bodyEn: "When your AC breaks down in the Al Ahsa summer heat, Super Cool is ready. Our certified HVAC technicians diagnose and repair all split and central AC systems across Al Hofuf, Al Mubarraz, and Al Qarah. We carry original spare parts for all major brands.",
    bodyAr: "عندما يتعطل مكيفك في حرارة الأحساء، سوبر كول جاهزة. فنيونا المعتمدون يشخصون ويصلحون جميع أنظمة التكييف في الهفوف والمبرز والقارة. لدينا قطع غيار أصلية لجميع الماركات.",
    body2En: "From compressor failures to refrigerant leaks and electrical faults, our team resolves all issues using original spare parts and precision tools.",
    body2Ar: "من أعطال الضاغط إلى تسريبات الفريون والأعطال الكهربائية، يحل فريقنا جميع المشاكل بقطع غيار أصلية وأدوات دقيقة.",
    bulletEn: ["Compressor & Capacitor Repair", "Refrigerant Gas Refill (R22/R32/R410)", "Water Leak & Drainage Fix", "Electrical & PCB Repair", "All Brands: LG, GREE, Samsung, Daikin"],
    bulletAr: ["إصلاح الضاغط والكابيسيتر", "تعبئة فريون (R22/R32/R410)", "إصلاح تسريبات المياه والتصريف", "إصلاح كهرباء ولوحة التحكم", "جميع الماركات: LG, GREE, سامسونج, دايكن"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC repair service vehicle in Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة إصلاح مكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Get Fast AC Repair in Al Ahsa",
    ctaTitleAr: "احصل على إصلاح مكيفات سريع في الأحساء",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Repair Al Ahsa", url: "https://supercoolalhasa.shop/ac-repair-al-ahsa" }
    ],
  },
  {
    dir: "ac-installation-al-ahsa",
    title: "AC Installation Al Ahsa | Split & Central AC | Super Cool",
    desc: "Expert split and central AC installation in Al Ahsa. Premium copper pipes, certified technicians, quality workmanship. Call +966 56 670 6358.",
    canonical: "/ac-installation-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-installation-al-ahsa",
    heroTitleEn: "Professional AC Installation Service in Al Ahsa",
    heroTitleAr: "خدمة تركيب مكيفات احترافية في الأحساء",
    heroDescEn: "Best split AC and central AC installation in Al Ahsa. Quality copper piping, certified setup, and performance verification.",
    heroDescAr: "أفضل تركيب مكيفات اسبليت ومركزي في الأحساء. تمديد نحاس جودة وتركيب معتمد وتحقق من الأداء.",
    h2En: "Split AC Installation Specialists in Al Ahsa",
    h2Ar: "متخصصون في تركيب مكيفات الاسبليت في الأحساء",
    bodyEn: "Super Cool installs all types of split and central air conditioning systems in Al Ahsa. Our certified technicians ensure correct bracket mounting, premium copper pipe routing, nitrogen pressure testing, and optimal gas charging for peak performance from day one.",
    bodyAr: "تركّب سوبر كول جميع أنواع المكيفات الاسبليت والمركزي في الأحساء. يضمن فنيونا المعتمدون التركيب الصحيح للحوامل وتمديد أنابيب النحاس الفاخرة واختبار ضغط النيتروجين.",
    body2En: "We use only American and Korean premium copper pipes with Armaflex thermal insulation for maximum efficiency and longevity in Saudi Arabia's harsh climate.",
    body2Ar: "نستخدم فقط أنابيب النحاس الأمريكي والكوري الفاخرة مع عزل Armaflex الحراري لتحقيق أقصى كفاءة وطول عمر في المناخ السعودي القاسي.",
    bulletEn: ["All Split AC Brands Installed", "Premium Copper Pipe & Insulation", "Nitrogen Pressure Testing", "Bracket & Drain Installation", "Performance Verification"],
    bulletAr: ["تركيب جميع ماركات الاسبليت", "أنابيب نحاس وعزل فاخر", "اختبار ضغط بالنيتروجين", "تركيب حوامل وتصريف", "تحقق من الأداء"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation work Al Ahsa by Super Cool",
    imageAltAr: "أعمال تركيب مكيفات احترافية في الأحساء من سوبر كول",
    ctaTitleEn: "Book AC Installation in Al Ahsa",
    ctaTitleAr: "احجز تركيب مكيف في الأحساء",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Installation Al Ahsa", url: "https://supercoolalhasa.shop/ac-installation-al-ahsa" }
    ],
  },
  {
    dir: "ac-maintenance-al-ahsa",
    title: "AC Maintenance Al Ahsa | Scheduled HVAC Service | Super Cool",
    desc: "Professional AC maintenance and tune-up services in Al Ahsa. Prevent breakdowns, reduce electricity, extend AC life. Call +966 56 670 6358.",
    canonical: "/ac-maintenance-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-maintenance-al-ahsa",
    heroTitleEn: "AC Maintenance & Tune-Up Service in Al Ahsa",
    heroTitleAr: "خدمة صيانة وضبط المكيفات في الأحساء",
    heroDescEn: "Scheduled AC maintenance in Al Ahsa to prevent costly breakdowns, reduce energy bills, and extend the life of your air conditioner.",
    heroDescAr: "صيانة دورية للمكيفات في الأحساء لمنع الأعطال المكلفة وخفض فواتير الطاقة وإطالة عمر المكيف.",
    h2En: "Preventative AC Maintenance in Al Ahsa",
    h2Ar: "صيانة وقائية للمكيفات في الأحساء",
    bodyEn: "Regular maintenance is the key to trouble-free AC operation in Al Ahsa's extreme summer temperatures. Super Cool's maintenance program covers full system inspection, refrigerant level checks, electrical testing, filter cleaning, and drainage verification.",
    bodyAr: "الصيانة المنتظمة هي مفتاح تشغيل المكيفات بلا مشاكل في درجات الحرارة القصوى في الأحساء. تشمل برنامج صيانة سوبر كول فحص النظام الكامل وفحص مستوى الفريون والاختبار الكهربائي وتنظيف الفلاتر.",
    body2En: "Our preventative maintenance plans save Al Ahsa residents up to 30% on their electricity bills while eliminating unexpected failures during peak summer months.",
    body2Ar: "خطط الصيانة الوقائية لدينا توفر لسكان الأحساء ما يصل إلى ٣٠٪ من فواتير الكهرباء مع إلغاء الأعطال المفاجئة خلال أشهر الصيف.",
    bulletEn: ["Full System Diagnostic", "Refrigerant Level Check", "Filter & Coil Cleaning", "Electrical Safety Check", "Drain & Condensate Flush"],
    bulletAr: ["تشخيص شامل للنظام", "فحص مستوى الفريون", "تنظيف الفلاتر والكويلات", "فحص السلامة الكهربائية", "تنظيف التصريف والمكثفات"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC maintenance service vehicle Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة صيانة المكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Schedule AC Maintenance in Al Ahsa",
    ctaTitleAr: "احجز موعد صيانة مكيف في الأحساء",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Maintenance Al Ahsa", url: "https://supercoolalhasa.shop/ac-maintenance-al-ahsa" }
    ],
  },
  {
    dir: "ac-cleaning-al-ahsa",
    title: "AC Cleaning Service Al Ahsa | Deep Wash | Super Cool",
    desc: "Professional AC deep cleaning and pressure wash service in Al Ahsa. Fresh air, better cooling, reduced electricity. Call +966 56 670 6358.",
    canonical: "/ac-cleaning-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-cleaning-al-ahsa",
    heroTitleEn: "AC Deep Cleaning Service in Al Ahsa — Dust-Free Cooling",
    heroTitleAr: "خدمة تنظيف مكيفات عميقة في الأحساء - تبريد خالٍ من الغبار",
    heroDescEn: "Professional high-pressure AC wash in Al Ahsa. Removes dust, mold, and odors for cleaner air and up to 30% energy savings.",
    heroDescAr: "غسيل مكيفات بالضغط العالي في الأحساء. يزيل الغبار والعفن والروائح لهواء أنظف ووفر يصل إلى ٣٠٪ في الكهرباء.",
    h2En: "High-Pressure AC Washing Al Ahsa — No Mess Guaranteed",
    h2Ar: "غسيل مكيفات بالضغط العالي في الأحساء - مضمون بدون فوضى",
    bodyEn: "Over time, Al Ahsa's dusty environment clogs AC coils and filters, reducing performance and air quality. Super Cool's professional pressure wash service completely eliminates dust, bacteria, and mold using specialized drainage bags that protect your walls and furniture.",
    bodyAr: "بمرور الوقت، تسد بيئة الأحساء المغبرة كويلات المكيف والفلاتر، مما يقلل الأداء وجودة الهواء. تزيل خدمة الغسيل بالضغط من سوبر كول الغبار والبكتيريا والعفن باستخدام أكياس تصريف متخصصة.",
    body2En: "We use protective plastic drainage jackets to ensure your walls, carpets, and furniture stay completely dry and clean throughout the process.",
    body2Ar: "نستخدم أغطية تصريف بلاستيكية واقية لضمان بقاء جدرانك وسجادك وأثاثك جافًا ونظيفًا تمامًا طوال العملية.",
    bulletEn: ["Evaporator Coil Pressure Wash", "Blower Wheel Deep Clean", "Drain Tray Sanitize", "Outdoor Condenser Wash", "No-Mess Guaranteed"],
    bulletAr: ["غسيل كويل التبخير بالضغط", "تنظيف عميق لعجلة النفخ", "تعقيم صينية التصريف", "غسيل المكثف الخارجي", "مضمون بدون فوضى"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "AC deep cleaning service Al Ahsa professional pressure wash by Super Cool",
    imageAltAr: "تنظيف مكيفات عميق في الأحساء بالغسيل بالضغط من سوبر كول",
    ctaTitleEn: "Book AC Cleaning in Al Ahsa",
    ctaTitleAr: "احجز تنظيف مكيف في الأحساء",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Cleaning Al Ahsa", url: "https://supercoolalhasa.shop/ac-cleaning-al-ahsa" }
    ],
  },
  {
    dir: "ac-copper-piping-al-ahsa",
    title: "AC Copper Pipe Installation Al Ahsa | Premium Quality | Super Cool",
    desc: "Premium American copper pipe installation for AC units in Al Ahsa. Nitrogen tested, thermally insulated. No gas leaks. Call +966 56 670 6358.",
    canonical: "/ac-copper-piping-al-ahsa",
    ogUrl: "https://supercoolalhasa.shop/ac-copper-piping-al-ahsa",
    heroTitleEn: "Premium AC Copper Pipe Installation in Al Ahsa",
    heroTitleAr: "تمديد أنابيب نحاسية فاخرة للمكيفات في الأحساء",
    heroDescEn: "High-density American and Korean copper pipe installation with Armaflex insulation. Zero gas leaks guaranteed for Al Ahsa homes and businesses.",
    heroDescAr: "تمديد أنابيب نحاسية أمريكية وكورية عالية الكثافة مع عزل Armaflex. مضمون بدون تسريبات لمنازل وأعمال الأحساء.",
    h2En: "American Premium Copper Pipe — Al Ahsa Specialists",
    h2Ar: "نحاس أمريكي فاخر - متخصصون في الأحساء",
    bodyEn: "Using thin or low-grade copper pipes leads to refrigerant leaks, compressor damage, and costly repairs. Super Cool exclusively uses high-purity American Mueller copper pipes with thick walls that withstand Saudi Arabia's extreme heat and pressure cycles.",
    bodyAr: "استخدام أنابيب النحاس الرفيعة أو رديئة الجودة يؤدي إلى تسريبات الفريون وتلف الضاغط وإصلاحات مكلفة. تستخدم سوبر كول حصراً أنابيب نحاس أمريكية Mueller عالية النقاء.",
    body2En: "All runs are wrapped with premium Armaflex closed-cell insulation and protective UV-resistant tape, ensuring decades of leak-free operation.",
    body2Ar: "جميع التمديدات مغلفة بعزل Armaflex خلوي مغلق فاخر وشريط واقٍ مقاوم للأشعة فوق البنفسجية، مما يضمن تشغيلاً بدون تسرب لعقود.",
    bulletEn: ["American Mueller Premium Copper", "Armaflex Thermal Insulation", "Nitrogen Pressure Leak Test", "UV-Resistant Protective Tape", "Extension & Relocation Work"],
    bulletAr: ["نحاس أمريكي Mueller فاخر", "عزل حراري Armaflex", "اختبار تسرب ضغط النيتروجين", "شريط واقٍ مقاوم للأشعة فوق البنفسجية", "أعمال التمديد والنقل"],
    imageSrc: "/premium-copper-pipe-ac-installation.webp",
    imageAltEn: "Premium copper pipe used for AC installation Al Ahsa Saudi Arabia",
    imageAltAr: "أنابيب نحاسية فاخرة لتركيب مكيفات في الأحساء",
    ctaTitleEn: "Get Copper Pipe Installation in Al Ahsa",
    ctaTitleAr: "احصل على تمديد نحاس في الأحساء",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Copper Piping Al Ahsa", url: "https://supercoolalhasa.shop/ac-copper-piping-al-ahsa" }
    ],
  },
  {
    dir: "ac-service-al-hofuf",
    title: "AC Service Al Hofuf | Best HVAC Technician | Super Cool",
    desc: "Trusted AC service company in Al Hofuf Saudi Arabia. 30+ years serving Al Hofuf with AC installation, repair, cleaning & maintenance. Call +966 56 670 6358.",
    canonical: "/ac-service-al-hofuf",
    ogUrl: "https://supercoolalhasa.shop/ac-service-al-hofuf",
    heroTitleEn: "Best AC Service Company in Al Hofuf — 30+ Years Local",
    heroTitleAr: "أفضل شركة خدمات تكييف في الهفوف - ٣٠+ عاماً محلية",
    heroDescEn: "Super Cool is Al Hofuf's most trusted air conditioning services company. Established 1989. Fast response, quality work guaranteed.",
    heroDescAr: "سوبر كول هي شركة خدمات التكييف الأكثر ثقة في الهفوف. تأسست عام ١٩٨٩. استجابة سريعة وعمل عالي الجودة مضمون.",
    h2En: "Complete AC Solutions for Al Hofuf Homes & Businesses",
    h2Ar: "حلول تكييف متكاملة لمنازل وأعمال الهفوف",
    bodyEn: "Based in Al Hofuf since 1989, Super Cool serves thousands of residential and commercial clients across Al Hofuf, Al Mubarraz, and the wider Al Ahsa area. Our team of experienced HVAC technicians provides same-day service for most AC issues.",
    bodyAr: "مقرها في الهفوف منذ عام ١٩٨٩، تخدم سوبر كول آلاف العملاء السكنيين والتجاريين في الهفوف والمبرز وجميع أنحاء الأحساء.",
    body2En: "Whether you need emergency AC repair, routine maintenance, or a new installation, Super Cool delivers consistent, high-quality results every time.",
    body2Ar: "سواء كنت تحتاج إصلاح مكيفات طارئ أو صيانة روتينية أو تركيب جديد، تقدم سوبر كول نتائج عالية الجودة في كل مرة.",
    bulletEn: ["All AC Services in One Place", "Same-Day Emergency Response", "Residential & Commercial", "30+ Years Al Hofuf Experience", "Transparent Pricing"],
    bulletAr: ["جميع خدمات التكييف في مكان واحد", "استجابة طوارئ في نفس اليوم", "سكني وتجاري", "٣٠+ عاماً خبرة الهفوف", "أسعار شفافة"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC service vehicle in Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Book AC Service in Al Hofuf",
    ctaTitleAr: "احجز خدمة تكييف في الهفوف",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Service Al Hofuf", url: "https://supercoolalhasa.shop/ac-service-al-hofuf" }
    ],
  },
  {
    dir: "ac-repair-al-hofuf",
    title: "AC Repair Al Hofuf | Emergency Technician 24/7 | Super Cool",
    desc: "Fast AC repair in Al Hofuf available 24/7. Fix compressor, gas refill, water leak, electrical faults. All brands. Call +966 56 670 6358.",
    canonical: "/ac-repair-al-hofuf",
    ogUrl: "https://supercoolalhasa.shop/ac-repair-al-hofuf",
    heroTitleEn: "Emergency AC Repair Al Hofuf — 24/7 Available",
    heroTitleAr: "إصلاح مكيفات طارئ في الهفوف - متاح ٢٤/٧",
    heroDescEn: "Super Cool's HVAC repair team covers all of Al Hofuf 24 hours a day. Fast diagnosis and repair of all AC brands and systems.",
    heroDescAr: "فريق إصلاح تكييف سوبر كول يغطي جميع أنحاء الهفوف على مدار الساعة. تشخيص وإصلاح سريع لجميع ماركات وأنظمة التكييف.",
    h2En: "Certified AC Repair Technicians Al Hofuf",
    h2Ar: "فنيو إصلاح مكيفات معتمدون في الهفوف",
    bodyEn: "When your AC stops working in Al Hofuf's extreme summer heat, Super Cool responds fast. Our certified technicians carry original spare parts for all major brands and diagnose faults accurately on the first visit, saving you time and money.",
    bodyAr: "عندما يتوقف مكيفك في حرارة الهفوف الشديدة، تستجيب سوبر كول بسرعة. يحمل فنيونا المعتمدون قطع غيار أصلية لجميع الماركات الرئيسية.",
    body2En: "From minor thermostat faults to major compressor replacements, no AC repair job in Al Hofuf is too big or too small for Super Cool.",
    body2Ar: "من أعطال الثرموستات البسيطة إلى استبدال الضواغط الكبيرة، لا توجد مهمة إصلاح مكيفات في الهفوف كبيرة أو صغيرة بالنسبة لسوبر كول.",
    bulletEn: ["Emergency Repair Within Hours", "Original Spare Parts Stock", "All Brands Covered", "Gas Refill & Leak Seal", "Electrical Fault Diagnosis"],
    bulletAr: ["إصلاح طارئ في غضون ساعات", "مخزون قطع الغيار الأصلية", "جميع الماركات", "تعبئة غاز وإصلاح التسريبات", "تشخيص الأعطال الكهربائية"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC repair service vehicle in Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة إصلاح مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Get AC Repair in Al Hofuf Now",
    ctaTitleAr: "احصل على إصلاح مكيفات في الهفوف الآن",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Repair Al Hofuf", url: "https://supercoolalhasa.shop/ac-repair-al-hofuf" }
    ],
  },
  {
    dir: "ac-installation-al-hofuf",
    title: "AC Installation Al Hofuf | Split & Central AC | Super Cool",
    desc: "Professional AC installation in Al Hofuf. All split AC brands installed with premium copper piping. Quality work guaranteed. Call +966 56 670 6358.",
    canonical: "/ac-installation-al-hofuf",
    ogUrl: "https://supercoolalhasa.shop/ac-installation-al-hofuf",
    heroTitleEn: "Split AC Installation in Al Hofuf — Quality Guaranteed",
    heroTitleAr: "تركيب مكيفات اسبليت في الهفوف - جودة مضمونة",
    heroDescEn: "Expert AC installation service in Al Hofuf. All brands. Premium copper piping. Nitrogen tested. Starting right the first time.",
    heroDescAr: "خدمة تركيب مكيفات احترافية في الهفوف. جميع الماركات. أنابيب نحاسية فاخرة. اختبار بالنيتروجين. الصواب من المرة الأولى.",
    h2En: "Professional AC Installation Service Al Hofuf",
    h2Ar: "خدمة تركيب مكيفات احترافية في الهفوف",
    bodyEn: "A properly installed AC system lasts longer and runs more efficiently. Super Cool's installation team in Al Hofuf follows strict quality protocols: correct bracket positioning, premium copper piping, proper drain slope, and nitrogen pressure testing before gas charging.",
    bodyAr: "نظام التكييف المركب بشكل صحيح يدوم أطول ويعمل بكفاءة أكبر. يتبع فريق تركيب سوبر كول في الهفوف بروتوكولات جودة صارمة.",
    body2En: "We install all split AC brands including LG, GREE, Samsung, Midea, Carrier, and Daikin across all areas of Al Hofuf and Al Mubarraz.",
    body2Ar: "نركب جميع ماركات الاسبليت بما فيها LG وGREE وسامسونج وميديا وكارير ودايكن في جميع أنحاء الهفوف والمبرز.",
    bulletEn: ["All Split AC Brands", "Central & Cassette AC", "Premium Copper & Insulation", "Bracket & Drain Install", "First-Day Performance Check"],
    bulletAr: ["جميع ماركات الاسبليت", "التكييف المركزي والكاسيت", "نحاس وعزل فاخر", "تركيب الحوامل والتصريف", "فحص الأداء في اليوم الأول"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation work Al Hofuf Saudi Arabia by Super Cool",
    imageAltAr: "أعمال تركيب مكيفات احترافية في الهفوف من سوبر كول",
    ctaTitleEn: "Book AC Installation in Al Hofuf",
    ctaTitleAr: "احجز تركيب مكيف في الهفوف",
    breadcrumbs: [
      { name: "Home", url: "https://supercoolalhasa.shop" },
      { name: "AC Installation Al Hofuf", url: "https://supercoolalhasa.shop/ac-installation-al-hofuf" }
    ],
  },
];

// ── Arabic pages ────────────────────────────────────────────────────────────
const AR_PAGES = [
  {
    dir: "ar/صيانة-مكيفات-الاحساء",
    title: "صيانة مكيفات الاحساء | سوبر كول للتكييف",
    desc: "شركة صيانة مكيفات بالاحساء والهفوف. فنيون معتمدون - خبرة ٣٠ عاماً. تركيب وإصلاح وتنظيف مكيفات. اتصل الآن +966 56 670 6358.",
    canonical: "/ar/صيانة-مكيفات-الاحساء",
    ogUrl: "https://supercoolalhasa.shop/ar/%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D8%A7%D8%AD%D8%B3%D8%A7%D8%A1",
    heroTitleEn: "AC Maintenance Al Ahsa | شركة صيانة مكيفات بالاحساء",
    heroTitleAr: "صيانة مكيفات الاحساء - سوبر كول ٣٠+ عاماً",
    heroDescEn: "Best AC maintenance company in Al Ahsa. Fast service, certified technicians.",
    heroDescAr: "أفضل شركة صيانة مكيفات في الأحساء. خدمة سريعة وفنيون معتمدون. تأسست ١٩٨٩.",
    h2En: "شركة صيانة مكيفات بالاحساء والهفوف",
    h2Ar: "شركة صيانة مكيفات بالاحساء والهفوف",
    bodyEn: "...",
    bodyAr: "سوبر كول هي شركة متخصصة في صيانة مكيفات الاحساء والهفوف منذ عام ١٩٨٩. نقدم خدمات صيانة مكيفات الاسبليت والمركزي والدولابي للمنازل والمشاريع التجارية في الأحساء والهفوف والمبرز والقارة وجميع مناطق المنطقة الشرقية.",
    body2En: "...",
    body2Ar: "فنيو صيانة المكيفات لدينا معتمدون وذوو خبرة عالية في التعامل مع جميع أعطال التكييف بما فيها تعبئة الفريون وإصلاح الضاغط وتنظيف الكويلات وإصلاح تسريبات المياه.",
    bulletEn: ["All AC Brands Serviced", "30+ Years Al Ahsa Experience", "Fast Same-Day Response", "Original Spare Parts", "24/7 Emergency Available"],
    bulletAr: ["صيانة جميع ماركات المكيفات", "خبرة ٣٠+ عاماً في الأحساء", "استجابة سريعة في نفس اليوم", "قطع غيار أصلية", "طوارئ ٢٤/٧"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC maintenance service vehicle Al Ahsa Saudi Arabia",
    imageAltAr: "سيارة خدمة صيانة مكيفات سوبر كول في الأحساء",
    ctaTitleEn: "Get AC Maintenance in Al Ahsa",
    ctaTitleAr: "احجز صيانة مكيف في الأحساء",
    breadcrumbs: [
      { name: "الرئيسية", url: "https://supercoolalhasa.shop" },
      { name: "صيانة مكيفات الاحساء", url: "https://supercoolalhasa.shop/ar/صيانة-مكيفات-الاحساء" }
    ],
  },
  {
    dir: "ar/صيانة-مكيفات-الهفوف",
    title: "صيانة مكيفات الهفوف | فني مكيفات الهفوف | سوبر كول",
    desc: "شركة صيانة مكيفات الهفوف - خبرة ٣٠ عاماً. تركيب وإصلاح وتنظيف مكيفات في الهفوف. اتصل +966 56 670 6358.",
    canonical: "/ar/صيانة-مكيفات-الهفوف",
    ogUrl: "https://supercoolalhasa.shop/ar/%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D9%87%D9%81%D9%88%D9%81",
    heroTitleEn: "AC Maintenance Al Hofuf | صيانة مكيفات الهفوف",
    heroTitleAr: "صيانة مكيفات الهفوف - سوبر كول",
    heroDescEn: "Trusted AC maintenance in Al Hofuf. Available 24/7.",
    heroDescAr: "صيانة مكيفات موثوقة في الهفوف. متاحون ٢٤/٧.",
    h2En: "صيانة مكيفات في الهفوف",
    h2Ar: "صيانة مكيفات في الهفوف",
    bodyEn: "...",
    bodyAr: "تقدم سوبر كول خدمات صيانة مكيفات شاملة في الهفوف تشمل الفحص الدوري وتعبئة الفريون وتنظيف الفلاتر والكويلات وإصلاح جميع أنواع الأعطال. فريقنا متاح طوال اليوم للطوارئ.",
    body2En: "...",
    body2Ar: "نحرص على تقديم أفضل خدمة صيانة مكيفات في الهفوف بأسعار تنافسية وشفافة دون رسوم خفية.",
    bulletEn: ["Scheduled Maintenance Plans", "Emergency 24/7 Service", "All Brands & Models", "Gas Refill Specialist", "Electrical Diagnostic"],
    bulletAr: ["خطط صيانة دورية", "خدمة طوارئ ٢٤/٧", "جميع الماركات والموديلات", "متخصصون في تعبئة الغاز", "تشخيص كهربائي"],
    imageSrc: "/supercool-ac-service-vehicle-al-ahsa.webp",
    imageAltEn: "Super Cool AC service vehicle Al Hofuf Saudi Arabia",
    imageAltAr: "سيارة خدمة مكيفات سوبر كول في الهفوف",
    ctaTitleEn: "Get AC Maintenance in Al Hofuf",
    ctaTitleAr: "احجز صيانة مكيف في الهفوف",
    breadcrumbs: [
      { name: "الرئيسية", url: "https://supercoolalhasa.shop" },
      { name: "صيانة مكيفات الهفوف", url: "https://supercoolalhasa.shop/ar/صيانة-مكيفات-الهفوف" }
    ],
  },
  {
    dir: "ar/تركيب-مكيفات-الاحساء",
    title: "تركيب مكيفات الاحساء | تركيب اسبليت احترافي | سوبر كول",
    desc: "تركيب مكيفات اسبليت ومركزي في الأحساء والهفوف. أنابيب نحاس فاخرة. ضمان جودة التركيب. اتصل +966 56 670 6358.",
    canonical: "/ar/تركيب-مكيفات-الاحساء",
    ogUrl: "https://supercoolalhasa.shop/ar/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D8%A7%D8%AD%D8%B3%D8%A7%D8%A1",
    heroTitleEn: "AC Installation Al Ahsa | تركيب مكيفات الاحساء",
    heroTitleAr: "تركيب مكيفات الاحساء - سوبر كول",
    heroDescEn: "Expert AC installation Al Ahsa. All brands. Premium copper piping.",
    heroDescAr: "تركيب مكيفات احترافي في الأحساء. جميع الماركات. أنابيب نحاسية فاخرة.",
    h2En: "تركيب مكيفات اسبليت في الأحساء",
    h2Ar: "تركيب مكيفات اسبليت في الأحساء",
    bodyEn: "...",
    bodyAr: "سوبر كول متخصصة في تركيب مكيفات الاسبليت والمركزي والدولابي في الأحساء منذ عام ١٩٨٩. نضمن التركيب الصحيح لجميع الوحدات مع اختبار الضغط بالنيتروجين وتمديد أنابيب النحاس الفاخرة.",
    body2En: "...",
    body2Ar: "نقدم ضماناً على جميع أعمال تركيب المكيفات في الأحساء ونستخدم حصراً مواد ذات جودة عالية.",
    bulletEn: ["Split & Central AC", "Premium Copper Piping", "Nitrogen Pressure Test", "Quality Guarantee", "All Brands Installed"],
    bulletAr: ["مكيفات اسبليت ومركزي", "تمديد نحاس فاخر", "اختبار ضغط النيتروجين", "ضمان الجودة", "جميع الماركات"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "Professional AC installation Al Ahsa Super Cool",
    imageAltAr: "تركيب مكيفات احترافي في الأحساء من سوبر كول",
    ctaTitleEn: "Book AC Installation in Al Ahsa",
    ctaTitleAr: "احجز تركيب مكيف في الأحساء",
    breadcrumbs: [
      { name: "الرئيسية", url: "https://supercoolalhasa.shop" },
      { name: "تركيب مكيفات الاحساء", url: "https://supercoolalhasa.shop/ar/تركيب-مكيفات-الاحساء" }
    ],
  },
  {
    dir: "ar/تنظيف-مكيفات-الاحساء",
    title: "تنظيف مكيفات الاحساء | غسيل بالضغط | سوبر كول",
    desc: "تنظيف مكيفات عميق في الاحساء بالضغط العالي. هواء نقي وتوفير الكهرباء. بدون فوضى. اتصل +966 56 670 6358.",
    canonical: "/ar/تنظيف-مكيفات-الاحساء",
    ogUrl: "https://supercoolalhasa.shop/ar/%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D8%A7%D8%AD%D8%B3%D8%A7%D8%A1",
    heroTitleEn: "AC Cleaning Al Ahsa | تنظيف مكيفات الاحساء",
    heroTitleAr: "تنظيف مكيفات الاحساء بالضغط العالي",
    heroDescEn: "Deep AC cleaning service Al Ahsa. Fresh air, energy savings.",
    heroDescAr: "تنظيف مكيفات عميق في الأحساء. هواء نقي ووفر في الكهرباء.",
    h2En: "تنظيف مكيفات بالضغط العالي في الأحساء",
    h2Ar: "تنظيف مكيفات بالضغط العالي في الأحساء",
    bodyEn: "...",
    bodyAr: "تتراكم الأتربة والعفن على كويلات المكيف في بيئة الأحساء المغبرة مما يقلل الكفاءة ويؤثر على جودة الهواء. تقدم سوبر كول تنظيف مكيفات عميقاً بمضخات الضغط العالي مع حماية الجدران والأثاث.",
    body2En: "...",
    body2Ar: "نستخدم أكياس غسيل بلاستيكية متخصصة تجمع الماء وتحميها من الجدران والأرضيات، مما يضمن تنظيفاً مثالياً بدون أي فوضى.",
    bulletEn: ["High-Pressure Coil Wash", "Blower Wheel Clean", "Drain Sanitize", "Odor Removal", "No-Mess Service"],
    bulletAr: ["غسيل كويل بضغط عالٍ", "تنظيف عجلة النفخ", "تعقيم التصريف", "إزالة الروائح", "خدمة بدون فوضى"],
    imageSrc: "/ac-installation-work-hofuf.webp",
    imageAltEn: "AC cleaning service Al Ahsa deep wash Super Cool",
    imageAltAr: "تنظيف مكيفات في الأحساء بالغسيل العميق من سوبر كول",
    ctaTitleEn: "Book AC Cleaning in Al Ahsa",
    ctaTitleAr: "احجز تنظيف مكيف في الأحساء",
    breadcrumbs: [
      { name: "الرئيسية", url: "https://supercoolalhasa.shop" },
      { name: "تنظيف مكيفات الاحساء", url: "https://supercoolalhasa.shop/ar/تنظيف-مكيفات-الاحساء" }
    ],
  },
  {
    dir: "ar/تمديد-نحاس-مكيفات",
    title: "تمديد نحاس مكيفات | أنابيب نحاسية فاخرة | سوبر كول",
    desc: "تمديد أنابيب النحاس الأمريكي للمكيفات في الاحساء والهفوف. اختبار نيتروجين، عزل Armaflex. جودة مضمونة. اتصل +966 56 670 6358.",
    canonical: "/ar/تمديد-نحاس-مكيفات",
    ogUrl: "https://supercoolalhasa.shop/ar/%D8%AA%D9%85%D8%AF%D9%8A%D8%AF-%D9%86%D8%AD%D8%A7%D8%B3-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA",
    heroTitleEn: "Copper Pipe AC Installation | تمديد نحاس مكيفات",
    heroTitleAr: "تمديد نحاس مكيفات فاخر - سوبر كول",
    heroDescEn: "Premium copper pipe installation for AC units in Al Ahsa.",
    heroDescAr: "تمديد أنابيب نحاسية فاخرة للمكيفات في الأحساء والهفوف.",
    h2En: "تمديد أنابيب نحاس للمكيفات في الأحساء والهفوف",
    h2Ar: "تمديد أنابيب نحاس للمكيفات في الأحساء والهفوف",
    bodyEn: "...",
    bodyAr: "تعتمد سوبر كول على أنابيب النحاس الأمريكي الفاخر عالي النقاء في جميع عمليات تمديد وتأسيس مكيفات الاحساء والهفوف. تستخدم أنابيب Mueller الأمريكية ذات الجدار السميك التي تتحمل الضغط العالي ودرجات الحرارة الشديدة في السعودية.",
    body2En: "...",
    body2Ar: "جميع تمديدات النحاس تُغلف بعازل Armaflex الحراري الفاخر وشريط واقٍ مقاوم للأشعة فوق البنفسجية لضمان تشغيل بدون تسريبات لسنوات طويلة.",
    bulletEn: ["American Mueller Copper Pipes", "Armaflex Thermal Wrap", "Nitrogen Leak Test", "Pipe Extension & Relocation", "Leak Repair & Sealing"],
    bulletAr: ["أنابيب نحاس أمريكي Mueller", "عزل Armaflex الحراري", "اختبار تسرب بالنيتروجين", "تمديد ونقل الأنابيب", "إصلاح وإغلاق التسريبات"],
    imageSrc: "/premium-copper-pipe-ac-installation.webp",
    imageAltEn: "Premium copper pipe used for AC installation Al Ahsa Saudi Arabia",
    imageAltAr: "أنابيب نحاسية فاخرة لتمديد مكيفات في الأحساء",
    ctaTitleEn: "Get Copper Pipe Installation",
    ctaTitleAr: "احجز تمديد نحاس مكيفات",
    breadcrumbs: [
      { name: "الرئيسية", url: "https://supercoolalhasa.shop" },
      { name: "تمديد نحاس مكيفات", url: "https://supercoolalhasa.shop/ar/تمديد-نحاس-مكيفات" }
    ],
  },
];

// ── Page template generator ────────────────────────────────────────────────
function makeFiles(p) {
  const dir = path.join(BASE, p.dir);
  fs.mkdirSync(dir, { recursive: true });

  // Server page.js
  const serverContent = `import Client from "./Client";

export const metadata = {
  title: ${JSON.stringify(p.title)},
  description: ${JSON.stringify(p.desc)},
  alternates: {
    canonical: ${JSON.stringify(p.canonical)},
  },
  openGraph: {
    title: ${JSON.stringify(p.title)},
    description: ${JSON.stringify(p.desc)},
    url: ${JSON.stringify(p.ogUrl)},
  },
};

export default function Page() {
  return <Client />;
}
`;
  fs.writeFileSync(path.join(dir, "page.js"), serverContent);

  // Client.js
  const breadcrumbStr = JSON.stringify(p.breadcrumbs);
  const faqsEn = JSON.stringify(p.faqs?.en || []);
  const faqsAr = JSON.stringify(p.faqs?.ar || []);

  const configStr = `{
    heroTitleEn: ${JSON.stringify(p.heroTitleEn)},
    heroTitleAr: ${JSON.stringify(p.heroTitleAr)},
    heroDescEn: ${JSON.stringify(p.heroDescEn)},
    heroDescAr: ${JSON.stringify(p.heroDescAr)},
    h2En: ${JSON.stringify(p.h2En)},
    h2Ar: ${JSON.stringify(p.h2Ar)},
    bodyEn: ${JSON.stringify(p.bodyEn)},
    bodyAr: ${JSON.stringify(p.bodyAr)},
    body2En: ${JSON.stringify(p.body2En || "")},
    body2Ar: ${JSON.stringify(p.body2Ar || "")},
    bulletEn: ${JSON.stringify(p.bulletEn)},
    bulletAr: ${JSON.stringify(p.bulletAr)},
    imageSrc: ${JSON.stringify(p.imageSrc)},
    imageAltEn: ${JSON.stringify(p.imageAltEn)},
    imageAltAr: ${JSON.stringify(p.imageAltAr)},
    ctaTitleEn: ${JSON.stringify(p.ctaTitleEn)},
    ctaTitleAr: ${JSON.stringify(p.ctaTitleAr)},
    faqs: [],
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HVACBusiness",
          "@id": "https://supercoolalhasa.shop/#organization",
          "name": "Super Cool Air Conditioning Services",
          "url": "https://supercoolalhasa.shop",
          "telephone": "+966566706358",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Al Hofuf",
            "addressRegion": "Al Ahsa, Eastern Province",
            "addressCountry": "SA"
          },
          "areaServed": [
            {"@type": "City", "name": "Al Ahsa"},
            {"@type": "City", "name": "Al Hofuf"}
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": ${breadcrumbStr.replace(/"name"/g, '"name"').replace(/"url"/g, '"item"')}
        }
      ]
    }
  }`;

  const clientContent = `"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function Client() {
  return <ServicePageTemplate config={${configStr}} />;
}
`;
  fs.writeFileSync(path.join(dir, "Client.js"), clientContent);
  console.log(`✓ Created: src/app/${p.dir}`);
}

[...PAGES, ...AR_PAGES].forEach(makeFiles);
console.log("\n✅ All service pages generated successfully.");
