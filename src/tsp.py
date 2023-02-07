import json
import random

from deap import algorithms, base, creator, tools

# Type for minimizing distance
creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

# Calculate distance of a given path
def evalTSP(individual, distance_matrix):
    distance = distance_matrix[individual[-1]][individual[0]]
    for index1, index2 in zip(individual[0:-1], individual[1:]):
        distance += distance_matrix[index1][index2]
    return (distance,)


def toolbox_setup(distance_matrix):
    toolbox = base.Toolbox()

    # Attribute generator
    ind_size = len(distance_matrix)
    toolbox.register("indices", random.sample, range(ind_size), ind_size)

    # Structure initializers
    toolbox.register(
        "individual", tools.initIterate, creator.Individual, toolbox.indices
    )
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    # Choose operators
    toolbox.register("mate", tools.cxPartialyMatched)
    toolbox.register("mutate", tools.mutShuffleIndexes, indpb=0.05)
    toolbox.register("select", tools.selTournament, tournsize=3)
    toolbox.register("evaluate", evalTSP, distance_matrix=distance_matrix)

    return toolbox


# Solve TSP and return json with solution
def tsp_solve(distance_matrix, num_generations):
    toolbox = toolbox_setup(distance_matrix)
    pop = toolbox.population(n=300)
    hof = tools.HallOfFame(1)
    algorithms.eaSimple(pop, toolbox, 0.7, 0.2, num_generations, halloffame=hof)

    result = {
        "distance_matrix": distance_matrix,
        "num_generations": num_generations,
        "path": hof[0],
        "cost": hof[0].fitness.values[0],
    }
    return json.dumps(result)
