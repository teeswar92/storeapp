import pandas as pd
import numpy as np
import seaborn as sns
from scipy import stats
import matplotlib.pyplot as plt
from pyod.models.knn import KNN
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
X_train = data20000_Std[0:16000,1:2]
X_test = data20000_Std[16000:20000, 1:2]
y_train = data20000_labels[0:16000]
y_test = data20000_labels[16000:20000]
#let's plot our train and test set
knn=KNN(contamination=outlier_fraction)
knn.fit(X_train)
# get the prediction labels and outlier scores of the training data
y_train_pred = knn.labels_  
y_train_scores = knn.decision_scores_ 
# get the prediction on the test data
y_test_pred = knn.predict(X_test)  
y_test_scores = knn.decision_function(X_test)
# no of errors in test set
n_errors = (y_test_pred != y_test).sum()
from pyod.utils import example
example.visualize(knn, X_train, y_train, X_test, y_test, y_train_pred, y_test_pred, show_figure=True, save_figure=False)
plt.show()