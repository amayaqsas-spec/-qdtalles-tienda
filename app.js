// ==========================================
// 1. CONFIGURACIÓN DE FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyBLEBxZMLLjHpeLX0XiKOLU4Ky572Z3Gdo",
    authDomain: "qdtalles-tienda.firebaseapp.com",
    projectId: "qdtalles-tienda",
    storageBucket: "qdtalles-tienda.firebasestorage.app",
    messagingSenderId: "418041894729",
    appId: "1:418041894729:web:70a243b7a033bbfe816c98"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. INTRO ANIMADO
// ==========================================
function handleIntro() {
    const intro = document.getElementById('intro');
    if (!intro) return;
    
    setTimeout(() => {
        intro.classList.add('hidden');
        setTimeout(() => {
            intro.style.display = 'none';
        }, 800);
    }, 3500);
}

// ==========================================
// 3. DATOS POR DEFECTO
// ==========================================
const DEFAULT_CONFIG = {
    whatsapp: '5215512345678',
    email: 'hola@qdtalles.com',
    location: 'Ciudad de México, MX',
    hours: 'Lun - Sáb: 10am - 7pm',
    instagram: '',
    tiktok: '',
    facebook: '',
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500'
};

const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'qdtalles2026'
};

const DEFAULT_CATEGORIES = [
    { name: 'Tazas', subtitle: 'Diseños únicos para cada momento', order: 0 },
    { name: 'Recuerdos', subtitle: 'Detalles que quedan en el corazón', order: 1 },
    { name: 'Peluches', subtitle: 'Suaves, tiernos y personalizados', order: 2 },
    { name: 'Arreglos', subtitle: 'Combinaciones perfectas para regalar', order: 3 },
    { name: 'Otros', subtitle: 'Sorpresas especiales y únicas', order: 4 }
];

const DEFAULT_TESTIMONIALS = [
    {
        name: 'María Rodríguez',
        service: 'Recuerdos de boda',
        text: 'Los recuerdos para la boda de mi hija quedaron HERMOSOS. Todos los invitados preguntaron dónde los habíamos hecho.',
        rating: 5,
        createdAt: Date.now() - 3000
    },
    {
        name: 'Juan López',
        service: 'Tazas personalizadas',
        text: 'Pedí tazas personalizadas para el cumpleaños de mi mamá y lloró de emoción. El diseño quedó idéntico a lo que imaginé.',
        rating: 5,
        createdAt: Date.now() - 2000
    },
    {
        name: 'Ana García',
        service: 'Arreglo baby shower',
        text: 'El arreglo de peluches para el baby shower fue lo más bonito de la fiesta. Atención increíble y entrega puntual.',
        rating: 5,
        createdAt: Date.now() - 1000
    }
];

// ==========================================
// 4. ICONOS SVG
// ==========================================
const contactIcons = {
    whatsapp: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    location: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    hours: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
};

// ==========================================
// 5. ESTADO DE LA APLICACIÓN
// ==========================================
let products = [];
let shopConfig = { ...DEFAULT_CONFIG };
let credentials = { ...DEFAULT_CREDENTIALS };
let categories = [];
let testimonials = [];

let currentCategory = 'all';
let isAnimating = false;
let isAuthenticated = false;

// ==========================================
// 6. ELEMENTOS DEL DOM
// ==========================================
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const categoryFilter = document.getElementById('categoryFilter');
const adminModal = document.getElementById('adminModal');
const productForm = document.getElementById('productForm');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const clearStorageBtn = document.getElementById('clearStorageBtn');
const contactForm = document.getElementById('contactForm');

const heroContent = document.getElementById('heroContent');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroImage = document.getElementById('heroImage');
const whatsappFloat = document.getElementById('whatsappFloat');
const contactMethods = document.getElementById('contactMethods');
const contactSocial = document.getElementById('contactSocial');

