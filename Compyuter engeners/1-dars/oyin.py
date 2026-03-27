import random
import tkinter as tk
from tkinter import messagebox

score = 0

def rank_tekshir(score):
    if score >= 100:
        return "CONQUEROR"
    elif score >= 70:
        return "ACE"
    elif score >= 50:
        return "CROWN"
    elif score >= 30:
        return "DIAMOND"
    elif score >= 15:
        return "PLATINUM"
    else:
        return "BRONZE"

def yangi_son():
    global sirli_son
    sirli_son = random.randint(1, 10)

def tekshir():
    global score
    try:
        taxmin = int(entry.get())
    except:
        messagebox.showerror("Xato", "Son kiriting!")
        return

    if taxmin == sirli_son:
        score += 10
        messagebox.showinfo("🎯", "HEADSHOT! +10")
    else:
        score -= 5
        if score < 0:
            score = 0
        messagebox.showwarning("❌", "MISS! -5")

    rank = rank_tekshir(score)
    score_label.config(text="Score: " + str(score))
    rank_label.config(text="Rank: " + rank)
    yangi_son()
    entry.delete(0, tk.END)

# Oyna
win = tk.Tk()
win.title("PUBG Mini Game")
win.geometry("300x350")
win.configure(bg="#1c1c1c")

tk.Label(win, text="PUBG MINI GAME", fg="orange", bg="#1c1c1c", font=("Arial", 18, "bold")).pack(pady=10)

tk.Label(win, text="1–10 orasida son top!", fg="white", bg="#1c1c1c").pack()

entry = tk.Entry(win, font=("Arial", 16))
entry.pack(pady=10)

tk.Button(win, text="FIRE 🔫", command=tekshir, bg="orange", font=("Arial", 14)).pack(pady=10)

score_label = tk.Label(win, text="Score: 0", fg="white", bg="#1c1c1c", font=("Arial", 12))
score_label.pack()

rank_label = tk.Label(win, text="Rank: BRONZE", fg="cyan", bg="#1c1c1c", font=("Arial", 12))
rank_label.pack()

yangi_son()
win.mainloop()