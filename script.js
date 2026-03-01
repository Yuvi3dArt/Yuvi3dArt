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
        "High-End Car Render": {
            software: "Arnold, Maya, Substance Painter",
            role: "Modeling, Texturing, Lighting, Rendering",
            desc: "A photorealistic automotive visualization project. High-poly car modeling in Maya, detailed PBR texturing in Substance, and cinematic real-time rendering in Unreal Engine 5.",
            media: "images/car/main.jpg",
            type: "image",
            video: "",
            gallery: [
                "images/car/main.jpg",
                "images/car/1.jpg",
                "images/car/2.jpg",
                "images/car/F side.jpg",
                "images/car/black car.jpg",
                "images/car/black.jpg",
                "images/car/grey.jpg",
                "images/car/wireframe.jpg"
            ]
        },
        "Ancient Axe Sculpt": {
            software: "ZBrush, Maya, Substance Painter, Arnold",
            role: "High-Poly Sculpting, Retopology, Texturing",
            desc: "Detailed prop work focusing on intricate carvings and realistic material wear. Sculpted in ZBrush and textured with multi-layered PBR materials.",
            media: "images/axe/main.jpg",
            type: "image",
            gallery: [
                "images/axe/main.jpg",
                "images/axe/png.jpg",
                "images/axe/png 2.jpg",
                "images/axe/png 3.jpg",
                "images/axe/png 5.jpg",
                "images/axe/png 6.png",
                "images/axe/wire.jpg"
            ]
        },
        "Sci-Fi Robot Design": {
            software: "Maya, Substance Painter, Arnold",
            role: "Hard Surface Modeling, Look Dev, Rendering",
            desc: "A futuristic character design focused on mechanical functionalism and advanced material shaders. Rendered in real-time.",
            media: "images/robot/main.jpg",
            type: "image",
            gallery: [
                "images/robot/main.jpg",
                "images/robot/side.jpg",
                "images/robot/top mid.jpg",
                "images/robot/GREY.jpg",
                "images/robot/wire.jpg"
            ]
        },
        "Luxury High Heel": {
            software: "Maya, Substance-Painter, Arnold",
            role: "Modeling, Lighting, Rendering",
            desc: "Product visualization focusing on elegant curves and complex material layering (leather, metal, fabric).",
            media: "images/heel/main.jpg",
            type: "image",
            gallery: [
                "images/heel/main.jpg",
                "images/heel/4.jpg",
                "images/heel/lighting.jpg",
                "images/heel/wire.jpg"
            ]
        },
        "Chess": {
            software: "Maya, Arnold, Photoshop",
            role: "Modeling, Lighting, Rendering",
            desc: "Classic set visualization focusing on studio lighting, caustic effects, and realistic wood/marble textures.",
            media: "images/chess/main.jpg",
            type: "image",
            gallery: [
                "images/chess/main.jpg",
                "images/chess/3.jpg",
                "images/chess/light.jpg",
                "images/chess/wire.jpg"
            ]
        },
        "3D Animation": {
            software: "3DS-MAX, V-ray",
            role: "Animation, Lighting, Rendering",
            desc: "High-quality video Animation and rendering showcasing timing, rhythm, and visual storytelling.",
            media: "images/24 FPS.mp4",
            type: "video",
             gallery: [
                "images/competition_hours.mp4",
               "images/24 FPS.mp4"
            ]
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const rawTitle = card.querySelector('h5').innerText;
            // Find the matching key in projectData (case-insensitive approach)
            const title = Object.keys(projectData).find(key =>
                key.toLowerCase() === rawTitle.toLowerCase().trim()
            ) || rawTitle;

            const data = projectData[title];
            if (!data) return; // Guard clause

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

                // Add video to gallery if it exists
                const fullGallery = [...data.gallery];
                if (data.video) fullGallery.push(data.video);

                fullGallery.forEach(itemSrc => {
                    const isVideoItem = itemSrc.endsWith('.mp4');
                    const thumb = document.createElement('div');
                    thumb.className = 'gallery-thumb relative';

                    if (isVideoItem) {
                        thumb.innerHTML = `
                            <video src="${itemSrc}" class="w-full h-full object-cover"></video>
                            <div class="absolute inset-0 flex items-center justify-center bg-black/40">
                                <i class="fa-solid fa-play text-white text-xs"></i>
                            </div>
                        `;
                    } else {
                        thumb.innerHTML = `<img src="${itemSrc}" alt="Gallery Detail">`;
                    }

                    thumb.addEventListener('click', () => {
                        if (isVideoItem) {
                            modalImg.classList.add('hidden');
                            modalVideo.classList.remove('hidden');
                            modalVideo.querySelector('source').src = itemSrc;
                            modalVideo.load();
                            modalVideo.play();
                        } else {
                            modalVideo.classList.add('hidden');
                            modalVideo.pause();
                            modalImg.classList.remove('hidden');
                            modalImg.src = itemSrc;
                        }
                    });
                    galleryGrid.appendChild(thumb);
                });
            } else {
                galleryContainer.classList.add('hidden');
            }

            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';

            // Display Role as a primary tag
            if (data.role) {
                const roleSpan = document.createElement('span');
                roleSpan.className = 'px-3 py-1 bg-blue-500 text-white rounded-full text-[10px] font-bold uppercase';
                roleSpan.innerText = data.role.split(',')[0]; // Show main role
                tagsContainer.appendChild(roleSpan);
            }

            // Display Software list in modal details
            const softwareList = document.querySelector('#project-modal ul');
            if (softwareList && data.software) {
                softwareList.innerHTML = '';
                data.software.split(',').forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-check text-blue-500 mr-2"></i> ${item.trim()}`;
                    softwareList.appendChild(li);
                });
            }

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
