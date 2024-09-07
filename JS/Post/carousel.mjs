document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dotArray = [];
  let currentIndex = 0; // Track the current slide index
  const slidesToShow = 3; // Number of slides visible at a time
  let slides; // Declare slides globally to access after setting positions

  fetchLatestPosts();

  function fetchLatestPosts() {
    const API_URL = 'https://v2.api.noroff.dev/blog/posts/Hilde_Vatne'; // Replace with your actual API URL

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const posts = data.data; // Access all posts

        posts.forEach((post, index) => {
          const title = post.title || 'No Title Available';
          const mediaUrl = post.media?.url || 'http://127.0.0.1:5500/assets/default-image.jpg'; // Provide a default image if URL is missing
          const mediaAlt = post.media?.alt || 'Post Image';
          const bodyText = post.body ? post.body.substring(0, 100) : 'No content available...';

          // Create a slide for each post
          const slide = document.createElement('li');
          slide.classList.add('carousel-slide');

          slide.innerHTML = `
            <h3>${title}</h3>
            <img src="${mediaUrl}" alt="${mediaAlt}" style="width: 100%;">
            <p>${bodyText}...</p>
            <button class="read-more" onclick="window.location.href='/post/index.html?id=${post.id}'">Read More</button>
          `;

          track.appendChild(slide);

          // Create navigation dots
          const dot = document.createElement('button');
          dot.classList.add('carousel-dot');
          dotsNav.appendChild(dot);
          dotArray.push(dot);

          // Add event listener to dots
          dot.addEventListener('click', () => {
            goToSlide(index);
            updateActiveDot(index);
          });
        });

        slides = Array.from(track.children);
        createCloneSlides(); // Clone the first and last slides for seamless looping
        setSlidePosition();
        updateActiveDot(currentIndex);
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  function createCloneSlides() {
    // Clone first and last slides for seamless looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Add clones to the start and end of the track
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children); // Update the slides array to include the clones
  }

  function setSlidePosition() {
    slides.forEach((slide, index) => {
      slide.style.left = `${(index * 100) / slidesToShow}%`; // Position each slide correctly for 3 images at a time
    });
    track.style.transform = `translateX(-${(100 / slidesToShow)}%)`; // Start at the first real slide (accounting for the clone)
  }

  function moveToNextSlide() {
    if (currentIndex === slides.length - slidesToShow - 1) { // If reaching the last real slide
      track.style.transition = 'transform 0.5s ease-in-out';
      currentIndex++;
      goToSlide(currentIndex);
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0; // Jump back to the real first slide after clone
        goToSlide(currentIndex);
      }, 500);
    } else {
      currentIndex++;
      goToSlide(currentIndex);
    }
  }

  function moveToPrevSlide() {
    if (currentIndex === 0) { // If at the first real slide
      track.style.transition = 'transform 0.5s ease-in-out';
      currentIndex--;
      goToSlide(currentIndex);
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = slides.length - slidesToShow - 1; // Jump to the real last slide after clone
        goToSlide(currentIndex);
      }, 500);
    } else {
      currentIndex--;
      goToSlide(currentIndex);
    }
  }

  function goToSlide(index) {
    track.style.transform = `translateX(-${((index + 1) * 100) / slidesToShow}%)`; // Adjust position to account for the clones
    updateActiveDot(index);
  }

  function updateActiveDot(index) {
    // Calculate the active dot index based on the current slide position
    const realIndex = index % dotArray.length; // Loop back index to the dot range
    dotArray.forEach((dot, i) => {
      dot.classList.toggle('active', i === realIndex); // Set the active class correctly
    });
  }
});






/*document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dotArray = [];
  let currentIndex = 0; // Track the current slide index
  const slidesToShow = 3; // Number of slides visible at a time

  fetchLatestPosts();

  function fetchLatestPosts() {
    const API_URL = 'https://v2.api.noroff.dev/blog/posts/Hilde_Vatne'; // Replace with your actual API URL

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const posts = data.data; // Access all posts

        posts.forEach((post, index) => {
          const title = post.title || 'No Title Available';
          const mediaUrl = post.media?.url || 'http://127.0.0.1:5500/assets/default-image.jpg'; // Provide a default image if URL is missing
          const mediaAlt = post.media?.alt || 'Post Image';
          const bodyText = post.body ? post.body.substring(0, 100) : 'No content available...';

          // Create a slide for each post
          const slide = document.createElement('li');
          slide.classList.add('carousel-slide');

          slide.innerHTML = `
            <h3>${title}</h3>
            <img src="${mediaUrl}" alt="${mediaAlt}" style="width: 100%;">
            <p>${bodyText}...</p>
            <button class="read-more" onclick="window.location.href='/post/index.html?id=${post.id}'">Read More</button>
          `;

          track.appendChild(slide);

          // Create navigation dots
          const dot = document.createElement('button');
          dot.classList.add('carousel-dot');
          dotsNav.appendChild(dot);
          dotArray.push(dot);

          // Add event listener to dots
          dot.addEventListener('click', () => {
            goToSlide(index);
            updateActiveDot(index);
          });
        });

        setSlidePosition();
        updateActiveDot(currentIndex);
        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  function setSlidePosition() {
    const slides = Array.from(track.children);
    slides.forEach((slide, index) => {
      slide.style.left = `${(index * 100) / slidesToShow}%`; // Position each slide correctly for 3 images at a time
    });
  }

  function moveToNextSlide() {
    const slides = Array.from(track.children);
    currentIndex = (currentIndex + 1) % slides.length; // Move by one slide to the right
    goToSlide(currentIndex);
  }

  function moveToPrevSlide() {
    const slides = Array.from(track.children);
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Move by one slide to the left
    goToSlide(currentIndex);
  }

  function goToSlide(index) {
    currentIndex = index; // Update the current index to match the clicked dot or button navigation
    track.style.transform = `translateX(-${(index * 100) / slidesToShow}%)`; // Moves the track correctly to display the slides
    updateActiveDot(index);
  }

  function updateActiveDot(index) {
    const activeDotIndex = Math.floor(index / slidesToShow); // Calculate which dot should be active based on the current index
    dotArray.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeDotIndex);
    });
  }
});
*/




