from flask import Flask, render_template, request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()

import os 

app = Flask(__name__)
# globally enable CORS for avoiding any funky problems locally
CORS(app)

app.config['MYSQL_DATABASE_HOST'] = os.environ.get('MYSQL_DATABASE_HOST')
app.config['MYSQL_DATABASE_USER'] = os.environ.get('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] = os.environ.get('MYSQL_DATABASE_DB')



mysql = MySQL()
mysql.init_app(app)




# @app.route('/')
# def index():
#     return render_template("index.html")


@app.route('/api/v1/comments' , methods=['GET'])
def test_comments():
    cur = mysql.get_db().cursor()
    comments = cur.execute('SELECT * FROM comments;')
    return jsonify(cur.fetchall())

@app.route('/create_DB' , methods=['GET'])
def create_DB():
    cur = mysql.get_db().cursor()
    comments = cur.execute("""CREATE TABLE `comments` (
        `id` MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
        `author` VARCHAR(255) NULL DEFAULT NULL,
        `date` DATE NULL DEFAULT NULL,
        `content` TEXT NULL DEFAULT NULL,
        `author_email` VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (`id`) USING BTREE
    );""")
    return jsonify(cur.fetchall())

@app.route('/api/v1/comments/add' , methods=['POST'])
def add_comment():
    # make sure to receive the comment to add
    comment = request.json['comment']
    authorName = request.json['authorName']
    authorEmail = request.json['authorEmail']
    date = request.json['date']
    print(comment.encode("utf-8")) #can't be printed out (gives an error) unless encoded to utf-8 
    print(authorName)
    print(authorEmail)
    print(date)
    cur = mysql.get_db().cursor()
    commentAdd = cur.execute("INSERT INTO comments(author, author_email, content, date) VALUES(%s,%s,%s,%s)", (authorName, authorEmail, comment, date))
    mysql.get_db().commit()
    comments = cur.execute('SELECT * FROM comments;')
    return  jsonify(cur.fetchall())






if __name__=="__main__":
    app.run()

