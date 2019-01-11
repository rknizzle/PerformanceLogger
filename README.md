## PerformanceLogger
A way to keep track of how long different parts of your code take
### Example code: 
```
const pl = require('./performanceLogger.js')

let fullSession = pl.createSession("Overall time taken: ").start()
let DBsession = pl.createSession("Time taken for DB operations: ").start()
let logicSession = pl.createSession("Time taken to perform logic: ")
pl.clearFile()

someDatabaseOperation()
.then(() => {
  DBsession.end().logOutputToFile()
  logicSession.start()
  return someLogicalOperation()
})
.then((logicResults) => {
  logicSession.end().logOutputToFile()
  fullSession.end().logOutputToFile()
})
```
### Example Output in file:
```
Time taken for DB operations: 5.005 seconds
Time taken to perform logic: 3.002 seconds
Overall time taken: 8.009 seconds
```