const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const loginUserInput = document.getElementById('loginUser');
const loginPasswordInput = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const exitBtn = document.getElementById('exitBtn');
const closeModalBtn1 = document.getElementById('closeModalBtn1');
const closeModalBtn2 = document.getElementById('closeModalBtn2');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const credentialsForm = document.getElementById('credentialsForm');
const addCategoryForm = document.getElementById('addCategoryForm');
const categoriesList = document.getElementById('categoriesList');

const testimonialsGrid = document.getElementById('testimonialsGrid');
const openTestimonialForm = document.getElementById('openTestimonialForm');
const testimonialModal = document.getElementById('testimonialModal');
const closeTestimonialModal = document.getElementById('closeTestimonialModal');
const testimonialForm = document.getElementById('testimonialForm');
const starRating = document.getElementById('starRating');
const ratingValue = document.getElementById('ratingValue');
const adminTestimonialsList = document.getElementById('adminTestimonialsList');
const addTestimonialForm = document.getElementById('addTestimonialForm');
const adminStarRating = document.getElementById('adminStarRating');
const adminRatingValue = document.getElementById('adminRatingValue');

// ==========================================
// 7. MENÚ HAMBURGUESA FLOTANTE Y NAVEGACIÓN
// ==========================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideNav = document.getElementById('sideNav');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const logoFloat = document.getElementById('logoFloat');

// Toggle menú hamburguesa
function toggleMenu() {
    if (!hamburgerBtn || !sideNav || !navOverlay) return;
    hamburgerBtn.classList.toggle('active');
    sideNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
}

// Cerrar menú
function closeMenu() {
    if (!hamburgerBtn || !sideNav || !navOverlay) return;
    hamburgerBtn.classList.remove('active');
    sideNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners del menú hamburguesa
if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMenu();
        
        // Actualizar enlace activo
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideNav && sideNav.classList.contains('active')) {
        closeMenu();
    }
});

// Logo flotante - clic para ir al inicio
if (logoFloat) {
    logoFloat.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Marcar enlace activo según la sección visible
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// 8. FUNCIONES AUXILIARES
// ==========================================
function getCategoryData() {
    const data = { 'all': { title: 'Todas las Categorías', subtitle: 'Explora todas nuestras creaciones' } };
    categories.forEach(cat => {
        data[cat.name] = { 
            title: cat.name, 
            subtitle: cat.subtitle || `Productos de ${cat.name}` 
        };
    });
    return data;
}

// ==========================================
// 9. CARGAR DATOS DESDE FIREBASE (TIEMPO REAL)
// ==========================================
function loadFromFirebase() {
    // Cargar configuración
    db.collection('config').doc('shop').onSnapshot((doc) => {
        if (doc.exists) {
            shopConfig = { ...DEFAULT_CONFIG, ...doc.data() };
        } else {
            db.collection('config').doc('shop').set(shopConfig);
        }
        applyConfig();
    });

    // Cargar credenciales
    db.collection('config').doc('credentials').onSnapshot((doc) => {
        if (doc.exists) {
            credentials = { ...DEFAULT_CREDENTIALS, ...doc.data() };
        } else {
            db.collection('config').doc('credentials').set(credentials);
        }
        document.getElementById('hintUser').textContent = credentials.username;
        document.getElementById('hintPass').textContent = credentials.password;
    });

    // Cargar categorías
    db.collection('categories').orderBy('order').onSnapshot((snapshot) => {
        if (snapshot.empty) {
            const batch = db.batch();
            DEFAULT_CATEGORIES.forEach((cat, index) => {
                const ref = db.collection('categories').doc();
                batch.set(ref, { ...cat, order: index });
            });
            batch.commit();
        } else {
            categories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => a.order - b.order);
            
            renderSidebarCategories();
            updateProductCategorySelect();
            updateHeroIfCurrentCategory();
        }
    });

    // Cargar productos
    db.collection('products').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
        products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        renderProducts();
    });

    // Cargar testimonios
    db.collection('testimonials').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
        if (snapshot.empty) {
            const batch = db.batch();
            DEFAULT_TESTIMONIALS.forEach((test) => {
                const ref = db.collection('testimonials').doc();
                batch.set(ref, test);
            });
            batch.commit();
        } else {
            testimonials = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            renderTestimonials();
            renderAdminTestimonials();
        }
    });
}

