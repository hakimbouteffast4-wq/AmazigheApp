/**
 * AMAWAL PROTECTED ENGINE v8.0 - Full Linguistic Data Support
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
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = `<span style="font-weight:bold;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => window.renderDetail(item);
        nexus.appendChild(div);
    });
    window.updateNavbarVisibility();
};

window.renderDetail = function(item) {
    const nexus = document.getElementById("results-nexus");

    let audioHtml = item.audio_url ? `
        <div style="margin-top:1rem; text-align:center;">
            <audio controls style="width:100%;">
                <source src="${item.audio_url}" type="audio/mpeg">
                متصفحك لا يدعم تشغيل الصوت.
            </audio>
        </div>
    ` : '';

    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:#d4a373;">${item.expression}</h2>
            <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; margin:1rem 0;">
                <p><strong>المعنى التداولي:</strong> ${item.meaning}</p>
                ${item.literal_translation ? `<p style="font-size:0.9rem; opacity:0.8;"><strong>الترجمة الحرفية:</strong> ${item.literal_translation}</p>` : ''}

                <div style="background:#5d4037; color:#d4a373; padding:1rem; margin:1rem 0; border-radius:8px; font-style:italic;">
                    ${item.manuscript}
                </div>

                <p style="font-size:0.9rem; border-right:3px solid #d4a373; padding-right:10px; margin-bottom:1rem;">
                    <strong>الاستلزام الحواري:</strong> ${item.implicature.meaning}
                </p>

                <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem; margin-top:1rem; font-size:0.85rem;">
                    ${item.speaker_info ? `<p><strong>المتحدث:</strong> ${item.speaker_info}</p>` : ''}
                    ${item.dialect_region ? `<p><strong>المنطقة:</strong> ${item.dialect_region}</p>` : ''}
                    ${item.context ? `<p><strong>السياق الميداني:</strong> ${item.context}</p>` : ''}
                </div>
                ${audioHtml}
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

// 3. Admin Functionality - Improved with New Columns
window.handleAddBtn = async function() {
    const saveBtn = document.getElementById("save-btn");

    const expressionInput = document.getElementById("expressionInput");
    const meaningInput = document.getElementById("meaningInput");
    const literalTranslationInput = document.getElementById("literalTranslationInput");
    const speakerInfoInput = document.getElementById("speakerInfoInput");
    const contextInput = document.getElementById("contextInput");
    const dialectRegionInput = document.getElementById("dialectRegionInput");
    const audioUrlInput = document.getElementById("audioUrlInput");

    const expressionText = expressionInput.value.trim();
    const meaningText = meaningInput.value.trim();

    if (!expressionText || !meaningText) {
        alert("يرجى ملء كافة الحقول الأساسية قبل الحفظ!");
        return;
    }

    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');

    saveBtn.disabled = true;
    saveBtn.innerText = "جاري الحفظ... ⏳";

    try {
        const { error } = await client.from('speech_acts').insert([
            {
                id: 'ACT-' + Date.now(),
                expression: expressionText,
                implicature_meaning: meaningText,
                literal_translation: literalTranslationInput.value.trim(),
                speaker_info: speakerInfoInput.value.trim(),
                context: contextInput.value.trim(),
                dialect_region: dialectRegionInput.value.trim(),
                audio_url: audioUrlInput.value.trim(),
                category: 'proverbs' // Default category
            }
        ]);

        if (error) throw error;

        alert("تم الحفظ بنجاح! ☁️");

        // Clear fields
        expressionInput.value = ''; meaningInput.value = ''; literalTranslationInput.value = '';
        speakerInfoInput.value = ''; contextInput.value = ''; dialectRegionInput.value = '';
        audioUrlInput.value = '';

        syncCloud();

    } catch (err) {
        alert("خطأ في الحفظ: " + err.message);
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerText = "حفظ في السحاب ☁️";
    }
};

// 4. Background Cloud Sync (Won't block buttons)
async function syncCloud() {
    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');
    const { data } = await client.from('speech_acts').select('*');
    if (data && data.length > 0) {
        window.masterRepo = data.map(item => ({
            id: item.id,
            expression: item.expression,
            category: item.category,
            meaning: item.meaning,
            translation: item.translation,
            manuscript: item.manuscript,
            implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning },
            // New Columns
            literal_translation: item.literal_translation,
            speaker_info: item.speaker_info,
            context: item.context,
            dialect_region: item.dialect_region,
            audio_url: item.audio_url
        }));
        console.log("Cloud Data Merged.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon');
    syncCloud();
});
