const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
suits = ["clubs", "spades", "hearts", "diamonds"]
empty_deck = []
var i, x, index, card, value, suit, cut1, cut2, full_deck

class Deck {
  constructor(cards) {
    this.deck = []
    for(i = 0; i < suits.length; i++) {
      for(x = 0; x < rank.length; x++) {
        card = {Value: rank[x], Suit: suits[i], ID: this.deck.length, Suit_Value: i, Card_Value: x};
        this.deck.push(card);
     }
   }
  }
  shuffled() {
    // const deck = this.deck
    for (i = 0; i < 1000; i++) {
      cut1 = Math.floor((Math.random() * this.deck.length));
      cut2 = Math.floor((Math.random() * this.deck.length));
      [this.deck[cut1], this.deck[cut2]] = [this.deck[cut2], this.deck[cut1]];
    }
  }
  sort() {
    this.deck.sort(function (a,b) {
      return a.Suit_Value - b.Suit_Value || a.Card_Value - b.Card_Value
    });
    }
  draw(id, hand) {
    index = this.deck.findIndex(x => x.ID === parseInt(id))
    hand.deck.push(this.deck[index])
    this.deck.splice(index, 1)
  }
}

function updateParent() {
  if (this.parentElement.id === "deck") {
    deck1.draw(this.id, selection1)
    document.getElementById("selection").append(this)
  }
  else {
    selection1.draw(this.id, deck1)
    document.getElementById("deck").append(this)
  }
}

function renderCard(div, item) {
  card = document.createElement("div");
  value = document.createElement("div");
  suit = document.createElement("div");
  card.className = "card";
  card.id = item.ID;
  value.className = "value";
  suit.className = "suit " + item.Suit;
  card.addEventListener("click", updateParent)
  value.innerHTML = item.Value;
  card.appendChild(value);
  card.appendChild(suit);
  document.getElementById(div).appendChild(card);
}

function renderDeck(div, cards) {
  document.getElementById(div).innerHTML = '';
  cards.deck.forEach(function(item) {
    renderCard(div, item)
  })
}

function load() {
  deck1 = new Deck();
  deck1.shuffled();
  selection1 = new Deck();
  selection1.deck = [];
  renderDeck('deck', deck1);
  renderDeck('selection', selection1);
}

window.onload = load;
exports.Deck = Deck;
