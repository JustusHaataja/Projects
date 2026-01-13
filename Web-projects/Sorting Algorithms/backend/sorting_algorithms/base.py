from typing import List, Dict, Any
from abc import ABC, abstractmethod

class SortingAlgorithm(ABC):
    """
    Abstract base class for all sorting algorithms.
    Provides structure for recording and returning visualization steps.
    """

    def __init__(self, array: List[int]):

        # keep a copy so original array isn't modified
        self.array = array.copy()

        # steps: a list of events (compare, swap, overwrite, done)
        self.steps: List[Dict[str, Any]] = []


    @abstractmethod
    def sort(self) -> List[int]:
        """
        Sort the array and return the sorted list.
        Must be implemented in subclass.
        """
        pass

    def get_steps(self) -> List[Dict[str, Any]]:
        # Return the list of recorded steps for visualization.
        return self.steps