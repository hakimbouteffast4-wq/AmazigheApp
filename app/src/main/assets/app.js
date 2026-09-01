/**
 * AMAWAL GOLDEN ENGINE v10.7 - Detailed View Fix
 */

// 1. Immutable Core Data
window.masterRepo = [
    { id: "PROV-101", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", translation: "كلام الأولين مرجع الأرض.", manuscript: "Awal n imzwura", analysis: "تحليل تداولي.", levels: {locution: "لفظ خبري", illocution: "تثبيت شرعية"}, taxonomy: {apparentKey: "assertive"}, implicature: {maxim: "الكيف", meaning: "العدالة الجماعية"}, context: {setting: "Agraw", participants: "كبار"} }
];

const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Navigation & Rendering
window.switchPane = function(id) {
    document.querySelectorAll('.pane-container').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }

    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
    }
    window.updateNavbarVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";
    const results = window.masterRepo.filter(i => i.category === cat);
    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = `<span style="font-weight:bold;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => window.renderDetail(item);
        nexus.appendChild(div);
    });
    window.updateNavbarVisibility();
};

window.renderDetail = function(item) {
    // إجبار التطبيق على العرض في صفحة المعجم وإخفاء القوائم الأخرى
    document.querySelectorAll('.pane-container').forEach(p => p.style.display = 'none');
    document.getElementById('pane-lexicon').style.display = 'block';
    document.getElementById("category-grid").style.display = "none";

    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal" style="padding:1.5rem;">
            <h2 style="color:#d4a373; margin-bottom:1.5rem;">${item.expression}</h2>
            <div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin-bottom:1.5rem; border-radius:15px; text-align:center; font-style:italic;">
                <span style="font-size:1.4rem;">${item.manuscript || item.expression}</span>
            </div>
            <div style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; margin-bottom:1.5rem;">
                <h4 style="color:#d4a373; font-size:0.9rem;">الاستلزام الحواري (Gricean)</h4>
                <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature_maxim || 'الملائمة'}<br><strong>المعنى:</strong> ${item.implicature_meaning || item.meaning}</p>
            </div>
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section"><h4><i class="fas fa-layer-group"></i> مستويات التلفظ</h4><p style="font-size:0.8rem;">${item.locutionary_act || 'لفظي'}<br>${item.illocutionary_act || 'إنجازي'}</p></div>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

// 3. Admin & History Data
window.loadSpeechActs = async function() {
    if (!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*').order('created_at', { ascending: false });
    const container = document.getElementById('speech-acts-list');
    if (!container || error) return;
    container.innerHTML = '';
    data.forEach(act => {
        const div = document.createElement('div');
        div.style.cssText = "padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1); border-radius:10px; margin-bottom:0.8rem; background:rgba(0,0,0,0.2); cursor:pointer;";
        div.innerHTML = `<h4 style="font-weight:bold; color:#d4a373;">${act.expression}</h4><p style="font-size:0.8rem; opacity:0.7;">${act.category}</p>`;
        div.onclick = () => window.renderDetail(act);
        container.appendChild(div);
    });
};

window.syncCloud = async function() {
    if(!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*');
    if(!error && data) { window.masterRepo = data; window.loadSpeechActs(); }
};

window.handleSaveBtn = async function() {
    const btn = document.getElementById("save-btn");
    const payload = {
        id: 'ACT-' + Date.now(),
        expression: document.getElementById('expression').value.trim(),
        meaning: document.getElementById('meaning').value.trim(),
        category: document.getElementById('category').value
    };
    if(!payload.expression) return alert("أدخل الشاهد!");
    btn.disabled = true; btn.innerText = "جاري الحفظ...";
    const { error } = await supabase.from('speech_acts').insert([payload]);
    if(error) alert(error.message);
    else { alert("تم الحفظ!"); location.reload(); }
};

// 4. Helpers
window.updateNavbarVisibility = function() {
    const isNexus = document.getElementById("results-nexus").innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && !isNexus;
    document.getElementById('back-btn').style.display = isHome ? 'none' : 'flex';
    document.getElementById('menu-btn').style.display = isHome ? 'flex' : 'none';
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
    window.switchPane('pane-lexicon');
    window.syncCloud();
});
