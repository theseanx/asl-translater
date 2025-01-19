# from sign_language_translator import Translator
# print(Translator().translate('hello world'))
# print("hello")

# use the correct api call


# zshrc => alias, configuration. before shell opens, runs the file
# connection backend to frontend, just use routes.
# this project cannot be done using only frontend, because python doesn't exist in browser (it only exists in the shell)


# Load text-to-sign model
# deep_t2s_model = slt.get_model("generative_t2s_base-01") # pytorch
# rule-based model (concatenates clips of each word)
import sign_language_translator as slt
t2s_model = slt.get_model(
    model_code = "ConcatenativeSynthesis", # slt.enums.ModelCodes.CONCATENATIVE_SYNTHESIS.value
    text_language = "English", # or object of any child of slt.languages.text.text_language.TextLanguage class
    sign_language = "PakistanSignLanguage", # or object of any child of slt.languages.sign.sign_language.SignLanguage class
    sign_feature_model = "mediapipe_pose_v2_hand_v1",
)

text = "hello"
sign_language_sentence = t2s_model(text)