# 🎯 Wordle Game (Vanilla JS + RxJS)

A minimalist clone of the popular **Wordle** game — built completely from scratch using **JavaScript**, **RxJS**, and **Webpack**.  
This project demonstrates event-driven programming, state management, and responsive UI logic without any framework.


## 🚀 Features

- 🎮 Fully playable Wordle logic  
- 🧩 Dynamic letter coloring (green, yellow, gray)  
- 💬 Real-time keyboard interaction  
- 🔁 Restart functionality after win or loss  
- 🔤 Random word generation from a JSON list  
- ⚡ Reactive architecture powered by **RxJS**


## 🧠 Tech Stack

| Category | Technologies |
|----------|---------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Reactive Programming | RxJS |
| Build Tool | Webpack |
| Version Control | Git & GitHub |


## 🕹️ How to Play

1. Type your guess using your keyboard  
2. Press **Enter** to submit the word  
3. Colors will give you feedback:
   - 🟩 **Green**: Correct letter, correct position  
   - 🟨 **Yellow**: Correct letter, wrong position  
   - ⬜ **Gray**: Letter not in the word  
4. Win by guessing the word in six tries!  
5. After finishing, click **New Game** to start again


## 💻 Run Locally

```bash
# Clone this repository
git clone https://github.com/Nemroder/wordle-Game.git

# Go to the project folder
cd wordle-Game

# Install dependencies
npm install

# Start the development server
npm start
```

Then open http://localhost:8080 in your browser.


## 📁 Project Structure
```
├── src
│   ├── index.js        # Main game logic
│   ├── wordsList.json  # Word list source
│   └── style.css       # Styling
├── dist
│   └── bundle.js       # Compiled output
└── index.html
```

## 🧠 What I Learned
- Managing game state reactively with RxJS Observables
- Handling keyboard events and DOM updates efficiently
- Applying modular architecture and separation of concerns
- Using Webpack for bundling and dev server setup

## 🌐 Demo
🔗 [Live Demo] (Add your deployment link here)

## 👨‍💻 Author
Sergio Gutierrez

- 📧 [Email](sergioalejandrogutierrezmedina@gmail.com) • [Portfolio](https://sergiogutierrez.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/sergio-gutierrez-741283277/) • [GitHub](https://github.com/Nemroder)
