let blackListData = [];
let blackListblackListcurrentPage = 1;
let pageSize = 10;

function changePageSize(size) {
    pageSize = parseInt(size);
    blackListcurrentPage = 1;
    renderBlackList();
}

function prevPage() {
    if (blackListcurrentPage > 1) {
        blackListcurrentPage--;
        renderBlackList();
    }
}

function nextPage() {
    const totalPages = Math.ceil(blackListData.length / pageSize);
    if (blackListcurrentPage < totalPages) {
        blackListcurrentPage++;
        renderBlackList();
    }
}

function refreshList() {
    loadBlackList();
}

function loadBlackList() {
    const tbody = document.getElementById('blackListBody');
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
          正在加载黑名单数据
        </td>
      </tr>`;

    fetch('api/waf/descblackrule')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && Array.isArray(data.message)) {
                blackListData = data.message;
                blackListcurrentPage = 1;
                renderBlackList();
            } else {
                tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">没有找到黑名单记录</td></tr>`;
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger py-4">数据加载失败</td></tr>`;
        });
}

function renderBlackList() {
    const tbody = document.getElementById('blackListBody');
    tbody.innerHTML = '';

    const startIndex = (blackListcurrentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = blackListData.slice(startIndex, endIndex);

    if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">暂无数据</td></tr>`;
    } else {
        pageData.forEach(item => {
            const ipListFormatted = item.ip_list && item.ip_list.length > 0
                ? item.ip_list.join('<br>')
                : '-';

            const row = `
              <tr>
                <td>${item.template_id}</td>
                <td>${item.rule_id}</td>
                <td>${item.rule_name}</td>
                <td>${ipListFormatted}</td>
              </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
    }

    const totalPages = Math.ceil(blackListData.length / pageSize);
    document.getElementById('pageInfo').textContent = `第 ${blackListcurrentPage} 页 / 共 ${totalPages} 页`;
}

// 页面加载完就拉取数据
document.addEventListener('DOMContentLoaded', function () {
    loadBlackList();
});
