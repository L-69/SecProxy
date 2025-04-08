// 删除白名单项并刷新列表
function deleteItem(rule_id) {
    if (!confirm(`确定要删除ID为 ${rule_id} 的白名单记录吗？`)) return;

    fetch('api/waf/deletewhite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rule_id: rule_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('删除成功');
            refreshList();  // 调用刷新列表的函数
        } else {
            alert(data.msg);
        }
    })
    .catch(error => {
        console.error('请求错误:', error);
        alert('删除操作失败');
    });
}

// 刷新白名单列表
function refreshList() {
    const tbody = document.getElementById('whiteListBody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">加载中...</span>
                    </div>
                    正在刷新数据...
                </td>
            </tr>`;
        loadWhiteList();  // 调用加载白名单数据的函数
    }
}

// 确保 deleteItem 和 refreshList 是全局函数
window.deleteItem = deleteItem;
window.refreshList = refreshList;
