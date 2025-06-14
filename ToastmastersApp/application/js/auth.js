// 取得使用者登入資料，傳給router，查詢是否有存在這個使用者
// 存在 -> 比對登入，不存在 -> 新增

$(document).ready(function() {
    // 檢查登入與否
    $.ajax({
        url: "/auth",
        type: "GET"
    })
    .then(function(response) {
        buildSideBar(response.data.isLogIned);
    })
    .catch(function(err) {
        console.log(`auth error: ${err}`);
    })
});

let buildSideBar = (isLogIned) => {
    if (isLogIned) {
        // TODO
    }

    let tableBody = data
    .map(
      (club, index) => `
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
        <div class="mb-1">${club.address || "－"}</div>
        ${
          club.addressGoogleMaps
            ? `<a href="${club.addressGoogleMaps}" target="_blank" class="btn btn-sm btn-outline-success">
                <i class="fas fa-map-marked-alt mr-1"></i>查看地圖
                </a>`
            : ""
        }
        </td>
        <td>
        ${club.president || "－"}<br/>
        ${club.phoneNumber || ""}
        </td>
    </tr>
    `
    )
    .join("");

  $(".sidebar-content").html(tableBody);
}