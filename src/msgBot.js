this.answers = {};
this.waitForAnswer = false;
this.questionWaiting = '';
this.possibleAnswers = [
  "Well, as said before: ",
  "The answer to that question is: ",
  "Oh! I know that one: ",
  "I figured that out ages ago: ",
  "That's a no brainer: ",
  "If I'm not mistaken (how can I? I'm a bot): ",
  "Come on man, that's an easy one.. ",
  "Flagged as a duplicate question: ",
  "This answer is brought to you by you friendly neighborhood bot-man: "
];

this.isQuestion = function(msg) {
  return msg.endsWith("?");
}

this.processMessage = function(msg) {
  if (this.isQuestion(msg)) {
    if (this.answers.hasOwnProperty(msg)) {
      this.waitForAnswer = false;
      let answer = this.answers[msg];
      let prefix = this.possibleAnswers[Math.floor(Math.random() * 9)];
  
      return prefix + answer;
    }
  
    this.waitForAnswer = true;
    this.questionWaiting = msg;
    return '';
  }
      
  if (this.waitForAnswer) {
    this.waitForAnswer = false;
    this.answers[this.questionWaiting] = msg;
    return '';
  }
  
  return '';
}