from pyswip import Prolog

from multiprocessing import Pool

def initialise():
    global prolog
    from pyswip import Prolog
    prolog = Prolog()


def dowork():
    global prolog
    pool = Pool(None, initialise)
    prolog.assertz("padre(jesus, debian)")
    return list(prolog.query('padre(X,Y)'))

def enfermedades():
    initialise()
    return dowork()
