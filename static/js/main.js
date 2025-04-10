document.addEventListener('DOMContentLoaded', function () {
    // 默认加载首页内容
    loadContent(document.querySelector('.menu-item.active'));

    // 为所有菜单项添加点击事件监听器
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // 移除所有菜单项的 active 类
            menuItems.forEach(i => i.classList.remove('active'));
            // 为当前点击的菜单项添加 active 类
            this.classList.add('active');
            loadContent(this);
        });
    });
});

let isLoading = false;

function loadContent(menuItem) {
    if (isLoading) return;  // 防止重复请求
    isLoading = true;

    const route = menuItem.dataset.route;
    const mainContent = document.getElementById('mainContent');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // 显示加载动画
    loadingOverlay.style.display = 'block';

    // 使用 fetch API 发送请求
    fetch(route)
      .then(response => {
            if (!response.ok) {
                throw new Error('网络响应异常');
            }
            return response.text();
        })
      .then(data => {
            // 隐藏加载动画
            loadingOverlay.style.display = 'none';
            // 清空当前内容
            mainContent.innerHTML = '';
            // 插入新内容
            mainContent.innerHTML = data;

            // 动态加载外部JS文件
            loadExternalScripts(mainContent);
        })
      .catch(error => {
            // 隐藏加载动画
            loadingOverlay.style.display = 'none';
            // 显示错误信息
            mainContent.innerHTML = `<h3>加载内容出错</h3><p>错误信息: ${error.message}</p>`;
        })
      .finally(() => {
            // 重置加载状态
            isLoading = false;
        });
}

// 动态加载外部JS文件
function loadExternalScripts(container) {
    const script = document.createElement('script');
    script.src = '/static/js/whitelist.js'; // 确保路径正确
    script.onload = function () {
        console.log('JS文件加载成功');
    };
    script.onerror = function () {
        console.log('JS文件加载失败');
    };
    document.body.appendChild(script);
}
