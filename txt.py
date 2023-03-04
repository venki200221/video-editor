# write an api merge the videos which are provided as the array of  links  to form a single video


import moviepy.editor as mp

video_links = ["https://previews.customer.envatousercontent.com/28ed47f2-e455-4fd4-a9f2-fb26916a6f83/watermarked_preview/watermarked_preview.mp4",
 "https://previews.customer.envatousercontent.com/dae70b46-7459-4949-bc25-c653cf52e635/watermarked_preview/watermarked_preview.mp4"]

video_clips = [mp.VideoFileClip(link) for link in video_links]
final_clip = mp.concatenate_videoclips(video_clips) 
final_clip.write_videofile("merged_videos.mp4")

