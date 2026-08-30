/**
 * AMAWAL INSTANT ENGINE v7.0 - Ultra Responsive
 */

// 1. Immutable Core Data (Works Offline)
window.masterRepo = [
    { id: "1", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", translation: "كلام الأولين ميزان الأرض.", manuscript: "Awal n imzwura", analysis: "تحليل تداولي.", implicature: {maxim: "الكيف", meaning: "العدالة الجماعية"} },
    { id: "2", expression: "Tamacahutt n Wuccen", category: "tales", meaning: "المكر والذكاء.", translation: "حكاية الذئب.", manuscript: "Tamacahutt", analysis: "تحليل سردي.", implicature: {maxim: "الأسلوب", meaning: "الوعظ الاجتماعي"} },
    { id: "3", expression: "Tayri d lḥit i t-id-igran", category: "izlan", meaning: "عجز المشاعر.", translation: "الحب جدار.", manuscript: "Tayri d lḥit", analysis: "تحليل وجداني.", implicature: {maxim: "الملائمة", meaning: "القدر المحتوم"} }
];

// 2. Navigation & UI Controllers
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
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم جلب المزيد من السحاب...</div>";
    }

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
            <h2 style="color:#d4a373;">${item.expression}</h2>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; margin:1rem 0;">
                <p><strong>المعنى:</strong> ${item.meaning}</p>
                <div style="background:#5d4037; color:#d4a373; padding:1rem; margin:1rem 0; border-radius:8px; font-style:italic;">${item.manuscript}</div>
                <p style="font-size:0.9rem; border-right:3px solid #d4a373; padding-right:10px;"><strong>الاستلزام:</strong> ${item.implicature.meaning}</p>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

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

// 3. Admin Functionality
window.handleAddBtn = async function() {
    const exp = document.getElementById("input-exp").value;
    const imp = document.getElementById("input-imp").value;
    if(!exp || !imp) return alert("يرجى ملء الحقول");

    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy');

    try {
        const { error } = await client.from('speech_acts').insert([{
            id: 'ACT-' + Date.now(), expression: exp, implicature_meaning: imp, category: 'proverbs'
        }]);
        if (error) throw error;
        alert("تم الحفظ بنجاح!");
        document.getElementById("input-exp").value = "";
        document.getElementById("input-imp").value = "";
        syncCloud();
    } catch (err) {
        alert("خطأ في الحفظ: " + err.message);
    }
};

// 4. Background Cloud Sync (Won't block buttons)
async function syncCloud() {
    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy');
    const { data } = await client.from('speech_acts').select('*');
    if (data && data.length > 0) {
        window.masterRepo = data.map(item => ({
            id: item.id, expression: item.expression, category: item.category,
            meaning: item.meaning, translation: item.translation, manuscript: item.manuscript,
            implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning }
        }));
        console.log("Cloud Data Merged.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon');
    syncCloud();
});
