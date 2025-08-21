document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Add scroll animation for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});


lucide.createIcons();

document.addEventListener('DOMContentLoaded', function() {
    // Get all unique image sources and alt texts
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const uniqueImages = [];
    const uniqueAlts = [];
    
    // Get unique images (avoid duplicates from the loop)
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        
        if (!uniqueImages.includes(src)) {
            uniqueImages.push(src);
            uniqueAlts.push(alt);
        }
    });
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevButton');
    const nextBtn = document.getElementById('nextButton');
    
    let currentIndex = 0;
    
    // Open modal when clicking on an image
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            
            // Find the index of the clicked image
            currentIndex = uniqueImages.indexOf(src);
            
            // Update modal with image details
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.textContent = alt;
            
            // Show modal
            modal.classList.add('active');
            
            // Pause the marquee animation when modal is open
            document.querySelector('.marquee-track').style.animationPlayState = 'paused';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        // Resume the marquee animation
        document.querySelector('.marquee-track').style.animationPlayState = 'running';
    }
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + uniqueImages.length) % uniqueImages.length;
        updateModalImage();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % uniqueImages.length;
        updateModalImage();
    });
    
    // Update modal image and caption
    function updateModalImage() {
        modalImg.src = uniqueImages[currentIndex];
        modalImg.alt = uniqueAlts[currentIndex];
        modalCaption.textContent = uniqueAlts[currentIndex];
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor-follower");
    const projectCards = document.querySelectorAll(".project-card");
    
    // Update cursor position
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Show cursor on project hover
    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            cursor.style.opacity = 1;
        });
        
        card.addEventListener("mouseleave", () => {
            cursor.style.opacity = 0;
        });
    });
    
    // No need to modify cursor for other elements anymore
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq_item_b6d1e');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq_question_f2a7d');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active_i4j6k');
            
            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active_i4j6k');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active_i4j6k');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    // Create trail elements
    const trailCount = 5;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.classList.add('trail');
      trail.style.opacity = 1 - (i / trailCount);
      trail.style.width = `${10 - i}px`;
      trail.style.height = `${10 - i}px`;
      document.body.appendChild(trail);
      trails.push({
        element: trail,
        x: 0,
        y: 0
      });
    }

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Handle cursor states
    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
    });

    // Handle hover states
    const hoverElements = document.querySelectorAll('.button');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });

    // Animation loop for smooth cursor movement
    function animateCursor() {
      // Update main cursor position
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      
      // Update cursor dot position (follows exactly)
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      
      // Update trail positions with delay
      trails.forEach((trail, index) => {
        // Create a delay effect
        trail.x += (mouseX - trail.x) * (0.2 - index * 0.03);
        trail.y += (mouseY - trail.y) * (0.2 - index * 0.03);
        
        trail.element.style.left = `${trail.x}px`;
        trail.element.style.top = `${trail.y}px`;
      });
      
      requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
  });
