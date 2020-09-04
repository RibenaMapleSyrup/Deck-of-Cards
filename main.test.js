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

test('sort', () => {
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
