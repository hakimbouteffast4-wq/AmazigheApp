/**
 * AMAWAL GOLDEN ENGINE v10.1 - Full Scientific Corpus Restored
 */

// 1. The Original Scientific Corpus (PhD Field Work)
window.masterRepo = [
    {
        id: "PROV-101", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs",
        meaning: "سلطة الموروث القولي في ضبط السلوك الجماعي.",
        translation: "كلام الأولين مرجع الأرض وميزان الحق.", manuscript: "Awal n imzwura d lqist n tmurt",
        analysis: "الارتقاء المعرفي: القول يتحول من منطوق عابر إلى مؤسسة قانونية وعرفية (Lqist).",
        levels: { locution: "جملة خبرية تقريرية تربط القول بالأرض والعدل.", illocution: "فعل 'تثبيت شرعية' للفعل الحالي بناءً على التاريخ.", perlocution: "إنهاء الجدل والخصومة بالعودة للأصل الثابت." },
        implicature: { maxim: "قانون الكيف", meaning: "تجاوز المنطق الفردي الحالي لصالح العدالة الجماعية الموروثة." },
        taxonomy: { apparentKey: "assertive", implicitKey: "declarative" },
        context: { setting: "مجلس العرف (Agraw).", participants: "حكماء القبيلة تجاه المتنازعين." }
    },
    {
        id: "IZLI-101", expression: "Tayri d lḥit i t-id-igran", category: "izlan",
        meaning: "بيان عجز الإنسان أمام سطوة المشاعر (ريح الحب).",
        translation: "الحب جدار يحملنا، فكيف نحسب له حساباً؟", manuscript: "Tayri d lḥit i t-id-igran, mamek ad as-ng lḥsab",
        analysis: "استقصاء ميداني: يبرز البيت عجز الإنسان وتحول العواطف إلى قدر محتوم.",
        levels: { locution: "استعارة تشبيهية تربط بين الحب والجدار.", illocution: "فعل 'بوح واعتراف بالعجز' وبث الشكوى.", perlocution: "إثارة التعاطف الوجداني وتقاسم اللوعة مع السامع." },
        implicature: { maxim: "قانون الملائمة", meaning: "المعاناة الوجدانية قدر لا مهرب منه كالجدار العالي." },
        taxonomy: { apparentKey: "assertive", implicitKey: "expressive" },
        context: { setting: "أمسيات إنشاد الشعر.", participants: "شاعر محب ومستمعون ذواقة." }
    },
    {
        id: "IDIOM-101", expression: "Icc-it udrar / ⵉⵛⵛⵉⵜ ⵓⴷⵔⴰⵔ", category: "idioms",
        meaning: "تعبير يستعمل لإعلان ضياع الشيء أو موته المعنوي.",
        translation: "أكله الجبل (ضاع للأبد).", manuscript: "Icc-it udrar, ur d-yffiy",
        analysis: "تحليل رمزي: الجبل كمكان للامتصاص والضياع النهائي.",
        levels: { locution: "فعل ماضٍ مسند لكيان مكاني عظيم.", illocution: "فعل 'إعلان اليأس' من استرجاع الشيء.", perlocution: "قطع الطريق على أي محاولة للبحث أو الأمل." },
        implicature: { maxim: "قانون الكيف", meaning: "الخسارة نهائية ولا جدوى من محاولة التغيير." },
        taxonomy: { apparentKey: "assertive", implicitKey: "declarative" },
        context: { setting: "فقدان عزيز أو حق مادي.", participants: "ناقل الخبر والمستقبل الحزين." }
    },
    {
        id: "TALE-101", expression: "Tamacahutt n Wuccen d Tmšant", category: "tales",
        meaning: "الصراع بين المكر والذكاء في المتخيل الشعبي.",
        translation: "حكاية الذئب والذئبة.", manuscript: "illa wmšan d tmšant d lxir d memmi-s...",
        analysis: "تحليل سردي: بنية الحكاية تهدف للنمذجة الأخلاقية للشخصيات.",
        levels: { locution: "بنية سردية تعتمد على الجمل التقريرية المتسلسلة.", illocution: "فعل 'وعظي' وتأطير قيمي لترسيخ معايير السلوك.", perlocution: "ترسيخ الحكمة الجماعية وتنمية ملكة النقد." },
        implicature: { maxim: "قانون الأسلوب", meaning: "إيصال العبرة عبر التلميح الحيواني لتجنب المواجهة المباشرة." },
        taxonomy: { apparentKey: "assertive", implicitKey: "declarative" },
        context: { setting: "جلسة عائلية لتربية الأطفال (Tinfusin).", participants: "الجدة والأبناء." }
    },
    {
        id: "RID-101", expression: "D acu nni? Itteddu ur lân iḍarrn", category: "riddles",
        meaning: "اختبار الذكاء عبر وصف لغزي للأشياء.",
        translation: "ما هو الشيء الذي يمشي بلا أرجل؟", manuscript: "D acu nni? Itteddu ur lân iḍarrn...",
        analysis: "تداولية اللغز: خلق فجوة معرفية لتحفيز الذاكرة الجماعية.",
        levels: { locution: "صيغة استفهامية تعتمد على التناقض المنطقي الظاهري.", illocution: "فعل 'تحدي معرفي' واختبار للانتماء الثقافي.", perlocution: "إثارة الدهشة وتنشيط الفكر الجماعي." },
        implicature: { maxim: "قانون الكم", meaning: "إخفاء الحقيقة مؤقتاً لخلق متعة الاكتشاف." },
        taxonomy: { apparentKey: "directive", implicitKey: "directive" },
        context: { setting: "جلسات التسلية الجماعية.", participants: "مبادر باللغز ومجموعة متلقين." }
    }
];

