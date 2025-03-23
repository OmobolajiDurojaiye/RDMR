from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_migrate import Migrate
from flask_mail import Mail

csrf = CSRFProtect()
migrate = Migrate()
mail = Mail()

def create_app():
    # from pkg.models import db
    from pkg.routes.main import main  
    from pkg.routes.profile import profile
    from pkg.routes.home import home
    from pkg.routes.articlepage import articlepage
    from pkg.routes.chart import chart
    from pkg.routes.admin import admin_home
    from pkg.routes.admin import platform_analytics


    app = Flask(__name__, instance_relative_config=True, static_folder='static', template_folder='templates')
    app.config.from_pyfile("config.py")

    # db.init_app(app)
    csrf.init_app(app)
    # migrate.init_app(app, db)
    mail.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(profile)
    app.register_blueprint(home)
    app.register_blueprint(articlepage)
    app.register_blueprint(chart)
    app.register_blueprint(admin_home)
    app.register_blueprint(platform_analytics)
    return app
