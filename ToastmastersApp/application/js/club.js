// 動態載入所有的城市
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

// 點擊搜尋的按鈕
$(function() {
    $("#club-search-btn").click(function() {
        var city = encodeURIComponent($("#city-select").val());
        var type = encodeURIComponent($("#type-select").val());
        var lang = encodeURIComponent($("#language-select").val());

        $.ajax({
            url: `/club/list?city=${city}&type=${type}&lang=${lang}`,
            type: "GET"
        })
        .then(function(result) {
            createClubTable(result);
        })
        .catch(function(err) {
            if (err.status === 404) {
                alert("no such api");
                return;
            };
            console.log(err);
        });
    })
});

// 建立搜尋後的結果的table
let createClubTable = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    $("#club-result-table tbody").html(`
      <tr><td colspan="7" class="text-center text-muted">找不到符合條件的分會。</td></tr>
    `);
    return;
  }

  let tableBody = data.map((club, index) => `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${club.name || "－"}</td>
      <td>${club.city || "－"}</td>
      <td>${club.type || "－"}</td>
      <td>${(club.languages || []).join(", ") || "－"}</td>
      <td>
        ${club.meetingDate || ""} ${club.meetingTime || ""}
      </td>
      <td>
        <div>${club.address || "－"}</div>
        ${club.addressGoogleMaps ? `<a href="${club.addressGoogleMaps}" target="_blank">地圖</a>` : ""}
      </td>
      <td>
        ${club.president || "－"}<br/>
        ${club.phoneNumber || ""}
      </td>
    </tr>
  `).join("");

  $("#club-result-table tbody").html(tableBody);
};
