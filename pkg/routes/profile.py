from flask import Blueprint, render_template

profile = Blueprint('profile', __name__, url_prefix='/profile') 

@profile.route('/')
def user_profile():
    return render_template('profile.html')

@profile.route('/settings')
def profile_settings():
    return "<h1>Profile Settings</h1>"

@profile.route('/leaderboard/')
def leaderboard():
    return render_template('leaderboard.html')

@profile.route('/bookmarks/')
def bookmarks():
    return render_template('bookmarks.html')

@profile.route('/stat/')
def stat():
    return render_template('stat.html')

@profile.route('/contactreport/')
def contactreport():
    return render_template('contactreport.html')