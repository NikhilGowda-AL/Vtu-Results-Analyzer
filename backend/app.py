from flask import Flask, jsonify, request
from captcha import fetch_data
from results import fetch_results
from sgpa import fetch_sgpa
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"])
def health():
    return "Server is running. Make any requests!"

@app.route("/captcha", methods=["GET"])
def captcha():
    data = fetch_data()
    return jsonify(data)

@app.route("/results", methods=["POST"])
def result():
    results,name = fetch_results()
    sgpa = fetch_sgpa(results)
    return jsonify({"results":results, "sgpa":sgpa,"name":name})

if __name__ == '__main__':
    app.run(debug=True)
