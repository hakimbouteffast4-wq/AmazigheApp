/**
 * AMAWAL ULTIMATE - Fantasy Sovereign Edition
 * Final Master Script - High Performance & Full Theme Support
 */

const searleTaxonomy = [
    { key: "assertive", label: "إخباريات", icon: "fa-info-circle" },
    { key: "directive", label: "توجيهيات", icon: "fa-hand-point-left" },
    { key: "commissive", label: "تعهديات", icon: "fa-file-contract" },
    { key: "expressive", label: "تعبيريات", icon: "fa-heart" },
    { key: "declarative", label: "إعلانات", icon: "fa-bullhorn" }
];

const ultimateRepository = [
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
            directionOfFit: "World-to-Word (تغيير العالم ليطابق الكلمة/الرغبة)"
        },
        context: {
            setting: "تعاملات تجارية أو نزاعات على ملكية موارد مائية/عقارية.",
            participants: "متحدث يثبت حقه تجاه منافس أو مخاطب متردد.",
            prosody: "نبرة حازمة، قاطعة، تخلو من التردد (Assertive Tone)."
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
            directionOfFit: "Word-to-World (مطابقة الكلمة للعالم/الواقع الموصوف)"
        },
        context: {
            setting: "أمسية شعرية أو جلسة سمر تفتقد لروح الثقة القديمة.",
            participants: "شاعر (متضرر) ومخاطب (صديق خائن) بحضور الجماعة.",
            prosody: "نبرة متهكمة (Sarcastic) ممزوجة بمرارة الخذلان."
        }
    },
    {
        id: "TALE-001",
        lemma: "Tamacahutt n Wuccen / حكاية الذئب",
        meaning: "قصة رمزية عن الصراع بين المكر والذكاء في المتخيل الشعبي.",
        translation: "كان هناك ذئب وذئبة وولديهما...",
        manuscript: "illa wmšan d tmšant d lxir d memmi-s...",
        analysis: "تحليل سردي: بنية الحكاية تعتمد على التكرار والنمذجة الأخلاقية للشخصيات.",
        category: "tales",
        levels: {
            locution: "بنية سردية تعتمد على الجمل التقريرية المتسلسلة والتشخيص.",
            illocution: "فعل 'وعظي' وتأطير قيمي يهدف لترسيخ معايير السلوك.",
            perlocution: "ترسيخ الحكمة الجماعية وتنمية ملكة النقد عبر الاستعارة الحيوانية."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: إعلاني/تأطيري (Declarative)",
            force: "التوجيه الأخلاقي",
            apparentKey: "assertive",
            implicitKey: "declarative"
        },
        conditions: {
            felicity: "شرط التمهيد (الاستماع للراوي) والسلطة الثقافية",
            politeness: "التلطيف العرفي عبر الإسقاط على الحيوان",
            directionOfFit: "World-to-Word (محاولة جعل سلوك السامع يطابق القيمة)"
        },
        context: {
            setting: "جلسة ليلية عائلية (Tinfusin) لتربية الأطفال ونقل القيم.",
            participants: "الجدة/الأم (المتكلمة) والأبناء (المستمعون).",
            prosody: "نبرة تعليمية، هادئة، مشوقة وتعتمد على التلوين الصوتي."
        }
    },
    {
        id: "RID-001",
        lemma: "Timseɛraq / الألغاز",
        meaning: "تمرين ذهني يعتمد على الوصف المجازي للأشياء اليومية لاختبار الذكاء.",
        translation: "ما هو الشيء الذي يأكل ولا يشرب؟",
        manuscript: "D acu nni? Icca, ur iswi...",
        analysis: "تداولية اللغز: خلق فجوة معرفية تتطلب استحضار السياق الثقافي لحلها.",
        category: "riddles",
        levels: {
            locution: "صيغة استفهامية أو وصف لغزي يعتمد على التناقض الظاهري.",
            illocution: "فعل 'تحدي معرفي' واختبار للانتماء للرصيد الثقافي المشترك.",
            perlocution: "إثارة الدهشة، تنشيط الذاكرة الجماعية، وتحقيق المتعة الذهنية."
        },
        taxonomy: {
            type: "توجيهي استفهامي (Directive)",
            force: "التحدي والاختبار",
            apparentKey: "directive",
            implicitKey: ""
        },
        conditions: {
            felicity: "شرط المساواة في الموقف التواصلي (اللعب)",
            politeness: "التنافس الودي",
            directionOfFit: "Word-to-World (البحث عن مطابقة الكلمة للعالم الحقيقي)"
        },
        context: {
            setting: "جلسات التسلية الجماعية وتنافس الذكاء بين الشباب.",
            participants: "مبادر باللغز (المتحدي) ومجموعة من المتلقين.",
            prosody: "نبرة محفزة، مرحة، وتحدي ودي."
        }
    },
    {
        id: "PROV-101",
        lemma: "Ur ittili walu, bla walu",
        meaning: "لا يكون شيء من لا شيء. (تقرير حقيقة منطقية: النتيجة لا تقع إلا بوجود سبب).",
        translation: "لا دخان بلا نار / لا شيء يحدث عبثاً.",
        manuscript: "Ur ittili walu, bla walu",
        analysis: "نوع الفعل الظاهر: إخباري تقريري (Assertive). نوع الفعل المضمر (Awal yffrn): توجيهي تحذيري وإفحامي.",
        category: "proverbs",
        levels: {
            locution: "جملة خبرية نفيية تقرر حقيقة سببية وفلسفية كونية.",
            illocution: "فعل 'تنبيه وتحذير' وإلزام بالحجة في مجالس العرف لفرض المسؤولية.",
            perlocution: "إفحام المخاطب، إنهاء الجدال العقيم، ودفعه للاعتراف بالمسببات."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: توجيهي (Directive)",
            force: "الإلزام والحجاج",
            apparentKey: "assertive",
            implicitKey: "directive"
        },
        conditions: {
            felicity: "شرط الإنجاز والمقام الاجتماعي (مجلس Agraw)",
            politeness: "الصرامة العرفية المقبولة اجتماعياً",
            directionOfFit: "Word-to-World (مطابقة الكلام للعالم/الواقع المنطقي)"
        },
        context: {
            setting: "مجالس الصلح (Agraw) أو فض النزاعات القبلية.",
            participants: "كبار القبيلة أو المحكمين في مواجهة أطراف النزاع.",
            prosody: "نبرة صارمة، وقورة، ومقنعة (Authoritative)."
        }
    },
    {
        id: "IZLI-102",
        lemma: "Aḍu n Tayri / ⴰⴹⵓ ⵏ ⵜⴰⵢⵔⵉ",
        meaning: "وصف قوة الحب وغموض مسالكه التي لا تخضع للحساب العقلي.",
        translation: "ريح الحب جدار يحيط بنا، فكيف لنا أن نحسب لها حساباً؟",
        manuscript: "Aḍu n tayri d lḥit i t-id-igran\nmamek ad as-ng nttni lḥsab",
        analysis: "استقصاء ميداني: يبرز البيت عجز الإنسان أمام سطوة العواطف وتحولها إلى قدر محتوم (Awal yffrn).",
        category: "izlan",
        levels: {
            locution: "جملة استعارية تشبه الحب بالريح العاتية وبالجدار المحيط.",
            illocution: "فعل 'اعتراف بالعجز' وبث الشكوى من لوعة الهوى.",
            perlocution: "إثارة التعاطف الوجداني وتقاسم التجربة الإنسانية المرة مع السامع."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: تعبيري (Expressive)",
            force: "الشكوى والبوح الوجداني",
            apparentKey: "assertive",
            implicitKey: "expressive"
        },
        conditions: {
            felicity: "شرط الإخلاص والصدق الوجداني (Sincerity)",
            politeness: "التعبير عن الذات بعيداً عن القيود العرفية الصارمة",
            directionOfFit: "Word-to-World (وصف حال المتكلم الباطنية)"
        },
        context: {
            setting: "أمسيات إنشاد الشعر (Izlan) في المناسبات الاجتماعية.",
            participants: "شاعر (محب) ومستمعون يشاركونه الذوق واللوعة.",
            prosody: "نبرة شجية، حزينة، وتأملية عميقة."
        }
    },
    {
        id: "PROV-102",
        lemma: "Awal n imzwura / ⴰⵡⴰⵍ ⵏ ⵉⵎⵣⵡⵓⵔⴰ",
        meaning: "الحكمة الموروثة وسلطة القول القديم في توجيه الحاضر.",
        translation: "كلام الأولين (الأجداد) ميزان العقل ومرجع الأرض.",
        manuscript: "Awal n imzwura d lqist n tmurt",
        analysis: "الارتقاء المعرفي: الانتقال من مجرد قول عابر إلى مرجعية عرفية وقانونية ملزمة للجماعة.",
        category: "proverbs",
        levels: {
            locution: "جملة خبرية تقريرية تربط القول الحكيم بالأرض والعدل (Lqist).",
            illocution: "فعل 'استدلال' و 'تثبيت' لشرعية الفعل بناءً على العرف التاريخي.",
            perlocution: "فرض الاحترام للقرار المتخذ وإنهاء الجدال بالعودة للأصول الثابتة."
        },
        taxonomy: {
            type: "الظاهر: إخباري (Assertive) | المضمر: إعلاني (Declarative)",
            force: "الإلزام العرفي والشرعية التاريخية",
            apparentKey: "assertive",
            implicitKey: "declarative"
        },
        conditions: {
            felicity: "شرط السلطة (كبير الجماعة) والتمهيد المناسب",
            politeness: "التلطيف عبر الاحتماء بسلطة 'الأسلاف' بدلاً من المواجهة المباشرة",
            directionOfFit: "World-to-Word (إخضاع الواقع للنموذج الموروث)"
        },
        context: {
            setting: "مجالس العرف (Agraw) لاتخاذ قرارات مصيرية أو فض نزاعات.",
            participants: "حكماء القبيلة في مواجهة الشباب أو أطراف الخصومة.",
            prosody: "نبرة وقورة، رصينة، وحازمة جداً."
        }
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

    // Header: Lexical Meaning
    let headerHtml = `
        <div class="matrix-node" style="margin-bottom: 2rem;">
            <h4 style="font-size: 0.85rem; color: var(--azure); letter-spacing: 1px; margin-bottom: 1rem;">
                <i class="fas fa-scroll"></i> الدلالة المعجمية
            </h4>
            <p style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; line-height: 1.4;">${item.meaning}</p>
        </div>
    `;

    // The Stylized Brown Box (Exactly as the screenshot)
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
        // Taxonomy Tags (Searle's)
        let tagsHtml = '<div class="taxonomy-tags-container" style="display:flex; flex-wrap:wrap; gap:0.6rem; margin: 1.2rem 0;">';
        searleTaxonomy.forEach(cat => {
            let activeClass = '';
            let checkIcon = '';
            if (cat.key === item.taxonomy.apparentKey) {
                activeClass = 'active-apparent';
                checkIcon = '<i class="fas fa-check-circle"></i>';
            } else if (cat.key === item.taxonomy.implicitKey) {
                activeClass = 'active-implicit';
                checkIcon = '<i class="fas fa-check-double"></i>';
            }
            tagsHtml += `<span class="taxonomy-tag ${activeClass}" style="font-size:0.8rem;">${checkIcon} ${cat.label}</span>`;
        });
        tagsHtml += '</div>';

        pragmaticContent = `
            <div class="pragmatic-master-grid">
                <!-- Section 1 -->
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
                        <i class="fas fa-layer-group"></i> 1. مستويات التلفظ والخطاب
                    </h4>
                    <ul style="list-style:none; padding-right: 0;">
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل اللفظي:</strong> <span style="color:var(--text-muted);">${item.levels.locution}</span></li>
                        <li style="margin-bottom:1rem;"><strong style="color:var(--gold); margin-left:8px;">الفعل الإنجازي:</strong> <span style="color:var(--text-muted);">${item.levels.illocution}</span></li>
                        <li><strong style="color:var(--gold); margin-left:8px;">الفعل التأثيري:</strong> <span style="color:var(--text-muted);">${item.levels.perlocution}</span></li>
                    </ul>
                </div>

                <!-- Section 2 -->
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
                        <i class="fas fa-bullseye"></i> 2. المقاصد والتصنيف الإنجازي
                    </h4>
                    ${tagsHtml}
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem; line-height: 1.6;">
                        <strong>النوع:</strong> <span style="color:var(--text-main);">${item.taxonomy.type}</span> <br>
                        <strong>القوة الإنجازية:</strong> <span style="color:var(--text-main);">${item.taxonomy.force}</span>
                    </p>
                </div>

                <!-- Section 3 -->
                <div class="pragmatic-section" style="margin-bottom: 2.5rem;">
                    <h4 style="color: var(--azure); font-weight: 900; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
                        <i class="fas fa-check-double"></i> 3. المحدِّدات والشروط التداولية
                    </h4>
                    <ul style="list-style:none; padding-right: 0; font-size: 0.95rem;">
                        <li style="margin-bottom:0.8rem;"><strong style="color:var(--gold); margin-left:8px;">شروط النجاح:</strong> ${item.conditions.felicity}</li>
                        <li style="margin-bottom:0.8rem;"><strong style="color:var(--gold); margin-left:8px;">استراتيجية التأدب:</strong> ${item.conditions.politeness}</li>
                        <li><strong style="color:var(--gold); margin-left:8px;">اتجاه المطابقة:</strong> <span dir="ltr">${item.conditions.directionOfFit}</span></li>
                    </ul>
                </div>

                <!-- Section 4 -->
                <div class="pragmatic-section ethnopragmatic-vault" style="background: rgba(162, 210, 255, 0.04); padding: 1.5rem; border-radius: 25px; border: 1px dashed var(--azure);">
                    <h4 style="color: var(--azure); font-weight: 950; margin-bottom: 1rem;">
                        <i class="fas fa-map-marked-alt"></i> 4. المقام والسياق الثقافي المحلي
                    </h4>
                    <ul style="list-style:none; padding-right: 0; font-size: 0.95rem;">
                        <li style="margin-bottom:0.8rem;"><strong style="color:var(--azure); margin-left:8px;">المناسبة:</strong> ${item.context.setting}</li>
                        <li style="margin-bottom:0.7rem;"><strong style="color:var(--azure); margin-left:8px;">الأطراف:</strong> ${item.context.participants}</li>
                        <li><strong style="color:var(--azure); margin-left:8px;">التنغيم:</strong> ${item.context.prosody}</li>
                    </ul>
                </div>
            </div>
        `;
    }

    article.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h2 style="color:var(--gold); font-weight:950; font-size:1.8rem; margin:0;">${item.lemma}</h2>
            <span style="font-size:0.7rem; color:var(--text-muted); opacity:0.6;">${item.id}</span>
        </div>
        ${headerHtml}
        ${manuscriptBoxHtml}
        ${pragmaticContent}
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
