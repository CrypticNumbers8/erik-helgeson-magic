(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').css('top', '0px');
    } else {
      $('.sticky-top').css('top', '-100px');
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $('.dropdown');
  const $dropdownToggle = $('.dropdown-toggle');
  const $dropdownMenu = $('.dropdown-menu');
  const showClass = 'show';

  $(window).on('load resize', function () {
    if (this.matchMedia('(min-width: 992px)').matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr('aria-expanded', 'true');
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr('aria-expanded', 'false');
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off('mouseenter mouseleave');
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Header carousel
  $('.header-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Vendor carousel
  $('.vendor-carousel').owlCarousel({
    loop: true,
    margin: 45,
    dots: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 3,
      },
      576: {
        items: 4,
      },
      768: {
        items: 6,
      },
      992: {
        items: 6,
      },
    },
  });

  // Initialize EmailJS
  (function () {
    emailjs.init({
      publicKey: 'cMuC23Ggyv6DYgGV9',
    });
  })();

  // Handle contact form submission with button animation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!submitButton) return;

      // Disable button and show loading spinner
      submitButton.disabled = true;
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

      emailjs.sendForm('service_h61jwby', 'template_cvt4f9k', this).then(
        () => {
          // Success animation
          submitButton.innerHTML = 'Message Sent!';
          submitButton.classList.add('btn-success');

          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-success');
            submitButton.disabled = false;
          }, 2500);

          contactForm.reset();
        },
        (error) => {
          // Failure animation
          submitButton.innerHTML = 'Failed ❌';
          submitButton.classList.add('btn-danger');

          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-danger');
            submitButton.disabled = false;
          }, 2500);

          alert(
            '❌ Failed to send message. Please try again.\n' +
              JSON.stringify(error)
          );
        }
      );
    });
  }
})(jQuery);
