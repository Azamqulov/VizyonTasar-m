document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden")
    }, 1000)
  })

  // Custom Cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursorDot && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })

    // Add magnetic effect to buttons and links
    const magneticElements = document.querySelectorAll("a, button, .service-card, .work-item")

    magneticElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorOutline.style.borderColor = "var(--color-primary-light)"
      })

      element.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.borderColor = "var(--color-primary)"
      })
    })
  }

  // Header Scroll Effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Hero Slider
  const heroSlides = document.querySelectorAll(".hero-slide")
  const heroDots = document.querySelectorAll(".hero-dot")
  const heroArrowPrev = document.querySelector(".hero-arrow.prev")
  const heroArrowNext = document.querySelector(".hero-arrow.next")
  let currentSlide = 0
  let heroInterval

  function showSlide(index) {
    heroSlides.forEach((slide) => slide.classList.remove("active"))
    heroDots.forEach((dot) => dot.classList.remove("active"))

    heroSlides[index].classList.add("active")
    heroDots[index].classList.add("active")

    currentSlide = index
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length
    showSlide(currentSlide)
  }

  function startHeroSlider() {
    heroInterval = setInterval(nextSlide, 5000)
  }

  function resetHeroSlider() {
    clearInterval(heroInterval)
    startHeroSlider()
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
      resetHeroSlider()
    })
  })

  heroArrowNext.addEventListener("click", () => {
    nextSlide()
    resetHeroSlider()
  })

  heroArrowPrev.addEventListener("click", () => {
    prevSlide()
    resetHeroSlider()
  })

  startHeroSlider()

  // Destinations Filter
  const destinationFilterBtns = document.querySelectorAll(".destinations-filter .filter-btn")
  const destinationCards = document.querySelectorAll(".destination-card")

  if (destinationFilterBtns.length > 0 && destinationCards.length > 0) {
    destinationFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        destinationFilterBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        // Get filter value
        const filterValue = btn.getAttribute("data-filter")

        // Filter destinations
        destinationCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Experience Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        // Show corresponding tab pane
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Gallery Filter
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter .filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        galleryFilterBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        // Get filter value
        const filterValue = btn.getAttribute("data-filter")

        // Filter gallery items
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.querySelector(".lightbox-arrow.prev")
  const lightboxNext = document.querySelector(".lightbox-arrow.next")
  const galleryZoomLinks = document.querySelectorAll(".gallery-zoom")
  let currentImageIndex = 0
  const galleryImages = []

  if (galleryZoomLinks.length > 0 && lightbox) {
    // Collect all gallery images
    galleryZoomLinks.forEach((link, index) => {
      galleryImages.push(link.getAttribute("href"))

      link.addEventListener("click", (e) => {
        e.preventDefault()
        currentImageIndex = index
        openLightbox(galleryImages[currentImageIndex])
      })
    })

    function openLightbox(imageSrc) {
      lightboxImage.src = imageSrc
      lightbox.classList.add("show")
      document.body.style.overflow = "hidden"
    }

    function closeLightbox() {
      lightbox.classList.remove("show")
      document.body.style.overflow = ""
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox)
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", () => {
        if (currentImageIndex > 0) {
          currentImageIndex--
        } else {
          currentImageIndex = galleryImages.length - 1
        }
        lightboxImage.src = galleryImages[currentImageIndex]
      })
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", () => {
        if (currentImageIndex < galleryImages.length - 1) {
          currentImageIndex++
        } else {
          currentImageIndex = 0
        }
        lightboxImage.src = galleryImages[currentImageIndex]
      })
    }

    // Close lightbox on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("show")) {
        closeLightbox()
      }
    })
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const testimonialArrowPrev = document.querySelector(".testimonial-arrow.prev")
  const testimonialArrowNext = document.querySelector(".testimonial-arrow.next")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")

    currentTestimonial = index
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  testimonialArrowNext.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length
    showTestimonial(currentTestimonial)
  })

  testimonialArrowPrev.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length
    showTestimonial(currentTestimonial)
  })

  // Stats Counter Animation
  const stats = document.querySelectorAll(".stat-number")

  function animateStats() {
    stats.forEach((stat) => {
      const target = Number.parseInt(stat.textContent)
      const increment = target / 100
      let current = 0

      const updateCount = () => {
        if (current < target) {
          current += increment
          stat.textContent = Math.ceil(current)
          setTimeout(updateCount, 10)
        } else {
          stat.textContent = target
        }
      }

      updateCount()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const aboutSection = document.querySelector(".about")

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats()
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  if (aboutSection) {
    observer.observe(aboutSection)
  }

  // Video Modal
  const videoModal = document.getElementById("video-modal")
  const videoModalClose = document.querySelector("#video-modal .modal-close")
  const videoLinks = document.querySelectorAll('[data-modal="video"]')
  const videoIframe = document.querySelector(".video-container iframe")

  if (videoLinks.length > 0 && videoModal) {
    videoLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        // Set video URL (in a real scenario, you would get this from data attribute)
        videoIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"

        // Show modal
        videoModal.classList.add("show")
        document.body.style.overflow = "hidden"
      })
    })

    if (videoModalClose) {
      videoModalClose.addEventListener("click", () => {
        // Reset iframe src to stop video
        videoIframe.src = "about:blank"

        // Hide modal
        videoModal.classList.remove("show")
        document.body.style.overflow = ""
      })
    }
  }

  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  }
  );
  // Back to Top Button\
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Cookie Consent
  const cookieConsent = document.getElementById("cookie-consent")
  const cookieAcceptBtn = document.getElementById("cookie-accept")
  const cookieDecline = document.getElementById("cookie-decline")

  // Check if user has already made a choice
  if (!localStorage.getItem("cookieConsent")) {
    // Show cookie consent after 2 seconds
    setTimeout(() => {
      cookieConsent.style.display = "block"
    }, 2000)
  }

  cookieAcceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted")
    cookieConsent.style.display = "none"
  })

  cookieDecline.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined")
    cookieConsent.style.display = "none"
  })

  // Form Validation
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent

        submitButton.disabled = true
        submitButton.textContent = "Gönderiliyor..."

        // Simulate API call
        setTimeout(() => {
          form.reset()
          submitButton.disabled = false
          submitButton.textContent = originalText

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.textContent = "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
          successMessage.style.cssText =
            "background-color: #27ae60; color: white; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;"

          form.appendChild(successMessage)

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove()
          }, 5000)
        }, 2000)
      }
    })
  })

  // Scroll Animations
  const animateElements = document.querySelectorAll("[data-animate]")

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8

    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        const animation = element.getAttribute("data-animate")
        element.classList.add(animation)
      }
    })
  }

  if (animateElements.length > 0) {
    // Initial check
    checkScroll()

    // Check on scroll
    window.addEventListener("scroll", checkScroll)
  }

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")

  if (themeToggle) {
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark")
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")

      // Save preference
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Portfolio/Works Filter
  const filterButtons = document.querySelectorAll(".filter-btn")
  const workItems = document.querySelectorAll(".work-item")

  // Tours filter
  const tourCards = document.querySelectorAll(".tour-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Show/hide tour cards based on filter
      tourCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Cookie Consent
  const cookieAccept = document.getElementById("acceptCookies")
  const cookieDeclineEl = document.getElementById("rejectCookies")

  if (cookieConsent && cookieAccept && cookieDeclineEl) {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent")

    if (!cookieChoice) {
      // Show cookie consent after a delay
      setTimeout(() => {
        cookieConsent.style.display = "block"
      }, 2000)
    }

    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted")
      cookieConsent.style.display = "none"
    })

    cookieDeclineEl.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined")
      cookieConsent.style.display = "none"
    })
  }

  // Form Validation
  const contactForm = document.querySelectorAll("form")

  contactForm.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.classList.contains("search-form")) {
        e.preventDefault()

        // Simple validation
        let isValid = true
        const formElements = form.elements

        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].hasAttribute("required") && !formElements[i].value) {
            isValid = false
            formElements[i].style.borderColor = "var(--color-error)"
          } else if (formElements[i].type !== "submit") {
            formElements[i].style.borderColor = ""
          }
        }

        if (isValid) {
          // Here you would normally send the form data to a server
          // For demo purposes, we'll just show a success message
          const formData = new FormData(form)
          const formValues = {}

          for (const [key, value] of formData.entries()) {
            formValues[key] = value
          }

          console.log("Form submitted:", formValues)

          // Reset form
          form.reset()

          // Show success message (you could add a success message element to the HTML)
          alert("Form submitted successfully! We will contact you soon.")
        }
      }
    })
  })

  // Initialize AOS (Animate On Scroll) if available
  let AOS // Declare AOS here
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }
})

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const loader = document.querySelector(".loader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden")
    }, 2000)
  })

  // Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursor && cursorDot && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.display = "block"

      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
      cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
    })

    document.addEventListener("mouseout", () => {
      cursor.style.display = "none"
    })

    document.addEventListener("mouseenter", () => {
      cursor.style.display = "block"
    })

    // Cursor hover effect
    const hoverElements = document.querySelectorAll("a, button, .btn, .service-card, .portfolio-item, .tab-btn")

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursorOutline.style.borderColor = "var(--color-primary)"
      })

      element.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursorOutline.style.borderColor = "var(--color-primary)"
      })
    })
  }

  // Header Scroll Effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile Menu
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light")
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light")

    // Save theme preference
    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }
  })

  // Portfolio Filter
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Show/hide portfolio items based on filter
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Lightbox
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.querySelector(".lightbox-arrow.prev")
  const lightboxNext = document.querySelector(".lightbox-arrow.next")
  const galleryLinks = document.querySelectorAll(".portfolio-zoom")
  let currentImageIndex = 0
  const galleryImages = []

  galleryLinks.forEach((link, index) => {
    galleryImages.push(link.getAttribute("href"))

    link.addEventListener("click", (e) => {
      e.preventDefault()
      currentImageIndex = index
      openLightbox(galleryImages[currentImageIndex])
    })
  })

  function openLightbox(src) {
    lightboxImage.src = src
    lightbox.classList.add("show")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("show")
    document.body.style.overflow = ""
  }

  lightboxClose.addEventListener("click", closeLightbox)

  lightboxPrev.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
    lightboxImage.src = galleryImages[currentImageIndex]
  })

  lightboxNext.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length
    lightboxImage.src = galleryImages[currentImageIndex]
  })

  // Close lightbox on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) {
      closeLightbox()
    }
  })

  // Testimonials Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const testimonialArrowPrev = document.querySelector(".testimonial-arrow.prev")
  const testimonialArrowNext = document.querySelector(".testimonial-arrow.next")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    testimonialDots.forEach((dot) => dot.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")

    currentTestimonial = index
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  testimonialArrowNext.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length
    showTestimonial(currentTestimonial)
  })

  testimonialArrowPrev.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length
    showTestimonial(currentTestimonial)
  })

  // Stats Counter Animation
  const stats = document.querySelectorAll(".stat-number")

  function animateStats() {
    stats.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 16ms per frame (approx 60fps)
      let current = 0

      const timer = setInterval(() => {
        current += step
        stat.textContent = Math.floor(current)

        if (current >= target) {
          stat.textContent = target
          clearInterval(timer)
        }
      }, 16)
    })
  }

  // Intersection Observer for animations
  const aboutSection = document.querySelector(".about")

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (aboutSection) {
    observer.observe(aboutSection)
  }

  // Form Validation
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent

        submitButton.disabled = true
        submitButton.textContent = "Gönderiliyor..."

        // Simulate API call
        setTimeout(() => {
          form.reset()
          submitButton.disabled = false
          submitButton.textContent = originalText

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.textContent = "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
          successMessage.style.cssText =
            "background-color: var(--color-secondary); color: white; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;"

          form.appendChild(successMessage)

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove()
          }, 5000)
        }, 2000)
      }
    })
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Cookie Consent
  const cookieConsent = document.getElementById("cookie-consent")
  const cookieAccept = document.getElementById("cookie-accept")
  const cookieDecline = document.getElementById("cookie-decline")

  // Check if user has already made a choice
  if (!localStorage.getItem("cookieConsent")) {
    // Show cookie consent after 2 seconds
    setTimeout(() => {
      cookieConsent.style.display = "block"
    }, 2000)
  }

  cookieAccept.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted")
    cookieConsent.style.display = "none"
  })

  cookieDecline.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined")
    cookieConsent.style.display = "none"
  })
})

