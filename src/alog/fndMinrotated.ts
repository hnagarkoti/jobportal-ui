function findMinRotated(arr: number[]) {
    let left = 0;
    let right = arr.length - 1;
    let boundary_index = -1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        if (arr[mid] <= arr[arr.length - 1]) {
            boundary_index = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return boundary_index;
}