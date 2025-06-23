// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Book button functionality
const bookBtn = document.querySelector('.btn');
if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    if (bookBtn.getAttribute('href') === '#book') {
      e.preventDefault();
      alert("You're being redirected to book a maid. Please fill the Google form.");
      // Redirect to actual Google Form
      window.open('https://forms.gle/YourBookingFormID', '_blank');
    }
  });
}

// Language switching functionality
const langSelector = document.getElementById("languageSelect");

function switchLanguage(lang) {
  // Handle simple translatable elements
  document.querySelectorAll('.translatable').forEach(el => {
    const translation = el.getAttribute(`data-${lang}`);
    if (translation) {
      // Only change text content if it doesn't contain HTML
      if (el.children.length === 0) {
        el.textContent = translation;
      } else {
        // For elements with children, only update if it's a simple text replacement
        const currentText = el.getAttribute(`data-${document.querySelector('#languageSelect').value || 'en'}`);
        if (currentText && el.innerHTML === currentText) {
          el.innerHTML = translation;
        }
      }
    }
  });

  // Handle complex elements with mixed content (text + links)
  handleFormText(lang);
  handleApplyText(lang);
  handleContactInfo(lang);
}

function handleFormText(lang) {
  const formText = document.querySelector('.form-text');
  if (formText) {
    const useOur = getTranslation('Use our', lang);
    const form = getTranslation('form', lang);
    const toSubmit = getTranslation('to submit your request quickly.', lang);

    formText.innerHTML = `${useOur} <a href="https://forms.gle/YourBookingFormID" target="_blank">${form}</a> ${toSubmit}`;
  }
}

function handleApplyText(lang) {
  const applyText = document.querySelector('.apply-text');
  if (applyText) {
    const applyHere = getTranslation('Apply here', lang);
    const toBecome = getTranslation('to become a GoClean maid.', lang);

    applyText.innerHTML = `<a href="https://forms.gle/YourApplicationFormID" target="_blank">${applyHere}</a> ${toBecome}`;
  }
}

function handleContactInfo(lang) {
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    const email = getTranslation('Email:', lang);
    const phone = getTranslation('Phone/WhatsApp:', lang);

    contactInfo.innerHTML = `${email} info@GoClean.rw<br>${phone} +250 7XX XXX XXX<br>Instagram: <a href="https://instagram.com/GoClean" target="_blank">@GoClean</a>`;
  }
}

function getTranslation(key, lang) {
  const translations = {
    'Use our': {
      'en': 'Use our',
      'fr': 'Utilisez notre',
      'rw': 'Koresha'
    },
    'form': {
      'en': 'form',
      'fr': 'formulaire',
      'rw': 'ifishi'
    },
    'to submit your request quickly.': {
      'en': 'to submit your request quickly.',
      'fr': 'pour soumettre rapidement votre demande.',
      'rw': 'kugira ngo utange icyifuzo cyawe.'
    },
    'Apply here': {
      'en': 'Apply here',
      'fr': 'Postulez ici',
      'rw': 'Iyandikishe hano'
    },
    'to become a GoClean maid.': {
      'en': 'to become a GoClean maid.',
      'fr': 'pour devenir femme de ménage GoClean.',
      'rw': 'ukaba umukozi wa GoClean.'
    },
    'Email:': {
      'en': 'Email:',
      'fr': 'Email :',
      'rw': 'Imeyili:'
    },
    'Phone/WhatsApp:': {
      'en': 'Phone/WhatsApp:',
      'fr': 'Téléphone/WhatsApp :',
      'rw': 'Telefone/WhatsApp:'
    }
  };

  return translations[key] ? translations[key][lang] : key;
}

// Language selector event listener
langSelector.addEventListener("change", function () {
  const lang = this.value;
  switchLanguage(lang);
});

// Initialize with default language
switchLanguage('en');