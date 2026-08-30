/**
 * AMAWAL ULTIMATE - Final Unified Master (v5.0)
 */

// 1. Supabase Initialization
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

let ultimateRepository = [
    {
        id: "EXP-PROV-001", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs",
        meaning: "سلطة الموروث القولي في ضبط السلوك الجماعي.",
        translation: "كلام الأولين مرجع الأرض وميزان الحق.", manuscript: "Awal n imzwura d lqist n tmurt",
        analysis: "نتيجة تجريبية: القول يتحول من منطوق عابر إلى مؤسسة قانونية (Lqist).",
        levels: { locution: "جملة خبرية تربط القول بالأرض.", illocution: "فعل 'تثبيت شرعية' للفعل الحالي.", perlocution: "إنهاء الجدل والخصومة بالعودة للأصل." },
        implicature: { maxim: "قانون الكيف (الاستناد لمرجعية تاريخية)", meaning: "تجاوز المنطق الفردي الحالي لصالح العدالة الجماعية الموروثة." },
        taxonomy: { type: "الظاهر: إخباري | المضمر: إعلاني", force: "التثبيت والشرعية", apparentKey: "assertive", implicitKey: "declarative" },
        conditions: { felicity: "شرط السلطة الجماعية", politeness: "الاحتماء بسلطة الأجداد", directionOfFit: "World-to-Word" },
        context: { setting: "مجلس العرف (Agraw).", participants: "كبار القبيلة تجاه المتنازعين.", prosody: "نبرة وقورة وحازمة." }
    }
];

// 2. Core Navigation
window.executeSwitchPane = function(id, btn, pushState = true) {
    const target = document.getElementById(id);
    if (!target) return;

    // Strict Display Toggle
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
};

window.switchPane = function(id, btn) { executeSwitchPane(id, btn, true); };

window.setSearchCategory = function(cat) {
    executeSwitchPane('pane-lexicon', null, false);
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");
    if (grid) grid.style.display = "none";
    if (nexus) nexus.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    if (results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.6;'><i class='fas fa-folder-open fa-3x' style='margin-bottom:1rem;'></i><br>قريباً... يتم جلب المادة العلمية من السحاب</div>";
    }

    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${item.expression}</span><i class="fas fa-chevron-left" style="color:var(--azure);"></i>`;
        div.onclick = () => executeRenderSingleDetail(item, true);
        nexus.appendChild(div);
    });

    history.pushState({ page: 'list', cat: cat }, '', '#list-' + cat);
    updateNavbarVisibility();
};

window.executeRenderSingleDetail = function(item, pushState = true) {
    const nexus = document.getElementById("results-nexus");
    if (!nexus) return;
    nexus.innerHTML = "";

    const article = document.createElement("article");
    article.className = "lexical-artifact ultimate-reveal";

    let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin:1.2rem 0;">';
    searleTaxonomy.forEach(cat => {
        let active = (cat.key === item.taxonomy.apparentKey) ? 'active-apparent' : (cat.key === item.taxonomy.implicitKey ? 'active-implicit' : '');
        let icon = (cat.key === item.taxonomy.apparentKey) ? 'fa-check-circle' : (cat.key === item.taxonomy.implicitKey ? 'fa-check-double' : cat.icon);
        tagsHtml += `<span class="taxonomy-tag ${active}" style="font-size:0.75rem;"><i class="fas ${icon}"></i> ${cat.label}</span>`;
    });
    tagsHtml += '</div>';

    let implicatureHtml = '';
    if (item.implicature) {
        implicatureHtml = `
            <div class="pragmatic-section implicature-section" style="margin-bottom:2.5rem; border-right: 3px solid var(--gold); padding-right: 1rem; background: rgba(212, 163, 115, 0.05); padding: 1rem; border-radius: 0 15px 15px 0;">
                <h4 style="color: var(--gold); font-size: 0.95rem; margin-bottom: 0.8rem;"><i class="fas fa-comment-dots"></i> 1.1. تحليل الاستلزام الحواري (Gricean)</h4>
                <p style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--text-main);"><strong>القانون المخروق:</strong> ${item.implicature.maxim}</p>
                <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6;"><strong>المعنى المستلزم:</strong> ${item.implicature.meaning}</p>
            </div>
        `;
    }

    article.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;"><h2 style="color:var(--gold); font-weight:950; font-size:1.8rem;">${item.expression}</h2></div>
        <div class="matrix-node" style="margin-bottom:2rem;"><h4 style="font-size:0.85rem; color:var(--azure); margin-bottom:1rem;"><i class="fas fa-scroll"></i> الدلالة المعجمية</h4><p style="font-size:1.5rem; color:var(--text-main); font-weight:800;">${item.meaning}</p></div>
        <div class="corpus-vault-imperial" style="background:#5d4037; border-radius:20px; padding:2rem 1.5rem; margin-bottom:2.5rem;"><div style="text-align:center; margin-bottom:1.5rem;"><span style="color:#d4a373; font-size:1.6rem; font-style:italic; white-space:pre-line;">${item.manuscript}</span></div><div style="border-top:1px solid rgba(212, 163, 115, 0.2); padding-top:1rem;"><h4 style="color:#d4a373; font-size:0.9rem;"><i class="fas fa-microscope"></i> استقصاء ميداني:</h4><p style="color:#bcaaa4; font-size:0.95rem;">${item.analysis}</p></div></div>
        <div class="pragmatic-master-grid">
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-layer-group"></i> 1. مستويات التلفظ والخطاب</h4><ul style="list-style:none; padding:0;"><li><strong style="color:var(--gold);">اللفظي:</strong> ${item.levels.locution}</li><li><strong style="color:var(--gold);">الإنجازي:</strong> ${item.levels.illocution}</li><li><strong style="color:var(--gold);">التأثيري:</strong> ${item.levels.perlocution}</li></ul></div>
            ${implicatureHtml}
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-bullseye"></i> 2. المقاصد والتصنيف الإنجازي</h4>${tagsHtml}<p style="font-size:0.9rem;"><strong>النوع:</strong> ${item.taxonomy.type} <br> <strong>القوة الإنجازية:</strong> ${item.taxonomy.force}</p></div>
            <div class="pragmatic-section" style="margin-bottom:2rem;"><h4><i class="fas fa-check-double"></i> 3. المحددات والشروط التداولية</h4><p style="font-size:0.9rem;"><strong>النجاح:</strong> ${item.conditions.felicity} <br> <strong>التأدب:</strong> ${item.conditions.politeness} <br> <strong>المطابقة:</strong> <span dir="ltr">${item.conditions.directionOfFit}</span></p></div>
            <div class="pragmatic-section ethnopragmatic-vault" style="background:rgba(162,210,255,0.05); padding:1rem; border-radius:15px; border:1px dashed var(--azure);"><h4><i class="fas fa-map-marked-alt"></i> 4. المقام الثقافي المحلي</h4><p style="font-size:0.9rem;"><strong>المناسبة:</strong> ${item.context.setting} <br> <strong>الأطراف:</strong> ${item.context.participants} <br> <strong>التنغيم:</strong> ${item.context.prosody}</p></div>
        </div>
    `;
    nexus.appendChild(article);
    if (pushState) history.pushState({ page: 'detail', id: item.id }, '', '#detail-' + item.id);
    updateNavbarVisibility();
};

