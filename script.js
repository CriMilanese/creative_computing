async function scrollPage(elem){
  $('scroll-page[id^="'+elem.id+'"]').get(0).scrollIntoView();
}

$(function() {

  let nav_link = document.querySelectorAll(".nav-link");
  const newsCallback = (entries) => {
    if(entries[0].isIntersecting){
      nav_link[2].classList.add("active-link");
    } else {
      nav_link[2].classList.remove("active-link");
    }
  }

  const projCallback = (entries) => {
    if(entries[0].isIntersecting){
      nav_link[1].classList.add("active-link");
    } else {
      nav_link[1].classList.remove("active-link");
    }
  }

  const homeCallback = (entries) => {
    if(entries[0].isIntersecting){
      nav_link[0].classList.add("active-link");
    } else {
      nav_link[0].classList.remove("active-link");
    }
  }

  const options = {
    root: document.querySelector(".scroll-grid"),
    rootMargin: '0px',
    threshold: 0.5
  };

  // this is very ugly

  const observerNews = new IntersectionObserver(newsCallback, options);
  const observerHome = new IntersectionObserver(homeCallback, options);
  const observerProj = new IntersectionObserver(projCallback, options);
  const home_page = document.querySelector("#info_page");
  const news_page = document.querySelector("#news_page");
  const proj_page = document.querySelector("#projects_page");
  observerNews.observe(news_page);
  observerHome.observe(home_page);
  observerProj.observe(proj_page);


});
