(function() {
    window.addEventListener("load", function() {
        var apiInterface = new ApiInterface();
        apiInterface.guardianApi();
        apiInterface.makeUrlChangeDisplayNews();
    });
})();