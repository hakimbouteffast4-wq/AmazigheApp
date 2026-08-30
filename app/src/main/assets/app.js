/**
 * AMAWAL ULTIMATE - Cloud Data Engine (v5.4)
 */

// 1. Supabase Connection (CDN Method - DO NOT USE IMPORT)
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
const supabaseKey = 'sb_publishable_BGHkAqnec3QVTRypSu-b1Q_U1HEnR_Xz4e5e1H8_S_U-1_Xy';
const supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

let ultimateRepository = []; // سنقوم بملء هذه المصفوفة من السحاب

// 2. الدالة التي طلبتها: جلب البيانات من Supabase وتحديث التطبيق
async function getSpeechActs() {
    if (!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*');
    if (!error && data) {
        ultimateRepository = data.map(item => ({
            id: item.id, expression: item.expression, meaning: item.meaning, category: item.category,
            translation: item.translation, manuscript: item.manuscript, analysis: item.analysis,
            levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
            implicature: { maxim: item.implicature_maxim, meaning: item.implicature_meaning },
            taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicitKey: item.implicit_key },
            conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
            context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
        }));
    }
}

// الدالة الجديدة التي طلبتها لإضافة متن جديد
window.addSpeechAct = async function(expressionText, implicatureText) {
    if (!supabase) { alert("Supabase غير متصل!"); return; }

    const { data, error } = await supabase
        .from('speech_acts')
        .insert([
            {
                id: 'ACT-' + Date.now(),
                expression: expressionText,
                implicature_meaning: implicatureText,
                category: 'poetry'
            }
        ]);

    if (error) {
        console.error('خطأ في الحفظ:', error);
        alert("فشل الحفظ: " + error.message);
    } else {
        console.log('تم الحفظ بنجاح!', data);
        alert("تم الحفظ بنجاح في السحاب!");
        getSpeechActs();
    }
};

window.handleAddSpeechAct = async function() {
    const exp = document.getElementById("input-expression").value;
    const imp = document.getElementById("input-implicature").value;
    const btn = document.getElementById("save-btn");

    if (!exp || !imp) { alert("يرجى ملء الحقول أولاً"); return; }

    btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> جاري الحفظ...";
    btn.disabled = true;

    await window.addSpeechAct(exp, imp);

    btn.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> حفظ في السحاب";
    btn.disabled = false;
    document.getElementById("input-expression").value = "";
    document.getElementById("input-implicature").value = "";
};

// 3. محرك التنقل والأزرار (مبسط ومؤمن)
window.switchPane = function(id, btn) {
    document.querySelectorAll('.pane-container').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }

    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
    }
    updateNavbarVisibility();
};

window.setSearchCategory = function(cat) {
    window.switchPane('pane-lexicon', null);
    document.getElementById("category-grid").style.display = "none";
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    const results = ultimateRepository.filter(i => i.category === cat);
    if (results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:4rem; opacity:0.6;'><i class='fas fa-cloud-download-alt fa-3x'></i><br>قريباً... يتم مزامنة المادة من السحاب</div>";
    }

    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900;">${item.expression}</span><i class="fas fa-chevron-left"></i>`;
        div.onclick = () => renderDetail(item);
        nexus.appendChild(div);
    });
};

function renderDetail(item) {
    const nexus = document.getElementById("results-nexus");
    nexus.innerHTML = `
        <article class="lexical-artifact ultimate-reveal">
            <h2 style="color:var(--gold); margin-bottom:1.5rem;">${item.expression}</h2>
            <div class="matrix-node" style="margin-bottom:1.5rem;"><h4>الدلالة المعجمية</h4><p>${item.meaning}</p></div>
            <div class="corpus-vault-imperial" style="background:#5d4037; border-radius:15px; padding:1.5rem; margin-bottom:2rem; text-align:center;">
                <span style="color:#d4a373; font-size:1.4rem; font-style:italic;">${item.manuscript}</span>
                <p style="color:#bcaaa4; font-size:0.85rem; border-top:1px solid rgba(255,255,255,0.1); margin-top:1rem; padding-top:1rem;">${item.analysis}</p>
            </div>
            <div class="pragmatic-section" style="border-right:3px solid var(--gold); background:rgba(212,163,115,0.05); padding:1rem; border-radius:15px; margin-bottom:2rem;">
                <h4 style="color:var(--gold); font-size:0.9rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Gricean)</h4>
                <p style="font-size:0.85rem;"><strong>القانون:</strong> ${item.implicature.maxim}<br><strong>المعنى المستلزم:</strong> ${item.implicature.meaning}</p>
            </div>
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section"><h4><i class="fas fa-layer-group"></i> مستويات التلفظ</h4><p style="font-size:0.8rem;">${item.levels.locution}<br>${item.levels.illocution}</p></div>
            </div>
        </article>
    `;
    updateNavbarVisibility();
}

// 4. UI Helpers
function updateNavbarVisibility() {
    const isNexus = document.getElementById("results-nexus").innerHTML !== "";
    const isHome = document.querySelector('.pane-container.active').id === 'pane-lexicon' && !isNexus;
    document.getElementById('back-btn').style.display = isHome ? 'none' : 'flex';
    document.getElementById('menu-btn').style.display = isHome ? 'flex' : 'none';
}

window.navigateBack = function() {
    if (document.getElementById("results-nexus").innerHTML !== "") {
        document.getElementById("results-nexus").innerHTML = "";
        document.getElementById("category-grid").style.display = "grid";
    } else window.switchPane('pane-lexicon', null);
    updateNavbarVisibility();
};

window.toggleSidebar = function() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    s.classList.toggle('active'); o.classList.toggle('active');
};

window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
};

// 5. التشغيل عند البداية
document.addEventListener("DOMContentLoaded", () => {
    window.switchPane('pane-lexicon', null);
    getSpeechActs(); // استدعاء الدالة التي طلبتها فور تشغيل التطبيق
});
