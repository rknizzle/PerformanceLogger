module.exports = {
  test: "testString", 
  createSession: function(label) {
    let session = Session(this, label)
    this.sessions.push(session)
    return session
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
          console.log(this.label + this.timeTakenInSeconds())
        }
        else {
          console.log('' + this.timeTakenInSeconds())
        }
      },
      main: pl
    }
    if (labelInput) {
      Session.label = labelInput 
    }
    return Session
}
