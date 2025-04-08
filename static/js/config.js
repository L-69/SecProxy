// 动态加载配置的函数
function loadConfig() {
    fetch('/sys/get-config')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const config = data.config;
                const configForm = document.getElementById('configForm');

                // 清空现有表单内容
                configForm.innerHTML = '';

                // 遍历配置项并生成对应的表单
                Object.keys(config).forEach(key => {
                    const value = config[key];

                    const formGroup = document.createElement('div');
                    formGroup.classList.add('form-group');

                    const label = document.createElement('label');
                    label.setAttribute('for', key);
                    label.classList.add('form-label');
                    label.textContent = key;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.classList.add('form-control');
                    input.id = key;
                    input.value = value;

                    formGroup.appendChild(label);
                    formGroup.appendChild(input);
                    configForm.appendChild(formGroup);
                });
            } else {
                alert('加载配置失败');
            }
        })
        .catch(error => {
            console.error('加载失败:', error);
            alert('配置加载失败');
        });
}

// 保存配置的函数
function saveConfig() {
    const formElements = document.getElementById('configForm').elements;
    const configData = {};

    // 收集表单数据
    for (let i = 0; i < formElements.length; i++) {
        const input = formElements[i];
        if (input.type === 'text') {
            configData[input.id] = input.value;
        }
    }

    // 向后端发送保存请求
    fetch('/save-config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(configData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('配置保存成功');
        } else {
            alert('保存失败');
        }
    })
    .catch(error => {
        console.error('保存失败:', error);
        alert('保存配置失败');
    });
}

// 初始化页面，加载配置并绑定事件
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();

    document.getElementById('saveConfigBtn').addEventListener('click', function() {
        saveConfig();
    });
});
