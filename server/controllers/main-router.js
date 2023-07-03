require('dotenv').config();

const router = require('express').Router();
const fetch = require('node-fetch');
const { NFTStorage, Blob } = require('nft.storage');

router.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  console.log(prompt);

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    key: process.env.STABLE_DIFFUSION_KEY,
    prompt: prompt,
    negative_prompt: null,
    width: '768',
    height: '768',
    samples: '1',
    num_inference_steps: '20',
    seed: null,
    guidance_scale: 7.5,
    safety_checker: 'yes',
    multi_lingual: 'no',
    panorama: 'no',
    self_attention: 'no',
    upscale: 'no',
    embeddings_model: 'embeddings_model_id',
    webhook: null,
    track_id: null,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://stablediffusionapi.com/api/v3/text2img', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // Send the result as the response to the front end
      console.log(result);

      if (result.status === 'processing') {
        const etaInSeconds = result.eta;
        const delayInMilliseconds = etaInSeconds * 1000;

        setTimeout(() => {
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            key: process.env.STABLE_DIFFUSION_KEY,
            request_id: result.id,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(
            'https://stablediffusionapi.com/api/v4/dreambooth/fetch',
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => res.json(result))
            .catch((error) => console.log('error', error));
        }, delayInMilliseconds);
      } else {
        res.json(result);
      }
    })
    .catch((error) => {
      console.log('error', error);
      // Handle the error and send an appropriate response to the front end
      res.status(500).json({
        error: 'An error occurred with the stable diffusion api call',
      });
    });
});

router.post('/upload-image', async (req, res) => {
  try {
    // Coming from the front end
    const { image, metadata } = req.body;

    const fetchedImage = await fetch(image);
    const imageData = await fetchedImage.arrayBuffer();
    const blob = new Blob([imageData], {
      type: fetchedImage.headers.get('content-type'),
    });

    console.log(`Image: ${image} metadata: ${metadata.name}`);

    const name = metadata.name;
    const description = metadata.description;

    // New instance of NFTSTORAGE API
    const client = new NFTStorage({
      token: process.env.NFTSTORAGE_KEY,
    });

    console.log('BLOB:', blob);
    const imageHash = await client.storeBlob(blob);
    console.log('Image Hash:', imageHash);

    const attributes = [];
    for (let i = 0; i < metadata.attributes.length; i++) {
      const { trait, value } = metadata.attributes[i];
      attributes.push({
        trait_type: trait,
        value: value,
      });
    }

    const modifiedBlob = new Blob([blob], { type: 'image/png' });
    console.log('Modified Blob:', modifiedBlob);

    const nft = {
      name: name,
      description: description,
      image: modifiedBlob,
      attributes: attributes,
    };

    console.log('nft:', nft);

    const meta = await client.store(nft);

    const myNFTUrl = `https://ipfs.io/ipfs/${meta.ipnft}/metadata.json`;
    console.log('My NFT URL:', myNFTUrl);

    // Set the URL to your front end
    res.json({ url: myNFTUrl });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
