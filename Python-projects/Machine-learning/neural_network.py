import pickle
import numpy as np
from tensorflow import keras
from keras.utils import to_categorical

import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense, BatchNormalization, Dropout
from keras.optimizers import SGD, Adam

# -------   Part 1: Data collection  -------

# Read MNIST data from dumped pickle
data_fname = 'mnist_fashion.pkl'

with open(data_fname,'rb') as data_file:
    x_train = pickle.load(data_file)    # (60 000, 28x28)
    y_train = pickle.load(data_file)
    x_test = pickle.load(data_file)     # (10 000, 28x28)
    y_test = pickle.load(data_file)

# normalize to 0..1 floats and flatten
x_train = x_train.astype(np.float32) / 255.0
x_test = x_test.astype(np.float32) / 255.0
x_train = x_train.reshape(len(x_train), -1)     # (60 000, 784x1)
x_test = x_test.reshape(len(x_test), -1)

# one-hot targets
y_train_oh = to_categorical(y_train, num_classes=10)
y_test_oh = to_categorical(y_test, num_classes=10)


# -------   Part 2: Model 1 -------

# # build
# model = Sequential([
#     Dense(5, input_dim=784, activation="sigmoid"),  # 5 neurons
#     Dense(10, activation="sigmoid")                 # 10 outputs
# ])

# # compile using MSE so training loss is MSE
# opt = SGD(learning_rate=0.1, momentum=0.9)
# model.compile(optimizer=opt, loss="mean_squared_error")

# # train
# history = model.fit(x_train, y_train_oh,
#                     epochs=20,              # 20 passes over data
#                     batch_size=256,         # 256 samples per batch
#                     validation_split=0.0,   # keep simple
#                     verbose=1)

# # plot training MSE
# plt.plot(history.history["loss"], label="train MSE")
# plt.xlabel("epoch")
# plt.ylabel("MSE")
# plt.legend()
# plt.show()

# # predictions & accuracy
# y_pred_prob = model.predict(x_test)
# y_pred = np.argmax(y_pred_prob, axis=1)
# acc_test = np.mean(y_pred == y_test)

# y_pred_train = np.argmax(model.predict(x_train), axis=1)
# acc_train = np.mean(y_pred_train == y_train)
# print(f"Training accuracy: {acc_train:.3f}, Test accuracy: {acc_test:.3f}")
# print()
# print()


# -------   Part 3: Model 2 -------

# build
model2 = Sequential([
    Dense(512, activation="relu"),                      # 128 neurons
    BatchNormalization(),                               # normalization
    Dropout(0.2),                                       # dropout
    Dense(256, activation="relu"),                      # 64 neurons
    BatchNormalization(),                               # normalization
    Dropout(0.1),
    Dense(128, activation="relu"),
    BatchNormalization(),
    Dropout(0.1),
    Dense(10, activation="softmax")                     # 10 outputs
])

model2.compile(optimizer=Adam(learning_rate=0.001),
               loss="categorical_crossentropy",
               metrics=["accuracy"])

# train
history2 = model2.fit(x_train, y_train_oh,
                      epochs=50,
                      batch_size=128,
                      validation_split=0.1,
                      verbose=1)

# plot training & validation accuracy
# plt.figure()
# plt.plot(history2.history["loss"], label="train loss")
# plt.plot(history2.history["val_loss"], label="val loss")
# plt.legend()
# plt.show()

# plt.figure()
# plt.plot(history2.history["accuracy"], label="train accuracy")
# plt.plot(history2.history["val_accuracy"], label="val accuracy")
# plt.legend()
# plt.show()

# test accuracy
y_pred2 = np.argmax(model2.predict(x_test), axis=1)
acc2 = np.mean(y_pred2 == y_test)

print(f"Test accuracy: {acc2:.3f} ≈ {acc2 * 100:.1f}%")

# save the model
np.savetxt("PRED_mlp.dat", y_pred2, fmt="%d")