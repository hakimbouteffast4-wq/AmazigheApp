/**
 * AMAWAL ULTIMATE - Final Robust Master (v5.1)
 */

// 1. Static Data (Always available)
const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

let ultimateRepository = [
    {
        id: "EXP-001", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs",
        meaning: "سلطة الموروث القولي في ضبط السلوك الجماعي.",
        translation: "كلام الأولين مرجع الأرض.", manuscript: "Awal n imzwura d lqist n tmurt",
        analysis: "نتيجة تجريبية: القول يتحول إلى مؤسسة قانونية.",
        levels: { locution: "جملة خبرية تربط القول بالأرض.", illocution: "فعل 'تثبيت شرعية'.", perlocution: "إنهاء الجدل بالعودة للأصل." },
        implicature: { maxim: "قانون الكيف", meaning: "تجاوز المنطق الفردي لصالح العدالة الموروثة." },
        taxonomy: { type: "إخباري | إعلاني", force: "التثبيت والشرعية", apparentKey: "assertive", implicitKey: "declarative" },
        conditions: { felicity: "شرط السلطة الجماعية", politeness: "الاحتماء بالأجداد", directionOfFit: "World-to-Word" },
        context: { setting: "مجلس العرف.", participants: "كبار القبيلة.", prosody: "وقورة وحازمة." }
    }
];

// 2. Global Core Functions
window.switchPane = function(id, btn) {
    console.log("Switching to:", id);
    const panes = document.querySelectorAll('.pane-container');
    panes.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });

    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active');
    }

    if (id === 'pane-lexicon') {
        const grid = document.getElementById("category-grid");
        const nexus = document.getElementById("results-nexus");
        if (grid) grid.style.display = "grid";
        if (nexus) nexus.innerHTML = "";
    }

    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    if(btn) btn.classList.add('active');

    updateNavbarVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon', null);
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");

    if(grid) grid.style.display = "none";
    if(nexus) nexus.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    if (results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم جلب البيانات من السحاب...</div>";
    }

    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => renderDetail(item);
        nexus.appendChild(div);
    });
    updateNavbarVisibility();
};

function renderDetail(item) {
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin:1rem 0;">';
    searleTaxonomy.forEach(cat => {
        let active = (cat.key === item.taxonomy.apparentKey) ? 'active-apparent' : (cat.key === item.taxonomy.implicitKey ? 'active-implicit' : '');
        let icon = (cat.key === item.taxonomy.apparentKey) ? 'fa-check-circle' : (cat.key === item.taxonomy.implicitKey ? 'fa-check-double' : cat.icon);
        tagsHtml += `<span class="taxonomy-tag ${active}" style="font-size:0.7rem;"><i class="fas ${icon}"></i> ${cat.label}</span>`;
    });
    tagsHtml += '</div>';

    let implicatureHtml = item.implicature ? `
        <div class="pragmatic-section" style="border-right:3px solid var(--gold); background:rgba(212,163,115,0.05); padding:1rem; border-radius:15px; margin-bottom:2rem;">
            <h4 style="color:var(--gold); font-size:0.9rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري</h4>
            <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature.maxim}<br><strong>المعنى:</strong> ${item.implicature.meaning}</p>
        </div>
    ` : '';

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:var(--gold); margin-bottom:1.5rem;">${item.expression}</h2>
            <div class="matrix-node" style="margin-bottom:1.5rem;"><h4>الدلالة المعجمية</h4><p>${item.meaning}</p></div>
            <div class="corpus-vault-imperial" style="background:#5d4037; border-radius:15px; padding:1.5rem; margin-bottom:2rem; text-align:center;">
                <span style="color:#d4a373; font-size:1.4rem; font-style:italic;">${item.manuscript}</span>
                <p style="color:#bcaaa4; font-size:0.85rem; border-top:1px solid rgba(255,255,255,0.1); margin-top:1rem; padding-top:1rem;">${item.analysis}</p>
            </div>
            ${implicatureHtml}
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section"><h4><i class="fas fa-layer-group"></i> 1. مستويات التلفظ</h4><p style="font-size:0.85rem;">${item.levels.locution}<br>${item.levels.illocution}<br>${item.levels.perlocution}</p></div>
                <div class="pragmatic-section"><h4><i class="fas fa-bullseye"></i> 2. المقاصد</h4>${tagsHtml}</div>
            </div>
        </article>
    `;
    updateNavbarVisibility();
}

function updateNavbarVisibility() {
    const backBtn = document.getElementById('back-btn');
    const menuBtn = document.getElementById('menu-btn');
    const grid = document.getElementById('category-grid');
    const isNexusActive = document.getElementById("results-nexus").innerHTML !== "";
    const isNotHome = document.querySelector('.pane-container.active').id !== 'pane-lexicon' || isNexusActive;

    if(backBtn) backBtn.style.display = isNotHome ? 'flex' : 'none';
    if(menuBtn) menuBtn.style.display = isNotHome ? 'none' : 'flex';
}

window.navigateBack = function() {
    if (document.getElementById("results-nexus").innerHTML !== "") {
        document.getElementById("results-nexus").innerHTML = "";
        document.getElementById("category-grid").style.display = "grid";
    } else {
        window.switchPane('pane-lexicon', null);
    }
    updateNavbarVisibility();
};

window.toggleSidebar = function() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon', null);
});
