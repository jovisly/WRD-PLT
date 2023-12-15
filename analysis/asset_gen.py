"""Create the data asset for game app.

We need:
* A list of legit words and their frequency (so we know if it's "fancy")
* A list of three-letter combos, and their point ranges.

Let's say:
* Eligible three-letter combos are those whose total point values, with
  threshold, is between 5 and 9 (after log).
"""
import json
import pickle

import numpy as np

from survey import make_cleaned_wordlist
from wordfreq import zipf_frequency

FILENAME = "./output/output.pkl"


def calculate_points(words, zipf_freq_cutoff=2):
    points = sum([
        len(word[0]) for word in words
        if word[1] >= zipf_freq_cutoff
    ])

    if points == 0:
        return 0
    else:
        return np.log(points)



def select_letters(dict_results):
    dict_out = {
        letters: calculate_points(words)
        for letters, words in dict_results.items()
    }
    return dict_out



if __name__ == '__main__':

    wordlist = make_cleaned_wordlist()

    # Make a json file
    dict_out = {
        w: zipf_frequency(w, "en", wordlist="large")
        for w in wordlist
    }

    with open('../wrd-plt-app/dictionary.json', "w") as fp:
        json.dump(dict_out, fp, sort_keys=True, indent=2)

    """
    # Get eligible three letters:
    with open(FILENAME, "rb") as outfile:
        dict_results = pickle.load(outfile)

    dict_out = select_letters(dict_results)
    dict_out_eligible = {
        k: v
        for k, v in dict_out.items()
        if v >= 7.7 and v <= 9
    }

    with open('../wrd-plt-app/letters.js', "w") as fp:
        json.dump(dict_out_eligible, fp, sort_keys=True, indent=4)
    """
