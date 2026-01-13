"""
Insertion Sort

Average Time Complexity: O(n^2)
Worst Time Complexity: O(n^2)
Best Time Complexity: O(n)

"""

import time
from .base import SortingAlgorithm

class InsertionSort(SortingAlgorithm):

    def sort(self):

        start_time = time.time()

        for i in range(1, len(self.array)):
            key = self.array[i]
            j = i - 1

            # compare key with elements in sorted part
            while j >= 0:
                self.steps.append({ "type": "compare", "indices": [j,i],
                                    "array": self.array.copy() })
                
                if self.array[j] > key:
                    self.array[j+1] = self.array[j]
                    self.steps.append({ "type": "overwrite", "indices": [j+1],
                                        "values": [self.array[j]],
                                        "array": self.array.copy() })
                    j -= 1
                
                else:
                    break
            
            self.array[j+1] = key
            self.steps.append({ "type": "overwrite", "indices": [j+1],
                                "values": [key], "array": self.array.copy() })
            
        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time) })
        return self.steps