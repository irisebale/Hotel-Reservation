from flask import Flask, url_for, jsonify, request, render_template, send_from_directory
from flask_httpauth import HTTPBasicAuth
import sys, os, flask
import model

app = Flask(__name__)
auth = HTTPBasicAuth()

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def spcall(qry, param, commit=False):
    try:
        dbo = model.DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res


@auth.get_password
def getpassword(username):
    return 'akolagini'


@app.route('/login/', methods=['POST'])
def login():

    params = request.get_json()
    password = params["password"]
    username = params["username"]

    res = spcall('login', (username, password), True)
    print res
    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error'})

    return jsonify({'status': 'ok'})


@app.route('/reserve/', methods=['POST'])
def reserves():

    params = request.get_json()
    hname = params["hname"]
    firstname = params["firstname"]
    lastname = params["lastname"]
    contactnum = params["contactnum"]
    roomsize = params["roomsize"]
    checkin = params["checkin"]
    checkout = params["checkout"]
    duration = params["duration"]
    roomnum = params["roomnum"]

    res = spcall('reserves', (hname, firstname, lastname, contactnum, roomsize, checkin, checkout, duration, roomnum), True)
    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/view_profile', methods=['GET'])
def view():
    res = spcall('view', (), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
        recs.append({"hname": str(r[0]), "firstname": str(r[1]), "lastname": str(r[2]), "contactnum": str(r[3]), "roomsize": str(r[4]), "checkin": str(r[5]), "checkout": str(r[6]), "duration": str(r[7]), "roomnum": str(r[8])})
    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.route('/delete_reservation1', methods=['POST'])
def delete_reservation():

    res = spcall("delete_reservation", ('1'), True)

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/search/', methods=['GET', 'POST', 'PUT'])
def searchhot():

    params = request.get_json()
    hotelnames = params["hotelnames"]

    res = spcall('searchhotel', (hotelnames, 'random'), True)
    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []

    for r in res:
        recs.append({"hotelnames": r[0], "address": r[1], "contact_num": r[2], "price": r[3]})

    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})


@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.run(threaded=True, debug=True)