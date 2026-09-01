/**
 * AMAWAL UNIVERSAL ENGINE v12.3 - Exact Schema Sync
 */

var masterRepo = [];
var currentCategory = null;

var supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
var supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
var supabaseClient = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

async function syncCloud() {
    if(!supabaseClient) return;
    try {
        var res = await supabaseClient.from('speech_acts').select('*').order('created_at', { ascending: false });
        if(!res.error && res.data) {
            masterRepo = res.data;
            updateHistory(res.data);
            if(currentCategory) renderCategoryList(currentCategory);
        }
    } catch(e) { console.error("Sync Error"); }
}

function switchPane(id) {
    var panes = document.querySelectorAll('.pane-container');
    for(var i=0; i<panes.length; i++) { panes[i].style.display = 'none'; panes[i].classList.remove('active'); }
    var target = document.getElementById(id);
    if(target) { target.style.display = 'block'; target.classList.add('active'); }
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
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم المزامنة...</div>";
        return;
    }
    results.forEach(function(item) {
        var div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = "<strong>" + item.expression + "</strong><i class='fas fa-chevron-left'></i>";
        div.onclick = function() { renderDetail(item); };
        nexus.appendChild(div);
    });
    updateNavbarVisibility();
}

function renderDetail(item) {
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    var nexus = document.getElementById("results-nexus");

    nexus.innerHTML = '<article class="lexical-artifact ultimate-reveal" style="padding:1.5rem; border-radius:20px;">' +
        '<h2 style="color:var(--gold); border-bottom:1px solid #333; padding-bottom:10px;">' + item.expression + '</h2>' +
        '<p><strong>المعنى:</strong> ' + (item.meaning || '---') + '</p>' +

        '<div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1rem 0; border-radius:15px; border-right:4px solid var(--gold);">' +
            '<strong>التحقيق الميداني:</strong><br>' + (item.field_investigation || 'تحليل أولي.') +
        '</div>' +

        '<div style="background:rgba(255,255,255,0.02); padding:1rem; border-radius:10px; margin-bottom:1rem;">' +
            '<h4 style="color:var(--azure); font-size:0.9rem;">1. مستويات التلفظ</h4>' +
            '<p style="font-size:0.85rem;">• لفظي: ' + (item.locutionary_act || '---') + '<br>• إنجازي: ' + (item.illocutionary_act || '---') + '<br>• تأثيري: ' + (item.perlocutionary_act || '---') + '</p>' +
        '</div>' +

        '<div style="background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; margin-bottom:1rem; border-right:3px solid var(--gold);">' +
            '<h4 style="color:var(--gold); font-size:0.9rem;">2. الاستلزام (Grice)</h4>' +
            '<p style="font-size:0.85rem;">• القانون: ' + (item.grice_maxim || '---') + '<br>• المعنى: ' + (item.implicature || '---') + '</p>' +
        '</div>' +

        '<div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:10px; font-size:0.8rem;">' +
            '<h4 style="color:#888;">3. شروط الملاءمة واللياقة</h4>' +
            '<p>• النوع: ' + (item.illocution_type || '---') + ' | القوة: ' + (item.illocutionary_force || '---') + '</p>' +
            '<p>• الشروط: ' + (item.felicity_conditions || '---') + '</p>' +
            '<p>• التأدب: ' + (item.politeness_strategy || '---') + ' | المطابقة: ' + (item.direction_of_fit || '---') + '</p>' +
        '</div>' +
    '</article>';
    updateNavbarVisibility();
}

async function handleSave() {
    var form = document.getElementById('speechActForm');
    var btn = document.getElementById("save-btn");
    var getVal = function(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : null;
    };

    var payload = {
        id: 'ACT-' + Date.now(),
        expression: getVal("expression"),
        category: getVal("category"),
        meaning: getVal("meaning"),
        field_investigation: getVal("field_investigation"),
        field_context: getVal("field_context"),
        locutionary_act: getVal("locutionary_act"),
        illocutionary_act: getVal("illocutionary_act"),
        perlocutionary_act: getVal("perlocutionary_act"),
        illocution_type: getVal("illocution_type"),
        illocutionary_force: getVal("illocutionary_force"),
        direction_of_fit: getVal("direction_of_fit"),
        politeness_strategy: getVal("politeness_strategy"),
        felicity_conditions: getVal("felicity_conditions"),
        grice_maxim: getVal("grice_maxim"),
        implicature: getVal("implicature"),
        notes: getVal("notes")
    };

    if(!payload.expression) return alert("أدخل الشاهد!");
    btn.disabled = true; btn.innerText = "جاري الحفظ...";

    try {
        var res = await supabaseClient.from('speech_acts').insert([payload]);
        if(res.error) throw res.error;
        alert("تم الحفظ بنجاح! ☁️");
        form.reset();
        syncCloud();
    } catch(e) { alert("خطأ: " + e.message); }
    finally { btn.disabled = false; btn.innerText = "☁️ حفظ في السحاب"; }
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

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('overlay').classList.toggle('active'); }
function toggleTheme() { var cur = document.documentElement.getAttribute('data-theme'); document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark'); }

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById('speechActForm');
    if(form) { form.onsubmit = function(e) { e.preventDefault(); handleSave(); }; }
    syncCloud();
});