// ==========================================
// 10. SISTEMA DE AUTENTICACIÓN
// ==========================================
function checkAuthStatus() {
    if (sessionStorage.getItem('qdtalles_auth') === 'true') {
        isAuthenticated = true;
    }
}

function openModal() {
    adminModal.style.display = 'flex';
    if (isAuthenticated) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    loginScreen.style.display = 'block';
    adminPanel.style.display = 'none';
    loginError.style.display = 'none';
    loginForm.reset();
    setTimeout(() => loginUserInput.focus(), 100);
}

function showAdminPanel() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    loadConfigForm();
    renderCategoriesList();
    updateProductCategorySelect();
    renderAdminTestimonials();
}

function closeModal() {
    adminModal.style.display = 'none';
    loginForm.reset();
    loginError.style.display = 'none';
}

function exitToPage() {
    if (confirm('¿Segura que quieres salir y volver a la página principal?')) {
        closeModal();
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.tab-btn[data-tab="products"]').classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        document.getElementById('tabProducts').style.display = 'block';
    }
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = loginUserInput.value.trim();
    const pass = loginPasswordInput.value;
    
    if (user === credentials.username && pass === credentials.password) {
        isAuthenticated = true;
        sessionStorage.setItem('qdtalles_auth', 'true');
        loginError.style.display = 'none';
        showAdminPanel();
    } else {
        loginError.style.display = 'block';
        loginPasswordInput.value = '';
        loginUserInput.focus();
    }
});

logoutBtn.addEventListener('click', function() {
    if (confirm('¿Segura que quieres cerrar sesión?')) {
        isAuthenticated = false;
        sessionStorage.removeItem('qdtalles_auth');
        showLoginScreen();
    }
});

exitBtn.addEventListener('click', exitToPage);
adminToggleBtn.addEventListener('click', openModal);
closeModalBtn1.addEventListener('click', closeModal);
closeModalBtn2.addEventListener('click', closeModal);

adminModal.addEventListener('click', function(e) {
    if (e.target === adminModal) closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openModal();
    }
});

// ==========================================
// 11. TOGGLE PASSWORD (OJITO)
// ==========================================
function setupPasswordToggle(toggleBtn, inputId) {
    const input = document.getElementById(inputId);
    if (!input || !toggleBtn) return;
    const eyeOpen = toggleBtn.querySelector('.eye-open');
    const eyeClosed = toggleBtn.querySelector('.eye-closed');
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (input.type === 'password') {
            input.type = 'text';
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        } else {
            input.type = 'password';
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        }
    });
}

setupPasswordToggle(document.getElementById('toggleLoginPassword'), 'loginPassword');

document.querySelectorAll('.toggle-password[data-target]').forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    setupPasswordToggle(btn, targetId);
});

// ==========================================
// 12. TABS DE ADMINISTRACIÓN
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = {
    products: document.getElementById('tabProducts'),
    categories: document.getElementById('tabCategories'),
    testimonials: document.getElementById('tabTestimonials'),
    config: document.getElementById('tabConfig')
};

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        Object.values(tabContents).forEach(content => { content.style.display = 'none'; });
        tabContents[tabName].style.display = 'block';
    });
});

// ==========================================
// 13. GESTIÓN DE CATEGORÍAS
// ==========================================
function renderCategoriesList() {
    categoriesList.innerHTML = '';
    
    if (categories.length === 0) {
        categoriesList.innerHTML = '<p style="text-align:center; color: var(--text-gray); padding: 20px;">Cargando categorías...</p>';
        return;
    }
    
    categories.forEach((cat, index) => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.dataset.index = index;
        
        item.innerHTML = `
            <span class="category-number">${index + 1}.</span>
            <span class="category-name">${cat.name}</span>
            ${cat.subtitle ? `<span class="category-subtitle">${cat.subtitle}</span>` : ''}
            <div class="category-actions">
                <button class="cat-btn move-up" title="Subir" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="cat-btn move-down" title="Bajar" ${index === categories.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="cat-btn edit" title="Editar">✏️</button>
                <button class="cat-btn delete" title="Eliminar">🗑️</button>
            </div>
        `;
        categoriesList.appendChild(item);
    });
    
    document.querySelectorAll('.category-item').forEach(item => {
        const index = parseInt(item.dataset.index);
        item.querySelector('.move-up').addEventListener('click', () => moveCategory(index, -1));
        item.querySelector('.move-down').addEventListener('click', () => moveCategory(index, 1));
        item.querySelector('.edit').addEventListener('click', () => editCategory(index));
        item.querySelector('.delete').addEventListener('click', () => deleteCategory(index));
    });
}

