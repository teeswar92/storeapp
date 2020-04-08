import pandas as pd
import numpy as np
import seaborn as sns
from scipy import stats
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_validate
outlier_fraction = 0.1 
data = pd.read_csv("creditcard.csv")
print(data.shape)
print(data.head())
print(data["Class"].value_counts())
data_20000 = data[:20000]
data20000 = data_20000.drop(['Class'], axis=1)
data20000_labels = data_20000["Class"]
data20000_Std = StandardScaler().fit_transform(data20000)
print(data20000_Std.shape)
print(type(data20000_Std))
X_train = data20000_Std[0:16000]
X_test = data20000_Std[16000:20000]
y_train = data20000_labels[0:16000]
y_test = data20000_labels[16000:20000]
# Generate some fake data clusters
# subsetting just the odd ones
myList = list(range(1,50))
neighbors = filter(lambda x: x % 2 != 0, myList)

# empty list that will hold cv scores
cv_scores = []

# perform 10-fold cross validation
for k in neighbors:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores = cross_val_score(knn, X_train, y_train, cv=10, scoring='accuracy')
    cv_scores.append(scores.mean())





#Finally: PLOT Misclassification error vs k
# changing to misclassification error
MSE = [1 - x for x in cv_scores]
# determining best k
optimal_k = neighbors[MSE.index(min(MSE))]
print("The optimal number of neighbors is %d" % optimal_k)
# plot misclassification error vs k
plt.plot(neighbors, MSE)
plt.xlabel('Number of Neighbors K')
plt.ylabel('Misclassification Error')
plt.show()