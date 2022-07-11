var lib = require('../utils/_DATA');

describe('_saveQuestion', () => {
  it('verify that the saved question is returned and all expected fields are populated', async () => {
    let formatQuestion = await lib._saveQuestion({ optionOneText: "Do you like apples", optionTwoText: "Do you like pears", author: "sarahedo" })
    expect(formatQuestion.optionOne.text).toEqual('Do you like apples')
    expect(formatQuestion.optionTwo.text).toEqual('Do you like pears')
    expect(formatQuestion.author).toEqual("sarahedo")
    expect(formatQuestion.timestamp).not.toBeNull()
    expect(formatQuestion.id).not.toBeNull()
  })
  it('verify that an error is returned if incorrect data is passed', async () => {
    await expect(lib._saveQuestion({ optionOneText: "Do you like apples", optionTwoText: "Do you like pears" })).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')
  })
})

describe('_saveQuestionAnswer', () => {
  it('verify that the saved question answer is returned and all expected fields are populated', async () => {
    let response = await lib._saveQuestionAnswer({ authedUser: 'mtsamis', qid: '8xf0y6ziyjabvozdd253nd', answer: 'optionOne' })
    expect(response).toEqual(true)
  })
  it('verify that an error is returned if incorrect data is passed', async () => {
    await expect(lib._saveQuestionAnswer({})).rejects.toEqual('Please provide authedUser, qid, and answer')
  })
})