"""
Counting Sort

Average Time Complexity: O(n + k)
Worst Time Complexity: O(n + k)
Best Time Complexity: O(n + k)

Where n is the number of elements in the input array and 
k is the range of the input values.
"""

import time
from .base import SortingAlgorithm

class CountingSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()

        if not self.array:
            end_time = time.time()
            elapsed_time = end_time - start_time
            self.steps.append({ "type": "done", "array": [],
                                "time": str(elapsed_time) })
            return []
        
        max_value = max(self.array)
        count = [0] * (max_value + 1)

        # count occurances
        for i, num in enumerate(self.array):
            count[num] += 1
            self.steps.append({ "type": "overwrite", "indices": [num],
                                "values": [count[num]], "array": self.array.copy() })
        
        # build output array
        index = 0
        for num, freq in enumerate(count):
            for _ in range(freq):
                self.array[index] = num
                self.steps.append({ "type": "overwrite", "indices": [index],
                                    "values": [num], "array": self.array.copy() })
                index += 1
        
        end_time = time.time()
        elapsed_time = end_time - start_time
        self.steps.append({ "type": "done",
                            "array": self.array.copy(),
                            "time": str(elapsed_time) })
        
        return self.steps