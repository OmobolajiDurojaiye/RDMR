from flask import Blueprint, render_template

admin_home = Blueprint('admin_home', __name__, url_prefix='/admin')

@admin_home.route('/')
def home():
    return render_template('admin/adminbase.html')
