import gymnasium as gym
from stable_baselines3 import PPO

env = gym.make("Taxi-v3")

model = PPO(
    "MlpPolicy",
    env,
    learning_rate=0.01,    
    n_steps=1024,           
    batch_size=64,
    verbose=1
)

model.learn(total_timesteps=100000)

model.save("ppo_taxi_aggressive")
episodes = 10  
for ep in range(episodes):
    obs, info = env.reset()
    done = False
    total_reward = 0

    while not done:
        action, _ = model.predict(obs, deterministic=True)
        obs, reward, terminated, truncated, info = env.step(action)
        total_reward += reward
        done = terminated or truncated

    print(f"[High LR] Episode {ep+1}: Total Reward = {total_reward}")
