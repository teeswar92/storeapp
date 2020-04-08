import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.neighbors import LocalOutlierFactor

data = pd.read_csv("creditcard.csv")
# sampling random 50000 points
data_50000 = data.sample(n = 50000)
data_50000.to_csv("NewCreditCard.csv")
newData = pd.read_csv("NewCreditCard.csv")
FinalData = newData.drop("Unnamed: 0", axis = 1)

def estimate_gaussian(dataset):

    mu = np.mean(dataset)#moyenne cf mu
    sigma = np.std(dataset)#écart_type/standard deviation
    limit = sigma * 1.5

    min_threshold = mu - limit
    max_threshold = mu + limit

    return mu, sigma, min_threshold, max_threshold

mu, sigma, min_threshold, max_threshold = estimate_gaussian(FinalData['V1'].values)

xs = FinalData['V1']
ys = FinalData['Class']

for x, y in zip(xs, ys):
    color = 'blue'  # non-outlier color
    if not min_threshold <= y <= max_threshold:  # condition for being an outlier
        color = 'red'  # outlier color
    plt.scatter(x, y, color=color)
plt.show()