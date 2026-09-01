/**
 * AMAWAL UNIVERSAL ENGINE v12.5 - Full Corpus Deployment
 */

var masterRepo = [
    {
      id: "ACT-1788280150707",
      expression: "ⴰⵔ ⵜⵜⵉⵏⵉⵏ : \"ⵡⴰⵏⵏⴰ ⵉⵔⴰⵏ ⵜⴰⵎⵎⴻⵏⵜ ⵉⵚⴱⴻⵕ ⵉ ⵜⵉⵙⵙⵉⴼⵜ\" (Wanna iran tamment isber i tissift)",
      category: "proverbs",
      meaning: "تحمل الصعاب والمشاق للوصول إلى الغايات النبيلة.",
      field_context: "يُقال في مواقف الشكوى من التعب أثناء السعي لهدف مهم كالنصيحة والمواساة.",
      field_investigation: "منطقة أيت يوسي (الأطلس المتوسط)، المستجوب: شيخ طاعن في السن (راوية محلي).",
      locutionary_act: "الإخبار بأن من يريد العسل ينبغي له الصبر على لسع النحل.",
      illocutionary_act: "تقديم النصيحة والمواساة، والتوجيه نحو الصبر.",
      perlocutionary_act: "بث روح العزيمة لدى السامع وإقناعه بضرورة الاستمرار.",
      illocution_type: "Directive",
      illocutionary_force: "النصح والمواساة والحث على التجلد والصبر (Advising).",
      direction_of_fit: "World-to-words",
      politeness_strategy: "Positive politeness / Off-record (حفظ الوجه عبر التوسل بالحكم الشعبية).",
      felicity_conditions: "شرط التمهيد: وجود جهد يعاني منه المخاطب. شرط الإخلاص: صدق نية المتكلم. الشرط الأساس: اعتبار المثال حكمة مقبولة.",
      notes: "يعكس بنية التفكير التداولي في استخدام الطبيعة والبيئة الرعوية كرموز للقيم الأخلاقية."
    },
    {
      id: "ACT-1788284983",
      expression: "ⴰⵔ ⵜⵜⵉⵏⵉⵏ : \"ⴰⴷ ⵓⵔ ⵜⵊⵊⴻⵜ ⵜⴰⵎⴻⵏⵜ ⴳ ⵓⴼⵓⵙ ⵏ ⵓⵛⴻⵏ\" (Ad ur tajjet tament g ufus n ucen)",
      category: "proverbs",
      meaning: "التحذير من ائتمان غير المؤهلين أو الخونة على الأشياء الثمينة.",
      field_context: "يُقال عند إسداء نصيحة لشخص يهم بتفويض أمر حساس لشخص غير موثوق.",
      field_investigation: "منطقة أيت يوسي (الأطلس المتوسط)، توثيق ميداني من راوية محلي (أمغار سابق).",
      locutionary_act: "جملة نهي صريحة تمنع ترك العسل في يد الذئب.",
      illocutionary_act: "النهي التحذيري وإسداء النصيحة التوجيهية.",
      perlocutionary_act: "تنبيه المخاطب وإثارة الحذر لديه لإعادة النظر في قراره.",
      illocution_type: "Directive",
      illocutionary_force: "تحذير غير مباشر ونصح احترازي (Implicit Warning).",
      direction_of_fit: "World-to-words",
      politeness_strategy: "Off-record Politeness",
      felicity_conditions: "شرط التمهيد: نية المخاطب بائتمان شخص غير موثوق. شرط الإخلاص: مصلحة المخاطب. الشرط الأساس: رمزية الذئب للغدر.",
      notes: "استعارة إثنوتداولية تعكس توظيف البيئة الحيوانية في بناء القواعد البراغماتية للأمانة."
    }
];

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
    }
    updateNavbarVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setSearchCategory(cat) {
    switchPane('pane-lexicon');
    document.getElementById("category-grid").style.display = "none";
    var nexus = document.getElementById("results-nexus");
    nexus.innerHTML = "";
    var results = masterRepo.filter(function(item) { return item.category === cat; });
    results.forEach(function(item) {
        var div = document.createElement("div");
        div.className = "act-category-card ultimate-reveal";
        div.style.cssText = "margin-bottom:1rem; padding:1.2rem; display:flex; justify-content:space-between; align-items:center; border-right:4px solid #a2d2ff; cursor:pointer;";
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
        '<div class="matrix-node"><h4>المعنى التداولي</h4><p>' + (item.meaning || '---') + '</p></div>' +

        '<div style="background:#5d4037; color:#d4a373; padding:1.5rem; margin:1.5rem 0; border-radius:15px; border-right:4px solid var(--gold);">' +
            '<strong>التحقيق الميداني:</strong><br><small>' + (item.field_investigation || '---') + '</small>' +
        '</div>' +

        '<div class="pragmatic-master-grid" style="display:grid; grid-template-columns:1fr; gap:1.5rem;">' +
            '<div style="background:rgba(162,210,255,0.03); padding:1rem; border-radius:10px; border-right:3px solid #a2d2ff;">' +
                '<h4 style="color:var(--azure); font-size:0.9rem;">1. مستويات التلفظ</h4>' +
                '<p style="font-size:0.85rem;">• لفظي: ' + (item.locutionary_act || '---') + '<br>• إنجازي: ' + (item.illocutionary_act || '---') + '<br>• تأثيري: ' + (item.perlocutionary_act || '---') + '</p>' +
            '</div>' +

            '<div style="background:rgba(212,163,115,0.05); padding:1rem; border-radius:10px; border-right:3px solid var(--gold);">' +
                '<h4 style="color:var(--gold); font-size:0.9rem;">2. المقاصد والشروط</h4>' +
                '<p style="font-size:0.85rem;">• النوع: ' + (item.illocution_type || '---') + ' | القوة: ' + (item.illocutionary_force || '---') + '</p>' +
                '<p style="font-size:0.85rem;">• الشروط: ' + (item.felicity_conditions || '---') + '</p>' +
                '<p style="font-size:0.85rem;">• التأدب: ' + (item.politeness_strategy || '---') + ' | المطابقة: ' + (item.direction_of_fit || '---') + '</p>' +
            '</div>' +

            '<div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:10px;">' +
                '<h4 style="color:#777; font-size:0.85rem;">3. ملاحظات إثنولسانية</h4>' +
                '<p style="font-size:0.8rem; color:#999;">' + (item.notes || 'لا توجد ملاحظات إضافية.') + '</p>' +
            '</div>' +
        '</div>' +
    '</article>';
    updateNavbarVisibility();
}

async function handleSave() {
    var form = document.getElementById('speechActForm');
    var btn = document.getElementById("save-btn");
    var getVal = function(id) { var el = document.getElementById(id); return el ? el.value.trim() : null; };
    var payload = {
        id: 'ACT-' + Date.now(), expression: getVal("expression"), category: getVal("category"), meaning: getVal("meaning"),
        field_investigation: getVal("field_investigation"), locutionary_act: getVal("locutionary_act"),
        illocutionary_act: getVal("illocutionary_act"), perlocutionary_act: getVal("perlocutionary_act"),
        illocution_type: getVal("illocution_type"), illocutionary_force: getVal("illocutionary_force"),
        direction_of_fit: getVal("direction_of_fit"), politeness_strategy: getVal("politeness_strategy"),
        felicity_conditions: getVal("felicity_conditions"), notes: getVal("notes")
    };
    if(!payload.expression) return alert("أدخل الشاهد!");
    btn.disabled = true; btn.innerText = "جاري الحفظ...";
    try {
        var res = await supabaseClient.from('speech_acts').insert([payload]);
        if(res.error) throw res.error;
        alert("تم الحفظ بنجاح! ☁️"); form.reset(); syncCloud();
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
