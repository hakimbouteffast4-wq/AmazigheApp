/**
 * AMAWAL STABLE ENGINE v12.0
 */

// 1. Local Data
var masterRepo = [
    { id: "1", expression: "Awal n imzwura d lqist n tmurt", category: "proverbs", meaning: "سلطة الموروث.", manuscript: "Awal n imzwura", implicature_meaning: "العدالة الجماعية." },
    { id: "2", expression: "Tayri d lḥit i t-id-igran", category: "izlan", meaning: "ريح الحب.", manuscript: "Tayri d lḥit", implicature_meaning: "القدر المحتوم." }
];

var supabaseUrl = 'https://savnjahwekgfnvcpofqe.supabase.co';
var supabaseKey = 'sb_publishable_BGHkAqnecJQVTRyp5u-biQ_UlHEn00b';
var supabaseClient = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// 2. Navigation Functions
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
    }
    updateNavbarVisibility();
}

function setSearchCategory(cat) {
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    var nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";

    var results = masterRepo.filter(function(item) { return item.category === cat; });

    if(results.length === 0) {
        nexus.innerHTML = "<div style='text-align:center; padding:3rem; opacity:0.5;'>يتم جلب البيانات...</div>";
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
    nexus.innerHTML = '<article class="lexical-artifact ultimate-reveal">' +
        '<h2 style="color:#d4a373;">' + item.expression + '</h2>' +
        '<p><strong>المعنى:</strong> ' + (item.meaning || '---') + '</p>' +
        '<div style="background:#5d4037; color:#d4a373; padding:1rem; margin:1rem 0; border-radius:10px; text-align:center;">' + (item.manuscript || item.expression) + '</div>' +
        '<p><strong>الاستلزام:</strong> ' + (item.implicature_meaning || '---') + '</p>' +
        '</article>';
    updateNavbarVisibility();
}

// 3. Admin & Sync
async function handleSave() {
    var exp = document.getElementById("expression").value.trim();
    var imp = document.getElementById("meaning").value.trim();
    var cat = document.getElementById("categorySelect").value;
    var btn = document.getElementById("save-btn");

    if(!exp) return alert("يرجى إدخال الشاهد");
    if(!supabaseClient) return alert("خطأ في الاتصال");

    btn.disabled = true; btn.innerText = "جاري الحفظ...";

    try {
        var payload = { id: 'ACT-' + Date.now(), expression: exp, implicature_meaning: imp, category: cat };
        var res = await supabaseClient.from('speech_acts').insert([payload]);
        if(res.error) throw res.error;
        alert("تم الحفظ!");
        location.reload();
    } catch(e) {
        alert("خطأ: " + e.message);
    } finally {
        btn.disabled = false; btn.innerText = "حفظ في السحاب";
    }
}

async function syncCloud() {
    if(!supabaseClient) return;
    try {
        var res = await supabaseClient.from('speech_acts').select('*');
        if(!res.error && res.data) {
            masterRepo = res.data;
            updateHistory(res.data);
        }
    } catch(e) {}
}

function updateHistory(data) {
    var container = document.getElementById('speech-acts-list');
    if(!container) return;
    container.innerHTML = "";
    data.forEach(function(act) {
        var d = document.createElement("div");
        d.style.cssText = "padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1); cursor:pointer;";
        d.innerHTML = "<strong>" + act.expression + "</strong><br><small>" + act.category + "</small>";
        d.onclick = function() { renderDetail(act); };
        container.appendChild(d);
    });
}

// 4. Utils
function updateNavbarVisibility() {
    var nexus = document.getElementById("results-nexus");
    var grid = document.getElementById("category-grid");
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

document.addEventListener("DOMContentLoaded", function() {
    syncCloud();
});