async function moveCategory(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= categories.length) return;
    
    const cat1 = categories[index];
    const cat2 = categories[newIndex];
    
    await db.collection('categories').doc(cat1.id).update({ order: cat2.order });
    await db.collection('categories').doc(cat2.id).update({ order: cat1.order });
}

async function editCategory(index) {
    const item = document.querySelector(`.category-item[data-index="${index}"]`);
    const nameSpan = item.querySelector('.category-name');
    const subtitleSpan = item.querySelector('.category-subtitle');
    const actionsDiv = item.querySelector('.category-actions');
    
    const cat = categories[index];
    const oldName = cat.name;
    const oldSubtitle = cat.subtitle || '';
    
    item.classList.add('editing');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'category-name-input';
    nameInput.value = oldName;
    nameSpan.replaceWith(nameInput);
    
    let subtitleInput;
    if (subtitleSpan) {
        subtitleInput = document.createElement('input');
        subtitleInput.type = 'text';
        subtitleInput.className = 'category-name-input';
        subtitleInput.value = oldSubtitle;
        subtitleInput.placeholder = 'Descripción (opcional)';
        subtitleInput.style.marginLeft = '10px';
        subtitleInput.style.maxWidth = '200px';
        subtitleSpan.replaceWith(subtitleInput);
    } else {
        subtitleInput = document.createElement('input');
        subtitleInput.type = 'text';
        subtitleInput.className = 'category-name-input';
        subtitleInput.value = '';
        subtitleInput.placeholder = 'Descripción (opcional)';
        subtitleInput.style.marginLeft = '10px';
        subtitleInput.style.maxWidth = '200px';
        nameInput.insertAdjacentElement('afterend', subtitleInput);
    }
    
    actionsDiv.innerHTML = `
        <button class="cat-btn save" title="Guardar">💾</button>
        <button class="cat-btn cancel" title="Cancelar">❌</button>
    `;
    
    nameInput.focus();
    nameInput.select();
    
    actionsDiv.querySelector('.save').addEventListener('click', async () => {
        const newName = nameInput.value.trim();
        const newSubtitle = subtitleInput.value.trim();
        
        if (!newName) {
            alert('El nombre de la categoría no puede estar vacío.');
            return;
        }
        
        const exists = categories.some((c, i) => c.name.toLowerCase() === newName.toLowerCase() && i !== index);
        if (exists) {
            alert('Ya existe una categoría con ese nombre.');
            return;
        }
        
        await db.collection('categories').doc(cat.id).update({
            name: newName,
            subtitle: newSubtitle
        });
        
        if (newName !== oldName) {
            const batch = db.batch();
            products.filter(p => p.category === oldName).forEach(p => {
                batch.update(db.collection('products').doc(p.id), { category: newName });
            });
            await batch.commit();
        }
    });
    
    actionsDiv.querySelector('.cancel').addEventListener('click', () => {
        renderCategoriesList();
    });
    
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); actionsDiv.querySelector('.save').click(); }
    });
    subtitleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); actionsDiv.querySelector('.save').click(); }
    });
}

