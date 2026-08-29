/**
 * AMAWAL ULTIMATE - Supabase Cloud Edition (v1.4)
 */

// 1. Configuration
const supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co'; // تم استخراجه من صورتك
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // يرجى وضع المفتاح الخاص بك هنا
const supabase = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

let ultimateRepository = [
    {
        id: "ULT-101",
        lemma: "Iswa / ⵉⵙⵡⴰ",
        meaning: "الاستيعاب الفيزيولوجي للمواد السائلة والعضوية.",
        translation: "شربه / استولى عليه",
        manuscript: "turud unna wr irri lḥma iddud iswit",
        analysis: "الارتقاء المعرفي: تحول من الاستهلاك العضوي إلى الهيمنة التداولية المطلقة.",
        category: "idioms",
        levels: {
            locution: "فعل تام يعبر عن الارتواء والاستهلاك المادي.",
            illocution: "فعل 'استحواذ رمزي' يعبر عن التمكن والمصادرة والسيطرة على الموقف.",
            perlocution: "إثبات الهيمنة وتأطير سلطة المتحدث وإخضاع السياق لتقديره."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: تعبيري (Expressive)",
            force: "الاستحواذ والمصادرة",
            apparentKey: "assertive",
            implicitKey: "expressive"
        },
        conditions: {
            felicity: "شرط السلطة والتمكن من الموارد",
            politeness: "تجاوز التلطيف لفرض واقع جديد",
            directionOfFit: "World-to-Word"
        },
        context: {
            setting: "تعاملات تجارية أو نزاعات على ملكية موارد مائية/عقارية.",
            participants: "متحدث يثبت حقه تجاه منافس أو مخاطب متردد.",
            prosody: "نبرة حازمة، قاطعة، تخلو من التردد."
        }
    },
    {
        id: "IZLI-101",
        lemma: "Izli n Usmun / إيزلي الرفيق",
        meaning: "تشبيه الرفيق بالكأس الذي يوضع ليبرد، فيأتي من يشربه دون استئذان.",
        translation: "أعددت الصديق ككأس بارد، فجاء من ارتشفه (غدر به).",
        manuscript: "iyya usmun amm lkass nsirs t ad iṣmḍ\nturud unna wr irri lḥma iddud iswit",
        analysis: "استقصاء ميداني: يظهر البيت قوة الفعل 'iswit' (شربه) كفعل استحواذ اجتماعي مفاجئ.",
        category: "izlan",
        levels: {
            locution: "استعارة مادية ملموسة تربط بين الرفيق والمتاع (الكأس).",
            illocution: "فعل 'عتاب غير مباشر' وإسقاط خيبة الأمل في الأمانة.",
            perlocution: "إشعار الآخر بفداحة فعله (الغدر) دون تصريح مباشر يكسر قواعد التأدب."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: توجيهي غير مباشر (Indirect Directive)",
            force: "العتاب واللوم الضمني",
            apparentKey: "assertive",
            implicitKey: "directive"
        },
        conditions: {
            felicity: "شرط الإخلاص والنية المبيتة",
            politeness: "حفظ ماء الوجه (Face-saving) عبر الرمزية",
            directionOfFit: "Word-to-World"
        },
        context: {
            setting: "أمسية شعرية أو جلسة سمر تفتقد لروح الثقة القديمة.",
            participants: "شاعر (متضرر) ومخاطب (صديق خائن).",
            prosody: "نبرة متهكمة ممزوجة بمرارة الخذلان."
        }
    }
];

async function fetchRemoteData() {
    if (!supabase) return;
    const { data, error } = await supabase.from('speech_acts').select('*');
    if (!error && data.length > 0) {
        ultimateRepository = data.map(item => ({
            id: item.id, lemma: item.lemma, meaning: item.meaning, translation: item.translation,
            manuscript: item.manuscript, analysis: item.analysis, category: item.category,
            levels: { locution: item.locution, illocution: item.illocution, perlocution: item.perlocution },
            taxonomy: { type: item.taxonomy_type, force: item.taxonomy_force, apparentKey: item.apparent_key, implicitKey: item.implicit_key },
            conditions: { felicity: item.felicity, politeness: item.politeness, directionOfFit: item.direction_of_fit },
            context: { setting: item.context_setting, participants: item.context_participants, prosody: item.context_prosody }
        }));
    }
}

