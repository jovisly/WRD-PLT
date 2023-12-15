"""Surveying all three letter combinations to see distribution.

How long would this take? About 1.5 hours.
"""
import re
import pickle
import string
from time import perf_counter

from tqdm import tqdm
from wordfreq import iter_wordlist, zipf_frequency

CHAR_SET = string.ascii_letters
CHAR_SET_LOWER = string.ascii_lowercase

def has_only_latin_letters(input_string):
    """Check if input string contains only ascii letters."""
    return all((True if x in CHAR_SET else False for x in input_string))



def make_cleaned_wordlist():
    """Parse wordlist to include only those with letters."""
    return [
        word
        for word in iter_wordlist('en',  wordlist='large')
        if has_only_latin_letters(word)
    ]



def letters_in_word(list_letters, word):
    """Check if a list of letters are in a word in the given order."""
    pattern = "[a-z]*" + "+[a-z]*".join(list_letters) + "+[a-z]*"
    return bool(re.match(pattern, word))



def benchmark(list_letters=["a", "b", "c"], num_samples=500):
    """Estimating how long it takes to perform a full survey."""
    t1 = perf_counter()
    for _ in tqdm(num_samples):
        list_words_with_letters = [
            (word, zipf_frequency(word, "en", wordlist="large"))
            for word in wordlist if letters_in_word(list_letters, word)
        ]

    t2 = perf_counter()
    print(t2 - t1)



if __name__ == '__main__':
    wordlist = make_cleaned_wordlist()
    print(f"Finished cleaning wordlist; number of words: {len(set(wordlist))}")

    list_letters_all = [
        [i, j, k]
        for i in CHAR_SET_LOWER for j in CHAR_SET_LOWER for k in CHAR_SET_LOWER
    ]
    print(f"Performing survey for {len(list_letters_all)} combinations.")

    dict_out = {}
    for list_letters in tqdm(list_letters_all):
        list_words_with_letters = [
            (word, zipf_frequency(word, "en", wordlist="large"))
            for word in wordlist if letters_in_word(list_letters, word)
        ]
        dict_out["".join(list_letters)] = list_words_with_letters

    with open("./output/output.pkl", "wb") as outfile:
        pickle.dump(dict_out, outfile, pickle.HIGHEST_PROTOCOL)



"""
with open("./output/output.pkl", "rb") as outfile:
    result = pickle.load(outfile)
"""
