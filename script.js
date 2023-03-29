// Get the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load the image
const img = new Image();
img.crossOrigin = "anonymous"; // This line allows the image to be loaded from another domain
img.onload = function () {
  // Set the canvas width and height to match the image
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the image on the canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Get the original image data
  const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Define the amount of glitch
  const glitchAmount = 0.05; // Adjust this value to control the amount of glitch

  // Create a flicker loop that alternates between the original and glitched versions of the image
  let isGlitched = false;
  setInterval(function () {
    // Choose whether to display the original or glitched version of the image
    if (isGlitched) {
      // Glitch the image by randomly changing the color values of some pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (Math.random() < glitchAmount) {
          imageData.data[i] = Math.floor(Math.random() * 256);
          imageData.data[i + 1] = Math.floor(Math.random() * 256);
          imageData.data[i + 2] = Math.floor(Math.random() * 256);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    } else {
      // Restore the original image data
      ctx.putImageData(originalImageData, 0, 0);
    }

    // Flip the glitched state for the next loop iteration
    isGlitched = !isGlitched;
  }, 100); // Adjust this value to control the flicker rate
};

// Set the image source
img.src = "https://i.seadn.io/gae/4NiJOumIEiFZ4pySe34ermUxAHPKn2IVZLVy0pjB1quIMeCVlCS2UB-rIYTZCDF59Vsckf6NHuLxlvoWXPnbtgOQychAr6KHRArt9Lg?auto=format&w=1000";
