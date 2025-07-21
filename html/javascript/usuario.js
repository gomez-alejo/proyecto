// main.js - Sistema de Login para Usuario y Emprendedor

class LoginSystem {
    constructor() {
        this.currentView = 'selector';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggles();
    }

    bindEvents() {
        // Eventos del selector de tipo de cuenta
        document.getElementById('emprendedor-btn').addEventListener('click', () => {
            this.showEmprendedorLogin();
        });

        document.getElementById('usuario-btn').addEventListener('click', () => {
            this.showUsuarioLogin();
        });

        document.getElementById('close-selector').addEventListener('click', () => {
            this.hideSelector();
        });

        // Eventos de navegación de regreso
        document.getElementById('back-from-usuario').addEventListener('click', () => {
            this.showSelector();
        });

        document.getElementById('back-from-emprendedor').addEventListener('click', () => {
            this.showSelector();
        });

        // Eventos de formularios
        document.getElementById('usuario-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUsuarioLogin();
        });

        document.getElementById('emprendedor-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEmprendedorLogin();
        });

        // Cerrar modal al hacer clic fuera
        document.getElementById('account-selector').addEventListener('click', (e) => {
            if (e.target.id === 'account-selector') {
                this.hideSelector();
            }
        });
    }

    setupPasswordToggles() {
        // Toggle para mostrar/ocultar contraseñas
        const passwordToggles = document.querySelectorAll('button[type="button"]');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.closest('div').querySelector('input');
                const icon = e.target.querySelector('i') || e.target;
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    showEmprendedorLogin() {
        this.hideSelector();
        document.getElementById('emprendedor-login').classList.remove('hidden');
        this.currentView = 'emprendedor';
        
        // Animación de entrada
        setTimeout(() => {
            document.getElementById('emprendedor-login').querySelector('.bg-white').classList.add('animate-pulse');
        }, 100);
    }

    showUsuarioLogin() {
        this.hideSelector();
        document.getElementById('usuario-login').classList.remove('hidden');
        this.currentView = 'usuario';
        
        // Animación de entrada
        setTimeout(() => {
            document.getElementById('usuario-login').querySelector('.bg-white').classList.add('animate-pulse');
        }, 100);
    }

    showSelector() {
        this.hideCurrentView();
        document.getElementById('account-selector').classList.remove('hidden');
        this.currentView = 'selector';
    }

    hideSelector() {
        document.getElementById('account-selector').classList.add('hidden');
    }

    hideCurrentView() {
        if (this.currentView === 'emprendedor') {
            document.getElementById('emprendedor-login').classList.add('hidden');
        } else if (this.currentView === 'usuario') {
            document.getElementById('usuario-login').classList.add('hidden');
        }
    }

    handleUsuarioLogin() {
        const email = document.getElementById('usuario-email').value;
        const password = document.getElementById('usuario-password').value;

        // Validación básica
        if (!this.validateEmail(email)) {
            this.showAlert('Por favor ingresa un email válido', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        // Simulación de login
        this.simulateLogin('usuario', { email, password });
    }

    handleEmprendedorLogin() {
        const email = document.getElementById('emprendedor-email').value;
        const password = document.getElementById('emprendedor-password').value;
        const negocio = document.getElementById('emprendedor-negocio').value;

        // Validación básica
        if (!this.validateEmail(email)) {
            this.showAlert('Por favor ingresa un email válido', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (negocio.trim().length < 2) {
            this.showAlert('El nombre del negocio debe tener al menos 2 caracteres', 'error');
            return;
        }

        // Simulación de login
        this.simulateLogin('emprendedor', { email, password, negocio });
    }

    simulateLogin(userType, credentials) {
        const submitBtn = document.querySelector(`#${userType}-form button[type="submit"]`);
        const originalText = submitBtn.innerHTML;
        
        // Mostrar loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Iniciando sesión...';
        submitBtn.disabled = true;

        // Simular delay de API
        setTimeout(() => {
            // Resetear botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Simular respuesta exitosa
            if (Math.random() > 0.3) { // 70% de éxito
                this.showAlert(`¡Bienvenido ${userType}!`, 'success');
                
                // Aquí normalmente redirigirías a la aplicación
                setTimeout(() => {
                    console.log(`Redirigiendo a dashboard de ${userType}...`);
                    console.log('Credenciales:', credentials);
                    
                    // Ejemplo de redirección
                    if (userType === 'usuario') {
                        window.location.href = '/dashboard-usuario';
                    } else {
                        window.location.href = '/dashboard-emprendedor';
                    }
                }, 2000);
            } else {
                this.showAlert('Credenciales incorrectas. Intenta nuevamente.', 'error');
            }
        }, 2000);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showAlert(message, type) {
        // Crear el alert
        const alert = document.createElement('div');
        alert.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            alert.className += ' bg-green-500 text-white';
            alert.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
        } else {
            alert.className += ' bg-red-500 text-white';
            alert.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
        }

        document.body.appendChild(alert);

        // Mostrar alert
        setTimeout(() => {
            alert.classList.remove('translate-x-full');
        }, 100);

        // Ocultar alert después de 3 segundos
        setTimeout(() => {
            alert.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 3000);
    }

    // Métodos adicionales para funcionalidades futuras
    resetForm(formId) {
        document.getElementById(formId).reset();
    }

    setLoading(elementId, isLoading) {
        const element = document.getElementById(elementId);
        if (isLoading) {
            element.disabled = true;
            element.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            element.disabled = false;
            element.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    // Funciones para manejar datos de usuario
    saveUserData(userData) {
        // En una aplicación real, esto se enviaría a un servidor
        console.log('Guardando datos de usuario:', userData);
    }

    getUserData() {
        // En una aplicación real, esto vendría de un servidor o localStorage
        return {
            isLoggedIn: false,
            userType: null,
            userData: null
        };
    }
}

// Inicializar el sistema cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const loginSystem = new LoginSystem();
    
    // Hacer disponible globalmente para debugging
    window.loginSystem = loginSystem;
});

// Funciones auxiliares para el manejo de la aplicación
const AppUtils = {
    // Función para formatear fechas
    formatDate(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // Función para validar inputs en tiempo real
    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                const inputType = e.target.type;
                
                if (inputType === 'email') {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    e.target.classList.toggle('border-red-500', !isValid && value.length > 0);
                    e.target.classList.toggle('border-green-500', isValid);
                } else if (inputType === 'password') {
                    const isValid = value.length >= 6;
                    e.target.classList.toggle('border-red-500', !isValid && value.length > 0);
                    e.target.classList.toggle('border-green-500', isValid);
                }
            });
        });
    },

    // Función para manejar temas (claro/oscuro)
    toggleTheme() {
        document.body.classList.toggle('dark');
    }
};

// Configurar validación en tiempo real cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    AppUtils.setupRealTimeValidation();
});