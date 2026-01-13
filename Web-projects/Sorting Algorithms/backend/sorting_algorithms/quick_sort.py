"""
Quick Sort

Average Time Complexity: O(n log n)
Worst Time Complexity: O(n^2)
Best Time Complexity: O(n log n)

"""

import time
import random
from .base import SortingAlgorithm

class QuickSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()
        self._quick_sort(0, len(self.array)-1)

        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time) })

        return self.steps
    

    def _quick_sort(self, low: int, high: int):

        if low < high:
            pivot_index = self._partition(low, high)
            self._quick_sort(low, pivot_index - 1)
            self._quick_sort(pivot_index + 1, high)


    def _partition(self, low: int, high: int) -> int:
        # random pivot point for better performance
        pivot_index = random.randint(low, high)
        self.array[pivot_index], self.array[high] = self.array[high], self.array[pivot_index]
        pivot = self.array[high]

        i = low - 1
        for j in range(low, high):
            self.steps.append({ "type": "compare", "indices": [j, high],
                                "array": self.array.copy() })
            if self.array[j] <= pivot:
                i += 1
                self.array[i], self.array[j] = self.array[j], self.array[i]
                self.steps.append({ "type": "swap", "indices": [i, j],
                                    "array": self.array.copy() })
        
        self.array[i+1], self.array[high] = self.array[high], self.array[i+1]
        self.steps.append({ "type": "swap", "indices": [i+1, high],
                            "array": self.array.copy() })
        
        return i + 1