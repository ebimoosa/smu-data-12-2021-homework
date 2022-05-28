import numpy as np
import pandas as pd
from flask import Flask, jsonify
from sqlalchemy import create_engine

# Setup

app = Flask(__name__)
path = 'sqlite:///hawaii.sqlite'
engine = create_engine(path)

# routes

@app.route('/')
def home():
    '''Hawaii Climate API routes.'''
    return(
        f"Available Routes:<br/>"
        f"/api/v1.0/percipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start/end"
    )

@app.route("/api/v1.0/precipitation")
def prcp():
    conn = engine.connect()
    query = """
        select
            date,
            station,
            prcp
        from
            measurement
        order by
            date asc,
            station asc;
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/stations")
def stations():
    conn = engine.connect()
    query = """
        select
            station
        from
            measurement;
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/tobs")
def tobs():
    conn = engine.connect()
    query = """ 
        select
            date,
            tobs
        from
            measurement
        where
            station == 'USC00519281' and date between '2016-08-23' and '2017-08-23'  
        order by
            date;
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

# Prof Booth
@app.route("/api/v1.0/<start>/<end>")
def range(start, end):
    conn = engine.connect()
    query = f"""
        select
            min(tobs) as minTemp,
            max(tobs) as maxTemp,
            avg(tobs) as avgTemp
        from
            measurement
        where
            date >= '{start}'
            and date <= '{end}';
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))


if __name__ == '__main__':
    app.run(debug=True)