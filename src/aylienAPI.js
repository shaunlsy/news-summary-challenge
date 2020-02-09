const frontUrl =
    "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";

function aylienApi(url) {
    getURL(url, aylienParser);
    var summary;

    function aylienParser() {
        summary = JSON.parse(this.responseText);
    }
    return summary;
}