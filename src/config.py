import os
from flask import Blueprint, jsonify
from dotenv import dotenv_values, load_dotenv

# 初始化 Blueprint
config_blueprint = Blueprint('config', __name__)

# 加载 .env 文件
load_dotenv()

# 动态读取所有环境变量
@config_blueprint.route('/get-config', methods=['GET'])
def get_config():
    try:
        env_vars = dotenv_values(".env")
        
        # 返回动态生成的配置给前端
        return jsonify({"status": "success", "config": env_vars}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
