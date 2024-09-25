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
    console.log(`Creating slide for post ID: ${post.id}`); // Log the post ID to track slide creation
    const title = post.title || 'No Title Available';
    const mediaUrl = post.media?.url || 'http://127.0.0.1:5500/assets/default-image.jpg';
    const mediaAlt = post.media?.alt || 'Post Image';
    const bodyText = post.body ? post.body.substring(0, 200) : 'No content available...';
  
    const slide = document.createElement('li');
    slide.classList.add('carousel-slide');
  
    // Create the content wrapper to group title, image, and body
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('carousel-content'); // Ensure your CSS has styles for this class
  
    const img = document.createElement('img');
    img.src = mediaUrl;
    img.alt = mediaAlt;
    img.style.width = '100%';
    img.style.height = '20vh';
    img.style.objectFit = 'cover';
  
    img.addEventListener('error', function () {
      img.src = 'http://127.0.0.1:5500/assets/default-image.jpg';
    });
  
    img.addEventListener('click', () => {
      window.location.href = `/post/index.html?id=${post.id}`;
    });
  
    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
  
    const bodyElem = document.createElement('p');
    bodyElem.textContent = `${bodyText}...`;
  
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('read-more');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
      console.log(`Read More clicked for post ID: ${post.id}`); // Log button click
      window.location.href = `/post/index.html?id=${post.id}`;
    });
  
    // Append the title, image, and body text to the content wrapper
    contentWrapper.appendChild(titleElem);
    contentWrapper.appendChild(img);
    contentWrapper.appendChild(bodyElem);
  
    // Append the content wrapper and the read-more button to the slide
    slide.appendChild(contentWrapper);
    slide.appendChild(readMoreButton);
  
    console.log(`Added Read More button to slide for post ID: ${post.id}`); // Log button addition
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
    // Clone and clean slides to prevent duplicate buttons
    const firstClone = cloneAndCleanSlide(slides[0]);
    const lastClone = cloneAndCleanSlide(slides[slides.length - 1]);
    console.log('First and last slides cloned and cleaned of Read More buttons.');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children);
    console.log(`Total slides after cloning: ${slides.length}`); // Log total slides count after cloning
  }

  function cloneAndCleanSlide(slide, postId) {
    const clone = slide.cloneNode(true);
    const readMoreButton = clone.querySelector('.read-more');
  
    // Option 1: Re-create the button for the cloned slide
    if (!readMoreButton) {
      const newButton = document.createElement('button');
      newButton.classList.add('read-more');
      newButton.textContent = 'Read More';
      newButton.addEventListener('click', () => {
        window.location.href = `/post/index.html?id=${postId}`;
      });
      clone.appendChild(newButton);
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
    if (index < 0) {
      index = slides.length - slidesToShow - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    if (index === slides.length - 1) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${((index - 1) * 100) / slidesToShow}%)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        currentIndex = 0;
        goToSlide(currentIndex);
        updateActiveDot(currentIndex);
      }, 50);
    } else {
      track.style.transform = `translateX(-${((index + 1) * 100) / slidesToShow}%)`;
    }

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

















