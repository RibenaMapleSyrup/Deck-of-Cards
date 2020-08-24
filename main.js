const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
// rank_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
suits = ["clubs", "spades", "hearts", "diamonds"]
// suit_value = [1, 2, 3, 4]

var deck = new Array(),
selection = new Array(),
i, x, index, card, value, suit, cut1, cut2, hold;

function createDeck() {
  for(i = 0; i < suits.length; i++) {
    for(x = 0; x < rank.length; x++) {
      // card = {Value: rank[x], Suit: suits[i], ID: deck.length, Suit_Value: suit_value[i], Card_Value: rank_value[x]};
      card = {Value: rank[x], Suit: suits[i], ID: deck.length, Suit_Value: i, Card_Value: x};
      deck.push(card);
    }
  }
  return deck;
}

function swap(cards) {
  cut1 = Math.floor((Math.random() * cards.length));
  cut2 = Math.floor((Math.random() * cards.length));
  hold = cards[cut1];
  cards[cut1] = cards[cut2];
  cards[cut2] = hold;
}

function shuffle(cards) {
  console.log("shuffled")
  for (i = 0; i < 1000; i++) {
    swap(cards)
  }
}

function sort(cards) {
  cards.sort(function (a,b) {
    return a.Suit_Value - b.Suit_Value || a.Card_Value - b.Card_Value
  });
}

function draw(split, div, element, select) {
  index = split.findIndex(x => x.ID === parseInt(element.id))
  document.getElementById(div).appendChild(element);
  select.push(split[index])
  split.splice(index, 1)
}

function render(div, split) {
  document.getElementById(div).innerHTML = '';
  for (i = 0; i < split.length; i++) {
    card = document.createElement("div");
    value = document.createElement("div");
    suit = document.createElement("div");
    card.className = "card";
    card.id = split[i].ID;
    value.className = "value";
    suit.className = "suit " + split[i].Suit;
    card.addEventListener("click", function() {
      if (this.parentElement.id === "deck") {
        draw(deck, 'selection', this, selection)
      }
      else {
        draw(selection, 'deck', this, deck)
      }
    })
    value.innerHTML = split[i].Value;
    card.appendChild(value);
    card.appendChild(suit);
    document.getElementById(div).appendChild(card);
  }
}

function load() {
  deck = createDeck();
  shuffle(deck);
  render('deck', deck);
}

window.onload = load;

// module.exports = { createDeck }
