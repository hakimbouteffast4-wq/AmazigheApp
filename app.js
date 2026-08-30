/**
 * AMAWAL STABLE ENGINE v6.0
 */

// 1. Data Context
let localRepo = [
    { id: "1", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", translation: "كلام الأولين ميزان الأرض.", manuscript: "Awal n imzwura", analysis: "تحليل تداولي.", levels: {locution: "لفظي"}, taxonomy: {apparentKey: "assertive"}, implicature: {maxim: "الكيف", meaning: "العدالة"} },
    { id: "2", expression: "Tamacahutt n Wuccen", category: "tales", meaning: "المكر والذكاء.", translation: "حكاية الذئب.", manuscript: "Tamacahutt", analysis: "تحليل سردي.", levels: {locution: "لفظي"}, taxonomy: {apparentKey: "assertive"}, implicature: {maxim: "الأسلوب", meaning: "الوعظ"} }
];

// 2. Global Button Controllers (Attached to window)
window.switchPane = function(id) {
    console.log("Navigating to:", id);
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
};

window.setSearchCategory = function(cat) {
    console.log("Category selected:", cat);
    window.switchPane('pane-lexicon');
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");

    if(grid) grid.style.display = "none";
    if(nexus) nexus.innerHTML = "";

    const results = localRepo.filter(i => i.category === cat);
    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم المزامنة... اضغط ثانية لاحقاً</div>";
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
            <h2 style="color:#d4a373; margin-bottom:1rem;">${item.expression}</h2>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px;">
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
    } else {
        window.switchPane('pane-lexicon');
    }
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

// 3. Supabase Bridge (Silent Sync)
async function getCloudData() {
    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy');
    const { data } = await client.from('speech_acts').select('*');
    if (data && data.length > 0) {
        localRepo = data.map(item => ({
            id: item.id, expression: item.expression, category: item.category,
            meaning: item.meaning, translation: item.translation, manuscript: item.manuscript,
            implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning }
        }));
        console.log("Sync Complete");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon');
    getCloudData();
});
