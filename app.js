/**
 * AMAWAL PROFESSIONAL ENGINE v9.1 - Bulletproof Cloud Logic
 */

// 1. Database Configuration
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// المتن المحلي كاحتياط لضمان عمل الأزرار فوراً
window.masterRepo = [
    {
        id: "EXP-001",
        expression: "Awal n imzwura d lqist n tmurt",
        category: "proverbs",
        meaning: "سلطة الموروث القولي.",
        field_investigation: "تحليل تجريبي أولي.",
        locutionary_act: "جملة خبرية تقريرية.",
        illocutionary_act: "فعل تثبيت شرعية.",
        perlocutionary_act: "إنهاء الجدل.",
        implicature_maxim: "قانون الكيف",
        implicature_meaning: "العدالة الجماعية الموروثة."
    }
];

// 2. Navigation & View Switching
window.switchPane = function(id) {
    try {
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
    } catch (e) { console.error("Navigation Error:", e); }
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
            nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.5;'><i class='fas fa-folder-open fa-3x'></i><br>لم يتم العثور على شواهد في هذا التصنيف بعد.</div>";
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

// 3. Detail View Rendering
window.renderDetail = function(item) {
    try {
        const nexus = document.getElementById("results-nexus");
        nexus.innerHTML = `
            <article class="lexical-artifact ultimate-reveal" style="padding:1.5rem;">
                <h2 style="color:#d4a373; margin-bottom:1rem;">${item.expression}</h2>
                <p><strong>المعنى:</strong> ${item.meaning || '---'}</p>

                <div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:15px; font-style:italic; text-align:center;">
                    "${item.expression}"
                    <div style="border-top:1px solid rgba(255,255,255,0.1); margin-top:1rem; padding-top:1rem; font-size:0.8rem; color:#bcaaa4; font-style:normal;">
                        <strong>استقصاء ميداني:</strong><br>${item.field_investigation || 'تحليل أولي.'}
                    </div>
                </div>

                <div class="pragmatic-section" style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; margin-bottom:1rem;">
                    <h4 style="color:#d4a373; font-size:0.9rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Gricean)</h4>
                    <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature_maxim || 'الملائمة'}</p>
                    <p style="font-size:0.85rem;"><strong>المعنى المستلزم:</strong> ${item.implicature_meaning || '---'}</p>
                </div>

                <div style="display:grid; grid-template-columns:1fr; gap:1rem; margin-top:1.5rem;">
                    <section style="background:rgba(162,210,255,0.05); padding:1rem; border-radius:10px; border-right:3px solid #a2d2ff;">
                        <h4 style="color:#a2d2ff; font-size:0.9rem;"><i class="fas fa-layer-group"></i> مستويات التلفظ</h4>
                        <p style="font-size:0.8rem;"><strong>اللفظي:</strong> ${item.locutionary_act || '---'}</p>
                        <p style="font-size:0.8rem;"><strong>الإنجازي:</strong> ${item.illocutionary_act || '---'}</p>
                    </section>
                </div>
            </article>
        `;
        window.updateNavbarVisibility();
    } catch (e) { console.error("Render Error:", e); }
};

// 4. Admin & Sync Logic
window.handleProfessionalAdd = async function() {
    const btn = document.getElementById("save-btn");
    const getVal = (id) => document.getElementById(id).value.trim();

    try {
        const payload = {
            id: 'ACT-' + Date.now(),
            expression: getVal("expressionInput"),
            category: getVal("categoryInput"),
            meaning: getVal("meaningInput"),
            literal_translation: getVal("literalTranslationInput"),
            field_investigation: getVal("fieldInvestigationInput"),
            locutionary_act: getVal("locutionaryInput"),
            illocutionary_act: getVal("illocutionaryInput"),
            perlocutionary_act: getVal("perlocutionaryInput"),
            illocution_type: getVal("illocutionTypeInput"),
            illocutionary_force: getVal("illocutionForceInput"),
            implicature_maxim: getVal("implicatureMaximInput"),
            implicature_meaning: getVal("implicatureMeaningInput"),
            felicity_conditions: getVal("felicityInput"),
            politeness_strategy: getVal("politenessInput"),
            direction_of_fit: getVal("fitInput"),
            speaker_info: getVal("speakerInfoInput"),
            context: getVal("contextInput"),
            dialect_region: getVal("dialectRegionInput"),
            audio_url: getVal("audioUrlInput")
        };

        if(!payload.expression || !payload.category) { alert("يرجى إدخال الشاهد والنوع!"); return; }

        btn.disabled = true; btn.innerText = "جاري الحفظ...";

        const { error } = await supabase.from('speech_acts').insert([payload]);
        if (error) throw error;

        alert("تم الحفظ بنجاح! ☁️");
        window.location.reload();
    } catch (err) {
        alert("فشل الحفظ: " + err.message);
    } finally {
        btn.disabled = false; btn.innerText = "حفظ التحليل في السحاب";
    }
};

window.syncCloud = async function() {
    if(!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
            window.masterRepo = data;
            console.log("Cloud Sync v9.1 Success.");
        }
    } catch (err) { console.error("Sync Failed, using local cache."); }
};

// 5. System Helpers
window.updateNavbarVisibility = function() {
    const res = document.getElementById("results-nexus");
    const grid = document.getElementById("category-grid");
    const isNexus = res && res.innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && grid && grid.style.display !== "none";

    const b = document.getElementById('back-btn');
    const m = document.getElementById('menu-btn');
    if(b) b.style.display = isHome ? 'none' : 'flex';
    if(m) m.style.display = isHome ? 'flex' : 'none';
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
