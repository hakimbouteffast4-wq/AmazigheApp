/**
 * AMAWAL ULTIMATE - Final Robust Edition (v2.0)
 */

// 1. Static Repository
const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

let ultimateRepository = [
    {
        id: "ULT-101", lemma: "Iswa / ⵉⵙⵡⴰ", category: "idioms",
        meaning: "الاستيعاب الفيزيولوجي للمواد السائلة والعضوية.",
        translation: "شربه / استولى عليه", manuscript: "turud unna wr irri lḥma iddud iswit",
        analysis: "الارتقاء المعرفي: تحول من الاستهلاك العضوي إلى الهيمنة التداولية المطلقة.",
        levels: { locution: "فعل تام يعبر عن الارتواء والاستهلاك المادي.", illocution: "فعل 'استحواذ رمزي' يعبر عن التمكن والمصادرة.", perlocution: "إثبات الهيمنة وتأطير سلطة المتحدث." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: تعبيري", force: "الاستحواذ والمصادرة", apparentKey: "assertive", implicitKey: "expressive" },
        conditions: { felicity: "شرط السلطة والتمكن من الموارد", politeness: "تجاوز التلطيف لفرض واقع جديد", directionOfFit: "World-to-Word" },
        context: { setting: "نزاعات على ملكية موارد مائية.", participants: "متحدث يثبت حقه تجاه منافس.", prosody: "نبرة حازمة وقاطعة." }
    },
    {
        id: "IZLI-101", lemma: "Izli n Usmun / إيزلي الرفيق", category: "izlan",
        meaning: "تشبيه الرفيق بالكأس الذي يوضع ليبرد، فيأتي من يشربه دون استئذان.",
        translation: "أعددت الصديق ككأس بارد، فغدر به غريب.", manuscript: "iyya usmun amm lkass nsirs t ad iṣmḍ\nturud unna wr irri lḥma iddud iswit",
        analysis: "استقصاء ميداني: يظهر البيت قوة الفعل 'iswit' كفعل استحواذ اجتماعي مفاجئ.",
        levels: { locution: "استعارة مادية تربط بين الرفيق والمتاع.", illocution: "فعل 'عتاب غير مباشر' وإسقاط خيبة الأمل.", perlocution: "إشعار الآخر بفداحة فعله دون تصريح مباشر." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: توجيهي غير مباشر", force: "العتاب واللوم الضمني", apparentKey: "assertive", implicitKey: "directive" },
        conditions: { felicity: "شرط الإخلاص والنية المبيتة", politeness: "حفظ ماء الوجه عبر الرمزية", directionOfFit: "Word-to-World" },
        context: { setting: "جلسة سمر تفتقد لروح الثقة.", participants: "شاعر متضرر ومخاطب خائن.", prosody: "نبرة متهكمة ممزوجة بالمرارة." }
    },
    {
        id: "IZLI-102", lemma: "Aḍu n Tayri / ⴰⴹⵓ ⵏ ⵜⴰⵢⵔⵉ", category: "izlan",
        meaning: "وصف قوة الحب وغموض مسالكه التي لا تخضع للحساب العقلي.",
        translation: "ريح الحب جدار يحيط بنا، فكيف لنا أن نحسب لها حساباً؟", manuscript: "Aḍu n tayri d lḥit i t-id-igran\nmamek ad as-ng nttni lḥsab",
        analysis: "استقصاء ميداني: يبرز البيت عجز الإنسان أمام سطوة العواطف وتحولها إلى قدر محتوم.",
        levels: { locution: "جملة استعارية تشبه الحب بالريح وبالجدار.", illocution: "فعل 'اعتراف بالعجز' وبث الشكوى.", perlocution: "إثارة التعاطف وتقاسم التجربة الإنسانية." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: تعبيري", force: "الشكوى والبوح الوجداني", apparentKey: "assertive", implicitKey: "expressive" },
        conditions: { felicity: "شرط الإخلاص والصدق الوجداني", politeness: "التعبير عن الذات بحرية.", directionOfFit: "Word-to-World" },
        context: { setting: "أمسيات إنشاد الشعر (Izlan).", participants: "شاعر (محب) ومستمعون.", prosody: "نبرة شجية وحزينة." }
    },
    {
        id: "PROV-101", lemma: "Ur ittili walu, bla walu", category: "proverbs",
        meaning: "لا يكون شيء من لا شيء. (النتيجة لا تقع إلا بوجود سبب).",
        translation: "لا دخان بلا نار.", manuscript: "Ur ittili walu, bla walu",
        analysis: "الارتقاء المعرفي: فرض الاعتراف بالمسؤولية في مجالس العرف.",
        levels: { locution: "جملة خبرية نفيية تقرر حقيقة فلسفية.", illocution: "فعل 'تنبيه وتحذير' وإلزام بالحجة.", perlocution: "إفحام المخاطب ودفعه للاعتراف بالمسببات." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: توجيهي", force: "الإلزام والحجاج", apparentKey: "assertive", implicitKey: "directive" },
        conditions: { felicity: "شرط الإنجاز والمقام الاجتماعي (Agraw)", politeness: "الصرامة العرفية المقبولة.", directionOfFit: "Word-to-World" },
        context: { setting: "مجالس الصلح وفض النزاعات.", participants: "كبار القبيلة تجاه أطراف النزاع.", prosody: "نبرة صارمة ووقورة." }
    },
    {
        id: "TALE-001", lemma: "Tamacahutt n Wuccen / حكاية الذئب", category: "tales",
        meaning: "قصة رمزية عن الصراع بين المكر والذكاء.",
        translation: "حكاية الذئب والذئبة في المتخيل الشعبي.", manuscript: "illa wmšan d tmšant d lxir d memmi-s...",
        analysis: "تحليل سردي: بنية الحكاية تعتمد على التكرار والنمذجة الأخلاقية.",
        levels: { locution: "بنية سردية تعتمد على الجمل التقريرية.", illocution: "فعل 'وعظي' وتأطير قيمي.", perlocution: "ترسيخ الحكمة الجماعية وتنمية ملكة النقد." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: إعلاني", force: "التوجيه الأخلاقي", apparentKey: "assertive", implicitKey: "declarative" },
        conditions: { felicity: "شرط السلطة الثقافية للراوي", politeness: "التلطيف عبر الإسقاط على الحيوان.", directionOfFit: "World-to-Word" },
        context: { setting: "جلسة ليلية عائلية لتربية الأطفال.", participants: "الجدة/الأم والأبناء.", prosody: "نبرة تعليمية مشوقة." }
    },
    {
        id: "RID-001", lemma: "Timseɛraq / الألغاز", category: "riddles",
        meaning: "تمرين ذهني يعتمد على الوصف المجازي للأشياء.",
        translation: "ما هو الشيء الذي يأكل ولا يشرب؟", manuscript: "D acu nni? Icca, ur iswi...",
        analysis: "تداولية اللغز: خلق فجوة معرفية تتطلب استحضار السياق الثقافي.",
        levels: { locution: "صيغة استفهامية تعتمد على التناقض.", illocution: "فعل 'تحدي معرفي' واختبار للانتماء.", perlocution: "إثارة الدهشة وتنشيط الذاكرة الجماعية." },
        taxonomy: { type: "توجيهي استفهامي", force: "التحدي والاختبار", apparentKey: "directive", implicitKey: "" },
        conditions: { felicity: "شرط المساواة في موقف اللعب.", politeness: "التنافس الودي.", directionOfFit: "Word-to-World" },
        context: { setting: "جلسات التسلية وتنافس الذكاء.", participants: "المتحدي ومجموعة المتلقين.", prosody: "نبرة محفزة ومرحة." }
    }
];

// 2. Navigation
function executeSwitchPane(id, btn, pushState = true) {
    const target = document.getElementById(id);
    if (!target) return;

    document.querySelectorAll('.pane-container').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });

    target.classList.add('active');
    target.style.display = 'block';

    if (id === 'pane-lexicon') {
        const grid = document.getElementById("category-grid");
        const nexus = document.getElementById("results-nexus");
        if (grid) grid.style.display = "grid";
        if (nexus) nexus.innerHTML = "";
    }

    document.querySelectorAll('.sidebar-nav a, .nav-item').forEach(a => a.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (pushState) history.pushState({ page: id }, '', '#' + id);
    updateNavbarVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchPane(id, btn) { executeSwitchPane(id, btn, true); }

function executeSetSearchCategory(cat, pushState = true) {
    executeSwitchPane('pane-lexicon', null, false);
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");
    if (grid) grid.style.display = "none";
    if (nexus) nexus.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${item.lemma}</span><i class="fas fa-chevron-left" style="color:var(--azure);"></i>`;
        div.onclick = () => executeRenderSingleDetail(item, true);
        nexus.appendChild(div);
    });

    if (pushState) history.pushState({ page: 'list', cat: cat }, '', '#list-' + cat);
    updateNavbarVisibility();
}

function setSearchCategory(cat) { executeSetSearchCategory(cat, true); }

function executeRenderSingleDetail(item, pushState = true) {
    const nexus = document.getElementById("results-nexus");
    if (!nexus) return;
    nexus.innerHTML = "";

    const article = document.createElement("article");
    article.className = "lexical-artifact ultimate-reveal";

    let headerHtml = `<div class="matrix-node" style="margin-bottom:2rem;"><h4 style="font-size:0.85rem; color:var(--azure); margin-bottom:1rem;"><i class="fas fa-scroll"></i> الدلالة المعجمية</h4><p style="font-size:1.5rem; color:var(--text-main); font-weight:800;">${item.meaning}</p></div>`;
    let manuscriptBoxHtml = `<div class="corpus-vault-imperial" style="background:#5d4037; border-radius:20px; padding:2rem 1.5rem; margin-bottom:2.5rem;"><div style="text-align:center; margin-bottom:1.5rem;"><span style="color:#d4a373; font-size:1.6rem; font-style:italic; white-space:pre-line;">${item.manuscript}</span></div><div style="border-top:1px solid rgba(212, 163, 115, 0.2); padding-top:1rem;"><h4 style="color:#d4a373; font-size:0.9rem;"><i class="fas fa-microscope"></i> استقصاء ميداني:</h4><p style="color:#bcaaa4; font-size:0.95rem;">${item.analysis}</p></div></div>`;

    let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin:1rem 0;">';
    searleTaxonomy.forEach(cat => {
        let active = (cat.key === item.taxonomy.apparentKey) ? 'active-apparent' : (cat.key === item.taxonomy.implicitKey ? 'active-implicit' : '');
        let icon = (cat.key === item.taxonomy.apparentKey) ? 'fa-check-circle' : (cat.key === item.taxonomy.implicitKey ? 'fa-check-double' : cat.icon);
        tagsHtml += `<span class="taxonomy-tag ${active}" style="font-size:0.75rem;"><i class="fas ${icon}"></i> ${cat.label}</span>`;
    });
    tagsHtml += '</div>';

    article.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;"><h2 style="color:var(--gold); font-weight:950; font-size:1.8rem;">${item.lemma}</h2></div>
        ${headerHtml}${manuscriptBoxHtml}
        <div class="pragmatic-master-grid">
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-layer-group"></i> 1. مستويات التلفظ والخطاب</h4><ul style="list-style:none; padding:0;"><li><strong style="color:var(--gold);">اللفظي:</strong> ${item.levels.locution}</li><li><strong style="color:var(--gold);">الإنجازي:</strong> ${item.levels.illocution}</li><li><strong style="color:var(--gold);">التأثيري:</strong> ${item.levels.perlocution}</li></ul></div>
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-bullseye"></i> 2. المقاصد والتصنيف</h4>${tagsHtml}<p style="font-size:0.9rem;"><strong>النوع:</strong> ${item.taxonomy.type} <br> <strong>القوة:</strong> ${item.taxonomy.force}</p></div>
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-check-double"></i> 3. المحددات والشروط</h4><p style="font-size:0.9rem;"><strong>النجاح:</strong> ${item.conditions.felicity} <br> <strong>التأدب:</strong> ${item.conditions.politeness} <br> <strong>المطابقة:</strong> <span dir="ltr">${item.conditions.directionOfFit}</span></p></div>
            <div class="pragmatic-section ethnopragmatic-vault" style="background:rgba(162, 210, 255, 0.05); padding:1rem; border-radius:15px; border:1px dashed var(--azure);"><h4><i class="fas fa-map-marked-alt"></i> 4. المقام الثقافي المحلي</h4><p style="font-size:0.9rem;"><strong>المناسبة:</strong> ${item.context.setting} <br> <strong>الأطراف:</strong> ${item.context.participants} <br> <strong>التنغيم:</strong> ${item.context.prosody}</p></div>
        </div>
    `;
    nexus.appendChild(article);
    if (pushState) history.pushState({ page: 'detail', id: item.id }, '', '#detail-' + item.id);
    updateNavbarVisibility();
}

// 3. UI Helpers
function updateNavbarVisibility() {
    const grid = document.getElementById('category-grid');
    const backBtn = document.getElementById('back-btn');
    const menuBtn = document.getElementById('menu-btn');

    // Improved logic: Menu is visible IF we are on home or list. Back is visible only on detail.
    const isDetail = location.hash.startsWith('#detail-');

    if (backBtn) backBtn.style.display = isDetail ? 'flex' : 'none';
    if (menuBtn) menuBtn.style.display = isDetail ? 'none' : 'flex';
}

function toggleSidebar() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if (s && o) {
        s.classList.toggle('active');
        o.classList.toggle('active');
        document.body.style.overflow = s.classList.contains('active') ? 'hidden' : 'auto';
    }
}

function navigateBack() { window.history.back(); }

window.onpopstate = function(e) {
    const s = e.state;
    if (s && s.page) {
        if (s.page === 'list') executeSetSearchCategory(s.cat, false);
        else if (s.page === 'detail') {
            const i = ultimateRepository.find(x => x.id === s.id);
            if(i) executeRenderSingleDetail(i, false);
        } else executeSwitchPane(s.page, null, false);
    } else executeSwitchPane('pane-lexicon', null, false);
};

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('amawar-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    history.replaceState({ page: 'pane-lexicon' }, '', '#home');
    updateNavbarVisibility();
});
