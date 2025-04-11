async function fetchWhitelistData() {
    const whiteListBody = document.querySelector('#mainContent #whiteListBody');
    console.log("开始获取白名单数据",);
    try {
        const response = await fetch('/api/waf/listwhite');
        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.message)) {
            const allData = data.message;
            renderTable(allData);
        } else {
            console.error("返回数据格式不正确", data);
        }
    } catch (error) {
        console.error("数据获取出错:", error);
    }
}

function renderTable(allData) {
    const whiteListBody = document.getElementById('whiteListBody');
    whiteListBody.innerHTML = '';

    allData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.rule_template}</td>
            <td>${item.rule_id}</td>
            <td>${item.rule_name}</td>
        `;
        whiteListBody.appendChild(row);
    });
}

fetchWhitelistData()
