import text2emotion as te
import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import base64

st.title('Emotion Classifier')
def get_base64(bin_file):
    with open(bin_file, 'rb') as f:
       data = f.read()
    return base64.b64encode(data).decode()

def set_background(png_file):
    bin_str = get_base64(png_file)
    page_bg_img = '''
        <style>
    .stApp {
    background-image: url("data:image/png;base64,%s");
    background-size: cover;
    }
    </style>
        ''' % bin_str
    st.markdown(page_bg_img, unsafe_allow_html=True)

set_background('background.png')

def classifier():
    emotion=te.get_emotion(text)
    youremotion= max(emotion, key= lambda x: emotion[x])
    st.title("You're most probably "+"  "+youremotion)
    emotionvalues= [*emotion.values()]
    labelsemotions = ['Happy','Angry','Surprise','Sad','Fear']
    fig = go.Figure(
    go.Pie(
    labels = labelsemotions,
    values = emotionvalues,
    hoverinfo = "label+percent",
    textinfo = "value"
    ))
    st.header("Your Emotion Chart")
    st.plotly_chart(fig)
   


text = st.text_area("Enter an text", height=275)

if st.button('Classify'):
     classifier()
