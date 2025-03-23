from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# USERS TABLE (Regular users who engage but don’t post articles)
class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    profile_picture = db.Column(db.String(255))
    date_signed_up = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    gems = db.Column(db.Integer, default=0)
    badges = db.Column(db.JSON, default={})  # Stores earned badges in JSON format


# ARTICLES TABLE (Stores articles written by writers)
class Article(db.Model):
    __tablename__ = 'articles'
    article_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    writer_id = db.Column(db.Integer, db.ForeignKey('writers.writer_id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    date_published = db.Column(db.DateTime, default=datetime.utcnow)
    podcast_url = db.Column(db.String(255), nullable=True)  # Not all articles will have a podcast
    youtube_link = db.Column(db.String(255), nullable=True)  # Not all articles will have a video


# COMMENTS TABLE (Users' comments on articles)
class Comment(db.Model):
    __tablename__ = 'comments'
    comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('comments.comment_id', ondelete='CASCADE'), nullable=True)  # NULL means it's a top-level comment, otherwise it's a reply
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    is_edited = db.Column(db.Boolean, default=False)  # Indicates if the comment has been edited


# ARTICLE ENGAGEMENT TABLE (Tracking how articles are being read)
class ArticleRead(db.Model):
    __tablename__ = 'article_reads'
    read_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    read_time = db.Column(db.DateTime, default=datetime.utcnow)


# PRE-COMPUTED STATS TABLE FOR ARTICLES
class ArticleReadsSummary(db.Model):
    __tablename__ = 'article_reads_summary'
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id', ondelete='CASCADE'), primary_key=True)
    total_reads = db.Column(db.Integer, default=0)
    daily_reads = db.Column(db.Integer, default=0)
    weekly_reads = db.Column(db.Integer, default=0)
    monthly_reads = db.Column(db.Integer, default=0)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)


# USERS' BOOKMARKED ARTICLES TABLE
class Bookmark(db.Model):
    __tablename__ = 'bookmarks'
    bookmark_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id', ondelete='CASCADE'), nullable=False)
    date_bookmarked = db.Column(db.DateTime, default=datetime.utcnow)


# LIKES TABLE (Users liking articles)
class Like(db.Model):
    __tablename__ = 'likes'
    like_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('articles.article_id', ondelete='CASCADE'), nullable=False)
    date_liked = db.Column(db.DateTime, default=datetime.utcnow)


# ADMIN TABLE (Superadmin - Bolaji)
class Admin(db.Model):
    __tablename__ = 'admin'
    admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


# WRITERS TABLE (Article creators)
class Writer(db.Model):
    __tablename__ = 'writers'
    writer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


# TECHNICAL ADMINS TABLE (Manages bug reports and user reports)
class TechnicalAdmin(db.Model):
    __tablename__ = 'technical_admins'
    tech_admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


# MODERATORS TABLE (Sends announcements via email)
class Moderator(db.Model):
    __tablename__ = 'moderators'
    moderator_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


# BUGs REPORTS / CONTACT MESSAGES TABLE
class Report(db.Model):
    __tablename__ = 'reports'
    report_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    report_type = db.Column(db.Enum('bug', 'general'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum('pending', 'resolved'), default='pending')
    date_submitted = db.Column(db.DateTime, default=datetime.utcnow)
