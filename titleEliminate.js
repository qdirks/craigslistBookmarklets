/* Be able to eliminate listings based on what's in the title. */

javascript:
var results = [].slice.call(document.querySelectorAll("div#sortable-results.content ul.rows li"));
var fil = prompt("What description would you like to get rid of?");
var count = 0;
var descs = [];
if (fil) {
    results.forEach(li=>{
        var desc = li.querySelector("a.result-title.hdrlnk").textContent;
        if (desc.indexOf(fil) > -1) {
            li.parentElement.removeChild(li);
            descs.push(desc);
            count++;
        }
    });
}
alert("Eliminated: " + count + " results\n" + descs.map(d=>"---" + d).join('\n'));