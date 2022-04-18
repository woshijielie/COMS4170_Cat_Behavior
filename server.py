import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

data_for_quiz1 = ['https://www.koty.pl/wp-content/uploads/2019/08/kocie-uszka-2-864x575.jpg',
                  'https://resc-files-prod.s3.us-west-1.amazonaws.com/s3fs-public/styles/large/public/2018-12/SLC-Feral-ear-tip-9285_1.jpg?VersionId=5Se7m9aAtpsvPIoiCAklTu1Yw.y44_Zq&itok=1Q4mwc2h',
                  'https://culturafelina.com/wp-content/uploads/2018/02/angry_cat.jpg']
data_for_quiz2 = ['https://pictures-of-cats.org/wp-content/uploads/2020/06/American-ringtail-cat-2A.jpg',
                  'https://i.pinimg.com/564x/1a/c1/e5/1ac1e57b52f9764a247effd7c0df5821.jpg',
                  'https://radiomitre-la100-prod.cdn.arcpublishing.com/resizer/hZpLaZuzpW00ajz5_OTTmJGpZ_A=/1200x0/smart/cloudfront-us-east-1.images.arcpublishing.com/radiomitre/O72VFR474JFJZPR4CH27RNBUXU.jpg',
                  'https://catinfodetective.com/wp-content/uploads/2020/12/cat-4410834_1280-1-300x200.jpg',
                  'https://srbigotesdegato.com/wp-content/uploads/2019/05/bosques-de-siberia-raza-gato.jpg']
data_for_quiz3 = ['https://qph.cf2.quoracdn.net/main-qimg-63eb8dd985d48fe45280355f2c2ab6cc-pjlq',
                  'https://static.onecms.io/wp-content/uploads/sites/34/2018/07/12170444/cat-rolling-over-on-back-getty-87883698.jpg',
                  'https://bloximages.newyork1.vip.townnews.com/wfsb.com/content/tncms/assets/v3/editorial/8/fb/8fb3f3bd-0c9d-5f55-be93-8960a8967993/5e5958c592f48.image.jpg',
                  'https://cdn.shopify.com/s/files/1/0344/6469/files/image_14_large.jpg?v=1484682446']
data_for_quiz4 = ['https://www.tuxedo-cat.co.uk/wp-content/uploads/2021/07/cat-lying-on-back-with-paws-up-in-sun.jpg?ezimgfmt=rs:382x218/rscb1/ng:webp/ngcb1']
choices_for_quiz4 = ["A. It's simply communicating a level of trust and confidence in your friendship.",
                     "B. If this pose is actually followed with a hissing sound or a growl, you can touch them.",
                     "C. They are mostly communicating happiness and satisfaction."]
audio_for_quiz5 = {"Low or drawn out": "https://4170audio.s3.amazonaws.com/low.wav",
                   "Soft pleading": "https://4170audio.s3.amazonaws.com/soft.wav",
                   "Trilling": "https://4170audio.s3.amazonaws.com/trilling.wav",
                   "Yowling": "https://4170audio.s3.amazonaws.com/yowling.wav",
                   "Chirping": "https://4170audio.s3.amazonaws.com/cat-bird-chirp.mp3"}
img_for_quiz5 = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2irskMPkz6T10bt_eadBkqQNduJnYHLRLFQ&usqp=CAU"]
choices_for_quiz5 = ["A. Lure their unassuming prey.",
                     "B. Dissatisfaction or a lack of interest.",
                     "C. It is hungry and will like to be fed immediately.",
                     "D. To get your attention and sometimes with cute eyes",
                     "E. A call for mating."]
choices_for_quiz_review = ["A. If your cat want to knead on your lap, it is actual a good sign of contentment and happiness.",
                     "B. Most time when your cat wiggles its butt, it's getting ready to escape.",
                     "C. The cat will let out a series of short, high pitched meows to tell you it's glad you're back.",
                     "D. Cats are hunters. Sometimes they make chirping sounds like criskets to lure their unassuming prey."]
data_for_quiz_end = ['https://static-cdn.jtvnw.net/jtv_user_pictures/b6be9ae8-3433-4a32-bc20-a749781ca0f5-profile_banner-480-320x160.jpeg']

# ROUTES

@app.route('/quiz/quiz_1')
def quiz_1():
   return render_template('quiz_1.html', data=data_for_quiz1)

@app.route('/quiz/quiz_2')
def quiz_2():
   return render_template('quiz_2.html', data=data_for_quiz2)

@app.route('/quiz/quiz_3')
def quiz_3():
   return render_template('quiz_3.html', data=data_for_quiz3)

@app.route('/quiz/quiz_4')
def quiz_4():
   return render_template('quiz_4.html', data=data_for_quiz4, choices=choices_for_quiz4)

@app.route('/quiz/quiz_5')
def quiz_5():
   return render_template('quiz_5.html', data=audio_for_quiz5, choices=choices_for_quiz5, img=img_for_quiz5)

@app.route('/quiz/quiz_review')
def quiz_review():
   return render_template('quiz_review.html', choices=choices_for_quiz_review)

@app.route('/quiz/quiz_end')
def quiz_end():
   return render_template('quiz_end.html', data=data_for_quiz_end)

if __name__ == '__main__':
   app.run(debug = True)




