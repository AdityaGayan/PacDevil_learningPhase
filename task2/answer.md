# **Taxi-v3 Reinforcement Learning – Using PPO**

## **What the Project Does**
The project contains two Python scripts. Each script:
1. Creates the Taxi-v3 environment  
2. Trains a PPO agent  
3. Saves the trained model  
4. Runs test episodes  
5. Prints the total reward earned in each test episode  


---

# **Why PPO Instead of DQN? (Simple Explanation)**

### **1. PPO is more stable**
PPO is designed to update the policy slowly and safely.  
If the update is too big, PPO “clips” it, so the agent doesn’t suddenly forget everything.

DQN can become unstable very easily and needs more tuning.

---

### **2. PPO learns the policy directly**
DQN tries to estimate the value of each action, which becomes harder when the number of states is large.

PPO directly learns **what action to take**, which works better for environments like Taxi-v3 (which has around 500 states).

---

### **3. PPO handles randomness better**
Taxi-v3 involves randomness:
- the taxi might start in different spots  
- the passenger can appear in different places  

PPO learns better from this because it is **on-policy**, meaning it always learns from fresh experience.  
DQN mixes old and new experiences, which sometimes makes learning slower or unstable.

---

### **4. PPO converges more smoothly**
During training, PPO tends to improve steadily.  
DQN may jump up and down a lot, especially with bad hyperparameters.

Since this task required changing learning rates, PPO was the safer option.

---

### **5. PPO is the recommended default in Stable-Baselines3**
Stable-Baselines3 officially suggests PPO for beginners because:
- it’s reliable  
- it works well in many environments  
- it doesn’t require too much fine-tuning  

This makes it a natural choice for this assignment.

---

# **Learning Rate Results**
I trained the agent twice:
- **Normal learning rate** → stable, consistent improvement  
- **Aggressive learning rate** → learned faster at first but sometimes unstable  

From this, I understood how important the learning rate is for reinforcement learning.

---
