const main = require('./main');

test('shuffle deck', () => {
  let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  suits = ["clubs", "spades", "hearts", "diamonds"],
  deck1 = new main.Deck(),
  unshuffled = JSON.parse(JSON.stringify(deck1)),
  shuffled = deck1
  deck1.shuffled()

  // shuffled deck and unshuffled deck are: unequal arrays
  expect(shuffled).not.toBe(unshuffled)

  // contain 52 cards
  expect(shuffled.deck.length).toEqual(52)
  expect(unshuffled.deck.length).toEqual(52)

  // contain the same cards
  unshuffled.deck.forEach(element => expect(shuffled.deck).toEqual(expect.arrayContaining([element])))

  // no duplicates
  let uniqueUnshuffled = Array.from(new Set(unshuffled.deck))
  let uniqueShuffled = Array.from(new Set(shuffled.deck))
  expect(uniqueUnshuffled.length).toEqual(52)
  expect(uniqueShuffled.length).toEqual(52)
})

test('sort deck', () => {
  let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  suits = ["clubs", "spades", "hearts", "diamonds"]
  const deck1 = new main.Deck()
  const deck2 = new main.Deck()

  // unshuffled decks are equal
  expect(deck2.deck[0]).toEqual(deck1.deck[0])

  // shuffled decks are not equal
  deck1.shuffled()
  deck2.shuffled()
  expect(deck2.deck[0]).not.toBe(deck1.deck[0])

  // sorted decks are equal
  deck1.sort()
  deck2.sort()
  expect(deck2.deck[0]).toEqual(deck1.deck[0])
})

test('draw card from deck and add to hand', () => {
  let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  suits = ["clubs", "spades", "hearts", "diamonds"]
  const deck1 = new main.Deck()
  const hand1 = new main.Deck()
  hand1.deck = []
  randomCard = Math.floor(Math.random()*51)
  index = deck1.deck.findIndex(x => x.ID === parseInt(randomCard))
  card  = deck1.deck[index]

  // check we drew the selected card from deck1
  expect(card.ID).toEqual(randomCard)

  // confirm card is in deck1
  expect(deck1.deck).toEqual(expect.arrayContaining([card]))

  expect([1,2,2,4]).toEqual(expect.arrayContaining([1,2,2]))
  expect([1,2,4]).toEqual(expect.arrayContaining([1,2,2,4]))

  // draw a random card from deck1, shuffle deck1 and add card to hand1
  deck1.draw(randomCard, hand1)
  deck1.shuffled()

  // check hand1 contains card
  expect(hand1.deck[0]).toEqual(card)

  //check hand1 only contains one card
  expect(hand1.deck.length).toEqual(1)

  //check deck1 has decreased in size by one
  expect(deck1.deck.length).toEqual(51)

  // check deck1 is now missing card
  expect(deck1.deck).not.toBe(expect.arrayContaining([card]))

  // check deck1 equates to a full deck when card is added again
  hand1.draw(randomCard, deck1)
  deck1.sort()
  deck2 = new main.Deck()
  deck2.sort()
  expect(deck1).toEqual(deck2)

})
