/** Return true if given poll is answered by this user */
export function isPollAnswered(poll, user) {
  return (
    poll.optionOne.votes.includes(user) || poll.optionTwo.votes.includes(user)
  );
}

/** parse questions object, return list of questions sorted by timestamp */
export function sortQuestions(questions) {
  let questionList = [];
  for (const id in questions) {
    questionList.push(questions[id]);
  }
  questionList.sort((a, b) => b.timestamp - a.timestamp);
  return questionList;
}
