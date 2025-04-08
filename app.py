from flask import Flask
from extensions import db
from dotenv import load_dotenv
from models import WAFLog
import os,schedule,threading
from routes.index import *
from routes.waf_dd_alert import *
from routes.waf_attack_report import *
from routes.waf_listwhite import *
from routes.waf_addwhite import *
from routes.waf_deletewhite import *
from routes.waf_descblackrule import *
from routes.waf_modifyblackrule import *
from src.config import *

app = Flask(__name__)
# 加载 .env 文件的配置
load_dotenv()
# 从 .env 文件中获取数据库连接配置
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)
app.config['SQLALCHEMY_ECHO'] = os.getenv('SQLALCHEMY_ECHO', True)
db.init_app(app)
with app.app_context():
    # 打印是否能成功连接到数据库
    print("Creating all tables...")
    db.create_all()  # 创建所有表
    print("Tables created.")
# 注册 WAF 攻击警报蓝图
app.register_blueprint(index, url_prefix='/')
app.register_blueprint(config_blueprint, url_prefix='/sys')
app.register_blueprint(waf_attack_alert, url_prefix='/api/waf')
app.register_blueprint(waf_attack_report, url_prefix='/api/waf')
app.register_blueprint(waf_listwhite, url_prefix='/api/waf')
app.register_blueprint(waf_addwhite, url_prefix='/api/waf')
app.register_blueprint(waf_deletewhite, url_prefix='/api/waf')
app.register_blueprint(waf_descrule, url_prefix='/api/waf')
app.register_blueprint(waf_modifyblackrule, url_prefix='/api/waf')




# 定义定时任务
def daily_task():
    print(f"开始执行定时任务：{time.ctime()}")
    # 这里调用你的 send_daily_report 函数
    send_daily_report()
    # 每天定时执行一次任务
    schedule.every().day.at("00:00").do(daily_task)  # 设置定时任务为每天0点执行

# 在后台运行定时任务
def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(1)

# 启动定时任务调度
threading.Thread(target=run_schedule).start()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)