// 2. Core UI Functions
function executeRenderSingleDetail(item, pushState = true) {
    const hub = document.getElementById("results-nexus");
    if(!hub) return;
    hub.innerHTML = "";

    const article = document.createElement("article");
    article.className = "lexical-artifact ultimate-reveal";

    let headerHtml = `
        <div class="matrix-node" style="margin-bottom: 2rem;">
            <h4 style="font-size: 0.85rem; color: var(--azure); letter-spacing: 1px; margin-bottom: 1rem;">
                <i class="fas fa-scroll"></i> الدلالة المعجمية
            </h4>
            <p style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; line-height: 1.4;">${item.meaning}</p>
        </div>
    `;

    let manuscriptBoxHtml = `
        <div class="corpus-vault-imperial" style="background: #5d4037; border-radius: 20px; padding: 2.5rem 1.5rem; margin-bottom: 2.5rem; border-right: none; position: relative; overflow: hidden;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <span class="manuscript-prime" style="color: #d4a373; font-size: 1.6rem; font-style: italic; line-height: 1.8; white-space: pre-line;">${item.manuscript}</span>
            </div>
            <div style="border-top: 1px solid rgba(212, 163, 115, 0.2); padding-top: 1.5rem; margin-top: 1.5rem;">
                <h4 style="color: #d4a373; font-size: 0.9rem; margin-bottom: 0.8rem;">
                    <i class="fas fa-microscope" style="transform: scaleX(-1);"></i> استقصاء ميداني:
                </h4>
                <p style="color: #bcaaa4; font-size: 0.95rem; line-height: 1.6; font-weight: 500;">${item.analysis}</p>
            </div>
        </div>
    `;

    let pragmaticContent = '';
    if (item.levels) {
        let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin: 1.2rem 0;">';
        searleTaxonomy.forEach(cat => {
            let activeClass = (cat.key === item.taxonomy.apparentKey) ? 'active-apparent' : (cat.key === item.taxonomy.implicitKey ? 'active-implicit' : '');
            let checkIcon = (cat.key === item.taxonomy.apparentKey) ? '<i class="fas fa-check-circle"></i>' : (cat.key === item.taxonomy.implicitKey ? '<i class="fas fa-check-double"></i>' : '');
            tagsHtml += `<span class="taxonomy-tag ${activeClass}" style="font-size:0.8rem;">${checkIcon} <i class="fas ${cat.icon}"></i> ${cat.label}</span>`;
        });
        tagsHtml += '</div>';

        pragmaticContent = `
            <div class="pragmatic-master-grid">
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-layer-group"></i> 1. مستويات التلفظ والخطاب</h4>
                    <ul style="list-style:none; padding-right: 0;">
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل اللفظي:</strong> <span style="color:var(--text-muted);">${item.levels.locution}</span></li>
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل الإنجازي:</strong> <span style="color:var(--text-muted);">${item.levels.illocution}</span></li>
                        <li><strong style="color:var(--gold); margin-left:8px;">الفعل التأثيري:</strong> <span style="color:var(--text-muted);">${item.levels.perlocution}</span></li>
                    </ul>
                </div>
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-bullseye"></i> 2. المقاصد والتصنيف الإنجازي</h4>
                    ${tagsHtml}
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem;"><strong>النوع:</strong> ${item.taxonomy.type} <br> <strong>القوة الإنجازية:</strong> ${item.taxonomy.force}</p>
                </div>
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;"><i class="fas fa-check-double"></i> 3. المحدِّدات والشروط التداولية</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>شروط النجاح:</strong> ${item.conditions.felicity} <br> <strong>التأدب:</strong> ${item.conditions.politeness} <br> <strong>المطابقة:</strong> <span dir="ltr">${item.conditions.directionOfFit}</span></p>
                </div>
                <div class="pragmatic-section ethnopragmatic-vault" style="background: rgba(162, 210, 255, 0.04); padding: 1.5rem; border-radius: 25px; border: 1px dashed var(--azure);">
                    <h4 style="color: var(--azure); font-weight: 950; margin-bottom: 1rem;"><i class="fas fa-map-marked-alt"></i> 4. المقام والسياق الثقافي</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>المناسبة:</strong> ${item.context.setting} <br> <strong>الأطراف:</strong> ${item.context.participants} <br> <strong>التنغيم:</strong> ${item.context.prosody}</p>
                </div>
            </div>
        `;
    }

    article.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;"><h2 style="color:var(--gold); font-weight:950; font-size:1.8rem; margin:0;">${item.lemma}</h2><span style="font-size:0.7rem; color:var(--text-muted); opacity:0.6;">${item.id}</span></div>${headerHtml}${manuscriptBoxHtml}${pragmaticContent}`;
    hub.appendChild(article);
    if (pushState) history.pushState({page: 'detail', id: item.id}, '', '#detail-' + item.id);
    updateNavbarVisibility();
}

