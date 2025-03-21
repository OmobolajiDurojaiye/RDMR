from flask import Blueprint, render_template

articlepage = Blueprint('articlepage', __name__, url_prefix='/articlepage') 

@articlepage.route('/')
def article_page():
    return render_template('articlepage.html')
