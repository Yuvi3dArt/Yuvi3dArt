document.addEventListener('DOMContentLoaded', () => {
    // GSAP Initialization
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(cursorBlur, {
            x: e.clientX - 16,
            y: e.clientY - 16,
            duration: 0.3
        });
    });

    // Cursor Interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, [contenteditable="true"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(59, 130, 246, 0.2)', mixBlendMode: 'normal' });
            gsap.to(cursorBlur, { scale: 1.5, borderColor: 'rgba(59, 130, 246, 0.8)' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#3b82f6', mixBlendMode: 'difference' });
            gsap.to(cursorBlur, { scale: 1, borderColor: 'rgba(59, 130, 246, 0.3)' });
        });
    });

    // Hero Animation
    gsap.to('#hero-content', {
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5
    });

    // Scroll Reveals
    const revealSections = document.querySelectorAll('section:not(#hero)');
    revealSections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.getElementById('close-modal');
    const galleryContainer = document.getElementById('model-gallery');
    const galleryGrid = document.getElementById('modal-gallery-grid');

    const projectData = {
        "Neon Nights: District 9": {
            tags: ["Unreal Engine 5", "Lumen", "Nanite"],
            desc: "A futuristic urban environment exploration focusing on realistic neon lighting and volumetric fog effects in UE5.3. All assets are custom-built utilizing a modular pipeline.",
            media: "https://videos.pexels.com/video-files/3129638/3129638-uhd_2560_1440_30fps.mp4",
            type: "video",
            gallery: [
                "https://images.unsplash.com/photo-1616489953149-8c6525381162?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
            ]
        },
        "The Apex Predator": {
            tags: ["Blender", "V-Ray", "Substance"],
            desc: "High-fidelity automotive render of a concept supercar. Focused on complex surface curvatures and realistic carbon fiber shaders.",
            media: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1600",
            type: "image",
            gallery: [
                "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800"
            ]
        },
        "Synthwave Memories": {
            tags: ["Maya", "After Effects", "Arnold"],
            desc: "A stylized product animation for a retro handheld console. The project explores 80s aesthetics with vibrant purple/teal lighting and custom CRT shader effects.",
            media: "https://videos.pexels.com/video-files/7565438/7565438-uhd_2560_1440_30fps.mp4",
            type: "video",
            gallery: [
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&q=80&w=800"
            ]
        },
        "Minimalist Haven": {
            tags: ["UE5", "ArchViz", "Lumen"],
            desc: "Modern interior design visualization. Developed to test the limits of Lumen's real-time global illumination for subtle, indirect daylighting.",
            media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600",
            type: "image",
            gallery: [
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
            ]
        },
        "Cyber-Samurai 2177": {
            tags: ["ZBrush", "Substance", "Marvelous"],
            desc: "A high-poly character sculpt featuring intricate mechanical parts and realistic fabric simulation for the clothing.",
            media: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=1600",
            type: "image",
            gallery: [
                "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800"
            ]
        },
        "Lost Relics: Jungle": {
            tags: ["UE5", "Nanite", "Quixel"],
            desc: "Cinematic environment walkthrough of an ancient temple overgrown by nature. Utilized Nanite for ultra-detailed stone ruins and procedural foliage layers.",
            media: "https://videos.pexels.com/video-files/4201248/4201248-uhd_2560_1440_24fps.mp4",
            type: "video",
            gallery: [
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
            ]
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h5').innerText;
            const data = projectData[title];

            modalTitle.innerText = title;
            modalDesc.innerText = data.desc;

            // Handle Media Type
            if (data.type === 'video') {
                modalImg.classList.add('hidden');
                modalVideo.classList.remove('hidden');
                modalVideo.querySelector('source').src = data.media;
                modalVideo.load();
                modalVideo.play();
            } else {
                modalVideo.classList.add('hidden');
                modalVideo.pause();
                modalImg.classList.remove('hidden');
                modalImg.src = data.media;
            }

            // Handle Gallery
            if (data.gallery && data.gallery.length > 0) {
                galleryContainer.classList.remove('hidden');
                galleryGrid.innerHTML = '';
                data.gallery.forEach(imgSrc => {
                    const thumb = document.createElement('div');
                    thumb.className = 'gallery-thumb';
                    thumb.innerHTML = `<img src="${imgSrc}" alt="Gallery Detail">`;
                    thumb.addEventListener('click', () => {
                        modalVideo.classList.add('hidden');
                        modalVideo.pause();
                        modalImg.classList.remove('hidden');
                        modalImg.src = imgSrc.replace('w=400', 'w=1600');
                    });
                    galleryGrid.appendChild(thumb);
                });
            } else {
                galleryContainer.classList.add('hidden');
            }

            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase';
                span.innerText = tag;
                tagsContainer.appendChild(span);
            });

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            gsap.from('#project-modal > div', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'back.out' });
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    });

    // CV Download Feature (using window.print specialized for CV section)
    const downloadBtn = document.getElementById('download-cv');
    downloadBtn.addEventListener('click', () => {
        window.print();
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // Toggle Icon
        if (mobileMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars-staggered');
            menuIcon.classList.add('fa-xmark');
            gsap.to(menuBtn, { color: '#3b82f6', duration: 0.3 });
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars-staggered');
            gsap.to(menuBtn, { color: '#ffffff', duration: 0.3 });
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars-staggered');
            gsap.to(menuBtn, { color: '#ffffff', duration: 0.3 });
        });
    });

    // Smooth Progress Bar Animation for Skills (Conceptual)
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('i'), { scale: 1.1, color: '#3b82f6', duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('i'), { scale: 1, color: 'rgba(255,255,255,0.4)', duration: 0.3 });
        });
    });
});
