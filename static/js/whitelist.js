// 全局变量
let currentPage = 1;
let pageSize = 10;
let allWhiteListData = [];

// 加载白名单列表数据
function loadWhiteList() {
    const whiteListBody = document.getElementById('whiteListBody');
    const loadingMessage = `
        <tr>
            <td colspan="5" class="text-center text-muted py-4">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">加载中...</span>
                </div>
                正在加载白名单数据
            </td>
        </tr>
    `;
    whiteListBody.innerHTML = loadingMessage;

    fetch('api/waf/listwhite')
      .then(response => {
            if (!response.ok) {
                throw new Error('网络响应异常');
            }
            return response.json();
        })
      .then(data => {
            allWhiteListData = data.message;
            renderWhiteList(allWhiteListData);
        })
      .catch(error => {
            whiteListBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">加载数据出错：${error.message}</td></tr>`;
        });
}

// 渲染白名单列表
function renderWhiteList(data) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = data.slice(startIndex, endIndex);

    const whiteListBody = document.getElementById('whiteListBody');
    let tableRows = '';
    if (currentPageData.length === 0) {
        tableRows = `<tr><td colspan="5" class="text-center text-muted py-4">没有数据</td></tr>`;
    } else {
        currentPageData.forEach(item => {
            tableRows += `
                <tr>
                    <td>${item.rule_template}</td>
                    <td>${item.rule_id}</td>
                    <td>${item.rule_name}</td>
                </tr>
            `;
        });
    }
    whiteListBody.innerHTML = tableRows;
    updatePageInfo();
}

// 更新分页信息
function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    const totalPages = Math.ceil(allWhiteListData.length / pageSize);
    pageInfo.textContent = `第 ${currentPage} 页，共 ${totalPages} 页`;
    const prevButton = document.querySelector('[onclick="prevPage()"]');
    const nextButton = document.querySelector('[onclick="nextPage()"]');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(allWhiteListData.length / pageSize);
}

// 上一页
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderWhiteList(allWhiteListData);
    }
}

// 下一页
function nextPage() {
    const totalPages = Math.ceil(allWhiteListData.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        renderWhiteList(allWhiteListData);
    }
}

// 改变每页显示数量
function changePageSize(size) {
    pageSize = parseInt(size);
    currentPage = 1;
    renderWhiteList(allWhiteListData);
}

// 刷新列表
function refreshList() {
    currentPage = 1;
    loadWhiteList();
}

// 页面加载完成后执行的操作
window.addEventListener('load', () => {
    loadWhiteList();

    // 监听分页选择器变化
    const pageSizeSelector = document.getElementById('pageSizeSelector');
    pageSizeSelector.addEventListener('change', function () {
        changePageSize(this.value);
    });

    // 监听上一页按钮点击事件
    const prevButton = document.querySelector('[onclick="prevPage()"]');
    prevButton.addEventListener('click', prevPage);

    // 监听下一页按钮点击事件
    const nextButton = document.querySelector('[onclick="nextPage()"]');
    nextButton.addEventListener('click', nextPage);

    // 监听刷新列表按钮点击事件
    const refreshButton = document.querySelector('[onclick="refreshList()"]');
    refreshButton.addEventListener('click', refreshList);
});

// 导出加载白名单列表的函数，供其他文件调用
export { loadWhiteList };
    