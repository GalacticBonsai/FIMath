from flask import Blueprint, render_template

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("index.html")

@views.route("/engine")
def engine():
    return render_template("engine.html")

@views.route("/boosted")
def boosted():
    return render_template("boosted.html")

@views.route("/explained")
def explained():
    return render_template("explained.html")