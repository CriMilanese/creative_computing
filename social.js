function githubPage() {
  window.open();
  let appWindow = window.open('https://github.com/CriMilanese', '_blank');
  setTimeout(function() {
    if (appWindow) {
      appWindow.location = "https://github.com/CriMilanese";
    }
  }, 1000);
}

function facebookPage() {
  let appWindow = window.open('fb://profile/100000686899395', '_blank');
  setTimeout(function() {
    if (appWindow) {
      appWindow.location = "https:://facebook.com/CriMilanese7";
    }
  }, 1000);
}

function instaPage() {
  window.open('instagram://user?username=elmilanes', '_blank');
}

function linkedinPage() {
  window.open('https://www.linkedin.com/in/cristianomilanese', '_blank');
}

// jquery methods
// at html loading complete
$(function() {
  $('.fa-github').hide().delay(6000).slideDown(300);
  $('.fa-linkedin').hide().delay(7000).slideDown(300);
  $('.fa-instagram').hide().delay(8000).slideDown(300);
  $('.fa-facebook').hide().delay(9000).slideDown(300);
});
