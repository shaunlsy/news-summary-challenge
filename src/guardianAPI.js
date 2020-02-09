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

    ApiInterface.prototype.aylienApi = function(news_id) {
        var self = this;
        var fullAylienUrl = self.aylienFrontUrl + self.guardianNewsWebUrl[news_id];
        console.log(fullAylienUrl);
        fetch(fullAylienUrl)
            .then(resp => resp.json())
            .then(function(data) {
                var elem = document.getElementById("news_summary");
                elem.innerHTML = "<h2>News Summary</h2>" + data.sentences[0];
            });
    };

    ApiInterface.prototype.guardianApi = function() {
        var self = this;
        fetch(self.guardianUrl)
            .then(resp => resp.json())
            .then(function(data) {
                let news = data.response.results;
                return news.map(function(eachNews, index) {
                    let li = createNode("li"),
                        span = createNode("span");
                    self.guardianNewsWebUrl.push(eachNews.webUrl);
                    self.guardianNewsFieldBody.push(eachNews.fields.body);
                    span.innerHTML = `<a href="#news-${index}"> ${eachNews.webTitle.substring(
            0,
            100
          )}</a>`;
                    append(li, span);
                    append(ul, li);
                });
            });
    };

    ApiInterface.prototype.clickNews = function(news) {};

    ApiInterface.prototype.makeUrlChangeDisplayNews = function() {
        window.addEventListener("hashchange", () => {
            this.showNewsForCurrentPage();
        });
    };

    ApiInterface.prototype.showNewsForCurrentPage = function() {
        this.aylienApi(this.getNewsIdFromUrl(window.location));
        this.showNewsArticle(
            this.guardianNewsFieldBody[this.getNewsIdFromUrl(window.location)]
        );
    };

    ApiInterface.prototype.getNewsIdFromUrl = function(location) {
        return location.hash.split("#news-")[1];
    };

    ApiInterface.prototype.showNewsArticle = function(news) {
        document.getElementById("full-article").innerHTML =
            "<h3>Full Article</h3>" + news;
    };

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    exports.ApiInterface = ApiInterface;
})(this);