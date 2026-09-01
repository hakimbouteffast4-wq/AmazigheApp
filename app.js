/**
 * AMAWAL ACADEMIC ENGINE v12.2 - Full Corpus Support
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
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'><i class='fas fa-sync fa-spin'></i> جاري جلب المادة...</div>";
        return;
    }
    results.forEach(function(item) {
        var div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
        div.innerHTML = "<span style='font-weight:900; font-size:0.95rem;'>" + item.expression + "</span><i class='fas fa-chevron-left'></i>";
        div.onclick = function() { renderDetail(item); };
        nexus.appendChild(div);
    });
    updateNavbarVisibility();
}

function renderDetail(item) {
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    var nexus = document.getElementById("results-nexus");

    nexus.innerHTML = '<article class="lexical-artifact ultimate-reveal" style="padding:1.5rem; border-radius:30px;">' +
        '<h2 style="color:var(--gold); font-size:1.4rem; margin-bottom:1rem; line-height:1.4;">' + item.expression + '</h2>' +

        '<div class="matrix-node" style="margin-bottom:1.5rem;">' +
            '<h4 style="color:var(--azure); font-size:0.8rem; letter-spacing:1px; margin-bottom:0.5rem;">الدلالة التداولية</h4>' +
            '<p style="font-size:1rem; color:white; font-weight:500;">' + (item.meaning || '---') + '</p>' +
        '</div>' +

        '<div class="corpus-vault-imperial" style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:15px; border-right:4px solid var(--gold);">' +
            '<h4 style="font-size:0.8rem; margin-bottom:0.5rem;"><i class="fas fa-microscope"></i> التحقيق الميداني:</h4>' +
            '<p style="font-size:0.9rem; color:#bcaaa4; line-height:1.6;">' + (item.field_investigation || 'تحليل أولي للمتن.') + '</p>' +
        '</div>' +

        '<section class="pragmatic-section" style="margin-bottom:2rem;">' +
            '<h4 style="color:var(--azure); border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:1rem;"><i class="fas fa-layer-group"></i> 1. مستويات التلفظ</h4>' +
            '<ul style="list-style:none; padding:0; font-size:0.9rem; color:#ccc;">' +
                '<li><strong style="color:var(--gold);">اللفظي:</strong> ' + (item.locutionary_act || '---') + '</li>' +
                '<li style="margin:8px 0;"><strong style="color:var(--gold);">الإنجازي:</strong> ' + (item.illocutionary_act || '---') + '</li>' +
                '<li><strong style="color:var(--gold);">التأثيري:</strong> ' + (item.perlocutionary_act || '---') + '</li>' +
            '</ul>' +
        '</section>' +

        '<section class="pragmatic-section" style="margin-bottom:2rem; background:rgba(255,255,255,0.02); padding:1rem; border-radius:12px;">' +
            '<h4 style="color:var(--azure); margin-bottom:0.8rem;"><i class="fas fa-bullseye"></i> 2. المقاصد والشروط</h4>' +
            '<p style="font-size:0.85rem;"><strong>النوع:</strong> ' + (item.illocution_type || '---') + ' | <strong>القوة:</strong> ' + (item.illocutionary_force || '---') + '</p>' +
            '<p style="font-size:0.85rem; margin-top:8px;"><strong>شروط النجاح:</strong> ' + (item.felicity_conditions || '---') + '</p>' +
            '<p style="font-size:0.85rem; margin-top:8px;"><strong>التأدب:</strong> ' + (item.politeness_strategy || '---') + '</p>' +
            '<p style="font-size:0.85rem; margin-top:8px;"><strong>المطابقة:</strong> <span dir="ltr">' + (item.direction_of_fit || '---') + '</span></p>' +
        '</section>' +

        '<section class="pragmatic-section">' +
            '<h4 style="color:#777; font-size:0.85rem;"><i class="fas fa-map-marker-alt"></i> 3. السياق والملاحظات</h4>' +
            '<p style="font-size:0.8rem; color:#999;">' + (item.field_context || '---') + '</p>' +
            '<p style="font-size:0.8rem; color:#999; margin-top:5px;">' + (item.notes || '') + '</p>' +
        '</section>' +
    '</article>';

    updateNavbarVisibility();
}

async function handleSave() {
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
        field_context: getVal("field_context"),
        notes: getVal("notes")
    };
    if(!payload.expression) return alert("أدخل الشاهد!");
    btn.disabled = true; btn.innerText = "جاري الحفظ...";
    try {
        var res = await supabaseClient.from('speech_acts').insert([payload]);
        if(res.error) throw res.error;
        alert("تم الحفظ بنجاح! ☁️");
        document.getElementById('speechActForm').reset();
        syncCloud();
    } catch(e) { alert("خطأ: " + e.message); }
    finally { btn.disabled = false; btn.innerText = "☁️ حفظ في السحاب (Supabase)"; }
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
