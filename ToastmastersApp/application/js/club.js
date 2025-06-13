$(document).ready(function() {
    $.ajax({
        url: "/club/cities",
        type: "GET"
    })
    .then(function(cities) {  // success
        const $citySelect = $("#city-select");
        $citySelect.empty();
        $citySelect.append(`<option value="全">全</option>`);
        cities.forEach(element => {
            $citySelect.append(`<option value="${element}">${element}</option>`);
        });
    })
    .catch(function(err) {
        if (err.status === 404) {
            alert("no such api");
            return;
        };
        console.log(err);
    });
});