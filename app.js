/**
 * AMAWAL ULTIMATE - Universal Cloud Sync (v1.5)
 */

// 1. Configuration & Constants
const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

// Supabase - REPLACE 'YOUR_KEY' if needed
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Master Repository (Full Scientific Data)
let ultimateRepository = [
    {
        id: "ULT-101",
        lemma: "Iswa / ⵉⵙⵡⴰ",
        category: "idioms",
        meaning: "الاستيعاب الفيزيولوجي للمواد السائلة والعضوية.",
        translation: "شربه / استولى عليه",
        manuscript: "turud unna wr irri lḥma iddud iswit",
        analysis: "الارتقاء المعرفي: تحول من الاستهلاك العضوي إلى الهيمنة التداولية المطلقة.",
        levels: { locution: "فعل تام يعبر عن الارتواء والاستهلاك المادي.", illocution: "فعل 'استحواذ رمزي' يعبر عن التمكن والمصادرة.", perlocution: "إثبات الهيمنة وتأطير سلطة المتحدث." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: تعبيري", force: "الاستحواذ والمصادرة", apparentKey: "assertive", implicitKey: "expressive" },
        conditions: { felicity: "شرط السلطة والتمكن من الموارد", politeness: "تجاوز التلطيف لفرض واقع جديد", directionOfFit: "World-to-Word" },
        context: { setting: "نزاعات على ملكية موارد مائية.", participants: "متحدث يثبت حقه تجاه منافس.", prosody: "نبرة حازمة وقاطعة." }
    },
    {
        id: "IZLI-101",
        lemma: "Izli n Usmun / إيزلي الرفيق",
        category: "izlan",
        meaning: "تشبيه الرفيق بالكأس الذي يوضع ليبرد، فيأتي من يشربه دون استئذان.",
        translation: "أعددت الصديق ككأس بارد، فغدر به غريب.",
        manuscript: "iyya usmun amm lkass nsirs t ad iṣmḍ\nturud unna wr irri lḥma iddud iswit",
        analysis: "استقصاء ميداني: يظهر البيت قوة الفعل 'iswit' كفعل استحواذ اجتماعي مفاجئ.",
        levels: { locution: "استعارة مادية تربط بين الرفيق والمتاع.", illocution: "فعل 'عتاب غير مباشر' وإسقاط خيبة الأمل.", perlocution: "إشعار الآخر بفداحة فعله دون تصريح مباشر." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: توجيهي غير مباشر", force: "العتاب واللوم الضمني", apparentKey: "assertive", implicitKey: "directive" },
        conditions: { felicity: "شرط الإخلاص والنية المبيتة", politeness: "حفظ ماء الوجه عبر الرمزية", directionOfFit: "Word-to-World" },
        context: { setting: "جلسة سمر تفتقد لروح الثقة.", participants: "شاعر متضرر ومخاطب خائن.", prosody: "نبرة متهكمة ممزوجة بالمرارة." }
    },
    {
        id: "PROV-101",
        lemma: "Ur ittili walu, bla walu",
        category: "proverbs",
        meaning: "لا يكون شيء من لا شيء. (النتيجة لا تقع إلا بوجود سبب).",
        translation: "لا دخان بلا نار.",
        manuscript: "Ur ittili walu, bla walu",
        analysis: "الارتقاء المعرفي: فرض الاعتراف بالمسؤولية في مجالس العرف.",
        levels: { locution: "جملة خبرية نفيية تقرر حقيقة فلسفية.", illocution: "فعل 'تنبيه وتحذير' وإلزام بالحجة.", perlocution: "إفحام المخاطب ودفعه للاعتراف بالمسببات." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: توجيهي", force: "الإلزام والحجاج", apparentKey: "assertive", implicitKey: "directive" },
        conditions: { felicity: "شرط الإنجاز والمقام الاجتماعي (Agraw)", politeness: "الصرامة العرفية المقبولة.", directionOfFit: "Word-to-World" },
        context: { setting: "مجالس الصلح وفض النزاعات.", participants: "كبار القبيلة تجاه أطراف النزاع.", prosody: "نبرة صارمة ووقورة." }
    },
    {
        id: "TALE-001",
        lemma: "Tamacahutt n Wuccen / حكاية الذئب",
        category: "tales",
        meaning: "قصة رمزية عن الصراع بين المكر والذكاء.",
        translation: "حكاية الذئب والذئبة في المتخيل الشعبي.",
        manuscript: "illa wmšan d tmšant d lxir d memmi-s...",
        analysis: "تحليل سردي: بنية الحكاية تعتمد على التكرار والنمذجة الأخلاقية.",
        levels: { locution: "بنية سردية تعتمد على الجمل التقريرية.", illocution: "فعل 'وعظي' وتأطير قيمي.", perlocution: "ترسيخ الحكمة الجماعية وتنمية ملكة النقد." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: إعلاني", force: "التوجيه الأخلاقي", apparentKey: "assertive", implicitKey: "declarative" },
        conditions: { felicity: "شرط السلطة الثقافية للراوي", politeness: "التلطيف عبر الإسقاط على الحيوان.", directionOfFit: "World-to-Word" },
        context: { setting: "جلسة ليلية عائلية لتربية الأطفال.", participants: "الجدة/الأم والأبناء.", prosody: "نبرة تعليمية مشوقة." }
    },
    {
        id: "RID-001",
        lemma: "Timseɛraq / الألغاز",
        category: "riddles",
        meaning: "تمرين ذهني يعتمد على الوصف المجازي للأشياء.",
        translation: "ما هو الشيء الذي يأكل ولا يشرب؟",
        manuscript: "D acu nni? Icca, ur iswi...",
        analysis: "تداولية اللغز: خلق فجوة معرفية تتطلب استحضار السياق الثقافي.",
        levels: { locution: "صيغة استفهامية تعتمد على التناقض.", illocution: "فعل 'تحدي معرفي' واختبار للانتماء.", perlocution: "إثارة الدهشة وتنشيط الذاكرة الجماعية." },
        taxonomy: { type: "توجيهي استفهامي", force: "التحدي والاختبار", apparentKey: "directive", implicitKey: "" },
        conditions: { felicity: "شرط المساواة في موقف اللعب.", politeness: "التنافس الودي.", directionOfFit: "Word-to-World" },
        context: { setting: "جلسات التسلية وتنافس الذكاء.", participants: "المتحدي ومجموعة المتلقين.", prosody: "نبرة محفزة ومرحة." }
    }
];

// 3. Database Sync Logic
async function fetchRemoteData() {
    if (!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*');
        if (!error && data && data.length > 0) {
            ultimateRepository = data.map(item => ({
                id: item.id, lemma: item.lemma, meaning: item.meaning, translation: item.translation,
                manuscript: item.manuscript, analysis: item.analysis, category: item.category,
                levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
                taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicitKey: item.implicit_key },
                conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
                context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
            }));
            console.log("Supabase Data Loaded Successfully");
        }
    } catch (e) { console.warn("Using Local Repository Fallback"); }
}

// 4. UI Rendering Functions
function executeRenderSingleDetail(item, pushState = true) {
    const hub = document.getElementById("results-nexus");
    if(!hub) return;
    hub.innerHTML = "";

    const article = document.createElement("article");
    article.className = "lexical-artifact ultimate-reveal";

    let headerHtml = `
        <div class="matrix-node" style="margin-bottom: 2rem;">
            <h4 style="font-size: 0.85rem; color: var(--azure); letter-spacing: 1px; margin-bottom: 1rem;">
                <i class="fas fa-scroll"></i> الدلالة المعجمية
            </h4>
            <p style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; line-height: 1.4;">${item.meaning}</p>
        </div>
    `;

    let manuscriptBoxHtml = `
        <div class="corpus-vault-imperial" style="background: #5d4037; border-radius: 20px; padding: 2.5rem 1.5rem; margin-bottom: 2.5rem; position: relative;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <span class="manuscript-prime" style="color: #d4a373; font-size: 1.6rem; font-style: italic; line-height: 1.8; white-space: pre-line;">${item.manuscript}</span>
            </div>
            <div style="border-top: 1px solid rgba(212, 163, 115, 0.2); padding-top: 1.5rem; margin-top: 1.5rem;">
                <h4 style="color: #d4a373; font-size: 0.9rem; margin-bottom: 0.8rem;"><i class="fas fa-microscope"></i> استقصاء ميداني:</h4>
                <p style="color: #bcaaa4; font-size: 0.95rem; line-height: 1.6;">${item.analysis}</p>
            </div>
        </div>
    `;

    if (item.levels) {
        let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin: 1.2rem 0;">';
        searleTaxonomy.forEach(cat => {
            let activeClass = (cat.key === item.taxonomy.apparentKey) ? 'active-apparent' : (cat.key === item.taxonomy.implicitKey ? 'active-implicit' : '');
            let checkIcon = (cat.key === item.taxonomy.apparentKey) ? '<i class="fas fa-check-circle"></i>' : (cat.key === item.taxonomy.implicitKey ? '<i class="fas fa-check-double"></i>' : '');
            tagsHtml += `<span class="taxonomy-tag ${activeClass}" style="font-size:0.8rem;">${checkIcon} <i class="fas ${cat.icon}"></i> ${cat.label}</span>`;
        });
        tagsHtml += '</div>';

        article.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                <h2 style="color:var(--gold); font-weight:950; font-size:1.8rem; margin:0;">${item.lemma}</h2>
                <span style="font-size:0.7rem; color:var(--text-muted); opacity:0.6;">${item.id}</span>
            </div>
            ${headerHtml}
            ${manuscriptBoxHtml}
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-layer-group"></i> 1. مستويات التلفظ والخطاب</h4>
                    <ul style="list-style:none; padding-right: 0;">
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل اللفظي:</strong> <span style="color:var(--text-muted);">${item.levels.locution}</span></li>
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل الإنجازي:</strong> <span style="color:var(--text-muted);">${item.levels.illocution}</span></li>
                        <li><strong style="color:var(--gold); margin-left:8px;">الفعل التأثيري:</strong> <span style="color:var(--text-muted);">${item.levels.perlocution}</span></li>
                    </ul>
                </div>
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-bullseye"></i> 2. المقاصد والتصنيف الإنجازي</h4>
                    ${tagsHtml}
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem;"><strong>النوع:</strong> ${item.taxonomy.type} <br> <strong>القوة الإنجازية:</strong> ${item.taxonomy.force}</p>
                </div>
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-check-double"></i> 3. المحدِّدات والشروط التداولية</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>شروط النجاح:</strong> ${item.conditions.felicity} <br> <strong>التأدب:</strong> ${item.conditions.politeness} <br> <strong>المطابقة:</strong> <span dir="ltr">${item.conditions.directionOfFit}</span></p>
                </div>
                <div class="pragmatic-section ethnopragmatic-vault" style="background: rgba(162, 210, 255, 0.04); padding: 1.5rem; border-radius: 25px; border: 1px dashed var(--azure);">
                    <h4 style="color: var(--azure); font-weight: 950; margin-bottom: 1rem;"><i class="fas fa-map-marked-alt"></i> 4. المقام والسياق الثقافي المحلي</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>المناسبة:</strong> ${item.context.setting} <br> <strong>الأطراف:</strong> ${item.context.participants} <br> <strong>التنغيم:</strong> ${item.context.prosody}</p>
                </div>
            </div>
        `;
    }
    hub.appendChild(article);
    if (pushState) history.pushState({page: 'detail', id: item.id}, '', '#detail-' + item.id);
    updateNavbarVisibility();
}

function executeSetSearchCategory(cat, pushState = true) {
    executeSwitchPane('pane-lexicon', null, false);
    const g = document.getElementById("category-grid"), h = document.getElementById("results-nexus");
    if(g) g.style.display = "none"; if(h) h.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${item.lemma}</span><i class="fas fa-chevron-left" style="color:var(--azure);"></i>`;
        div.onclick = () => executeRenderSingleDetail(item, true);
        h.appendChild(div);
    });
    if (pushState) history.pushState({page: 'list', cat: cat}, '', '#list-' + cat);
    updateNavbarVisibility();
}

// 5. Utility & Event Handlers
function executeSwitchPane(id, btn, pushState = true) {
    const target = document.getElementById(id);
    if(!target) return;
    document.querySelectorAll('.pane-container').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    target.classList.add('active'); target.style.display = 'block';
    if (id === 'pane-lexicon') {
        const g = document.getElementById("category-grid"); if(g) g.style.display = "grid";
        const r = document.getElementById("results-nexus"); if(r) r.innerHTML = "";
    }
    document.querySelectorAll('.sidebar-nav a, .nav-item').forEach(a => a.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pushState) history.pushState({page: id}, '', '#' + id);
    updateNavbarVisibility();
}

function updateNavbarVisibility() {
    const b = document.getElementById('back-btn'), m = document.getElementById('menu-btn'), g = document.getElementById('category-grid');
    const isHome = (location.hash === '#home' || location.hash === '' || location.hash === '#pane-lexicon') && g && g.style.display !== 'none';
    if (b) b.style.display = isHome ? 'none' : 'flex';
    if (m) m.style.display = isHome ? 'flex' : 'none';
}

function navigateBack() { window.history.back(); }
function switchPane(id, btn) { executeSwitchPane(id, btn, true); }
function setSearchCategory(cat) { executeSetSearchCategory(cat, true); }

window.onpopstate = function(event) {
    const s = event.state;
    if (s && s.page) {
        if (s.page === 'list') executeSetSearchCategory(s.cat, false);
        else if (s.page === 'detail') { const i = ultimateRepository.find(x => x.id === s.id); if(i) executeRenderSingleDetail(i, false); }
        else executeSwitchPane(s.page, null, false);
    } else executeSwitchPane('pane-lexicon', null, false);
    updateNavbarVisibility();
};

document.addEventListener("DOMContentLoaded", async () => {
    await fetchRemoteData();
    const savedTheme = localStorage.getItem('amawar-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    history.replaceState({page: 'pane-lexicon'}, '', '#home');
    updateNavbarVisibility();
});

function toggleSidebar() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(!s || !o) return; s.classList.toggle('active'); o.classList.toggle('active');
}

function toggleSidebarSubnav() {
    const s = document.getElementById('sidebar-subnav'); if(s) s.style.display = s.style.display === "block" ? "none" : "block";
}
