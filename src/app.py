import json

import rq
from flask import Flask, render_template, request
from redis import Redis
from rq import Queue
from rq.job import Job

from src.tsp import tsp_solve

app = Flask(__name__)

redis_conn = Redis()
q = Queue(connection=redis_conn)

# Return template to fill matrix
@app.get("/")
def solver_get():
    return render_template("solver.html")


# Enqueue job and return the job id
@app.post("/")
def solver_post():
    data = request.get_json()
    distance_matrix = data["distance_matrix"]
    num_generations = data["num_generations"]
    job = q.enqueue(
        tsp_solve, distance_matrix, num_generations, job_timeout="10m", result_ttl="12h"
    )
    return job.get_id()


# Return solution or job status
@app.route("/result/<job_id>")
def results(job_id):
    try:
        job = Job.fetch(job_id, connection=redis_conn)
    except rq.exceptions.NoSuchJobError:
        return render_template("status.html", status=f"No such job: {job_id}")

    result = job.result

    if not result:
        return render_template("status.html", status=f"The job is not finished yet")

    return render_template("solution.html", data=json.loads(result))
