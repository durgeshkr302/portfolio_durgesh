// Theme toggle logic: day/night icon and dark mode toggle for future custom use
const themeToggleCheckbox = document.getElementById('theme-toggle');

function setTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light');
    themeToggleCheckbox.checked = true;
  } else {
    document.body.classList.remove('light');
    themeToggleCheckbox.checked = false;
  }
}

themeToggleCheckbox.addEventListener('change', () => {
  setTheme(themeToggleCheckbox.checked);
});

 //Initialize theme toggle state on page load
window.addEventListener('DOMContentLoaded', () => {
  const isLight = document.body.classList.contains('light');
  setTheme(isLight);
});

function showDownloadNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#10b981';
  notification.style.color = '#fff';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  notification.style.zIndex = '10000';
  notification.style.fontSize = '1rem';
  notification.style.fontWeight = '600';
  notification.style.opacity = '0';
  notification.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(notification);

  // Fade in
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
  });

  // Fade out and remove 3 seconds baad
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.addEventListener('transitionend', () => {
      notification.remove();
    });
  }, 3000);
}

// Resume button hai  click - show download notification
document.querySelector('.btn-resume').addEventListener('click', () => {
  showDownloadNotification('Resume download started.');
});

// Custom cursor implementation
const cursor = document.getElementById('custom-cursor');

// Hide real cursor
document.body.style.cursor = 'none';

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const speed = 0.1; // ye Adjust smoothness (0 < speed < 1)

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animate);
}
animate();

// Add glow effect on button click
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    cursor.classList.add('glow');
    setTimeout(() => {
      cursor.classList.remove('glow');
    }, 500);
  });
  button.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.3';
  });
  button.addEventListener('mouseleave', () => {
    cursor.style.opacity = '1';
  });
});

window.addEventListener('DOMContentLoaded', () => {
  // main tagline Animation words one by one
  const taglineSpans = document.querySelectorAll('h1 > div > span');
  taglineSpans.forEach(span => {
    span.style.opacity = '0'; // hide initially
  });

  taglineSpans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add('word-animate');
    }, index * 400); // 400ms delay between words
  });

  //"tomorrow." animete one by one
  const tomorrowLetters = document.querySelectorAll('span.relative.inline-block > span.block > span');
  tomorrowLetters.forEach(letter => {
    letter.style.opacity = '0'; // hide initially
  });

  tomorrowLetters.forEach((letter, index) => {
    setTimeout(() => {
      letter.classList.add('word-animate');
    }, taglineSpans.length * 400 + index * 150); // start after words animation, 150ms delay between letters
  });

  // Calculate total delay for last letter animation to start SVG line animation
  const totalLetterAnimationTime = taglineSpans.length * 400 + tomorrowLetters.length * 150 + 600; // words + letters + animation duration

  // 3 SVG lines animetion jo tomorrow. latter ke baad ayega.
  setTimeout(() => {
    const paths = document.querySelectorAll('.svg-path');
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animationDelay = `${index * 0.3}s`;

      // Trigger reflow to restart animation
      path.getBoundingClientRect();
      path.style.animation = 'drawLine 2s ease forwards';
    });

    // right to left animation social icons animation 
    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
      socialIcons.classList.add('slide-in');
    }
  }, totalLetterAnimationTime);
});
