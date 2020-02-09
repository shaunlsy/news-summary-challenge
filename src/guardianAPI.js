var url =
    "https://content.guardianapis.com/uk-news?show-fields=body&api-key=f3ce24c4-4f0a-4e2b-b1d7-76d94e849172";

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById("headlines");

function guardianApi() {
    fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
            let news = data.response.results;
            return news.map(function(eachNews) {
                let li = createNode("li"),
                    span = createNode("span");
                span.innerHTML = `<a href="#news-1"> ${eachNews.webTitle} </a>`;
                append(li, span);
                append(ul, li);
            });
        });
}