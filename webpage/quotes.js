const investmentQuotes = [
  {
    text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    author: "Philip Fisher"
  },
  {
    text: "Time in the market beats timing the market.",
    author: "Ken Fisher"
  },
  {
    text: "Be fearful when others are greedy and greedy when others are fearful.",
    author: "Warren Buffett"
  },
  {
    text: "The four most dangerous words in investing are: 'This time it's different.'",
    author: "Sir John Templeton"
  },
  {
    text: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett"
  },
  {
    text: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki"
  },
  {
    text: "The best investment you can make is in yourself.",
    author: "Warren Buffett"
  },
  {
    text: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.",
    author: "Warren Buffett"
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin"
  },
  {
    text: "The intelligent investor is a realist who sells to optimists and buys from pessimists.",
    author: "Benjamin Graham"
  },
  {
    text: "Price is what you pay. Value is what you get.",
    author: "Warren Buffett"
  },
  {
    text: "In investing, what is comfortable is rarely profitable.",
    author: "Robert Arnott"
  },
  {
    text: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett"
  },
  {
    text: "Wide diversification is only required when investors do not understand what they are doing.",
    author: "Warren Buffett"
  },
  {
    text: "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price.",
    author: "Warren Buffett"
  },
  {
    text: "Picking Bottom only results in smelly finger.",
    author: "Wonnom"
  },
  {
    text: "Someone's sitting in the shade today because somebody planted a tree a long time ago.",
    author: "Warren Buffett"
  },
  {
    text: "There is no reason to risk what you have and need for what you don't have and don't need",
    author: "Morgan Housel"
  }

];

export function getRandomQuote() {
  return investmentQuotes[Math.floor(Math.random() * investmentQuotes.length)];
}

