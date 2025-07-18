## Initial Prompt (Version 2)

AI Game Development Prompt: "Pixel Wing Duel" (Version 2)
Project Goal:
You are an expert game developer AI. Your task is to create a complete, 2-player, same-keyboard, competitive web game using HTML, CSS, and JavaScript. The game, "Pixel Wing Duel," is designed for platforms like CrazyGames. It must be visually appealing with high-quality 2D pixel art and feature engaging, fast-paced gameplay.
Core Game Concept:
This is a 2-player versus game combining vertical flapping mechanics with a side-view shooter. Two players control pixel-art birds on opposite sides of the screen. They cannot move horizontally. Their goal is to shoot each other down by firing projectiles through a vertically scrolling field of destructible asteroids. Power-ups appear in the field and must be shot to be collected, adding a layer of strategy. The last player with health remaining wins the round.
Detailed Technical & Gameplay Specifications:
1. Game Canvas & Layout:
Technology: Use the HTML <canvas> element for rendering.
Dimensions: Create a fixed-size canvas, 1024px width by 768px height.
Layout: The game view is static. Player 1 is on the left, Player 2 is on the right. The center of the screen is the "danger zone" with scrolling objects.
2. Player Characters ("Pixel Wings"):
Player 1 (Left Side):
Controls: W key to flap (apply upward velocity), S key to shoot.
Position: Fixed on the X-axis at roughly 15% from the left edge.
Physics: Constant downward gravity. Each "flap" provides a sharp upward impulse. The bird should rotate slightly upwards when flapping and downwards when falling.
Shooting: Shoots a projectile horizontally to the right. Implement a short cooldown (e.g., 0.5 seconds).
Player 2 (Right Side):
Controls: Up Arrow key to flap, Down Arrow key to shoot.
Position: Fixed on the X-axis at roughly 85% from the right edge.
Physics: Identical to Player 1.
Shooting: Shoots a projectile horizontally to the left. Same cooldown as Player 1.
3. Health & Damage System:
Player Health: Both players start with 100 HP.
Projectile Damage: A successful hit from a player's projectile deals 10 damage to the opponent.
Asteroid Collision: Crucially, asteroids DO NOT cause collision damage to players. They only serve as destructible cover and obstacles for projectiles.
4. The "Danger Zone" (Center Screen):
Vertical Scrolling: Asteroids and Power-ups spawn at the top of the screen and scroll downwards at a constant, moderate speed.
Asteroids:
Spawning: Spawn randomly across the middle 60% of the screen's width.
Variety: Create 2-3 different sizes of asteroids. Larger asteroids should be slower and have more health.
Health: Asteroids have health (e.g., Small: 20 HP, Medium: 50 HP). They can be destroyed by player projectiles. Each projectile hit deals 10 damage to the asteroid.
Destruction: When an asteroid's health reaches zero, it breaks apart in a satisfying pixel explosion effect.
Power-ups:
Spawning: Spawn less frequently than asteroids. They should be visually distinct, brightly colored, and encased in a semi-transparent bubble or crystal.
Collection Mechanic: Power-ups are collected by SHOOTING them. The player whose projectile destroys the power-up's container is the one who receives the benefit.
Types (Implement all of these):
Health Pack (+): A green cross icon. Restores 25 HP to the player who shot it.
Shield (O): A blue circle icon. Grants a temporary shield that absorbs one instance of projectile damage. Visually represent the shield around the player's bird.
Rapid Fire (>>): A yellow lightning bolt icon. Doubles the player's firing rate (halves the cooldown) for 5 seconds.
Triple Shot (↑): A purple icon showing three diverging lines. For 7 seconds, the player shoots three projectiles in a narrow forward cone instead of one.
Piercing Shot (>--): A cyan, sharp arrow icon. For 7 seconds, the player's projectiles will pass through and destroy asteroids in their path without being stopped. They still hit and damage the opponent.
Screen Bomb (※): A red bomb icon. When shot, it immediately causes a screen-wide flash and destroys all currently visible asteroids (it does not harm players).
5. Game Flow & User Interface (UI):
Start Screen: A simple screen with the game title, "Player 1 Controls: W/S", "Player 2 Controls: Up/Down Arrows", and a "Press Space to Start" prompt.
Heads-Up Display (HUD):
Display Player 1's health bar and name at the top-left corner.
Display Player 2's health bar and name at the top-right corner.
When a player has a power-up active, display a small icon and a countdown timer near their health bar.
End Screen: When a player's health reaches zero, the game pauses and displays a "Player [1 or 2] Wins!" message. Provide a "Press R to Restart" prompt.
Art & Aesthetic Direction:
Style: Beautiful, high-quality 2D Pixel Art. Modern retro, not 8-bit limitations. Clean, vibrant, and impactful.
Color Palette: A retro-futuristic or synthwave palette. Deep purples, dark blues, and blacks for the background. Bright neon pinks, cyans, and yellows for the players, projectiles, and UI elements.
Player Sprites: Design two distinct bird-like creatures or small ships (e.g., one cyan, one magenta). Animate a neutral/falling state and a "flapping" state.
Background: A multi-layered parallax scrolling starfield to create a sense of depth.
Visual Effects (VFX): Create impactful pixel art for muzzle flashes, projectile trails, impact sparks, and satisfying multi-frame explosions for asteroids and player defeat.
Final Deliverable & Project Structure:
Please provide the complete and runnable game code, structured into the following files. Ensure the code is well-commented.
1. Core Game Files:
index.html: For the canvas and basic page structure.
style.css: For centering the canvas and any other page styling.
script.js: For all game logic, rendering, and event handling.
2. Documentation Files (in Markdown format):
README.md: A file that explains the project to others. It should contain:
Game Title: Pixel Wing Duel
Brief Description: A one-paragraph summary of the game.
How to Play: A clear list of controls for both players and the objective of the game.
How to Set Up: Simple instructions for a user to run the game locally (e.g., "Open index.html in a web browser").
PROMPTS.md: A file to log the development history and future plans. It should be structured as follows:
Initial Prompt (Version 2):
(Here, you will copy and paste this entire prompt that you are currently reading.)
Future Ideas & Prompts:
(Leave this section blank. It is a placeholder for the user to add new ideas for future iterations, such as new power-ups, game modes, or bug fixes.)

## Future Ideas & Prompts
(Leave this section blank. It is a placeholder for the user to add new ideas for future iterations, such as new power-ups, game modes, or bug fixes.)
