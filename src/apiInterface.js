var url =
    "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics/blog/2014/feb/17/alex-salmond-speech-first-minister-scottish-independence-eu-currency-live?show-fields=body";

function setup() {
    noCanvas();
    loadJSON(url, gotData);
}

function gotData(data) {
    console.log(data);
    println(data);
}