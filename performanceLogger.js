const fs = require('fs')

module.exports = {
  test: "testString", 
  createSession: function(label) {
    let session = Session(this, label)
    this.sessions.push(session)
    return session
  },
  clearFile: function() {
    fs.writeFile("performanceLog.txt", "", (err) => {
      if (err) {
        throw new Error('Error clearing file: ' + err)
      }
    })
  },
  sessions: [],
  silent: false,
  silence: function() {
    this.silent = true
  }
}

function Session(pl, labelInput) {
    const Session = {
      startTime: null,
      endTime: null,
      label: null,
      start: function() {
        this.startTime = new Date()
        return this
      },
      end: function() {
        this.endTime = new Date()
        return this
      },
      timeTakenInSeconds: function() {
        return ((this.endTime - this.startTime) / 1000) 
      },
      logOutput: function() {
        if(this.label) {
          console.log(this.label + this.timeTakenInSeconds() + " seconds")
        }
        else {
          console.log('' + this.timeTakenInSeconds() + " seconds")
        }
      },
      logOutputToFile: function() {
        if(this.label) {
          fs.appendFile('performanceLog.txt', this.label + this.timeTakenInSeconds() + " seconds\n", (err) => {
            if (err) {
              throw new Error('Error while writing performance logs to file')
            }
          })
        }
        else {
          fs.appendFile('performanceLog.txt',  this.timeTakenInSeconds() + " seconds\n")
        }
      },
      main: pl
    }
    if (labelInput) {
      Session.label = labelInput 
    }
    return Session
}
