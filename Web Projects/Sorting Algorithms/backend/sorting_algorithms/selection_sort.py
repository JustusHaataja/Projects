"""
Selection Sort

Average Time Complexity: O(n^2)
Worst Time Complexity: O(n^2)
Best Time Complexity: O(n^2)

"""

import time
from .base import SortingAlgorithm

class SelectionSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()

        n = len(self.array)

        for i in range(n):
            min_index = i

            for j in range(i + 1, n):
                # record compare
                self.steps.append({ "type": "compare", "indices": [min_index, j],
                                    "array": self.array.copy() })
                
                if self.array[j] < self.array[min_index]:
                    min_index = j
            
            if min_index != i:
                # swap
                self.array[i], self.array[min_index] = self.array[min_index], self.array[i]
                self.steps.append({ "type": "swap", "indices": [i, min_index],
                                    "array": self.array.copy() })
        
        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time) })
        return self.steps