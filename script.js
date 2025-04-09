document.addEventListener('DOMContentLoaded', function() {
    // Video background handling
    const video = document.getElementById('background-video');
    
    // Make sure the video loops
    video.loop = true;
    
    // Handle video loading errors
    video.addEventListener('error', function() {
        console.error('Error loading video');
        // Fallback to a gradient background if video fails to load
        document.querySelector('.video-container').style.background = 
            'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
    });
    
    // Ensure video plays when ready
    video.addEventListener('canplaythrough', function() {
        video.play().catch(e => {
            console.error('Auto-play was prevented:', e);
            // Add a play button if autoplay is blocked
            createPlayButton();
        });
    });
    
    // Staggered animation for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animation = `fadeIn 0.5s ease-out forwards ${0.1 + index * 0.1}s`;
        item.style.opacity = '0'; // Start with opacity 0
        
        // Add click handler for active state
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all menu items
    menuItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        video.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.1}px))`;
    });
    
    // Add hover sound effect (optional - uncomment if desired)
    /*
    const hoverSound = new Audio('sounds/hover.mp3');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play().catch(e => console.log('Audio play prevented'));
        });
    });
    */
});

// Create a play button if autoplay is blocked
function createPlayButton() {
    const playButton = document.createElement('button');
    playButton.innerHTML = '<i class="fas fa-play"></i> Play Background';
    playButton.className = 'play-button';
    playButton.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 10;
        padding: 12px 20px;
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        backdrop-filter: blur(5px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    `;
    
    playButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
        this.style.transform = 'translateY(-2px)';
    });
    
    playButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        this.style.transform = 'translateY(0)';
    });
    
    playButton.addEventListener('click', function() {
        document.getElementById('background-video').play();
        this.style.opacity = '0';
        setTimeout(() => this.remove(), 300);
    });
    
    document.body.appendChild(playButton);
}