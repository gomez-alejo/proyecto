 // Datos de servicios
        const services = [
            {
                name: "Pizza Express",
                category: "comida",
                price: 25000,
                rating: 4.8,
                reviews: 156,
                description: "Deliciosas pizzas artesanales con ingredientes frescos. Servicio a domicilio disponible.",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
                emoji: "🍕"
            },
            {
                name: "AutoLavado Premium",
                category: "autolavado",
                price: 15000,
                rating: 4.5,
                reviews: 89,
                description: "Servicio completo de lavado y encerado. Cuidamos tu vehículo como si fuera nuestro.",
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
                emoji: "🚗"
            },
            {
                name: "Carpintería Artesanal",
                category: "carpinteria",
                price: 50000,
                rating: 4.9,
                reviews: 234,
                description: "Muebles a medida y reparaciones. Trabajamos con maderas de la mejor calidad.",
                image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop",
                emoji: "🔨"
            },
            {
                name: "Droguería Salud",
                category: "drogeria",
                price: 12000,
                rating: 4.6,
                reviews: 78,
                description: "Medicamentos, productos de cuidado personal y atención farmacéutica profesional.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
                emoji: "💊"
            },
            {
                name: "Salón Elegancia",
                category: "belleza",
                price: 35000,
                rating: 4.7,
                reviews: 198,
                description: "Cortes, peinados, tratamientos faciales y servicios de spa. Tu belleza es nuestra prioridad.",
                image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=200&fit=crop",
                emoji: "💄"
            },
            {
                name: "TecniRepara",
                category: "reparaciones",
                price: 40000,
                rating: 4.4,
                reviews: 112,
                description: "Reparación de electrodomésticos, celulares y equipos electrónicos. Servicio técnico especializado.",
                image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&h=200&fit=crop",
                emoji: "🔧"
            },
            {
                name: "Sabor Casero",
                category: "comida",
                price: 18000,
                rating: 4.3,
                reviews: 67,
                description: "Comida tradicional preparada con amor. Menús diarios y platos a la carta.",
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
                emoji: "🍕"
            },
            {
                name: "EcoWash",
                category: "autolavado",
                price: 20000,
                rating: 4.8,
                reviews: 143,
                description: "Lavado ecológico sin químicos dañinos. Cuidamos tu auto y el medio ambiente.",
                image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=300&h=200&fit=crop",
                emoji: "🚗"
            }
        ];

        // Función para crear estrellitas
        function createStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '★';
            }
            
            if (hasHalfStar) {
                stars += '☆';
            }
            
            while (stars.length < 5) {
                stars += '☆';
            }
            
            return stars;
        }

        // Función para filtrar servicios
        function filterServices() {
            const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.dataset.category);
            const minPrice = parseInt(document.getElementById('min-price').value) || 0;
            const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
            const selectedRatings = Array.from(document.querySelectorAll('input[data-rating]:checked')).map(cb => parseFloat(cb.dataset.rating));
            
            let filteredServices = services;
            
            // Filtrar por categoría
            if (selectedCategories.length > 0 && !selectedCategories.includes('todos')) {
                filteredServices = filteredServices.filter(service => selectedCategories.includes(service.category));
            }
            
            // Filtrar por precio
            filteredServices = filteredServices.filter(service => service.price >= minPrice && service.price <= maxPrice);
            
            // Filtrar por calificación
            if (selectedRatings.length > 0) {
                filteredServices = filteredServices.filter(service => {
                    return selectedRatings.some(rating => service.rating >= rating);
                });
            }
            
            renderServices(filteredServices);
            document.getElementById('results-count').textContent = filteredServices.length;
        }

        // Función para renderizar servicios
        function renderServices(servicesToRender) {
            const grid = document.getElementById('services-grid');
            const categoryNames = {
                'comida': 'Comida',
                'autolavado': 'Autolavado',
                'carpinteria': 'Carpintería',
                'drogeria': 'Droguería',
                'belleza': 'Belleza',
                'reparaciones': 'Reparaciones'
            };
            
            grid.innerHTML = servicesToRender.map(service => `
                <div class="service-card bg-white rounded-lg shadow-lg overflow-hidden" data-category="${service.category}" data-price="${service.price}" data-rating="${service.rating}">
                    <div class="relative">
                        <img src="${service.image}" alt="${service.name}" class="w-full h-48 object-cover">
                        <div class="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                            ${service.emoji} ${categoryNames[service.category]}
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-lg text-gray-800 mb-2">${service.name}</h3>
                        <p class="text-gray-600 text-sm mb-3">${service.description}</p>
                        <div class="flex items-center mb-3">
                            <div class="star-rating text-sm">${createStars(service.rating)}</div>
                            <span class="ml-2 text-sm text-gray-600">(${service.reviews} reseñas)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-primary font-bold text-lg">${service.price.toLocaleString()}</div>
                            <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-300 text-sm">
                                Ver Más
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Marcar "Todas las categorías" por defecto
            document.querySelector('input[data-category="todos"]').checked = true;
            
            // Filtros de categoría
            document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (this.dataset.category === 'todos') {
                        // Si se selecciona "todos", deseleccionar otros
                        document.querySelectorAll('.filter-checkbox').forEach(cb => {
                            if (cb !== this) cb.checked = false;
                        });
                    } else {
                        // Si se selecciona otra categoría, deseleccionar "todos"
                        document.querySelector('input[data-category="todos"]').checked = false;
                    }
                    filterServices();
                });
            });
            
            // Filtros de precio
            document.getElementById('min-price').addEventListener('input', filterServices);
            document.getElementById('max-price').addEventListener('input', filterServices);
            
            // Filtros de calificación
            document.querySelectorAll('input[data-rating]').forEach(checkbox => {
                checkbox.addEventListener('change', filterServices);
            });
            
            // Limpiar filtros
            document.getElementById('clear-filters').addEventListener('click', function() {
                // Limpiar checkboxes
                document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                
                // Limpiar inputs de precio
                document.getElementById('min-price').value = '';
                document.getElementById('max-price').value = '';
                
                // Marcar "Todas las categorías"
                document.querySelector('input[data-category="todos"]').checked = true;
                
                // Resetear labels de filtros
                document.querySelectorAll('.filter-label').forEach(label => {
                    label.classList.remove('bg-secondary', 'text-white');
                    if (!label.parentElement.querySelector('.filter-checkbox[data-category="todos"]')) {
                        label.classList.add('bg-gray-100', 'text-gray-700', 'border-2', 'border-gray-200');
                    }
                });
                
                // Activar label de "todos"
                const todosLabel = document.querySelector('input[data-category="todos"]').parentElement.querySelector('.filter-label');
                todosLabel.classList.add('bg-accent', 'text-white');
                todosLabel.classList.remove('bg-gray-100', 'text-gray-700', 'border-2', 'border-gray-200');
                
                filterServices();
            });
            
            // Renderizar servicios iniciales
            renderServices(services);
        });

        // Animaciones adicionales
        document.addEventListener('scroll', function() {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Inicializar animaciones
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });