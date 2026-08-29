/**
 * AMAWAL ULTIMATE - Fantasy Sovereign Edition
 * Final Master Script - High Performance & Full Theme Support
 */

const ultimateRepository = [
    {
        id: "ULT-101",
        lemma: "Iswa / ⵉⵙⵡⴰ",
        meaning: "الاستيعاب الفيزيولوجي للمواد السائلة والعضوية.",
        logic: "تحليل تداولي:\n1. الفعل اللغوي: فعل تام يعبر عن الارتواء.\n2. القوة الإنجازية: فعل 'استحواذ رمزي' يعبر عن التمكن والمصادرة.\n3. الأثر التأثيري: إثبات الهيمنة وتأطير سلطة المتحدث.",
        manuscript: "turud unna wr irri lḥma iddud iswit",
        analysis: "الارتقاء المعرفي: تحول من الاستهلاك العضوي إلى الهيمنة التداولية المطلقة.",
        category: "idioms"
    },
    {
        id: "IZLI-101",
        lemma: "Izli n Usmun / إيزلي الرفيق",
        meaning: "تشبيه الرفيق بالكأس الذي يوضع ليبرد، فيأتي من يشربه دون استئذان.",
        logic: "تحليل المستويات:\n1. الفعل اللغوي: استعارة مادية ملموسة.\n2. القوة الإنجازية: فعل 'عتاب غير مباشر' وإسقاط خيبة الأمل.\n3. الأثر التأثيري: إشعار الآخر بفداحة فعله دون تصريح مباشر.",
        manuscript: "iyya usmun amm lkass nsirs t ad iṣmḍ\nturud unna wr irri lḥma iddud iswit",
        analysis: "استقصاء ميداني: يظهر البيت قوة الفعل 'iswit' (شربه) كفعل استحواذ اجتماعي مفاجئ.",
        category: "izlan"
    },
    {
        id: "TALE-001",
        lemma: "Tamacahutt n Wuccen / حكاية الذئب",
        meaning: "قصة رمزية عن الصراع بين المكر والذكاء في المتخيل الشعبي.",
        logic: "البنية التداولية:\n1. الفعل السردي: جمل تقريرية متسلسلة.\n2. القوة الإنجازية: فعل 'وعظي' وتأطير للقيم القبلية.\n3. الأثر التأثيري: ترسيخ الحكمة الجماعية عبر الاستعارة الحيوانية.",
        manuscript: "illa wmšan d tmšant d lxir d memmi-s...",
        analysis: "تحليل سردي: بنية الحكاية تعتمد على التكرار والنمذجة الأخلاقية للشخصيات.",
        category: "tales"
    },
    {
        id: "RID-001",
        lemma: "Timseɛraq / الألغاز",
        meaning: "تمرين ذهني يعتمد على الوصف المجازي للأشياء اليومية لاختبار الذكاء.",
        logic: "ميكانزمات الفعل الكلامي:\n1. الفعل اللغوي: سؤال استفهامي أو وصف مبهج.\n2. القوة الإنجازية: فعل 'تحدي معرفي' واختبار للانتماء الثقافي.\n3. الأثر التأثيري: إثارة الدهشة وتنشيط الذاكرة الجماعية.",
        manuscript: "D acu nni? Icca, ur iswi...",
        analysis: "تداولية اللغز: خلق فجوة معرفية تتطلب استحضار السياق الثقافي لحلها.",
        category: "riddles"
    },
    {
        id: "PROV-101",
        lemma: "Ur ittili walu, bla walu",
        meaning: "لا يكون شيء من لا شيء. (تقرير حقيقة منطقية: النتيجة لا تقع إلا بوجود سبب).",
        logic: "تحليل نظرية أفعال الكلام (Austin & Searle):\n1. الفعل اللغوي (Locutionary): جملة خبرية نفيية تقرر حقيقة سببية وفلسفية.\n2. القوة الإنجازية (Illocutionary): فعل 'تنبيه وتحذير' (Warning) وإلزام بالحجة في مجالس الصلح (Agraw) لفرض الاعتراف بالمسؤولية.\n3. الأثر التأثيري (Perlocutionary): إفحام المخاطب، إنهاء الجدال العقيم، ودفعه للاعتراف بالمسببات الحقيقية للنزاع.",
        manuscript: "Ur ittili walu, bla walu",
        analysis: "نوع الفعل الظاهر: إخباري تقريري (Assertive). نوع الفعل المضمر (Awal yffrn): توجيهي تحذيري وإفحامي.",
        category: "proverbs"
    }
];

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('amawar-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance < -80 && touchStartX > (window.innerWidth - 60)) { if (!sidebar.classList.contains('active')) toggleSidebar(); }
            if (swipeDistance > 80 && sidebar.classList.contains('active')) toggleSidebar();
        }, {passive: true});
    }

    history.replaceState({page: 'pane-lexicon'}, '', '#home');
    updateNavbarVisibility();
});

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('amawar-theme', target);
    updateThemeIcon(target);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function updateNavbarVisibility() {
    const backBtn = document.getElementById('back-btn');
    const menuBtn = document.getElementById('menu-btn');
    const grid = document.getElementById('category-grid');
    const isHomeMain = (location.hash === '#home' || location.hash === '' || location.hash === '#pane-lexicon') &&
                       grid && grid.style.display !== 'none';
    if (backBtn) backBtn.style.display = isHomeMain ? 'none' : 'flex';
    if (menuBtn) menuBtn.style.display = isHomeMain ? 'flex' : 'none';
}

