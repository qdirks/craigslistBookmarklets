/* Highlight listings, using a red border, that have matching descriptions. */

javascript:
var results = [].slice.call(document.querySelectorAll("div#sortable-results.content ul.rows li"));
var ajax = function(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.onload = onload;
    xhr.onerror = onerror;
    xhr.open('GET', url);
    xhr.responseType = 'document';
    xhr.send();
    return xhr;
};
var reqs = [];
results.forEach(li=>{
    var url = li.querySelector('a').href;
    ajax(url, function() {
        reqs.push({li: li, desc: this.responseXML.querySelector("section#postingbody").textContent});
        doIfDone();
    }, function() {
        reqs.push({li: li, desc: 'NULL'});
        doIfDone();
    });
});
function doIfDone() {
    if (reqs.length === results.length) {
        for (var jx = reqs.length - 1; jx > 0; jx--) {
            var li1 = reqs[jx].li;
            var desc1 = reqs[jx].desc;
            for (var ix = jx - 1; ix > -1; ix--) {
                var li2 = reqs[ix].li;
                var desc2 = reqs[ix].desc;
                if (desc1 === desc2) {
                    li1.style.border = '1px solid red';
                    li2.style.border = '1px solid red';
                    reqs.splice(ix, 1);
                }
            }
        }
    }
}