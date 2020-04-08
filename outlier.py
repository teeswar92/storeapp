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
lof = LocalOutlierFactor(n_neighbors=2, algorithm='auto', metric='minkowski', p=2, metric_params=None, contamination=0.5, n_jobs=1)
outlierArray = lof.fit_predict(FinalData)
print(outlierArray)

countOutliers = 0
countInliers = 0
for i in range(50000):
    if outlierArray[i] == -1:
        countOutliers += 1
    else:
        countInliers += 1
print("Total number of outliers = "+str(countOutliers))
print("Total number of inliers = "+str(countInliers))

FinalData2 = FinalData.copy()
#remove outliers
for i in range(50000):
    if outlierArray[i] == -1:
        FinalData.drop(i, inplace = True)

fig = plt.figure(figsize = (16,6))

plt.subplot(1, 2, 1)
plt.title("Before removing outliers for column V1")
ax = sns.boxplot(x="Class", y = "V1", data= FinalData2, hue = "Class")

plt.subplot(1, 2, 2)
plt.title("After removing outliers for column V1")
ax = sns.boxplot(x="Class", y = "V1", data= FinalData, hue = "Class")        
plt.show()