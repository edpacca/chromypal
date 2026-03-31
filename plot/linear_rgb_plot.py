import matplotlib.pyplot as plt
import numpy as np

red = [1, 1, 0, 0, 0, 1, 1]
green = [0, 1, 1, 1, 0, 0, 0]
blue = [0, 0, 0, 1, 1, 1, 0]

def plot():
    x = np.linspace(0, 1.0, len(red))
    linear_map = [x for x  in range(len(red))]
    sum_values = [red[x] + green[x] + blue[x] for x in range(0, len(red))]

    plt.figure(figsize=(10, 6))
    plt.plot(x, red, 'r-o', label='Red', linewidth=2, markersize=0)
    plt.plot(x, green, 'g-o', label='Green', linewidth=2, markersize=0)
    plt.plot(x, blue, 'b-o', label='Blue', linewidth=2, markersize=0)
    plt.plot(x, sum_values, color="black", label="Sum", linewidth=1, markersize=0)
    plt.plot(x, linear_map, color="lightgrey", label="linear map", linewidth=1, markersize=0)

    plt.ylabel('Value')
    plt.xticks(x, labels=[])
    plt.yticks(np.arange(0, 2, 1.0))
    plt.title('RGB Line Plot')
    plt.legend()
    plt.tight_layout()
    plt.margins(0, 0)
    plt.grid(True)
    plt.show()
