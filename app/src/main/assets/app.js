/**
 * AMAWAL PROTECTED ENGINE v10.8 - Final Global Stability
 */

// 1. Immutable Core Data (PhD Corpus)
window.masterRepo = [
    { id: "PROV-101", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", translation: "كلام الأولين مرجع الأرض.", manuscript: "Awal n imzwura", analysis: "تحليل تداولي.", levels: {locution: "لفظ خبري", illocution: "تثبيت شرعية"}, taxonomy: {apparentKey: "assertive"}, implicature: {maxim: "الكيف", meaning: "العدالة الجماعية"}, context: {setting: "Agraw", participants: "كبار"} },
    { id: "IZLI-101", expression: "Tayri d lḥit i t-id-igran", category: "izlan", meaning: "عجز المشاعر.", translation: "الحب جدار.", manuscript: "Tayri d lḥit", analysis: "تحليل وجداني.", implicature: {maxim: "الملائمة", meaning: "القدر المحتوم"} }
];

const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Global Controllers (Guarded with try-catch)
window.switchPane = function(id) {
    try {
        console.log("Navigating to:", id);
        const panes = document.querySelectorAll('.pane-container');
        panes.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });

        const target = document.getElementById(id);
        if(target) {
            target.style.display = 'block';
            target.classList.add('active');
        }

        if (id === 'pane-lexicon') {
            document.getElementById("category-grid").style.display = "grid";
            document.getElementById("results-nexus").innerHTML = "";
        }
        window.updateNavbarVisibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { console.error("Pane Switch Error:", e); }
};

window.setSearchCategory = function(cat) {
    try {
        window.switchPane('pane-lexicon');
        const grid = document.getElementById("category-grid");
        const nexus = document.getElementById("results-nexus");
        if(grid) grid.style.display = "none";
        if(nexus) nexus.innerHTML = "";

        const results = window.masterRepo.filter(i => i.category === cat);
        if(results.length === 0) {
            nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.5;'>يتم جلب البيانات من السحاب...</div>";
        }

        results.forEach(item => {
            const div = document.createElement("div");
            div.className = "act-category-card ultimate-reveal";
            div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; border-right:4px solid #a2d2ff; cursor:pointer;";
            div.innerHTML = `<span style="font-weight:bold;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
            div.onclick = () => window.renderDetail(item);
            nexus.appendChild(div);
        });
        window.updateNavbarVisibility();
    } catch (e) { console.error("Search Error:", e); }
};

window.renderDetail = function(item) {
    try {
        window.switchPane('pane-lexicon');
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
                    <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature_maxim || item.implicature?.maxim || 'الملائمة'}</p>
                    <p style="font-size:0.85rem;"><strong>المعنى:</strong> ${item.implicature_meaning || item.implicature?.meaning || item.meaning}</p>
                </div>
            </article>
        `;
        window.updateNavbarVisibility();
    } catch (e) { console.error("Render Detail Error:", e); }
};

// 3. Admin Form Handling (Final Correct Logic)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('speechActForm');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById("save-btn");
            btn.disabled = true; btn.innerText = "جاري الحفظ... ⏳";

            try {
                const getVal = (id) => document.getElementById(id).value.trim();
                const payload = {
                    id: 'ACT-' + Date.now(),
                    expression: getVal('expression'),
                    category: getVal('category'),
                    meaning: getVal('meaning'),
                    field_context: getVal('field_context'),
                    field_investigation: getVal('field_investigation'),
                    locutionary_act: getVal('locutionary_act'),
                    illocutionary_act: getVal('illocutionary_act'),
                    perlocutionary_act: getVal('perlocutionary_act'),
                    illocution_type: getVal('illocution_type'),
                    illocutionary_force: getVal('illocutionary_force'),
                    direction_of_fit: getVal('direction_of_fit'),
                    politeness_strategy: getVal('politeness_strategy'),
                    felicity_conditions: getVal('felicity_conditions'),
                    notes: getVal('notes')
                };

                const { error } = await supabase.from('speech_acts').insert([payload]);
                if (error) throw error;

                alert('تم الحفظ بنجاح! ☁️');
                form.reset();
                window.syncCloud();
            } catch (err) {
                alert('خطأ في الحفظ: ' + err.message);
            } finally {
                btn.disabled = false; btn.innerText = "☁️ حفظ في السحاب (Supabase)";
            }
        };
    }
    // Start Up
    window.switchPane('pane-lexicon');
    window.syncCloud();
});

// 4. Cloud Sync Logic
window.syncCloud = async function() {
    if (!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            window.masterRepo = data;
            window.updateHistoryList(data);
        }
    } catch (e) { console.warn("Sync Failed, using cache."); }
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

// 5. Global Helpers
window.updateNavbarVisibility = function() {
    try {
        const res = document.getElementById("results-nexus");
        const grid = document.getElementById("category-grid");
        const isNexus = res && res.innerHTML !== "";
        const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && grid && grid.style.display !== "none";
        document.getElementById('back-btn').style.display = isHome ? 'none' : 'flex';
        document.getElementById('menu-btn').style.display = isHome ? 'flex' : 'none';
    } catch(e) {}
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