// 3. System Helpers
window.updateNavbarVisibility = function() {
    const b = document.getElementById('back-btn'), m = document.getElementById('menu-btn'), g = document.getElementById('category-grid');
    const isDetail = location.hash.startsWith('#detail-');
    const isMainHome = (location.hash === '#home' || location.hash === '' || location.hash === '#pane-lexicon') && g && g.style.display !== 'none';
    if (b) b.style.display = isMainHome ? 'none' : 'flex';
    if (m) m.style.display = isMainHome ? 'flex' : 'none';
};

window.toggleSidebar = function() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if (s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
};

window.toggleSidebarSubnav = function() {
    const s = document.getElementById('sidebar-subnav');
    if (s) s.style.display = s.style.display === "block" ? "none" : "block";
};

window.navigateBack = function() { window.history.back(); };

window.onpopstate = function(e) {
    const s = e.state;
    if (s && s.page) {
        if (s.page === 'list') setSearchCategory(s.cat, false);
        else if (s.page === 'detail') { const i = ultimateRepository.find(x => x.id === s.id); if(i) executeRenderSingleDetail(i, false); }
        else executeSwitchPane(s.page, null, false);
    } else executeSwitchPane('pane-lexicon', null, false);
};

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('amawar-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    history.replaceState({ page: 'pane-lexicon' }, '', '#home');
    updateNavbarVisibility();

    if (supabase) {
        supabase.from('speech_acts').select('*').then(({data, error}) => {
            if (!error && data && data.length > 0) {
                ultimateRepository = data.map(item => ({
                    id: item.id, expression: item.expression, meaning: item.meaning, translation: item.translation,
                    manuscript: item.manuscript, analysis: item.analysis, category: item.category,
                    levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
                    implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning },
                    taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicit_key: item.implicit_key },
                    conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
                    context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
                }));
            }
        });
    }
});
