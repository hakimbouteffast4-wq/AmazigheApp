/**
 * AMAWAL BULLETPROOF ENGINE v10.0
 */

// 1. Immutable Data Cache (Offline-ready)
window.masterRepo = [
    { id: "1", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", manuscript: "Awal n imzwura", implicature_meaning: "العدالة الجماعية الموروثة." },
    { id: "2", expression: "Iyya usmun amm lkass nsirs t ad iṣmiḍ", category: "izlan", meaning: "الغدر وضياع الفرص.", manuscript: "Iyya usmun amm lkass", implicature_meaning: "الرفيق ليس ملكاً للجميع ككأس الماء." }
];

// 2. Global Controllers (Implicitly assigned to window for maximum compatibility)
window.switchPane = function(id) {
    console.log("Navigation:", id);
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
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon');
    const grid = document.getElementById("category-grid");
    const nexus = document.getElementById("results-nexus");

    if(grid) grid.style.display = "none";
    if(nexus) nexus.innerHTML = "";

    const results = window.masterRepo.filter(i => i.category === cat);
    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.5;'>يتم جلب البيانات...</div>";
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
        <article class="lexical-artifact ultimate-reveal" style="padding:1.5rem;">
            <h2 style="color:#d4a373;">${item.expression}</h2>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; margin:1rem 0;">
                <p><strong>المعنى:</strong> ${item.meaning}</p>
                <div style="background:#5d4037; color:#d4a373; padding:1rem; margin:1.5rem 0; border-radius:8px; text-align:center; font-style:italic;">
                    ${item.manuscript}
                </div>
                <div style="border-right:3px solid #d4a373; padding:10px; background:rgba(212,163,115,0.05);">
                    <h4 style="color:#d4a373; font-size:0.9rem;">الاستلزام الحواري (Grice)</h4>
                    <p style="font-size:0.85rem;">${item.implicature_meaning || 'تحليل قيد التحديث'}</p>
                </div>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

// 3. Admin & Cloud Logic (Protected)
window.handleSaveBtn = async function() {
    const btn = document.getElementById("save-btn");
    const exp = document.getElementById("expressionInput").value.trim();
    const imp = document.getElementById("meaningInput").value.trim();
    const cat = document.getElementById("categoryInput").value;

    if(!exp || !imp) return alert("يرجى ملء الحقول");

    if (typeof window.supabase === 'undefined') return alert("خطأ في تحميل مكتبة السحاب");
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');

    btn.disabled = true; btn.innerText = "جاري الحفظ...";

    try {
        const { error } = await client.from('speech_acts').insert([{
            id: 'ACT-' + Date.now(), expression: exp, implicature_meaning: imp, category: cat
        }]);
        if (error) throw error;
        alert("تم الحفظ بنجاح!");
        location.reload();
    } catch (err) {
        alert("خطأ: " + err.message);
    } finally {
        btn.disabled = false; btn.innerText = "حفظ في السحاب";
    }
};

window.syncCloud = async function() {
    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');
    const { data } = await client.from('speech_acts').select('*');
    if (data && data.length > 0) {
        window.masterRepo = data;
        console.log("Database Sync Complete.");
    }
};

// 4. UI Helpers
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
