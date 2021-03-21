export function isPollAnswered(poll, user) {
  return (
    poll.optionOne.votes.includes(user) || poll.optionTwo.votes.includes(user)
  );
}
