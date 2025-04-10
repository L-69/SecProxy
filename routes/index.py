# routes/index.py
# -*- coding: utf-8 -*-
import os
from flask import Blueprint, render_template

index = Blueprint('index', __name__)

@index.route('/', methods=['GET'])
def hello_world():
    return render_template('index.html')

@index.route('/first', methods=['GET'])
def first():
    return render_template('first.html')

@index.route('/waf_addwhite', methods=['GET'])
def waf_addwhite():
    return render_template('waf_addwhite.html')

@index.route('/waf_attackreport', methods=['GET'])
def waf_attackreport():
    return render_template('waf_attack_report.html')

@index.route('/waf_ddalert', methods=['GET'])
def waf_ddalert():
    return render_template('waf_dd_alert.html')

@index.route('/waf_deletewhite', methods=['GET'])
def waf_deletewhite():
    return render_template('waf_deletewhite.html')

@index.route('/waf_listwhite', methods=['GET'])
def waf_listwhite():
    return render_template('waf_listwhite.html')

@index.route('/waf_descblackrule', methods=['GET'])
def waf_descblackrule():
    return render_template('waf_descblackrule.html')

@index.route('/waf_modifyblackrule', methods=['GET'])
def waf_modifyblackrule():
    return render_template('waf_modifyblackrule.html')

@index.route('/config', methods=['GET'])
def config():
    return render_template('config.html')