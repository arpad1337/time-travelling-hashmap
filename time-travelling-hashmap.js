// Implement a "Time Traveling" hash table 

// Requirements 

// A. Should be able to insert values in constant time. HashMap<K,V>  The time for each entry is the insertion time. 

// B.To GET, you specify a time and a key and the hash table returns the value that would have been returned if you were actually querying at the specified time in the past before more recent values had been added. In other words, map.get(K,t) should give us the value. If t does not exists then map should return the closest t' such that t' is smaller than t. For example, if map contains (K,1,V1) and (K,2,V2) and the user does a get(k,1.5) then the output should be V1 as 1 is the next smallest number to 1.5

// C. How would you write tests for it?

class TimeTravellingHashMap {
 
  constructor(separator = '#') {
    this._map = new Map();
    this._keyLookUpTable = new Map();
    this._separator = Symbol(separator);
  }
  
  set(key, value) {
    const newKey = this._createKey(key);
    this._map.set(newKey, value);
    if (!this._keyLookUpTable.has(key)) {
      this._keyLookUpTable.set(key, [newKey]);
    }
    else {
      this._keyLookUpTable.set(key, this._keyLookUpTable.get(key).concat(newKey));
    }
    return newKey;
  }
  
  get(key, time) {
    const keyWithTime = this._createKey(key, time);
    if (!this._map.has(keyWithTime)) {
      
      const mapEntries = this._keyLookUpTable.get(key) &&
          this._keyLookUpTable.get(key).map((keyWithTime) => {
            const entry = [keyWithTime, this._map.get(keyWithTime)];
            return entry;
          }) || [];
      
            
      if (mapEntries.length === 0) {
        return undefined;
      }
      
      let i = mapEntries.length - 1;
      while(i >= 0 && this._getTimeFromKeyWithTime(mapEntries[i][0]) > time) {
        i--;
      }
      if (i === -1) {
        return undefined;
      }
      return mapEntries[i][1];
    }
    return this._map.get(keyWithTime);
  }
  
  _createKey(key, time) {
    time = time || new Date().toISOString();
    return `${key}${this._separator.toString()}${time}`;
  }
  
  _getTimeFromKeyWithTime(keyWithTime) {
    return keyWithTime.split(this._separator.toString())[1];  
  }
  
  _getKeyFromKeyWithTime(keyWithTime) {
    return keyWithTime.split(this._separator.toString())[1];  
  }
  
}

// TEST 1

const map = new TimeTravellingHashMap();

const key = "A";
const firstKey = map.set(key, "v1");
let secondKey = '';
  
let timeToRound;

setTimeout(function () {
  timeToRound = new Date().toISOString();
}, 4);

setTimeout(function () {
  secondKey = map.set(key, "v2");
}, 10);
           
setTimeout(function () {
  console.log('Should be v1: ', map.get(key, timeToRound));
}, 1000);

// TEST 2

const key2 = "B";
const firstKey2 = map.set(key2, "v1");
let secondKey2 = '';
  
let timeToRound2;

setTimeout(function () {
  timeToRound2 = new Date().toISOString();
}, 40);

setTimeout(function () {
  secondKey2 = map.set(key2, "v2");
}, 10);
           
setTimeout(function () {
  console.log('Should be v2: ', map.get(key2, timeToRound2));
}, 1000);