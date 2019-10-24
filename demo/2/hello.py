from flask import Flask, Response, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session,sessionmaker
import json
from flask_cors import CORS
import os



engine = create_engine("mysql://root:test@localhost:3306/company")
db = scoped_session(sessionmaker(bind=engine))
print( db.execute("SELECT * FROM info").fetchall())