// Script para manejar el modal de inicio de sesión y redirecciones
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const loginOptions = document.querySelectorAll('.login-option');

    // Función para mostrar el modal
    function showModal() {
        loginModal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    // Función para ocultar el modal
    function hideModal() {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            loginModal.classList.add('hidden');
        }, 300);
    }

    // Event listeners para abrir el modal
    if (loginBtn) {
        loginBtn.addEventListener('click', showModal);
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', showModal);
    }

    // Event listener para cerrar el modal
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                hideModal();
            }
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
            hideModal();
        }
    });

    // Manejar clics en las opciones de login
    loginOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');

            // Agregar efecto de clic
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Redirigir según el tipo de usuario
            setTimeout(() => {
                if (type === 'emprendedor') {
                    window.location.href = '/html/Emprendedor.html';
                } else if (type === 'usuario') {
                    window.location.href = '/html/sesion.html'; // Asegúrate de que esta ruta sea correcta
                }
            }, 200);
        });

        // Agregar efectos hover mejorados
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Función adicional para manejar el enlace de registro
document.addEventListener('DOMContentLoaded', function() {
    const registerLink = document.querySelector('a[href="#"]');
    if (registerLink && registerLink.textContent.includes('Regístrate aquí')) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para el registro
            // Por ejemplo, redirigir a una página de registro
            window.location.href = '/html/registro.html';
        });
    }
});
