module.exports = {

  // -----------------------------
  // Fun / Entertainment Commands
  // -----------------------------

  hello: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, { text: `Hello there! 😎` })
  },

  joke: async (sock, msg, args) => {
    const jokes = [
      "Why did the dev go broke? Because he used up all his cache 😅",
      "Why do programmers prefer dark mode? Because light attracts bugs 🐛",
      "Why did the computer show up at work late? It had a hard drive 🚗💨",
      "Why do Java developers wear glasses? Because they can't C# 😂",
      "What’s a computer’s favorite snack? Microchips!",
      "Why was the computer cold? It left its Windows open ❄️",
      "Why did the computer go to therapy? It had too many bytes of anxiety",
      "Why did the coder cross the road? To get to the other IDE",
      "Why was the smartphone wearing glasses? It lost its contacts 🤓",
      "Why did the developer go broke? Too many bugs in the budget 🐞"
    ]
    const random = jokes[Math.floor(Math.random() * jokes.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  meme: async (sock, msg, args) => {
    const memes = [
      "https://i.imgflip.com/1bij.jpg",
      "https://i.imgflip.com/26am.jpg",
      "https://i.imgflip.com/1otk96.jpg",
      "https://i.imgflip.com/30b1gx.jpg",
      "https://i.imgflip.com/1g8my4.jpg",
      "https://i.imgflip.com/1ihzfe.jpg",
      "https://i.imgflip.com/3si4.jpg",
      "https://i.imgflip.com/1jwhww.jpg",
      "https://i.imgflip.com/1ur9b0.jpg",
      "https://i.imgflip.com/2fm6x.jpg"
    ]
    const random = memes[Math.floor(Math.random() * memes.length)]
    await sock.sendMessage(msg.key.remoteJid, { image: { url: random } })
  },

  quote: async (sock, msg, args) => {
    const quotes = [
      "The best way to predict the future is to invent it. – Alan Kay",
      "Code is like humor. When you have to explain it, it’s bad. – Cory House",
      "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
      "Simplicity is the soul of efficiency. – Austin Freeman",
      "Before software can be reusable it first has to be usable. – Ralph Johnson",
      "Talk is cheap. Show me the code. – Linus Torvalds",
      "Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson",
      "Deleted code is debugged code. – Jeff Sickel",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
      "First, solve the problem. Then, write the code. – John Johnson"
    ]
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  compliment: async (sock, msg, args) => {
    const compliments = [
      "You are amazing! 😎",
      "You light up the room! ✨",
      "Your coding skills are legendary! 💻",
      "You’re a genius at what you do! 🤯",
      "You make things happen! 🚀",
      "Your smile is contagious 😁",
      "You have a great sense of humor 😂",
      "You inspire people around you ✨",
      "You are unstoppable 💪",
      "You have incredible style 👌"
    ]
    const random = compliments[Math.floor(Math.random() * compliments.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  roll: async (sock, msg, args) => {
    const sides = parseInt(args[0]) || 6
    const result = Math.floor(Math.random() * sides) + 1
    await sock.sendMessage(msg.key.remoteJid, { text: `🎲 You rolled: ${result}` })
  },

  coin: async (sock, msg, args) => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails"
    await sock.sendMessage(msg.key.remoteJid, { text: `🪙 ${result}!` })
  },

  rps: async (sock, msg, args) => {
    const choices = ["rock", "paper", "scissors"]
    const botChoice = choices[Math.floor(Math.random() * choices.length)]
    const userChoice = args[0]?.toLowerCase()
    if (!userChoice || !choices.includes(userChoice)) {
      return await sock.sendMessage(msg.key.remoteJid, { text: "Usage: .rps rock/paper/scissors" })
    }
    let result = ""
    if (botChoice === userChoice) result = "It's a tie! 🤝"
    else if (
      (botChoice === "rock" && userChoice === "scissors") ||
      (botChoice === "paper" && userChoice === "rock") ||
      (botChoice === "scissors" && userChoice === "paper")
    ) result = `I chose ${botChoice}. ${userChoice === botChoice ? "Tie!" : userChoice === "rock" && botChoice === "scissors" ? "You win! 🎉" : "You lose! 😢"}`
    await sock.sendMessage(msg.key.remoteJid, { text: result })
  },

  hug: async (sock, msg, args) => {
    const hugs = [
      "🤗 Sending you a big hug!",
      "🥰 Hugs incoming!",
      "💖 Here’s a warm hug for you!",
      "🤗 Hug attack!"
    ]
    const random = hugs[Math.floor(Math.random() * hugs.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  slap: async (sock, msg, args) => {
    const slaps = [
      "👋 Slap! Ouch!",
      "😆 That must have hurt!",
      "👊 Pow! Right in the face!",
      "😜 Slap incoming!"
    ]
    const random = slaps[Math.floor(Math.random() * slaps.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  pat: async (sock, msg, args) => {
    const pats = [
      "🤲 Pat pat pat!",
      "🥰 There there...",
      "💖 A gentle pat for you!",
      "🤗 Patting you softly!"
    ]
    const random = pats[Math.floor(Math.random() * pats.length)]
    await sock.sendMessage(msg.key.remoteJid, { text: random })
  },

  hugme: async (sock, msg, args) => await commands.hug(sock, msg, args),
  slapme: async (sock, msg, args) => await commands.slap(sock, msg, args),
  patme: async (sock, msg, args) => await commands.pat(sock, msg, args)

  // You can continue adding more fun commands here
}
