import numpy as np
from matplotlib import pyplot as plt
import pickle


# ------------------------------
# Load and preprocess data
# ------------------------------
data_fname = 'mnist_fashion.pkl'

with open(data_fname,'rb') as data_file:
    x_train = pickle.load(data_file)    # (60 000, 28x28)
    y_train = pickle.load(data_file)
    x_test = pickle.load(data_file)     # (10 000, 28x28)
    y_test = pickle.load(data_file)

# normalize to 0..1 floats and flatten
x_train = x_train.astype(np.float32) / 255.0
x_train = x_train.reshape(len(x_train), -1)

x_test = x_test.astype(np.float32) / 255.0
x_test = x_test.reshape(len(x_test), -1)

# shuffle before splitting
indices = np.arange(len(x_train))
np.random.shuffle(indices)

x_train = x_train[indices]
y_train = y_train[indices]

# split dev (1000) and training (59000)
x_dev, y_dev = x_train[:1000], y_train[:1000]
x_train, y_train = x_train[1000:], y_train[1000:]

# transpose so columns are samples
x_train = x_train.T   # (784, 59000)
y_train = y_train     # (59000,)
x_dev   = x_dev.T     # (784, 1000)
y_dev   = y_dev       # (1000,)
x_test  = x_test.T    # (784, 10000)
y_test  = y_test      # (10000,)


# ------------------------------
# Neural network functions
# ------------------------------
def init_params():
    W1 = np.random.randn(10, 784) * np.sqrt(2/784)
    b1 = np.zeros((10,1))
    W2 = np.random.randn(10, 10) * np.sqrt(2/784)
    b2 = np.zeros((10,1))
    
    return W1, b1, W2, b2


def ReLU(Z):
    return np.maximum(0, Z)


def softmax(Z):
    shift_Z = Z - np.max(Z, axis=0, keepdims=True)
    exp_Z = np.exp(shift_Z)
    return exp_Z / np.sum(exp_Z, axis=0, keepdims=True)


def forward_prop(W1, b1, W2, b2, X):
    Z1 = W1.dot(X) + b1
    A1 = ReLU(Z1)
    Z2 = W2.dot(A1) + b2
    A2 = softmax(Z2)
    
    return Z1, A1, Z2, A2


def one_hot(Y):
    one_hot_Y = np.zeros((Y.size, Y.max() + 1))
    one_hot_Y[np.arange(Y.size), Y] = 1

    return one_hot_Y.T


def deriv_ReLU(Z):
    return Z > 0


def back_prop(Z1, A1, Z2, A2, W2, X, Y):
    m = Y.size
    one_hot_Y = one_hot(Y)

    dZ2 = A2 - one_hot_Y
    dW2 = 1 / m * dZ2.dot(A1.T)
    db2 = 1 / m * np.sum(dZ2, axis=1, keepdims=True)

    dZ1 = W2.T.dot(dZ2) * deriv_ReLU(Z1)
    dW1 = 1 / m * dZ1.dot(X.T)
    db1 = 1 / m * np.sum(dZ1, axis=1, keepdims=True)

    return dW1, db1, dW2, db2


def update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha):
    W1 -= alpha * dW1
    b1 -= alpha * db1
    W2 -= alpha * dW2
    b2 -= alpha * db2

    return W1, b1, W2, b2


def get_predictions(A2):
    return np.argmax(A2, axis=0)


def get_accuracy(predictions, Y):
    return np.sum(predictions == Y) / Y.size


def get_batches(X, Y, batch_size=512):
    m = X.shape[1]      # number of samples (columns)
    for i in range(0, m, batch_size):
        X_batch = X[:, i:i+batch_size]
        Y_batch = Y[i:i+batch_size]
        yield X_batch, Y_batch


def gradient_descent(X, Y, iterations, alpha, batch_size=512):
    W1, b1, W2, b2 = init_params()
    acc_history = []

    for epoch in range(iterations):
        for X_batch, Y_batch in get_batches(X, Y, batch_size):
            Z1, A1, Z2, A2 = forward_prop(W1, b1, W2, b2, X_batch)
            dW1, db1, dW2, db2 = back_prop(Z1, A1, Z2, A2, W2, X_batch, Y_batch)
            W1, b1, W2, b2 = update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha)

        if epoch % 100 == 0:
            _, _, _, A2_full = forward_prop(W1, b1, W2, b2, X)
            acc = get_accuracy(get_predictions(A2_full), Y)
            acc_history.append(acc)
            print(f"Epochs {epoch}, accuracy: {acc:.4f}")
                
    return W1, b1, W2, b2, acc_history
    

# ------------------------------
# Train
# ------------------------------
W1, b1, W2, b2, acc_history = gradient_descent(
    x_train, y_train, iterations=2000, alpha=0.1, batch_size=512)


# ------------------------------
# Evaluate
# ------------------------------
_, _, _, A2_test = forward_prop(W1, b1, W2, b2, x_test)
test_acc = get_accuracy(get_predictions(A2_test), y_test)
print(f"Test accuracy: {test_acc:.4f}")


# ------------------------------
# Predictions
# ------------------------------
def make_predictions(X, W1, b1, W2, b2):
    _, _, _, A2 = forward_prop(W1, b1, W2, b2, X)
    predictions = get_predictions(A2)
    return predictions

def test_prediction(index, W1, b1, W2, b2):
    current_image = x_train[:, index, None]
    prediction = make_predictions(x_train[:, index, None], W1, b1, W2, b2)
    label = y_train[index]
    print("Prediction: ", prediction)
    print("Label: ", label)
    
    current_image = current_image.reshape((28, 28)) * 255
    plt.gray()
    plt.imshow(current_image, interpolation='nearest')
    plt.show()


## Show predictions
# test_prediction(0, W1, b1, W2, b2)
# test_prediction(1, W1, b1, W2, b2)
# test_prediction(2, W1, b1, W2, b2)
# test_prediction(3, W1, b1, W2, b2)

# # Save predictions
# y_pred_test = make_predictions(x_test, W1, b1, W2, b2)
# np.savetxt("PRED2_mlp.dat", y_pred_test, fmt="%d")