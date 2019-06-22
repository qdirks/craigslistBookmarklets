/* Be able to filter based on the number of photos available. Motivation is that scammer listings often only have one or
    very few photos available. Craigslist allows filtering based on if a posting has images or not, but it doesn't have filtering
    based on how many photos are available. 
*/

javascript:
var results = [].slice.call(document.querySelectorAll("div#sortable-results.content ul.rows li"));
var reqPics;
var count = 0;
do {
    reqPics = Number(prompt("At least how many pics must be present?", "2"));
} while (!isFinite(reqPics));
results.forEach(li=>{
    var info = li.querySelector("a div.slider-info");
    if (info) {
        var mat = info.textContent.match(/[0-9]+$/);
        if (mat) {
            mat = Number(mat[0]);
            if (mat < reqPics) {
                li.parentElement.removeChild(li);
                count++;
            }
        }
    } else {
        li.parentElement.removeChild(li);
        count++;
    }
});
alert("Eliminated: " + count + " results");