const videoswitch = require('video-stitch');

let mp4Links = [
 " https://previews.customer.envatousercontent.com/28ed47f2-e455-4fd4-a9f2-fb26916a6f83/watermarked_preview/watermarked_preview.mp4",
 "https://previews.customer.envatousercontent.com/dae70b46-7459-4949-bc25-c653cf52e635/watermarked_preview/watermarked_preview.mp4"
];

videoswitch.merge(mp4Links, {outputFormat: 'mp4'}, (err, output) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Merged video is available at: ', output);
});