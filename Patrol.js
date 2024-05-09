// function sendImages(images) {
//   try {
//     if (images.length > 1) {
//       for (let i = 0; i < images.length; i++) {
//         const image = images[i];

//         // if (image.currentSrc) {
//         //   // انجام عملیات مربوط به currentSrc
//         //   sendImageToJava(image.currentSrc);
//         // } else {
//         //   // مدیریت مواقعی که currentSrc خالی است
//         //   console.error("currentSrc is empty or not available.");
//         // }

//         // if (!image.complete || !image.src || image.loading === "lazy") {
//         //   image.addEventListener("load", onImageLoad);
//         // } else {
//         //   sendImageToJava(image.src);
//         // }
//         // image.addEventListener("load", function () {
//         //   // onImageLoad
//         //   sendImageIfComplete(image);
//         // });

//         if (!image.complete || !image.src || image.loading === "lazy") {
//           image.addEventListener("load", onImageLoad);
//         } else {
//           sendImageIfComplete(image);
//         }

//       }
//     }
//   } catch (e) {}
// }

// function onImageLoad() {
//   // Check if the image has the loading attribute set to "lazy"
//   if (this.loading === "lazy") {
//     // If it's lazy loaded, wait for the "loaded" event before sending the link
//     this.addEventListener("loaded", function () {
//       sendImageIfComplete(this.src);
//     });
//   } else {
//     // If it's not lazy loaded, send the link immediately
//     sendImageIfComplete(this.src);
//   }
// }

///////////

// function sendImageToJava(link) {
//   // send link to java
//   Android.getLink(link);
// }

// function sendImages(images) {
//   try {
//     if (images.length > 1) {
//       for (let i = 0; i < images.length; i++) {
//         const image = images[i];
//         if (!image.complete || (!image.currentSrc && !image.src)) {
//           // if (!image.complete || !image.src) {
//           image.addEventListener("load", onImageLoad);
//         } else if (
//           image.naturalWidth > 100 &&
//           image.naturalHeight > 100 &&
//           image.offsetTop < 100
//         ) {
//           const linkToSend = image.currentSrc || image.src;
//           sendImageToJava(linkToSend);
//           // sendImageToJava(image.src);
//         }
//       }
//     }
//   } catch (e) {}
// }

// function onImageLoad() {
//   // load image success
//   if (
//     this.naturalWidth > 100 &&
//     this.naturalHeight > 100 &&
//     this.offsetTop < 100
//   ) {
//     const linkToSend = this.currentSrc || this.src;
//     sendImageToJava(linkToSend);
//     // sendImageToJava(this.src);
//   }
// }

// function onPageLoad() {
//   const images = document.getElementsByTagName("img");
//   sendImages(images);
// }

// if (document.readyState !== "loading") {
//   onPageLoad();
// } else {
//   document.addEventListener("DOMContentLoaded", function () {
//     onPageLoad();
//   });
// }

// var observer = new MutationObserver(function (mutations) {
//   mutations.forEach(function (mutation) {
//     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//       handleNewElements(mutation.addedNodes);
//     }
//   });
// });

// var observerConfig = {
//   childList: true,
//   subtree: true,
// };

// observer.observe(document.body, observerConfig);

// function handleNewElements(addedNodes) {
//   addedNodes.forEach(function (node) {
//     const images = node.getElementsByTagName("img");
//     sendImages(images);
//   });
// }

////
function sendImageToJava(link) {
  // send link to java
  Android.getLink(link);
}

function sendImages(images) {
  try {
    if (images.length > 1) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.complete || !image.src) {
          onImageLoad(image);
        } else if (
          image.naturalWidth > 100 &&
          image.naturalHeight > 100 &&
          image.offsetTop < 100
        ) {
          sendImageToJava(image.src);
        }
      }
    }
  } catch (e) {}
}

function onImageLoad(image) {
  // load image success
  if (
    image.naturalWidth > 100 &&
    image.naturalHeight > 100 &&
    image.offsetTop < 100
  ) {
    setTimeout(function () {
      sendImageToJava(image.src);
    }, 3000);
  }
}

function onPageLoad() {
  const images = document.getElementsByTagName("img");
  sendImages(images);
}

if (document.readyState !== "loading") {
  onPageLoad();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    onPageLoad();
  });
}

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      handleNewElements(mutation.addedNodes);
    }
  });
});

var observerConfig = {
  childList: true,
  subtree: true,
};

observer.observe(document.body, observerConfig);

function handleNewElements(addedNodes) {
  addedNodes.forEach(function (node) {
    const images = node.getElementsByTagName("img");
    sendImages(images);
  });
}