// 2. Global Navigation (Stable v10.1)
window.switchPane = function(id) {
    const panes = document.querySelectorAll('.pane-container');
    panes.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });

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
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
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
            <h2 style="color:#d4a373; margin-bottom:1.5rem;">${item.expression}</h2>

            <div class="matrix-node" style="margin-bottom:1.5rem;">
                <h4>الدلالة المعجمية</h4>
                <p>${item.meaning}</p>
            </div>

            <div style="background:#5d4037; color:#d4a373; padding:2rem; margin:1.5rem 0; border-radius:15px; text-align:center; font-style:italic;">
                <span style="font-size:1.5rem; display:block; margin-bottom:1rem;">"${item.manuscript}"</span>
                <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:1rem; font-size:0.85rem; color:#bcaaa4; font-style:normal;">
                    <strong><i class="fas fa-microscope"></i> استقصاء ميداني:</strong><br>${item.analysis}
                </div>
            </div>

            <div style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.05); padding:1.2rem; border-radius:10px; margin-bottom:2rem;">
                <h4 style="color:#d4a373; font-size:1rem; margin-bottom:0.5rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Gricean)</h4>
                <p style="font-size:0.9rem;"><strong>القانون المخروق:</strong> ${item.implicature.maxim}</p>
                <p style="font-size:0.9rem; color:#ccc;"><strong>المعنى المستلزم:</strong> ${item.implicature.meaning}</p>
            </div>

            <div class="pragmatic-master-grid" style="display:grid; grid-template-columns:1fr; gap:1.5rem;">
                <div class="pragmatic-section" style="background:rgba(162,210,255,0.03); padding:1.2rem; border-radius:10px; border-right:3px solid #a2d2ff;">
                    <h4 style="color:#a2d2ff;"><i class="fas fa-layer-group"></i> مستويات التلفظ</h4>
                    <p style="font-size:0.85rem;"><strong>اللفظي:</strong> ${item.levels.locution}</p>
                    <p style="font-size:0.85rem;"><strong>الإنجازي:</strong> ${item.levels.illocution}</p>
                    <p style="font-size:0.85rem;"><strong>التأثيري:</strong> ${item.levels.perlocution}</p>
                </div>

                <div class="pragmatic-section" style="background:rgba(255,255,255,0.02); padding:1.2rem; border-radius:10px; border:1px dashed #444;">
                    <h4 style="color:#999;"><i class="fas fa-map-marked-alt"></i> المقام والسياق المحلي</h4>
                    <p style="font-size:0.85rem;"><strong>المناسبة:</strong> ${item.context.setting}</p>
                    <p style="font-size:0.85rem;"><strong>الأطراف:</strong> ${item.context.participants}</p>
                </div>
            </div>
        </article>
    `;
    window.updateNavbarVisibility();
};

// 3. Admin & Sync Logic (Optimized for v10.3)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('speechActForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById("save-btn");

            // تجميع البيانات المتوافقة كلياً مع Supabase بناءً على كودك المقترح
            const formData = {
                id: 'ACT-' + Date.now(),
                expression: document.getElementById('expression').value,
                meaning: document.getElementById('meaning').value || null,
                category: document.getElementById('category').value,
                field_context: document.getElementById('field_context').value || null,
                field_investigation: document.getElementById('field_investigation').value || null,
                locutionary_act: document.getElementById('locutionary_act').value || null,
                illocutionary_act: document.getElementById('illocutionary_act').value || null,
                perlocutionary_act: document.getElementById('perlocutionary_act').value || null,
                illocution_type: document.getElementById('illocution_type').value || null,
                illocutionary_force: document.getElementById('illocutionary_force').value || null,
                direction_of_fit: document.getElementById('direction_of_fit').value || null,
                politeness_strategy: document.getElementById('politeness_strategy').value || null,
                felicity_conditions: document.getElementById('felicity_conditions').value || null,
                notes: document.getElementById('notes').value || null
            };

            if (typeof window.supabase === 'undefined') return alert("خطأ: مكتبة Supabase غير محملة.");
            const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');

            btn.disabled = true; btn.innerText = "جاري الحفظ في السحاب... ⏳";

            try {
                const { error } = await client.from('speech_acts').insert([formData]);
                if (error) throw error;

                alert('تم حفظ الشاهد والتحليل التداولي بنجاح في السحاب! ☁️');
                form.reset();
                window.syncCloud(); // تحديث المتن المحلي فوراً
            } catch (err) {
                console.error("خطأ في الحفظ:", err.message);
                alert('حدث خطأ أثناء الحفظ: ' + err.message);
            } finally {
                btn.disabled = false; btn.innerText = "☁️ حفظ في السحاب (Supabase)";
            }
        });
    }
});

window.syncCloud = async function() {
    if (typeof window.supabase === 'undefined') return;
    const client = window.supabase.createClient('https://savnjahwekgfnvcpofqe.supabase.co', 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b');
    const { data } = await client.from('speech_acts').select('*');
    if (data && data.length > 0) {
        // Merge cloud data with masterRepo if needed
        console.log("Cloud Sync v10.1 Success.");
    }
};


// 4. Global Helpers
window.updateNavbarVisibility = function() {
    const res = document.getElementById("results-nexus");
    const grid = document.getElementById("category-grid");
    const isNexus = res && res.innerHTML !== "";
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
