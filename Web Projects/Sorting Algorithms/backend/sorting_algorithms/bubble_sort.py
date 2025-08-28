"""
Bubble Sort

Average Time Complexity: O(n^2)
Worst Time Complexity: O(n^2)
Best Time Complexity: O(n)

"""

import time
from .base import SortingAlgorithm

class BubbleSort(SortingAlgorithm):
    
    def sort(self):
        n = len(self.array)
        a = self.array[:]

        start_time = time.time()

        for i in range(n):
            swapped = False
            for j in range(0, n - i - 1):
                if a[j] > a[j+1]:
                    a[j], a[j+1] = a[j+1], a[j]
                    swapped = True
                
                # record the state after each swap/comparison
                self.steps.append({ "type": "swap", "indices": [i, j + 1],
                                    "array": a[:] })
                
            if not swapped:
                break

        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "indices": [i, j + 1],
                            "array": a[:], "time": str(elapsed_time) })
        
        return self.steps