async function deleteCategory(index) {
    const cat = categories[index];
    const productsInCategory = products.filter(p => p.category === cat.name).length;
    
    let message = `¿Segura que quieres eliminar la categoría "${cat.name}"?`;
    if (productsInCategory > 0) {
        message += `\n\n⚠️ Hay ${productsInCategory} producto(s) en esta categoría. Se moverán a "Otros".`;
    }
    
    if (!confirm(message)) return;
    
    await db.collection('categories').doc(cat.id).delete();
    
    const hasOtros = categories.some(c => c.name === 'Otros');
    if (hasOtros) {
        const batch = db.batch();
        products.filter(p => p.category === cat.name).forEach(p => {
            batch.update(db.collection('products').doc(p.id), { category: 'Otros' });
        });
        await batch.commit();
    }
    
    if (currentCategory === cat.name) {
        currentCategory = 'all';
    }
}

addCategoryForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!isAuthenticated) {
        alert('❌ No tienes permisos.');
        showLoginScreen();
        return;
    }
    
    const name = document.getElementById('newCategoryName').value.trim();
    const subtitle = document.getElementById('newCategorySubtitle').value.trim();
    
    if (!name) {
        alert('El nombre de la categoría es obligatorio.');
        return;
    }
    
    const exists = categories.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('Ya existe una categoría con ese nombre.');
        return;
    }
    
    await db.collection('categories').add({
        name: name,
        subtitle: subtitle,
        order: categories.length
    });
    
    document.getElementById('newCategoryName').value = '';
    document.getElementById('newCategorySubtitle').value = '';
    alert(`✅ Categoría "${name}" agregada exitosamente.`);
});

function updateProductCategorySelect() {
    const select = document.getElementById('prodCategory');
    if (!select) return;
    select.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function renderSidebarCategories() {
    categoryFilter.innerHTML = '';
    
    const allLi = document.createElement('li');
    allLi.className = currentCategory === 'all' ? 'active' : '';
    allLi.dataset.category = 'all';
    allLi.textContent = 'Todos';
    categoryFilter.appendChild(allLi);
    
    categories.forEach(cat => {
        const li = document.createElement('li');
        li.className = currentCategory === cat.name ? 'active' : '';
        li.dataset.category = cat.name;
        li.textContent = cat.name;
        categoryFilter.appendChild(li);
    });
    
    categoryFilter.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', handleCategoryClick);
    });
}

function updateHeroIfCurrentCategory() {
    const data = getCategoryData();
    if (data[currentCategory]) {
        heroTitle.textContent = data[currentCategory].title;
        heroSubtitle.textContent = data[currentCategory].subtitle;
    }
}

// ==========================================
// 14. GESTIÓN DE TESTIMONIOS
// ==========================================
function renderTestimonials() {
    testimonialsGrid.innerHTML = '';
    
    if (testimonials.length === 0) {
        testimonialsGrid.innerHTML = '<p style="text-align:center; color: var(--text-gray); padding: 40px;">Aún no hay testimonios. ¡Sé el primero en dejar uno!</p>';
        return;
    }
    
    testimonials.forEach(testimonial => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const initials = testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        
        const card = document.createElement('div');
        card.className = 'testimonial-card glass-card';
        card.innerHTML = `
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div>
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.service}</span>
                </div>
            </div>
        `;
        testimonialsGrid.appendChild(card);
    });
}

