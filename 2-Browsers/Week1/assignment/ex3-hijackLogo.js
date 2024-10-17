/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-3-the-logo-hijack

1. Find out how to select the element that contains the Google logo, and store 
   it in a variable.
2. Modify the `src` and `srcset` of the logo so that it's replaced by the 
   HackYourFuture logo instead.
------------------------------------------------------------------------------*/
function hijackGoogleLogo() {
  const googleLogo = document.querySelector('img[alt="Google"]');

  googleLogo.src = 'https://logospng.org/download/google/logo-google-4096.png';
  googleLogo.srcset =
    'https://th.bing.com/th/id/OIP.MSowWUgtZnzldow_0SRCYAAAAA?rs=1&pid=ImgDetMain';
}

hijackGoogleLogo();
