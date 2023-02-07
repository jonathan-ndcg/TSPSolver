# TSPSolver

Website to solve the [traveling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) using genetic algorithms.

![example](https://user-images.githubusercontent.com/124545488/217144468-386c6819-ae0b-4e5c-b884-5a3f99f84b1e.png)

## Built With

* Python
* [Flask](https://flask.palletsprojects.com/en/2.2.x/)
* [DEAP](https://github.com/deap/deap)
* [Redis](https://redis.io/)
* HTML
* CSS
* JavaScript
* [Bootstrap](https://getbootstrap.com/)

## Installation

1. Clone the repo and cd into the directory:

```sh
git clone https://github.com/jonathan-ndcg/TSPSolver.git
cd TSPSolver
```

2. Install dependencies:

```sh
pip install -r requirements.txt
```

3. Install [Redis](https://redis.io/docs/getting-started/installation/)

## Usage

1. Start the Redis server:

```sh
redis-server
```

2. Run the RQ Worker

```sh
rq worker
```

3. Type the below command to run the app: 

```sh
flask --app src.app run
```

4. In a browser, go to [http://localhost:5000/](http://localhost:5000/)
