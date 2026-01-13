"""
Bogo Sort

Average Time Complexity: O((n+1)!)
Worst Time Complexity: Theretically infinite (due to random nature)
Best Time Complexity: O(n) (if already sorted on the first try)

"""

import random
import time
from .base import SortingAlgorithm

class BogoSort(SortingAlgorithm):

    def sort(self):
        a = self.array[:]
        shuffle_count = 0
        max_shuffle = 500
        start_time = time.time()

        while not self.is_sorted(a) and shuffle_count < max_shuffle:
            random.shuffle(a)
            self.steps.append({ "type": "swap", "array": a[:] })
            shuffle_count += 1
        
        end_time = time.time()
        elapsed_time = end_time - start_time
        self.steps.append({ "type": "done", "array": a[:] })
        return self.steps
    

    def is_sorted(self, a):
        return all(a[i] <= a[i+1] for i in range(len(a)-1))