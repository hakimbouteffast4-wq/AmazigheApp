/**
 * AMAWAL GOLDEN ENGINE v6.1 - Integrated Cloud & UI
 */

// 1. Database & State
let masterRepo = [
    { id: "EXP-001", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", translation: "كلام الأولين ميزان الأرض.", manuscript: "Awal n imzwura", levels: {locution: "لفظ خبري", illocution: "فعل تثبيت شرعية", perlocution: "إنهاء الجدل"}, taxonomy: {apparentKey: "assertive", implicitKey: "declarative"}, implicature: {maxim: "الكيف", meaning: "العدالة الجماعية"}, conditions: {felicity: "سلطة العرف", politeness: "الاحتماء بالأجداد", directionOfFit: "W-to-W"}, context: {setting: "Agraw", participants: "كبار القبيلة", prosody: "وقورة"} }
];

const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Global Controllers
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

    const results = masterRepo.filter(i => i.category === cat);
    if(results.length === 0) nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>جاري جلب البيانات...</div>";

    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = `<span style="font-weight:bold;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => window.renderDetail(item);
        nexus.appendChild(div);
    });
    window.updateNavbarVisibility();
};

window.renderDetail = function(item) {
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:#d4a373; margin-bottom:1rem;">${item.expression}</h2>
            <div class="matrix-node"><h4>الدلالة المعجمية</h4><p>${item.meaning}</p></div>
            <div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:12px; text-align:center; font-style:italic;">
                <span style="font-size:1.4rem;">${item.manuscript}</span>
            </div>
            <div style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; margin-bottom:1.5rem;">
                <h4 style="color:#d4a373; font-size:0.9rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Gricean)</h4>
                <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature?.maxim || 'قانون الملائمة'}<br><strong>المعنى:</strong> ${item.implicature?.meaning || 'غير محدد'}</p>
            </div>
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section"><h4><i class="fas fa-layer-group"></i> المستويات</h4><p style="font-size:0.8rem;">${item.levels?.locution}<br>${item.levels?.illocution}</p></div>
                <div class="pragmatic-section"><h4><i class="fas fa-map-marked-alt"></i> المقام</h4><p style="font-size:0.8rem;">${item.context?.setting}<br>${item.context?.participants}</p></div>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

// 3. Admin & Sync Logic
window.handleAddBtn = async function() {
    const exp = document.getElementById("input-exp").value;
    const imp = document.getElementById("input-imp").value;
    if(!exp || !imp) return alert("يرجى ملء الحقول");

    console.log("Saving to Cloud...");
    const { error } = await supabase.from('speech_acts').insert([{
        id: 'ACT-' + Date.now(), expression: exp, implicature_meaning: imp, category: 'proverbs'
    }]);

    if(error) alert("فشل الحفظ: " + error.message);
    else {
        alert("تم الحفظ بنجاح!");
        document.getElementById("input-exp").value = "";
        document.getElementById("input-imp").value = "";
        window.getCloudData();
    }
};

window.getCloudData = async function() {
    if(!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*');
    if(!error && data) {
        masterRepo = data.map(item => ({
            id: item.id, expression: item.expression, category: item.category,
            meaning: item.meaning, translation: item.translation, manuscript: item.manuscript,
            analysis: item.analysis,
            levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
            implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning },
            taxonomy: { apparentKey: item.apparent_key, implicitKey: item.implicit_key },
            context: { setting: item.context_setting, participants: item.context_participants }
        }));
        console.log("Cloud Sync Done. Items:", masterRepo.length);
    }
};

// 4. System Helpers
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
    s.classList.toggle('active'); o.classList.toggle('active');
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon');
    window.getCloudData();
});
