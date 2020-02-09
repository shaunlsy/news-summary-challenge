(function(exports) {
    const ul = document.getElementById("headlines");

    function ApiInterface() {
        this.guardianUrl =
            "https://content.guardianapis.com/uk-news?show-fields=body&api-key=f3ce24c4-4f0a-4e2b-b1d7-76d94e849172";
        this.aylienFrontUrl =
            "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";
        this.guardianNewsWebUrl = [];
        this.guardianNewsFieldBody = [];
    }

    ApiInterface.prototype.guardianApi = function() {
        var self = this;
        fetch(self.guardianUrl)
            .then(resp => resp.json())
            .then(function(data) {
                console.log(data);
                let news = data.response.results;
                return news.map(function(eachNews, index) {
                    let li = createNode("li"),
                        span = createNode("span");
                    self.guardianNewsWebUrl.push(eachNews.webUrl);
                    self.guardianNewsFieldBody.push(eachNews.fields.body);
                    span.innerHTML = `<a href="#news-${index}"> ${eachNews.webTitle} </a>`;
                    append(li, span);
                    append(ul, li);
                });
            });
    };

    ApiInterface.prototype.clickNews = function(news) {};

    ApiInterface.prototype.makeUrlChangeDisplayNewsSummary = function() {
        window.addEventListener("hashchange", () => {
            this.showNewsSummaryForCurrentPage();
        });
    };
    ApiInterface.prototype.showNewsSummaryForCurrentPage = function() {
        this.showNewsSummary(
            this.guardianNewsFieldBody[this.getNewsIdFromUrl(window.location)]
        );
    };

    ApiInterface.prototype.getNewsIdFromUrl = function(location) {
        return location.hash.split("#news-")[1];
    };

    ApiInterface.prototype.showNewsSummary = function(news) {
        document.getElementById("news_summary").innerHTML = news;
    };

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    exports.ApiInterface = ApiInterface;
})(this);