function executeSwitchPane(id, btn, pushState = true) {
    const target = document.getElementById(id);
    if(!target) return;
    document.querySelectorAll('.pane-container').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    target.classList.add('active'); target.style.display = 'block';
    if (id === 'pane-lexicon') {
        const g = document.getElementById("category-grid"); if(g) g.style.display = "grid";
        const r = document.getElementById("results-nexus"); if(r) r.innerHTML = "";
    }
    document.querySelectorAll('.sidebar-nav a, .nav-item').forEach(a => a.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pushState) history.pushState({page: id}, '', '#' + id);
    updateNavbarVisibility();
}

function updateNavbarVisibility() {
    const b = document.getElementById('back-btn'), m = document.getElementById('menu-btn'), g = document.getElementById('category-grid');
    const isHome = (location.hash === '#home' || location.hash === '' || location.hash === '#pane-lexicon') && g && g.style.display !== 'none';
    if (b) b.style.display = isHome ? 'none' : 'flex';
    if (m) m.style.display = isHome ? 'flex' : 'none';
}

function navigateBack() { window.history.back(); }
function switchPane(id, btn) { executeSwitchPane(id, btn, true); }
function setSearchCategory(cat) { executeSetSearchCategory(cat, true); }

function executeSetSearchCategory(cat, pushState = true) {
    executeSwitchPane('pane-lexicon', null, false);
    const g = document.getElementById("category-grid"), h = document.getElementById("results-nexus");
    if(g) g.style.display = "none"; if(h) h.innerHTML = "";
    ultimateRepository.filter(i => i.category === cat).forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid var(--azure); cursor:pointer;";
        div.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${item.lemma}</span><i class="fas fa-chevron-left" style="color:var(--azure);"></i>`;
        div.onclick = () => executeRenderSingleDetail(item, true);
        h.appendChild(div);
    });
    if (pushState) history.pushState({page: 'list', cat: cat}, '', '#list-' + cat);
    updateNavbarVisibility();
}

window.onpopstate = function(event) {
    const s = event.state;
    if (s && s.page) {
        if (s.page === 'list') executeSetSearchCategory(s.cat, false);
        else if (s.page === 'detail') { const i = ultimateRepository.find(x => x.id === s.id); if(i) executeRenderSingleDetail(i, false); }
        else executeSwitchPane(s.page, null, false);
    } else executeSwitchPane('pane-lexicon', null, false);
    updateNavbarVisibility();
};

document.addEventListener("DOMContentLoaded", () => {
    fetchRemoteData();
    const savedTheme = localStorage.getItem('amawar-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        let touchStartX = 0;
        document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
        document.addEventListener('touchend', e => {
            const swipe = e.changedTouches[0].screenX - touchStartX;
            if (swipe < -80 && touchStartX > (window.innerWidth - 60)) toggleSidebar();
            if (swipe > 80 && sidebar.classList.contains('active')) toggleSidebar();
        }, {passive: true});
    }
    history.replaceState({page: 'pane-lexicon'}, '', '#home');
    updateNavbarVisibility();
});

function toggleTheme() {
    const c = document.documentElement.getAttribute('data-theme'), t = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t); localStorage.setItem('amawar-theme', t);
}

function toggleSidebar() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(!s || !o) return; s.classList.toggle('active'); o.classList.toggle('active');
}

function toggleSidebarSubnav() {
    const s = document.getElementById('sidebar-subnav'); if(s) s.style.display = s.style.display === "block" ? "none" : "block";
}
