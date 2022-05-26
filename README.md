# Description

This is a simple time travelling HashMap. Depending on the 'time to round' param for `get` it will return the last, or the closest value by time for a given key. It is possible to store values for the same key multiple times, the HashMap will keep multiple versions of the values for the same key.

# Test

```node time-travelling-hashmap.js```