/* This tool gets the descriptions and places them on the front of the listing on a white background. */

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
        var postingBody = this.responseXML.querySelector("section#postingbody");
        postingBody.removeChild(
            postingBody.querySelector(
                'div.print-information.print-qrcode-container'));
        showDescription(li, postingBody.textContent);
    }, function() {
        showDescription(li, 'NULL');
    });
});
function doIfDone(callback) {
    if (reqs.length === results.length) { callback(); }
}
function showDescriptions() {
    var descDiv = document.createElement('div');
    var contDiv = document.createElement('div');
    contDiv.style.float = 'left';
    contDiv.style.height = '0px';
    contDiv.style.position = 'relative';
    contDiv.style.zIndex = '3000';
    descDiv.style.width = '300px';
    descDiv.style.height = '100px';
    descDiv.style.overflowY = 'scroll';
    descDiv.style.background = 'rgba(255, 255, 255, 0.63)';
    for (var ix = 0; ix < reqs.length; ix++) {
        var li = reqs[ix].li;
        var desc = reqs[ix].desc;
        var div = descDiv.cloneNode(true);
        var div2 = contDiv.cloneNode(true);
        div2.appendChild(div);
        div.textContent = desc;
        li.insertAdjacentElement('afterbegin', div2);
    }
}