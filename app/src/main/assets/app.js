/**
 * AMAWAL CLOUD SYNC ENGINE v12.1
 */

// 1. Core State
var masterRepo = []; // سيتم ملؤه من السحاب
var currentCategory = null;

var supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
var supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
var supabaseClient = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Cloud Sync Logic
async function syncCloud() {
    if(!supabaseClient) return;
    try {
        console.log("Fetching from Supabase...");
        var res = await supabaseClient.from('speech_acts').select('*').order('created_at', { ascending: false });
        if(res.error) throw res.error;

        if(res.data) {
            masterRepo = res.data;
            console.log("Loaded " + masterRepo.length + " items from cloud.");

            // تحديث التاريخ
            updateHistory(res.data);

            // إذا كان المستخدم داخل تصنيف معين، نعيد عرض النتائج لتظهر البيانات الجديدة
            if(currentCategory) {
                renderCategoryList(currentCategory);
            }
        }
    } catch(e) {
        console.error("Sync Error:", e.message);
    }
}

// 3. Navigation & UI
function switchPane(id) {
    var panes = document.querySelectorAll('.pane-container');
    for(var i=0; i<panes.length; i++) {
        panes[i].style.display = 'none';
        panes[i].classList.remove('active');
    }
    var target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    if (id === 'pane-lexicon') {
        document.getElementById("category-grid").style.display = "grid";
        document.getElementById("results-nexus").innerHTML = "";
        currentCategory = null;
    }
    updateNavbarVisibility();
}

function setSearchCategory(cat) {
    currentCategory = cat;
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    renderCategoryList(cat);
}

function renderCategoryList(cat) {
    var nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    var results = masterRepo.filter(function(item) { return item.category === cat; });

    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'><i class='fas fa-cloud-download-alt fa-spin'></i> جاري المزامنة مع السحاب...</div>";
        return;
    }

    results.forEach(function(item) {
        var div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem 2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = "<span style='font-weight:bold;'>" + item.expression + "</span><i class='fas fa-chevron-left'></i>";
        div.onclick = function() { renderDetail(item); };
        nexus.appendChild(div);
    });
    updateNavbarVisibility();
}

function renderDetail(item) {
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    var nexus = document.getElementById("results-nexus");

    nexus.innerHTML = '<article class="lexical-artifact ultimate-reveal" style="padding:1.5rem;">' +
        '<h2 style="color:#d4a373; margin-bottom:1rem; border-bottom:1px solid #333; padding-bottom:10px;">' + item.expression + '</h2>' +
        '<div class="matrix-node"><h4>الدلالة المعجمية</h4><p>' + (item.meaning || '---') + '</p></div>' +

        '<div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:15px; text-align:center;">' +
            '<span style="font-size:1.4rem; font-style:italic;">"' + (item.manuscript || item.expression) + '"</span>' +
            '<div style="border-top:1px solid rgba(255,255,255,0.1); margin-top:1rem; padding-top:0.8rem; font-size:0.8rem; color:#bcaaa4; font-style:normal;">' +
                '<strong>استقصاء ميداني:</strong><br>' + (item.field_investigation || 'تحليل أولي للمتن.') +
            '</div>' +
        '</div>' +

        '<div style="border-right:3px solid #d4a373; background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; margin-bottom:1.5rem;">' +
            '<h4 style="color:#d4a373; font-size:0.9rem;"><i class="fas fa-comment-dots"></i> الاستلزام الحواري (Gricean)</h4>' +
            '<p style="font-size:0.85rem;"><strong>القانون:</strong> ' + (item.implicature_maxim || 'الملائمة') + '</p>' +
            '<p style="font-size:0.85rem; color:#ccc;"><strong>المعنى:</strong> ' + (item.implicature_meaning || 'غير محدد') + '</p>' +
        '</div>' +

        '<div style="display:grid; grid-template-columns:1fr; gap:1rem;">' +
            '<div style="background:rgba(162,210,255,0.03); padding:1rem; border-radius:10px; border-right:3px solid #a2d2ff;">' +
                '<h4 style="color:#a2d2ff; font-size:0.9rem;">مستويات التلفظ</h4>' +
                '<p style="font-size:0.8rem;"><strong>الإنجازي:</strong> ' + (item.illocutionary_act || '---') + '</p>' +
            '</div>' +
        '</div>' +
    '</article>';

    updateNavbarVisibility();
}

// 4. Admin & History
async function handleSave() {
    var form = document.getElementById('speechActForm');
    var btn = document.getElementById("save-btn");

    var getVal = function(id) { return document.getElementById(id).value.trim(); };
    var payload = {
        id: 'ACT-' + Date.now(),
        expression: getVal("expression"),
        category: getVal("category"),
        meaning: getVal("meaning"),
        field_investigation: getVal("field_investigation"),
        locutionary_act: getVal("locutionary_act"),
        illocutionary_act: getVal("illocutionary_act"),
        perlocutionary_act: getVal("perlocutionary_act"),
        illocution_type: getVal("illocution_type"),
        illocutionary_force: getVal("illocutionary_force"),
        direction_of_fit: getVal("direction_of_fit"),
        politeness_strategy: getVal("politeness_strategy"),
        felicity_conditions: getVal("felicity_conditions"),
        context: getVal("field_context"),
        notes: getVal("notes")
    };

    if(!payload.expression) return alert("يرجى إدخال الشاهد");
    btn.disabled = true; btn.innerText = "جاري الحفظ...";

    try {
        var res = await supabaseClient.from('speech_acts').insert([payload]);
        if(res.error) throw res.error;
        alert("تم الحفظ بنجاح! ☁️");
        form.reset();
        syncCloud();
    } catch(e) {
        alert("خطأ: " + e.message);
    } finally {
        btn.disabled = false; btn.innerText = "حفظ في السحاب";
    }
}

function updateHistory(data) {
    var container = document.getElementById('speech-acts-list');
    if(!container) return;
    container.innerHTML = "";
    data.forEach(function(act) {
        var d = document.createElement("div");
        d.style.cssText = "padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1); cursor:pointer; background:rgba(0,0,0,0.1); margin-bottom:5px; border-radius:8px;";
        d.innerHTML = "<strong>" + act.expression + "</strong><br><small style='color:#a2d2ff'>" + act.category + "</small>";
        d.onclick = function() { renderDetail(act); };
        container.appendChild(d);
    });
}

// 5. System Utils
function updateNavbarVisibility() {
    var nexus = document.getElementById("results-nexus");
    var isDetail = nexus && nexus.innerHTML !== "";
    var isHome = document.querySelector('.pane-container.active').id === 'pane-lexicon' && !isDetail;
    document.getElementById('back-btn').style.display = isHome ? 'none' : 'flex';
    document.getElementById('menu-btn').style.display = isHome ? 'flex' : 'none';
}

function navigateBack() {
    if (document.getElementById("results-nexus").innerHTML !== "") {
        document.getElementById("results-nexus").innerHTML = "";
        document.getElementById("category-grid").style.display = "grid";
    } else switchPane('pane-lexicon');
    updateNavbarVisibility();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
}

// 6. Startup
document.addEventListener("DOMContentLoaded", function() {
    // نربط الفورم بالدالة الجديدة
    var form = document.getElementById('speechActForm');
    if(form) {
        form.onsubmit = function(e) { e.preventDefault(); handleSave(); };
    }
    syncCloud();
});
