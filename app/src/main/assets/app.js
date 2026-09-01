/**
 * AMAWAL PROFESSIONAL PRAGMATIC ENGINE v9.0
 */

// 1. Supabase Client
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

window.masterRepo = [];

// 2. Navigation
window.switchPane = function(id) {
    document.querySelectorAll('.pane-container').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }

    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
    }
    window.updateNavbarVisibility();
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    const results = window.masterRepo.filter(i => i.category === cat);
    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'><i class='fas fa-sync fa-spin'></i> جاري جلب المادة الميدانية...</div>";
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
};

// 3. Professional Rendering
window.renderDetail = function(item) {
    const nexus = document.getElementById("results-nexus");

    const audioHtml = item.audio_url ? `
        <div style="margin-top:1.5rem; background:rgba(212,163,115,0.1); padding:1rem; border-radius:15px; text-align:center;">
            <p style="font-size:0.8rem; color:#d4a373; margin-bottom:0.5rem;"><i class="fas fa-volume-up"></i> التسجيل الصوتي الميداني</p>
            <audio controls style="width:100%;"><source src="${item.audio_url}" type="audio/mpeg"></audio>
        </div>
    ` : '';

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal" style="padding:2rem;">
            <h2 style="color:#d4a373; border-bottom:2px solid #d4a373; padding-bottom:10px; margin-bottom:1.5rem;">${item.expression}</h2>

            <div class="matrix-node">
                <p><strong>المعنى التداولي:</strong> ${item.meaning}</p>
                <p style="font-size:0.9rem; opacity:0.8;"><strong>الترجمة الحرفية:</strong> ${item.literal_translation || '---'}</p>
            </div>

            <div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:15px; position:relative;">
                <span style="font-size:1.4rem; font-style:italic; display:block; text-align:center;">"${item.expression}"</span>
                <div style="border-top:1px solid rgba(212,163,115,0.2); margin-top:1rem; padding-top:1rem; font-size:0.85rem; color:#bcaaa4;">
                    <strong><i class="fas fa-microscope"></i> استقصاء ميداني:</strong><br>${item.field_investigation || 'تحليل أولي للمتن.'}
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:1.5rem;">
                <section class="pragmatic-section" style="border-right:3px solid #a2d2ff; background:rgba(162,210,255,0.03); padding:1rem; border-radius:10px;">
                    <h4 style="color:#a2d2ff; font-size:0.95rem; margin-bottom:0.8rem;"><i class="fas fa-layer-group"></i> مستويات التلفظ</h4>
                    <ul style="list-style:none; padding:0; font-size:0.85rem;">
                        <li><strong>اللفظي:</strong> ${item.locutionary_act || '---'}</li>
                        <li><strong>الإنجازي:</strong> ${item.illocutionary_act || '---'}</li>
                        <li><strong>التأثيري:</strong> ${item.perlocutionary_act || '---'}</li>
                    </ul>
                </section>

                <section class="pragmatic-section" style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.03); padding:1rem; border-radius:10px;">
                    <h4 style="color:#d4a373; font-size:0.95rem; margin-bottom:0.8rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Grice)</h4>
                    <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature_maxim || '---'}</p>
                    <p style="font-size:0.85rem;"><strong>المعنى المستلزم:</strong> ${item.implicature_meaning || '---'}</p>
                </section>

                <section class="pragmatic-section" style="border:1px dashed #333; padding:1rem; border-radius:10px;">
                    <h4 style="color:#999; font-size:0.9rem; margin-bottom:0.8rem;"><i class="fas fa-shield-alt"></i> الشروط التداولية</h4>
                    <p style="font-size:0.8rem;"><strong>النوع:</strong> ${item.illocution_type} | <strong>القوة:</strong> ${item.illocutionary_force}</p>
                    <p style="font-size:0.8rem;"><strong>شروط النجاح:</strong> ${item.felicity_conditions}</p>
                    <p style="font-size:0.8rem;"><strong>اتجاه المطابقة:</strong> ${item.direction_of_fit}</p>
                </section>

                <section class="pragmatic-section" style="background:rgba(255,255,255,0.02); padding:1rem; border-radius:10px;">
                    <h4 style="color:#777; font-size:0.9rem;"><i class="fas fa-map-marker-alt"></i> السياق والإثنوغرافيا</h4>
                    <p style="font-size:0.8rem;"><strong>المتحدث:</strong> ${item.speaker_info} | <strong>المنطقة:</strong> ${item.dialect_region}</p>
                    <p style="font-size:0.8rem;"><strong>المقام:</strong> ${item.context}</p>
                </section>
            </div>
            ${audioHtml}
        </article>
    `;
    window.updateNavbarVisibility();
};

// 4. Professional Cloud Logic
window.handleProfessionalAdd = async function() {
    const btn = document.getElementById("save-btn");
    const getVal = (id) => document.getElementById(id).value.trim();

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

    if(!payload.expression || !payload.category) return alert("يرجى إدخال الشاهد واختيار النوع على الأقل");

    btn.disabled = true; btn.innerText = "جاري الحفظ في السحاب...";

    try {
        const { error } = await supabase.from('speech_acts').insert([payload]);
        if (error) throw error;
        alert("تم حفظ التحليل بنجاح! ☁️");
        window.location.reload();
    } catch (err) {
        alert("خطأ: " + err.message);
    } finally {
        btn.disabled = false; btn.innerText = "حفظ التحليل في السحاب";
    }
};

window.syncCloud = async function() {
    if(!supabase) return;
    try {
        const { data, error } = await supabase.from('speech_acts').select('*');
        if (error) throw error;
        window.masterRepo = data;
        console.log("Cloud Sync v9.0 Success. Items:", data.length);
    } catch (err) { console.error("Sync failed:", err.message); }
};

// 5. Helpers
window.updateNavbarVisibility = function() {
    const res = document.getElementById("results-nexus");
    const grid = document.getElementById("category-grid");
    const isDetail = res && res.innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active')?.id === 'pane-lexicon' && grid && grid.style.display !== "none";
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
    s.classList.toggle('active'); o.classList.toggle('active');
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon');
    window.syncCloud();
});
