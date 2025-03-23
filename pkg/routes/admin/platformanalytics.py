from flask import Blueprint, render_template

platform_analytics = Blueprint('platform_analytics', __name__,) 

@platform_analytics.route('/platform-analytics/')
def platform_analytics_route():
    return render_template('admin/platformanalytics.html')
