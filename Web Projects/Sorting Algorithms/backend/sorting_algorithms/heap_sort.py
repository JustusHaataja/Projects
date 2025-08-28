"""
Heap Sort

Average Time Complexity: O(n log n)
Worst Time Complexity: O(n log n)
Best Time Complexity: O(n log n)

"""

import time
from .base import SortingAlgorithm

class HeapSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()
        n = len(self.array)

        # build max-heap
        for i in range(n // 2 - 1, -1, -1):
            self._heapify(n, i)
        
        # extract elements one by one
        for i in range(n-1, 0, -1):
            self.array[0], self.array[i] = self.array[i], self.array[0]
            self.steps.append({ "type": "swap", "indices": [0, i],
                                "array": self.array.copy() })
            self._heapify(i ,0)

        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time) })
        
        return self.steps
    

    def _heapify(self, n, i):
        
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n:
            self.steps.append({ "type": "compare", "indices": [left, largest],
                                "array": self.array.copy() })
            if self.array[left] > self.array[largest]:
                largest = left
        
        if right < n:
            self.steps.append({ "type": "compare", "indices": [right, largest],
                                "array": self.array.copy() })
            
            if self.array[right] > self.array[largest]:
                largest = right

        if largest != i:
            self.array[i], self.array[largest] = self.array[largest], self.array[i]
            self.steps.append({ "type": "swap", "indices": [i, largest],
                                "array": self.array.copy() })
            self._heapify(n, largest)