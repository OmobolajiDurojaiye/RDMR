from flask import Blueprint, render_template

# Create a Blueprint for Home Feed
home = Blueprint('home', __name__, template_folder="../templates")

@home.route('/feed/')
def home_feed():
    return render_template('home.html')

