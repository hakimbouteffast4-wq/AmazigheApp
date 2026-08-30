/**
 * AMAWAL ULTIMATE - Final Cloud Bridge (v5.2)
 */

// 1. Supabase Config (Safe Init)
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy';
let supabase = null;

if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
}

const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

// Local Data Backup
let ultimateRepository = [
    {
        id: "ULT-LOCAL-001", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs",
        meaning: "سلطة الموروث القولي.", translation: "كلام الأولين مرجع الأرض.", manuscript: "Awal n imzwura",
        analysis: "تحليل تجريبي.", levels: { locution: "لفظي", illocution: "إنجازي", perlocution: "تأثيري" },
        taxonomy: { type: "إخباري", force: "إلزام", apparentKey: "assertive", implicitKey: "declarative" },
        conditions: { felicity: "مكانة", politeness: "تلطيف", directionOfFit: "W-to-W" },
        context: { setting: "Agraw", participants: "كبار", prosody: "وقورة" }
    }
];

// 2. Global UI Core
window.switchPane = function(id, btn) {
    document.querySelectorAll('.pane-container').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }

    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
    }
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    if(btn) btn.classList.add('active');
    updateNavbarVisibility();
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon', null);
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    ultimateRepository.filter(i => i.category === cat).forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => renderDetail(item);
        nexus.appendChild(div);
    });
    updateNavbarVisibility();
};

function renderDetail(item) {
    const nexus = document.getElementById("results-nexus");
    let tagsHtml = '<div style="display:flex; flex-wrap:wrap; gap:5px;">';
    searleTaxonomy.forEach(cat => {
        let active = (cat.key === item.taxonomy.apparentKey || cat.key === item.taxonomy.implicitKey) ? 'active-apparent' : '';
        tagsHtml += `<span class="taxonomy-tag ${active}" style="font-size:0.6rem;">${cat.label}</span>`;
    });
    tagsHtml += '</div>';

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:var(--gold);">${item.expression}</h2>
            <div style="background:#5d4037; border-radius:10px; padding:1.5rem; margin:1rem 0; color:#d4a373; font-style:italic;">${item.manuscript}</div>
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section"><h4><i class="fas fa-layer-group"></i> المستويات</h4><p style="font-size:0.8rem;">${item.levels.locution} | ${item.levels.illocution}</p></div>
                <div class="pragmatic-section"><h4><i class="fas fa-bullseye"></i> المقاصد</h4>${tagsHtml}</div>
            </div>
        </article>
    `;
}

// 3. System & Sync
async function syncCloud() {
    if (!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*');
    if (!error && data && data.length > 0) {
        ultimateRepository = data.map(item => ({
            id: item.id, expression: item.expression, meaning: item.meaning, category: item.category,
            manuscript: item.manuscript, analysis: item.analysis, translation: item.translation,
            levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
            taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicitKey: item.implicit_key },
            conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
            context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
        }));
        console.log("Supabase Synced.");
    }
}

window.updateNavbarVisibility = function() {
    const isNexus = document.getElementById("results-nexus").innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active').id === 'pane-lexicon' && !isNexus;
    document.getElementById('back-btn').style.display = isHome ? 'none' : 'flex';
    document.getElementById('menu-btn').style.display = isHome ? 'flex' : 'none';
};

window.navigateBack = function() {
    if (document.getElementById("results-nexus").innerHTML !== "") {
        document.getElementById("results-nexus").innerHTML = "";
        document.getElementById("category-grid").style.display = "grid";
    } else window.switchPane('pane-lexicon', null);
    updateNavbarVisibility();
};

window.toggleSidebar = function() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    s.classList.toggle('active'); o.classList.toggle('active');
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon', null);
    syncCloud();
});
