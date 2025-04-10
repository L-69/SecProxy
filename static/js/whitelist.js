// 全局变量，用于记录当前的页码和每页显示的条数
let currentPage = 1;
let pageSize = 10;

// 请求白名单数据的函数
function fetchWhiteList() {
    const url = '/api/waf/listwhite';  // 假设不需要传递页码和每页条数，接口内部处理

    // 显示加载动画
    const whiteListBody = document.getElementById("whiteListBody");
    whiteListBody.innerHTML = `
        <tr>
            <td colspan="3" class="text-center text-muted py-4">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">加载中...</span>
                </div>
                正在加载白名单数据
            </td>
        </tr>
    `;

    // 发起AJAX请求获取白名单数据
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 请求成功后处理数据
            if (data.status === "success") {
                const rules = data.message; // 白名单数据
                const totalCount = data.total_count; // 白名单总条数
                const whiteListBody = document.getElementById("whiteListBody");
                whiteListBody.innerHTML = "";

                if (rules.length === 0) {
                    whiteListBody.innerHTML = `
                        <tr>
                            <td colspan="3" class="text-center text-muted py-4">
                                没有找到白名单数据
                            </td>
                        </tr>
                    `;
                } else {
                    // 填充白名单规则数据
                    rules.forEach(rule => {
                        whiteListBody.innerHTML += `
                            <tr>
                                <td>${rule.rule_template}</td>
                                <td>${rule.rule_id}</td>
                                <td>${rule.rule_name}</td>
                            </tr>
                        `;
                    });

                    // 更新分页信息
                    updatePagination(totalCount);
                }
            } else {
                alert("加载白名单数据失败，请重试！");
            }
        })
        .catch(error => {
            console.error("请求失败:", error);
            alert("加载白名单数据失败，请重试！");
        });
}

// 更新分页信息
function updatePagination(totalCount) {
    const totalPages = Math.ceil(totalCount / pageSize);  // 计算总页数
    const pageInfo = document.getElementById("pageInfo");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // 更新当前页信息
    pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;

    // 控制上一页和下一页按钮的可用状态
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// 点击菜单时自动请求列表
document.getElementById('menuItem').addEventListener('click', function () {
    currentPage = 1; // 点击菜单时重置为第一页
    fetchWhiteList();
});

// 点击刷新按钮时自动请求列表
document.getElementById('refreshButton').addEventListener('click', function () {
    fetchWhiteList();
});

// 切换每页显示条数时更新数据
document.getElementById('pageSizeSelector').addEventListener('change', function (event) {
    pageSize = parseInt(event.target.value, 10);
    currentPage = 1; // 重置为第一页
    fetchWhiteList();
});

// 上一页按钮事件
document.getElementById("prevButton").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        fetchWhiteList();
    }
});

// 下一页按钮事件
document.getElementById("nextButton").addEventListener("click", function() {
    currentPage++;
    fetchWhiteList();
});

// 初次加载时自动请求一次列表
window.onload = function() {
    fetchWhiteList();
};
