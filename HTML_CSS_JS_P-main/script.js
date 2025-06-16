// Variables globales
let currentQuantity = 0;
let cartCount = 0;

// Éléments DOM
const quantityDisplay = document.getElementById('quantity');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCountDisplay = document.getElementById('cartCount');
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateQuantityDisplay();
    updateCartDisplay();
});

// Initialisation des écouteurs d'événements
function initializeEventListeners() {
    // Gestion de la quantité
    minusBtn.addEventListener('click', decreaseQuantity);
    plusBtn.addEventListener('click', increaseQuantity);
    
    // Ajout au panier
    addToCartBtn.addEventListener('click', addToCart);
    
    // Gestion des miniatures
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            changeMainImage(this);
        });
    });
    
    // Effets de survol pour les boutons
    addHoverEffects();
}

// Fonctions de gestion de la quantité
function increaseQuantity() {
    currentQuantity++;
    updateQuantityDisplay();
    animateQuantityChange();
}

function decreaseQuantity() {
    if (currentQuantity > 0) {
        currentQuantity--;
        updateQuantityDisplay();
        animateQuantityChange();
    }
}

function updateQuantityDisplay() {
    quantityDisplay.textContent = currentQuantity;
}

function animateQuantityChange() {
    quantityDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        quantityDisplay.style.transform = 'scale(1)';
    }, 150);
}

// Fonction d'ajout au panier
function addToCart() {
    if (currentQuantity === 0) {
        showNotification('Veuillez sélectionner une quantité', 'warning');
        return;
    }
    
    cartCount += currentQuantity;
    updateCartDisplay();
    
    // Animation du bouton
    addToCartBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        addToCartBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Notification de succès
    showNotification(`${currentQuantity} article(s) ajouté(s) au panier`, 'success');
    
    // Réinitialiser la quantité
    currentQuantity = 0;
    updateQuantityDisplay();
}

function updateCartDisplay() {
    cartCountDisplay.textContent = cartCount;
    
    if (cartCount > 0) {
        cartCountDisplay.classList.add('show');
    } else {
        cartCountDisplay.classList.remove('show');
    }
}

// Fonction de changement d'image principale
function changeMainImage(clickedThumbnail) {
    // Retirer la classe active de toutes les miniatures
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Ajouter la classe active à la miniature cliquée
    clickedThumbnail.classList.add('active');
    
    // Changer l'image principale
    const newImageSrc = clickedThumbnail.getAttribute('data-image');
    
    // Animation de transition
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = newImageSrc;
        mainImage.style.opacity = '1';
    }, 200);
}

// Fonction de notification
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Couleurs selon le type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'warning':
            notification.style.backgroundColor = '#FF9800';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Effets de survol avancés
function addHoverEffects() {
    // Effet de survol pour les miniatures
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Effet de survol pour l'image principale
    mainImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction pour gérer le responsive
function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ajustements pour mobile
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

// Écouteur pour le redimensionnement
window.addEventListener('resize', handleResponsive);

// Animation au chargement de la page
window.addEventListener('load', function() {
    // Animation d'apparition des éléments
    const elementsToAnimate = [
        '.product-images',
        '.product-details'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        }
    });
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Export des fonctions pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        changeMainImage,
        formatPrice
    };
}

