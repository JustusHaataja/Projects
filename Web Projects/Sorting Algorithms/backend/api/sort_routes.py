from fastapi import APIRouter
from pydantic import BaseModel

from sorting_algorithms.bogo_sort import BogoSort
from sorting_algorithms.bubble_sort import BubbleSort
from sorting_algorithms.counting_sort import CountingSort
from sorting_algorithms.heap_sort import HeapSort
from sorting_algorithms.insertion_sort import InsertionSort
from sorting_algorithms.merge_sort import MergeSort
from sorting_algorithms.quick_sort import QuickSort
from sorting_algorithms.radix_sort import RadixSort
from sorting_algorithms.selection_sort import SelectionSort

router = APIRouter()

# Request body model
class SortRequest(BaseModel):
    algorithm: str
    array: list[int]

# Map algorithm names to classes
algorithm_map = {
    "bogo": BogoSort,
    "bubble": BubbleSort,
    "counting": CountingSort,
    "heap": HeapSort,
    "insertion": InsertionSort,
    "merge": MergeSort,
    "quick": QuickSort,
    "radix": RadixSort,
    "selection": SelectionSort
}


@router.post("/sort")
def sort_array(request: SortRequest):
    algo_class = algorithm_map.get(request.algorithm.lower())
    if not algo_class:
        return {"error": "Unknown algorithm"}
    
    sorter = algo_class(request.array.copy())
    steps = sorter.sort()

    return {
        "algorithm": request.algorithm,
        "original": request.array,
        "steps": steps,
    }


@router.get("/algorithms")
def list_algorithms():
    return {"algorithms": list(algorithm_map.keys())}