/**
 * AMAWAL ULTIMATE - Final Bulletproof Master (v5.6)
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

let ultimateRepository = [];

// 2. Cloud Functions
async function getSpeechActs() {
    if (!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*');
        if (!error && data) {
            ultimateRepository = data.map(item => ({
                id: item.id, expression: item.expression, meaning: item.meaning, category: item.category,
                translation: item.translation, manuscript: item.manuscript, analysis: item.analysis,
                levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
                implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning },
                taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicitKey: item.implicit_key },
                conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
                context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
            }));
            console.log("Data loaded from cloud:", ultimateRepository.length);
        }
    } catch(e) { console.error("Sync error:", e); }
}

window.addSpeechAct = async function(expressionText, implicatureText) {
    if (!supabase) return;
    const { data, error } = await supabase.from('speech_acts').insert([{
        id: 'ACT-' + Date.now(),
        expression: expressionText,
        implicature_meaning: implicatureText,
        category: 'poetry'
    }]);
    if (error) alert("Error: " + error.message);
    else { alert("Success!"); getSpeechActs(); }
};

// 3. UI Core
window.switchPane = function(id, btn) {
    document.querySelectorAll('.pane-container').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }

    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
    }
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    if(btn && btn.classList) btn.classList.add('active');
    updateNavbarVisibility();
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon', null);
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    if (results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.6;'><i class='fas fa-sync fa-spin'></i> جاري التحميل...</div>";
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
    let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin:1rem 0;">';
    searleTaxonomy.forEach(cat => {
        let active = (cat.key === item.taxonomy.apparentKey || cat.key === item.taxonomy.implicitKey) ? 'active-apparent' : '';
        tagsHtml += `<span class="taxonomy-tag ${active}" style="font-size:0.75rem;">${cat.label}</span>`;
    });
    tagsHtml += '</div>';

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:var(--gold);">${item.expression}</h2>
            <div class="matrix-node"><h4>الدلالة المعجمية</h4><p>${item.meaning}</p></div>
            <div class="corpus-vault-imperial" style="background:#5d4037; border-radius:15px; padding:1.5rem; margin:2rem 0; text-align:center;">
                <span style="color:#d4a373; font-size:1.4rem; font-style:italic;">${item.manuscript}</span>
            </div>
            <div class="pragmatic-section" style="border-right:3px solid var(--gold); background:rgba(212,163,115,0.05); padding:1rem; border-radius:15px; margin-bottom:2rem;">
                <h4 style="color:var(--gold);"><i class="fas fa-comment-dots"></i> الاستلزام الحواري</h4>
                <p>${item.implicature.maxim || 'قانون الملائمة'}<br>${item.implicature.meaning}</p>
            </div>
        </article>
    `;
    updateNavbarVisibility();
}

// 4. Helpers
function updateNavbarVisibility() {
    const res = document.getElementById("results-nexus");
    const grid = document.getElementById("category-grid");
    const isNexus = res && res.innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && grid && grid.style.display !== "none";

    const b = document.getElementById('back-btn'), m = document.getElementById('menu-btn');
    if(b) b.style.display = isHome ? 'none' : 'flex';
    if(m) m.style.display = isHome ? 'flex' : 'none';
}

window.handleAddSpeechAct = async function() {
    const exp = document.getElementById("input-expression").value;
    const imp = document.getElementById("input-implicature").value;
    if (!exp || !imp) return alert("Fill fields");
    await window.addSpeechAct(exp, imp);
    document.getElementById("input-expression").value = "";
    document.getElementById("input-implicature").value = "";
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
    if(s) s.classList.toggle('active'); if(o) o.classList.toggle('active');
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon', null);
    getSpeechActs();
});
