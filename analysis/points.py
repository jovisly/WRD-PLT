"""Calculate points."""
import os
import pickle

import numpy as np
import pandas as pd
import seaborn as sns

from matplotlib import pyplot as plt


FILENAME = "./output/output.pkl"


def calculate_points(dict_results, title, zipf_freq_cutoff=0):
    """Iterate through the results and compute points.

    Simple points structure: each word is as many points as the number of
    letters.
    """
    list_letters = []
    list_points = []

    for letters, words in dict_results.items():
        list_letters.append(letters)
        points = sum([
            len(word[0]) for word in words
            if word[1] >= zipf_freq_cutoff
        ])
        list_points.append(points)

    df = pd.DataFrame()
    df["letters"] = list_letters
    df["points"] = list_points
    df = df.sort_values(by="points", ascending=False)
    print(df)
    print(df.loc[df["letters"] == "fld"])
    # make_plot(df, title)


def make_plot(df, title, col="points"):
    """Make plot for points distribution."""
    print(f"Original number of data points: {len(df[col])}")
    df_sub = df.loc[df[col] > 0].copy()
    print(f"Reduced number of data points: {len(df_sub[col])}")

    # df_sub["log"] = np.log(df_sub[col])
    df_sub["log"] = df_sub[col]
    fig, ax = plt.subplots(figsize=(8, 6))

    plt.figure()
    sns.histplot(
        data=df_sub["log"],
        stat="density",
        binwidth=1,
        color="#90caf9",
        kde=True,
        element="step",
    ).set(title=title)
    sns.kdeplot(df_sub["log"], color="#3949ab", linewidth=2)

    plt.xlabel("Max Possible Points")
    plt.yticks([])

    plt.savefig(
        os.path.join("output", title),
        facecolor="w",
        bbox_inches="tight"
    )
    plt.clf()
    plt.close("all")



if __name__ == '__main__':
    with open(FILENAME, "rb") as outfile:
        dict_results = pickle.load(outfile)

    calculate_points(dict_results, "No-Thresh")
    calculate_points(dict_results, "With-Thresh", zipf_freq_cutoff=2)

