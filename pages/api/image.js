import jimp from 'jimp';

// async function resize() {
//   // Read the image.
//   // const image = await jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
//   // Resize the image to width 150 and heigth 150.
//   await image.resize(150, 150);
//   // Save and overwrite the image
//   await image.writeAsync(`test/${Date.now()}_150x150.png`);
// }
// resize();

const imageCompose = async (req, res) => {
  const image = await jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  const image2 = await jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  // const image = await jimp.read('../images/people/01.png');
  // const image2 = await jimp.read('images/people/02.png');
  console.log(image);

  const asdf = image.blit(image2, 0, 0);
  const comp = image.composite(src, x, y, [{ mode, opacitySource, opacityDest }]); // composites another Jimp image over this image at x, y

  console.log(asdf);

  res.redirect(`${asdf.bitmap}`);
  // res.status(200).json({ name: 'Amanda' });
};

export default imageCompose;
