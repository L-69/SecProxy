import os
from typing import List
from alibabacloud_waf_openapi20211001.client import Client as waf_openapi20211001Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_waf_openapi20211001 import models as waf_openapi_20211001_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient
from flask import Flask, request, jsonify, Blueprint
from dotenv import load_dotenv
load_dotenv()

waf_descrule = Blueprint('waf_descrule', __name__)

def create_client() -> waf_openapi20211001Client:
        config = open_api_models.Config(
            access_key_id=os.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID"),
            access_key_secret=os.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET")
        )
        config.endpoint = f'wafopenapi.cn-hangzhou.aliyuncs.com'
        return waf_openapi20211001Client(config)

@waf_descrule.route('/descblackrule', methods=['GET'])
def desc_rule():
        client = create_client()
        describe_defense_rule_request = waf_openapi_20211001_models.DescribeDefenseRuleRequest(
            region_id=os.getenv("REGION_ID"),
            instance_id=os.getenv("INSTANCE_ID"),
            template_id=os.getenv("BLACKLIST_TEMPLATE_ID"),
            rule_id=os.getenv("BLACKLIST_RULES_ID")
        )
        runtime = util_models.RuntimeOptions()
        try:
            response = client.describe_defense_rule_with_options(describe_defense_rule_request, runtime)
            # 尝试获取 rule 对象
            rule_obj = getattr(response.body, 'rule', None)
            
            if rule_obj is None:
                return jsonify({'status': 'error', 'message': 'No rule object found in the response body.'}), 500
            
            # 检查是否具有 to_map 方法
            if hasattr(rule_obj, 'to_map'):
                rule_dict = rule_obj.to_map()
                return jsonify({'status': 'success', 'message': rule_dict}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Rule object does not have to_map() method.'}), 500

        except Exception as error:
            print("Error:", error)
            return jsonify({'status': 'error', 'message': str(error)}), 500