function navigateBack() { window.history.back(); }

window.onpopstate = function(event) {
    const state = event.state;
    if (state && state.page) {
        if (state.page === 'list') executeSetSearchCategory(state.cat, false);
        else if (state.page === 'detail') {
            const item = ultimateRepository.find(i => i.id === state.id);
            if(item) executeRenderSingleDetail(item, false);
        } else executeSwitchPane(state.page, null, false);
    } else executeSwitchPane('pane-lexicon', null, false);
    updateNavbarVisibility();
};

function executeSetSearchCategory(cat, pushState = true) {
    executeSwitchPane('pane-lexicon', null, false);
    const grid = document.getElementById("category-grid");
    const hub = document.getElementById("results-nexus");
    if(grid) grid.style.display = "none";
    if(hub) hub.innerHTML = "";

    ultimateRepository.filter(i => i.category === cat).forEach(item => {
        const div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.marginBottom = "1rem";
        div.style.padding = "1.2rem 2rem"; /* Thinner bar height */
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.borderRight = "4px solid var(--azure)";
        div.innerHTML = `<span style="font-weight:900; font-size:1.1rem; color:var(--text-main);">${item.lemma}</span><i class="fas fa-chevron-left" style="color:var(--azure);"></i>`;
        div.onclick = () => executeRenderSingleDetail(item, true);
        hub.appendChild(div);
    });

    if (pushState) history.pushState({page: 'list', cat: cat}, '', '#list-' + cat);
    updateNavbarVisibility();
}

function setSearchCategory(cat) { executeSetSearchCategory(cat, true); }

function executeRenderSingleDetail(item, pushState = true) {
    const hub = document.getElementById("results-nexus");
    if(!hub) return;
    hub.innerHTML = "";

    const article = document.createElement("article");
    article.className = "lexical-artifact ultimate-reveal";
    article.innerHTML = `
        <div class="matrix-node" style="margin-bottom:2.5rem;">
            <h4><i class="fas fa-scroll"></i> الدلالة المعجمية</h4>
            <p style="font-size:1.4rem; color:var(--text-main);">${item.meaning}</p>
        </div>
        <div class="corpus-vault-imperial">
            <span class="manuscript-prime" style="white-space: pre-line; color:var(--gold);">${item.manuscript}</span>
            <p style="color:var(--text-muted); font-weight:700; margin-top:2rem;"><i class="fas fa-microscope"></i> ${item.analysis}</p>
        </div>
        <div style="padding-top:2rem; border-top:1px solid var(--border); margin-top:2rem;">
            <h4><i class="fas fa-brain"></i> السياق التداولي</h4>
            <p style="color:var(--text-muted); white-space: pre-line; font-size:1.1rem;">${item.logic}</p>
        </div>
    `;
    hub.appendChild(article);
    if (pushState) history.pushState({page: 'detail', id: item.id}, '', '#detail-' + item.id);
    updateNavbarVisibility();
}

function executeSwitchPane(id, btn, pushState = true) {
    const target = document.getElementById(id);
    if(!target) return;

    document.querySelectorAll('.pane-container').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none'; // Backup for older versions
    });

    target.classList.add('active');
    target.style.display = 'block';

    if (id === 'pane-lexicon') {
        const grid = document.getElementById("category-grid");
        if(grid) grid.style.display = "grid";
        const res = document.getElementById("results-nexus");
        if(res) res.innerHTML = "";
    }

    document.querySelectorAll('.sidebar-nav a, .nav-item').forEach(a => a.classList.remove('active'));
    if (btn) btn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pushState) history.pushState({page: id}, '', '#' + id);
    updateNavbarVisibility();
}

function switchPane(id, btn) { executeSwitchPane(id, btn, true); }

function toggleSidebar() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(!s || !o) return;
    s.classList.toggle('active'); o.classList.toggle('active');
    document.body.style.overflow = s.classList.contains('active') ? 'hidden' : 'auto';
}

function toggleSidebarSubnav() {
    const sub = document.getElementById('sidebar-subnav');
    if(sub) sub.style.display = sub.style.display === "block" ? "none" : "block";
}
