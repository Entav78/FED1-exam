document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dotArray = [];
  let currentIndex = 0;
  const slidesToShow = 3;
  let slides;

  fetchLatestPosts();

  function fetchLatestPosts() {
    const API_URL = 'https://v2.api.noroff.dev/blog/posts/Hilde_Vatne';

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const posts = data.data;

        posts.forEach((post, index) => {
          createSlide(post, index);
        });

        slides = Array.from(track.children);
        createCloneSlides(); 
        setSlidePosition(); 
        updateActiveDot(currentIndex);
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  function createSlide(post, index) {
    const screenWidth = window.innerWidth;
    const maxContentLength = screenWidth <= 500 ? 20 : screenWidth <= 800 ? 40 : 70; 

    const title = post.title || 'No Title Available';
    const mediaUrl = post.media?.url || 'https://entav78.github.io/FED1-exam/assets/default-image.jpg';
    const mediaAlt = post.media?.alt || 'Post Image';
    const bodyText = post.body ? post.body.substring(0, maxContentLength) : 'No content available...';

    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('carousel-content');

    const img = document.createElement('img');
    img.src = mediaUrl;
    img.alt = mediaAlt;
    img.style.width = '100%';
    img.style.height = '20vh';
    img.style.objectFit = 'cover';

    const titleElem = document.createElement('h2');
    titleElem.textContent = title;

    const bodyElem = document.createElement('p');
    bodyElem.textContent = `${bodyText}...`;

    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('read-more');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
        window.location.href = `https://entav78.github.io/FED1-exam/post/index.html?id=${post.id}`;
    });

    contentWrapper.appendChild(titleElem);
    contentWrapper.appendChild(img);
    contentWrapper.appendChild(bodyElem);

    slide.style.display = 'flex';
    slide.style.flexDirection = 'column';
    slide.style.justifyContent = 'space-between';

    slide.appendChild(contentWrapper);
    slide.appendChild(readMoreButton);

    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Navigate to slide ${index + 1}`);
    dotsNav.appendChild(dot);
    dotArray.push(dot);

    dot.addEventListener('click', () => {
        goToSlide(index);
        updateActiveDot(index);
        currentIndex = index;
    });
}


  function createCloneSlides() {
    const firstClone = cloneAndCleanSlide(slides[0]);
    const lastClone = cloneAndCleanSlide(slides[slides.length - 1]);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children); 
  }

  function cloneAndCleanSlide(slide) {
    const clone = slide.cloneNode(true);
    const readMoreButton = clone.querySelector('.read-more');
    if (readMoreButton) {
      readMoreButton.remove(); 
    }
    return clone;
  }

  function setSlidePosition() {
    slides.forEach((slide, index) => {
      slide.style.left = `${(index * 100) / slidesToShow}%`;
    });
    track.style.transform = `translateX(-${(100 / slidesToShow)}%)`;
  }

  function moveToNextSlide() {
    if (currentIndex >= slides.length - slidesToShow - 1) {
      track.style.transition = 'transform 0.5s ease-in-out';
      currentIndex++;
      goToSlide(currentIndex);
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        goToSlide(currentIndex);
        updateActiveDot(currentIndex);
      }, 500);
    } else {
      currentIndex++;
      goToSlide(currentIndex);
    }
  }

  function moveToPrevSlide() {
    if (currentIndex <= 0) {
      track.style.transition = 'transform 0.5s ease-in-out';
      currentIndex--;
      goToSlide(currentIndex);
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = slides.length - slidesToShow - 1;
        goToSlide(currentIndex);
        updateActiveDot(currentIndex);
      }, 500);
    } else {
      currentIndex--;
      goToSlide(currentIndex);
    }
  }

  function goToSlide(index) {
    track.style.transform = `translateX(-${((index + 1) * 100) / slidesToShow}%)`;
    currentIndex = index;
    updateActiveDot(index);
  }

  function updateActiveDot(index) {
    const realIndex = index % (slides.length - 2);
    dotArray.forEach((dot, i) => {
      dot.classList.toggle('active', i === realIndex);
    });
  }
});
























