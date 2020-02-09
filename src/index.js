(function() {
    window.addEventListener("load", function() {
        guardianApi();
        var apiInterface = new ApiInterface();
        apiInterface.getHeadlines();
        apiInterface.updateHeadlines();
        apiInterface.createHeadlines();
    });
})();