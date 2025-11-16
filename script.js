document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // LÓGICA DEL CONTADOR DE TIEMPO (URGENCIA)
    // ----------------------------------------------------
    const countdownElement = document.getElementById('countdown');

    // Establecer la hora final: 24 horas a partir del momento en que el usuario visita la página
    const now = new Date().getTime();
    const futureDate = now + (2.1 * 60 * 60 * 1000); // 24 horas en milisegundos

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = futureDate - now;

        // Cálculo de tiempo
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formato para mostrar 00:00:00
        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        // Mostrar el resultado
        countdownElement.innerHTML = `${displayHours}h:${displayMinutes}m:${displaySeconds}s`;

        // Si el contador termina
        if (distance < 0) {
            clearInterval(timerInterval);
            countdownElement.innerHTML = "¡Oferta Expirada!";
        }
    }

    // Actualizar el contador cada segundo
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 
    
    
    // ----------------------------------------------------
    // LÓGICA DEL CARRUSEL DE IMÁGENES
    // ----------------------------------------------------
    
    const track = document.querySelector('.carousel-track');
    // Si no encuentra el track, salta el código del carrusel para evitar errores
    if (!track) return; 
    
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    
    let slideIndex = 0;
    // La anchura inicial se calcula dentro del evento DOMContentLoaded
    let slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0; 

    // Coloca los slides uno al lado del otro
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        // Mueve el carrusel
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        // Actualiza el índice
        slideIndex = slides.findIndex(slide => slide === targetSlide);
    }
    
    // Evento para el botón Siguiente
    nextButton.addEventListener('click', e => {
        let targetIndex = slideIndex + 1;
        if (targetIndex >= slides.length) {
            targetIndex = 0; // Vuelve al inicio (loop)
        }
        const targetSlide = slides[targetIndex];
        moveToSlide(track, slides[slideIndex], targetSlide);
    });

    // Evento para el botón Anterior
    prevButton.addEventListener('click', e => {
        let targetIndex = slideIndex - 1;
        if (targetIndex < 0) {
            targetIndex = slides.length - 1; // Vuelve al final (loop)
        }
        const targetSlide = slides[targetIndex];
        moveToSlide(track, slides[slideIndex], targetSlide);
    });
    
    // Asegura que el carrusel se adapte si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        // Recalcular la anchura en el resize
        slideWidth = slides[0].getBoundingClientRect().width;
        
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
        // Mueve el track a la posición actual con la nueva anchura
        track.style.transform = 'translateX(-' + slides[slideIndex].style.left + ')';
    });
});