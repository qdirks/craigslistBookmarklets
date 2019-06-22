/* Eliminate duplicate titles, keeping only the most recent listing. */

javascript:
var results = [].slice.call(document.querySelectorAll("div#sortable-results.content ul.rows li"));
var count = 0;
var descs = [];
for (var jx = 0; jx < results.length; jx++) {
    var li = results[jx];
    var desc = li.querySelector("a.result-title.hdrlnk").textContent;
    for (var ix = results.length - 1; ix > -1; ix--) {
        var li2 = results[ix];
        var desc2 = li2.querySelector("a.result-title.hdrlnk").textContent;
        if (li2 === li) break;
        if (desc2 === desc) {
            li2.parentElement.removeChild(li2);
            descs.push(desc);
            count++;
        }
    }
}
alert("Eliminated: " + count + " results\n" + descs.map(d=>"---" + d).join('\n'));