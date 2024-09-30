document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dotArray = [];
  let currentIndex = 0;
  let slidesToShow = 3; 
  let slides;

  function updateSlidesToShow() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 400) {
      slidesToShow = 1; 
    } else if (screenWidth <= 500) {
      slidesToShow = 2; 
    } else {
      slidesToShow = 3; 
    }

    setSlidePosition();
  }

  window.addEventListener('resize', updateSlidesToShow);

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
        updateSlidesToShow(); 
        updateActiveDot(currentIndex);
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  function createSlide(post, index) {
    console.log(`Creating slide for post ID: ${post.id}`); 
    const title = post.title || 'No Title Available';
    const mediaUrl = post.media?.url || 'https://entav78.github.io/FED1-exam/assets/default-image.jpg';
    const mediaAlt = post.media?.alt || 'Post Image';
    const maxContentLength = 70;
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
  
    img.addEventListener('error', function () {
      img.src = 'https://entav78.github.io/FED1-exam/assets/default-image.jpg';
    });
  
    img.addEventListener('click', () => {
      window.location.href = `https://entav78.github.io/FED1-exam/post/index.html?id=${post.id}`;
    });
  
    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
  
    const bodyElem = document.createElement('p');
    bodyElem.textContent = `${bodyText}...`;
  
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('read-more');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
      console.log(`Read More clicked for post ID: ${post.id}`);
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
  
    console.log(`Added Read More button to slide for post ID: ${post.id}`); 
    track.appendChild(slide);
  
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dotsNav.appendChild(dot);
    dotArray.push(dot);
  
    dot.addEventListener('click', () => {
      goToSlide(index);
      updateActiveDot(index);
      currentIndex = index;
    });
  }
  
  function createCloneSlides() {
    console.log('Cloning first and last slides for seamless looping.');
    const firstClone = cloneAndCleanSlide(slides[0]);
    const lastClone = cloneAndCleanSlide(slides[slides.length - 1]);
    console.log('First and last slides cloned and cleaned of Read More buttons.');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children);
    console.log(`Total slides after cloning: ${slides.length}`); 
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




















