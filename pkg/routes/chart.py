from flask import Blueprint, render_template

chart = Blueprint('chart', __name__, url_prefix='/chart') 

@chart.route('/')
def chart_view():
    return render_template('user/chart.html')
