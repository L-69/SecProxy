// 加载内容函数
function loadContent(button) {
    const route = button.getAttribute("data-route");
    const mainContent = document.getElementById("mainContent");
    const loadingOverlay = document.getElementById("loadingOverlay");

    // 显示加载动画
    loadingOverlay.style.display = 'block';

    // 移除所有按钮的 active 类
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // 异步加载内容
    fetch(route)
        .then(response => {
            if (!response.ok) throw new Error('页面加载失败');
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;

            // 执行页面中所有的 <script> 标签
            executeScripts(mainContent);

        })
        .catch(error => {
            mainContent.innerHTML = `<div class="alert alert-danger">加载失败：${error.message}</div>`;
        })
        .finally(() => {
            // 隐藏加载动画
            loadingOverlay.style.display = 'none';
        });
}

// 执行页面中的所有 <script> 标签
function executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent;
        }
        
        document.body.appendChild(newScript);
    });
}

// 初始化默认加载第一个菜单内容
document.addEventListener('DOMContentLoaded', function() {
    const defaultMenu = document.querySelector('.menu-item.active');
    if (defaultMenu) {
        loadContent(defaultMenu);
    }
});