function renderAdminTestimonials() {
    adminTestimonialsList.innerHTML = '';
    
    if (testimonials.length === 0) {
        adminTestimonialsList.innerHTML = '<p style="text-align:center; color: var(--text-gray); padding: 20px;">No hay testimonios. Agrega uno abajo.</p>';
        return;
    }
    
    testimonials.forEach((testimonial, index) => {
        const stars = '★'.repeat(testimonial.rating);
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
            <div class="testimonial-item-stars">${stars}</div>
            <div class="testimonial-item-content">
                <div class="testimonial-item-name">${testimonial.name}</div>
                <div class="testimonial-item-service">${testimonial.service}</div>
                <div class="testimonial-item-text">"${testimonial.text}"</div>
            </div>
            <button class="testimonial-item-delete" data-index="${index}">🗑️</button>
        `;
        adminTestimonialsList.appendChild(item);
    });
    
    document.querySelectorAll('.testimonial-item-delete').forEach(btn => {
        btn.addEventListener('click', async function() {
            const index = parseInt(this.getAttribute('data-index'));
            const testimonial = testimonials[index];
            if (confirm('¿Segura que quieres eliminar este testimonio?')) {
                await db.collection('testimonials').doc(testimonial.id).delete();
            }
        });
    });
}

function setupStarRating(container, input) {
    if (!container || !input) return;
    const stars = container.querySelectorAll('.star');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            input.value = currentRating;
            stars.forEach((s, index) => {
                s.classList.toggle('active', index < currentRating);
            });
        });
        
        star.addEventListener('mouseenter', function() {
            const hoverValue = parseInt(this.getAttribute('data-value'));
            stars.forEach((s, index) => {
                s.style.color = index < hoverValue ? 'var(--accent-gold)' : '#ddd';
            });
        });
    });
    
    container.addEventListener('mouseleave', function() {
        stars.forEach((s, index) => {
            s.style.color = index < currentRating ? 'var(--accent-gold)' : '#ddd';
        });
    });
}

setupStarRating(starRating, ratingValue);
setupStarRating(adminStarRating, adminRatingValue);

openTestimonialForm.addEventListener('click', function() {
    testimonialModal.style.display = 'flex';
    ratingValue.value = '';
    testimonialForm.reset();
    starRating.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
});

closeTestimonialModal.addEventListener('click', () => testimonialModal.style.display = 'none');
testimonialModal.addEventListener('click', function(e) {
    if (e.target === testimonialModal) testimonialModal.style.display = 'none';
});

testimonialForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('testimonialName').value;
    const service = document.getElementById('testimonialService').value;
    const text = document.getElementById('testimonialText').value;
    const rating = ratingValue.value;
    
    if (!rating) {
        alert('Por favor selecciona una calificación de estrellas.');
        return;
    }
    
    const stars = '★'.repeat(parseInt(rating));
    const message = `¡Hola +Q'Dtalles! Quiero dejar un testimonio:\n\n⭐ Calificación: ${stars}\n👤 Nombre: ${name}\n🎁 Producto/Servicio: ${service}\n\n💬 Comentario:\n"${text}"`;
    
    window.open(`https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    
    testimonialModal.style.display = 'none';
    testimonialForm.reset();
    ratingValue.value = '';
    starRating.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    alert('✅ ¡Gracias por tu testimonio! Se abrirá WhatsApp para enviarlo.');
});

addTestimonialForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!isAuthenticated) { alert('❌ No tienes permisos.'); showLoginScreen(); return; }
    
    const rating = adminRatingValue.value;
    if (!rating) { alert('Por favor selecciona una calificación de estrellas.'); return; }
    
    await db.collection('testimonials').add({
        name: document.getElementById('adminTestimonialName').value,
        service: document.getElementById('adminTestimonialService').value,
        text: document.getElementById('adminTestimonialText').value,
        rating: parseInt(rating),
        createdAt: Date.now()
    });
    
    addTestimonialForm.reset();
    adminRatingValue.value = '';
    adminStarRating.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    alert('✅ Testimonio agregado exitosamente.');
});

// ==========================================
// 15. CONFIGURACIÓN DE LA TIENDA
// ==========================================
function loadConfigForm() {
    document.getElementById('configWhatsapp').value = shopConfig.whatsapp;
    document.getElementById('configEmail').value = shopConfig.email;
    document.getElementById('configLocation').value = shopConfig.location;
    document.getElementById('configHours').value = shopConfig.hours;
    document.getElementById('configInstagram').value = shopConfig.instagram;
    document.getElementById('configTiktok').value = shopConfig.tiktok;
    document.getElementById('configFacebook').value = shopConfig.facebook;
    document.getElementById('configHeroImage').value = shopConfig.heroImage;
    document.getElementById('newUsername').value = credentials.username;
}

saveConfigBtn.addEventListener('click', async function() {
    if (!isAuthenticated) { alert('❌ No tienes permisos.'); showLoginScreen(); return; }
    if (!confirm('¿Segura que quieres guardar los cambios de configuración?')) return;
    
    shopConfig = {
        whatsapp: document.getElementById('configWhatsapp').value.trim(),
        email: document.getElementById('configEmail').value.trim(),
        location: document.getElementById('configLocation').value.trim(),
        hours: document.getElementById('configHours').value.trim(),
        instagram: document.getElementById('configInstagram').value.trim(),
        tiktok: document.getElementById('configTiktok').value.trim(),
        facebook: document.getElementById('configFacebook').value.trim(),
        heroImage: document.getElementById('configHeroImage').value.trim()
    };
    
    await db.collection('config').doc('shop').set(shopConfig);
    applyConfig();
    alert('✅ Configuración guardada exitosamente.');
});

credentialsForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!isAuthenticated) { alert('❌ No tienes permisos.'); showLoginScreen(); return; }
    
    const newUser = document.getElementById('newUsername').value.trim();
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if (!newUser || !newPass) { alert('Usuario y contraseña son obligatorios.'); return; }
    if (newPass.length < 4) { alert('La contraseña debe tener al menos 4 caracteres.'); return; }
    if (newPass !== confirmPass) { alert('Las contraseñas no coinciden.'); return; }
    
    if (!confirm(`¿Segura que quieres cambiar las credenciales?\n\nNuevo usuario: ${newUser}\nNueva contraseña: ${'•'.repeat(newPass.length)}\n\nTendrás que iniciar sesión nuevamente.`)) return;
    
    credentials = { username: newUser, password: newPass };
    await db.collection('config').doc('credentials').set(credentials);
    
    document.getElementById('hintUser').textContent = credentials.username;
    document.getElementById('hintPass').textContent = credentials.password;
    
    isAuthenticated = false;
    sessionStorage.removeItem('qdtalles_auth');
    credentialsForm.reset();
    document.getElementById('newUsername').value = newUser;
    
    alert('✅ Credenciales actualizadas. Inicia sesión nuevamente.');
    showLoginScreen();
});

function applyConfig() {
    if (shopConfig.whatsapp) {
        whatsappFloat.href = `https://wa.me/${shopConfig.whatsapp}?text=Hola%20%2BQ'Dtalles`;
        whatsappFloat.style.display = 'flex';
    } else {
        whatsappFloat.style.display = 'none';
    }
    
    if (shopConfig.heroImage) heroImage.src = shopConfig.heroImage;
    
    contactMethods.innerHTML = '';
    if (shopConfig.whatsapp) contactMethods.innerHTML += `<div class="contact-method"><div class="method-icon">${contactIcons.whatsapp}</div><div><strong>WhatsApp</strong><span>+${shopConfig.whatsapp}</span></div></div>`;
    if (shopConfig.email) contactMethods.innerHTML += `<div class="contact-method"><div class="method-icon">${contactIcons.email}</div><div><strong>Email</strong><span>${shopConfig.email}</span></div></div>`;
    if (shopConfig.location) contactMethods.innerHTML += `<div class="contact-method"><div class="method-icon">${contactIcons.location}</div><div><strong>Ubicación</strong><span>${shopConfig.location}</span></div></div>`;
    if (shopConfig.hours) contactMethods.innerHTML += `<div class="contact-method"><div class="method-icon">${contactIcons.hours}</div><div><strong>Horario</strong><span>${shopConfig.hours}</span></div></div>`;
    
    contactSocial.innerHTML = '';
    if (shopConfig.instagram) contactSocial.innerHTML += `<a href="${shopConfig.instagram}" target="_blank" class="social-link">Instagram</a>`;
    if (shopConfig.tiktok) contactSocial.innerHTML += `<a href="${shopConfig.tiktok}" target="_blank" class="social-link">TikTok</a>`;
    if (shopConfig.facebook) contactSocial.innerHTML += `<a href="${shopConfig.facebook}" target="_blank" class="social-link">Facebook</a>`;
}

// ==========================================
// 16. FUNCIONES DE PRODUCTOS
// ==========================================
function renderProducts() {
    productGrid.innerHTML = '';
    const filteredProducts = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);

    if (filteredProducts.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        filteredProducts.forEach(product => {
            const whatsappMessage = encodeURIComponent(`Hola +Q'Dtalles, me interesa el producto: ${product.title}`);
            const whatsappLink = `https://wa.me/${shopConfig.whatsapp}?text=${whatsappMessage}`;
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/300x250/fff5f8/7b2d8e?text=Sin+Imagen'">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    ${product.price ? `<p class="product-price">${product.price}</p>` : ''}
                    <a href="${whatsappLink}" target="_blank" class="btn-whatsapp">Me interesa tu producto</a>
                    ${product.tiktok ? `<a href="${product.tiktok}" target="_blank" class="btn-tiktok">🎵 Ver video en TikTok</a>` : ''}
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
}

function handleCategoryClick(e) {
    if (e.target.tagName !== 'LI' || isAnimating) return;
    isAnimating = true;
    categoryFilter.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.getAttribute('data-category');
    
    const data = getCategoryData()[currentCategory];
    heroContent.classList.add('exit-up');
    setTimeout(() => {
        heroTitle.textContent = data.title;
        heroSubtitle.textContent = data.subtitle;
        heroContent.classList.remove('exit-up');
        heroContent.classList.add('enter-down');
        setTimeout(() => heroContent.classList.remove('enter-down'), 600);
    }, 500);
    
    productGrid.classList.remove('animating');
    void productGrid.offsetWidth;
    productGrid.classList.add('animating');
    
    setTimeout(() => {
        renderProducts();
        isAnimating = false;
    }, 300);
}

productForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!isAuthenticated) { alert('❌ No tienes permisos.'); showLoginScreen(); return; }
    
    await db.collection('products').add({
        title: document.getElementById('prodTitle').value,
        category: document.getElementById('prodCategory').value,
        description: document.getElementById('prodDesc').value,
        price: document.getElementById('prodPrice').value,
        image: document.getElementById('prodImage').value,
        tiktok: document.getElementById('prodTiktok').value,
        createdAt: Date.now()
    });
    
    productForm.reset();
    alert('✅ ¡Producto guardado exitosamente en la nube!');
});

clearStorageBtn.addEventListener('click', async function() {
    if (!isAuthenticated) { alert('❌ No tienes permisos.'); showLoginScreen(); return; }
    if (confirm('⚠️ ¿Borrar TODOS los productos de la nube? Esta acción no se puede deshacer.')) {
        const batch = db.batch();
        products.forEach(p => batch.delete(db.collection('products').doc(p.id)));
        await batch.commit();
        alert('🗑️ Todos los productos han sido eliminados.');
    }
});

// ==========================================
// 17. FORMULARIO DE CONTACTO
// ==========================================
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const clientEmail = document.getElementById('contactEmail').value;
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value;
    
    if (shopConfig.email) {
        const subject = encodeURIComponent(`Consulta de ${name} - Servicio: ${service}`);
        const body = encodeURIComponent(`Hola +Q'Dtalles,\n\nSoy ${name} (${clientEmail}).\n\nMe interesa el servicio de: ${service}.\n\nMensaje:\n${message}`);
        window.location.href = `mailto:${shopConfig.email}?subject=${subject}&body=${body}`;
        alert(`✅ Tu mensaje se abrirá en tu aplicación de correo.`);
    } else {
        const whatsappText = encodeURIComponent(`Hola +Q'Dtalles, soy ${name}. Me interesa el servicio de: ${service}. ${message}`);
        window.open(`https://wa.me/${shopConfig.whatsapp}?text=${whatsappText}`, '_blank');
        alert('✅ Te redirigimos a WhatsApp.');
    }
    contactForm.reset();
});

// ==========================================
// 18. ANIMACIONES AL HACER SCROLL
// ==========================================
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.service-card, .process-step, .testimonial-card, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// 19. INICIALIZACIÓN
// ==========================================
handleIntro();
checkAuthStatus();
loadFromFirebase();
