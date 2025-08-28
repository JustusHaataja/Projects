"""
Radix Sort (LSD = Least Significant Digit)

Average Time Complexity: O(d(n+k))
Worst Time Complexity: O(d(n+k))
Best Time Complexity: O(nk)

Where d is the number of digits in the largest number, n is the size of the array
and k is the range of the input (0 to 9 for decimal numbers).

"""

import time
from .base import SortingAlgorithm

class RadixSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()

        if not self.array:
            end_time = time.time()
            elapsed_time = end_time - start_time
            self.steps.append({ "type": "done", "array": [], 
                                "time": str(elapsed_time) })
            return []
        
        max_value = max(self.array)
        exp = 1     # exponent (1, 10, 100, ...)

        while max_value // exp > 0:
            self._counting_sort(exp)
            exp *= 10

        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time) })
        return self.steps
    

    def _counting_sort(self, exp):

        n = len(self.array)
        output = [0] * n
        count = [0] * 10

        # count occurances of digits
        for i in range(n):
            index = (self.array[i] // exp) % 10
            count[index] += 1
            self.steps.append({ "type": "overwrite", "indices": [i],
                                "values": [self.array[i]],
                                "array": self.array.copy() })
        
        # update the count[i] to store positions
        for i in range(1, 10):
            count[i] += count[i-1]

        # build output array
        i = n - 1
        while i >= 0:
            index = (self.array[i] // exp) % 10
            output[count[index] - 1] = self.array[i]
            count[index] -= 1
            i -= 1

        # copy to original array
        for i in range(n):
            self.array[i] = output[i]
            self.steps.append({ "type": "overwrite", "indices": [i],
                                "values": [output[i]],
                                "array": self.array.copy() })