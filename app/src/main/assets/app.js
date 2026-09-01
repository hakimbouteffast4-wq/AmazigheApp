/**
 * AMAWAL UNIVERSAL ENGINE v11.0
 */

// 1. Data Context (Offline First)
window.masterRepo = [
    { id: "PROV-101", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث القولي.", manuscript: "Awal n imzwura", analysis: "تحليل تداولي.", implicature_meaning: "العدالة الجماعية الموروثة." },
    { id: "IZLI-101", expression: "Tayri d lḥit i t-id-igran", category: "izlan", meaning: "ريح الحب.", manuscript: "Tayri d lḥit", analysis: "تحليل وجداني.", implicature_meaning: "المعاناة قدر محتوم." }
];

const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Navigation Controllers
window.switchPane = function(id) {
    console.log("Switching Pane:", id);
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
    window.updateNavbarVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.setSearchCategory = function(cat) {
    console.log("Setting Cat:", cat);
    window.switchPane('pane-lexicon');
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");

    if(grid) grid.style.display = "none";
    if(nexus) nexus.innerHTML = "";

    const results = window.masterRepo.filter(i => i.category === cat);
    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم جلب المزيد من السحاب...</div>";
    }

    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = `<span style="font-weight:bold;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => window.renderDetail(item);
        nexus.appendChild(div);
    });
    window.updateNavbarVisibility();
};

window.renderDetail = function(item) {
    console.log("Rendering:", item.id);
    window.switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal" style="padding:1.5rem;">
            <h2 style="color:#d4a373; margin-bottom:1rem;">${item.expression}</h2>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; margin:1rem 0;">
                <p><strong>المعنى:</strong> ${item.meaning || 'تحليل قيد التحديث'}</p>
                <div style="background:#5d4037; color:#d4a373; padding:1.2rem; margin:1.5rem 0; border-radius:12px; text-align:center; font-style:italic;">
                    ${item.manuscript || item.expression}
                </div>
                <div style="border-right:3px solid #d4a373; padding:10px; background:rgba(212,163,115,0.05);">
                    <h4 style="color:#d4a373; font-size:0.9rem;">الاستلزام الحواري (Grice)</h4>
                    <p style="font-size:0.85rem;">${item.implicature_meaning || 'غير محدد'}</p>
                </div>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

// 3. Sync & Form Logic
window.syncCloud = async function() {
    if (!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
            window.masterRepo = data;
            window.updateHistoryList(data);
            console.log("Cloud Data Synced.");
        }
    } catch(e) {}
};

window.updateHistoryList = function(data) {
    const container = document.getElementById('speech-acts-list');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(act => {
        const div = document.createElement('div');
        div.style.cssText = "padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1); border-radius:10px; margin-bottom:0.8rem; background:rgba(0,0,0,0.2); cursor:pointer;";
        div.innerHTML = `<h4 style="font-weight:bold; color:#d4a373;">${act.expression}</h4><p style="font-size:0.8rem; opacity:0.7;">${act.category}</p>`;
        div.onclick = () => window.renderDetail(act);
        container.appendChild(div);
    });
};

// 4. Global UI Helpers
window.updateNavbarVisibility = function() {
    const nexus = document.getElementById("results-nexus");
    const grid = document.getElementById("category-grid");
    const isDetail = nexus && nexus.innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && grid && grid.style.display !== "none";
    document.getElementById('back-btn').style.display = (isHome) ? 'none' : 'flex';
    document.getElementById('menu-btn').style.display = (isHome) ? 'flex' : 'none';
};

window.navigateBack = function() {
    if (document.getElementById("results-nexus").innerHTML !== "") {
        document.getElementById("results-nexus").innerHTML = "";
        document.getElementById("category-grid").style.display = "grid";
    } else window.switchPane('pane-lexicon');
    window.updateNavbarVisibility();
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
    // Admin Form Binding
    const form = document.getElementById('speechActForm');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById("save-btn");
            btn.disabled = true; btn.innerText = "جاري الحفظ...";
            try {
                const payload = {
                    id: 'ACT-' + Date.now(),
                    expression: document.getElementById('expression').value,
                    category: document.getElementById('category').value,
                    implicature_meaning: document.getElementById('meaning').value
                };
                const { error } = await supabase.from('speech_acts').insert([payload]);
                if (error) throw error;
                alert("تم الحفظ!"); form.reset(); window.syncCloud();
            } catch (err) { alert("خطأ: " + err.message); }
            finally { btn.disabled = false; btn.innerText = "☁️ حفظ في السحاب"; }
        };
    }
    window.switchPane('pane-lexicon');
    window.syncCloud();
});
