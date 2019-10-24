from flask import Flask, render_template, session, redirect, url_for
from flask_session import Session
from tempfile import mkdtemp
import numpy as np


app = Flask(__name__)

app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

def myfilter(x):
    if x== "X": return 1
    if x == "Y": return -1
    else: return 0

def check_game_state(board_sess):

    board_sess_new = []
    for item in board_sess:
        board_sess_new.append ( list(map(myfilter, item)) )
    
    print(board_sess_new)

    board_sess = board_sess_new
        
    board_np =np.array(board_sess)
    winner = [False, None]
    diag_rows = board_np [ range(0,3) , range(0,3)  ] , board_np [ range(0,3) , range(2,-1, -1) ]

    for board in [board_np, board_np.T, diag_rows ]:
        for row in board:
            result = sum(row)    
            if result in [3,-3]:
                winner[0] = True 
                winner[1] = "X" if result == 3 else "Y"
                break

    return(winner)

@app.route("/")
def index():

    if "board" not in session:
        session["board"] = [ [0]*3 , [0]*3, [0]*3  ]
        session["turn"] = "X"

    result = check_game_state(session["board"])

    if result[0] == True :
        session["board"] = [ [0]*3 , [0]*3, [0]*3  ]
        session["turn"] = "X"

    return render_template("game.html", game = session["board"], turn = session["turn"], result=result)

@app.route("/play/<int:row>/<int:col>")
def play(row, col):

    print(row,col)

    if session["turn"] == "X":
        session["turn"] = "Y"
        session["board"][row][col] = "X"
    else:
        session["turn"] = "X"
        session["board"][row][col] = "Y"

    return redirect(url_for("index"))

@app.route("/reset")
def reset():
    session["board"] = [ [0]*3 , [0]*3, [0]*3  ]
    session["turn"] = "X"

    result = check_game_state(session["board"])

    return render_template("game.html", game = session["board"], turn = session["turn"],result=result)

# @app.route("/undo")
# def undo():

