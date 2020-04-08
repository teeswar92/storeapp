import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

from sklearn.metrics import confusion_matrix
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_validate
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score
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
X1 = data20000_Std[0:16000]
XTest = data20000_Std[16000:20000]
Y1 = data20000_labels[0:16000]
YTest = data20000_labels[16000:20000]
#taking last 4k points as test data and first 16k points as train data

myList = list(range(0,50))
neighbors = list(filter(lambda x: x%2!=0, myList))  #This will give a list of odd numbers only ranging from 0 to 50

CV_Scores = []

for k in neighbors:
    KNN = KNeighborsClassifier(n_neighbors = k, algorithm = 'kd_tree')
    scores = cross_val_score(KNN, X1, Y1, cv = 5, scoring='recall')
    CV_Scores.append(scores.mean())
print(CV_Scores)
plt.figure(figsize = (14, 12))
plt.plot(neighbors, CV_Scores)
plt.title("Neighbors Vs Recall Score", fontsize=25)
plt.xlabel("Number of Neighbors", fontsize=25)
plt.ylabel("Recall Score", fontsize=25)
plt.grid(linestyle='-', linewidth=0.5)
plt.show()

best_k = neighbors[CV_Scores.index(max(CV_Scores))]
from sklearn.metrics import recall_score

KNN_best = KNeighborsClassifier(n_neighbors = best_k, algorithm = 'kd_tree')
KNN_best.fit(X1, Y1)

prediction = KNN_best.predict(XTest)
print("Accuracy: ", accuracy_score(YTest, prediction))
recallTest = recall_score(YTest, prediction)
print("Recall Score of the knn classifier for best k values of "+str(best_k)+" is: "+str(recallTest))

cm = confusion_matrix(YTest, prediction)
print(cm)
tn, fp, fn, tp = cm.ravel()
print(tn, fp, fn, tp)
# Calculating R square value of our model
from sklearn.metrics import r2_score
print("Recall Score of the knn classifier for best k values of "+str(best_k)+" is: "+str(recallTest))