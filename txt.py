# merge the videos which are provided as the array of  links  to form a single video
import moviepy.editor as mp
import requests 

# fetch data from api
url = 'https://video-editor-gold.vercel.app/image' 
response = requests.get(url) 
if response.status_code == 200:     
    video_links = response.json()
    clips=[]
    for video in video_links:
        clips.append(mp.VideoFileClip(video))
    
    final_clip = mp.concatenate_videoclips(clips) 
    final_clip.write_videofile("merged_video.mp4")
else: 
    print('An error has occurred.')

#find all the adjectives from an array of words
