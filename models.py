from datetime import datetime
from extensions import db

class WAFLog(db.Model):
    __tablename__ = 'waf_attack_logs'  # 表名

    id = db.Column(db.Integer, primary_key=True)  # 日志的唯一 ID
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  # 时间，默认当前时间
    ip = db.Column(db.String(255), nullable=False)  # IP 地址
    attack_count = db.Column(db.Integer, default=1, nullable=False)  # 攻击次数
    attack_ratio = db.Column(db.String(10), default='0.0%')  # 攻击占比，修改为 String 类型

    def to_dict(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "ip": self.ip,
            "attack_count": self.attack_count,
            "attack_ratio": self.attack_ratio
        }