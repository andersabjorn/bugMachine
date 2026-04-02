namespace BugMachine.Current;

            int mid = low + (high - low) / 2;

            if (sortedArr[mid] == target)
                return mid;
            else if (sortedArr[mid] < target)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }
}
