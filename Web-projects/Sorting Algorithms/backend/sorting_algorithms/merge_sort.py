"""
Merge Sort

Average Time Complexity: O(n log n)
Worst Time Complexity: O(n log n)
Best Time Complexity: O(n log n)

"""

import time
from .base import SortingAlgorithm

class MergeSort(SortingAlgorithm):

    def sort(self):
        start_time = time.time()

        self._merge_sort(0, len(self.array) - 1)

        end_time = time.time()
        elapsed_time = end_time - start_time

        self.steps.append({ "type": "done", "array": self.array.copy(),
                            "time": str(elapsed_time )})
        return self.steps

    def _merge_sort(self, left: int, right: int):
        if left < right:
            mid = (left + right) // 2
            self._merge_sort(left, mid)
            self._merge_sort(mid + 1, right)
            self._merge(left, mid, right)

    def _merge(self, left: int, mid: int, right: int):
        L = self.array[left:mid + 1]
        R = self.array[mid + 1:right + 1]
        i = j = 0
        k = left

        while i < len(L) and j < len(R):
            # Compare step
            self.steps.append({
                "type": "compare",
                "indices": [left + 1, mid + 1 + j],
                "array": self.array.copy()
            })

            if L[i] <= R[j]:
                self.array[k] = L[i]
                i += 1
            else:
                self.array[k] = R[j]
                j += 1

            # Overwrite step
            self.steps.append({
                "type": "overwrite",
                "indices": [k],
                "values": [self.array[k]],
                "array": self.array.copy()
            })
            k += 1

        while i < len(L):
            self.array[k] = L[i]
            self.steps.append({
                "type": "overwrite",
                "indices": [k],
                "values": [L[i]],
                "array": self.array.copy()
            })
            i += 1
            k += 1

        while j < len(R):
            self.array[k] = R[j]
            self.steps.append({
                "type": "overwrite",
                "indices": [k],
                "values": [R[j]],
                "array": self.array.copy()
            })
            j += 1
            k += 1