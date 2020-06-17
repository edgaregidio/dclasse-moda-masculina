var isMobile = window.screen.width <= 678;
var arrayImages = [];
var currentIndexImage = null;
var modalActive = false;

const toggleNavBar = () => {
  const navBar = document.getElementById('navbarText');
  navBar.style.display = !navBar.style.display || (navBar.style.display === 'none') ? 'flex' : 'none';
}

const submitNews = (event) => {
  event.preventDefault();
  const button = document.getElementById('buttonNews');
  handleLoading(button);
  const name = document.getElementById('inputName').value;
  const phone = document.getElementById('inputPhone').value;
  const headers = new Headers();
  headers.append('access', 'e16ed094626ac8ab1bc3bc17ebc0b9ca');
  headers.append('Content-Type', 'application/json');
  fetch('/api/news', { headers, method: 'POST', body: JSON.stringify({ name, phone }) })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        document.getElementById('inputName').value = '';
        document.getElementById('inputPhone').value = '';
      }
      const type = res.success ? 'success' : 'error';
      toast(res.message, type);
      handleLoading(button, false);
    }).catch((err) => {
      toast(err.toString(), 'error');
      handleLoading(button, false);
    })
}

const openModal = (img) => {
  const modal = document.getElementById('modalImage');
  const modalImg = document.getElementById('contentImgModal');
  modalImg.src = img.src;
  modal.style.display = 'flex';
  modalActive = true;
  const span = document.getElementsByClassName('close')[0];
  span.onclick = () => {
    modal.style.display = 'none'
    modalActive = false;
  };
  modal.onclick = () => {
    modal.style.display = 'none'
    modalActive = false;
  };
  const images = document.getElementsByClassName('img-gallery');
  for (let i = 0; i < images.length; i++) {
    arrayImages.push(images[i].src)
    if (images[i].src === img.src) currentIndexImage = i;
  };
  modalImg.onclick = (event) => {
    event.stopPropagation();
    const modalImg = document.getElementById('contentImgModal');
    currentIndexImage++;
    if (currentIndexImage === arrayImages.length) currentIndexImage = 0;
    modalImg.src = arrayImages[currentIndexImage];
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modalActive) {
      const modal = document.getElementById('modalImage');
      modal.style.display = 'none'
      modalActive = false;
    }
  }
  if (event.key === 'ArrowRight') nextImage();
  if (event.key === 'ArrowLeft') prevImage();
})

const nextImage = (event) => {
  if (event) event.stopPropagation();
  const modalImg = document.getElementById('contentImgModal');
  currentIndexImage++;
  if (currentIndexImage === arrayImages.length) currentIndexImage = 0;
  modalImg.src = arrayImages[currentIndexImage];
}

const prevImage = (event) => {
  if (event) event.stopPropagation();
  const modalImg = document.getElementById('contentImgModal');
  currentIndexImage--;
  if (currentIndexImage < 0) currentIndexImage = arrayImages.length - 1;
  modalImg.src = arrayImages[currentIndexImage];
}

const submitContact = (event) => {
  event.preventDefault();
  const name = document.getElementById('inputName').value;
  const email = document.getElementById('inputEmail').value;
  const phone = document.getElementById('inputPhone').value;
  const subject = document.getElementById('inputSubject').value;
  const message = document.getElementById('inputMessage').value;
  if (name && email && phone && subject && message) {
    const button = document.getElementById('buttonContact');
    handleLoading(button);
    const headers = new Headers();
    headers.append('access', 'e16ed094626ac8ab1bc3bc17ebc0b9ca');
    headers.append('Content-Type', 'application/json');
    fetch('/api/contact', { headers, method: 'POST', body: JSON.stringify({ name, email, phone, subject, message }) })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          document.getElementById('inputName').value = '';
          document.getElementById('inputPhone').value = '';
          document.getElementById('inputSubject').value = '';
          document.getElementById('inputEmail').value = '';
          document.getElementById('inputMessage').value = '';
          const form = document.getElementById('formContact');
          form.className = 'needs-validation';
        }
        const type = res.success ? 'success' : 'error';
        toast(res.message, type);
        handleLoading(button, false);
      }).catch((err) => {
        toast(err.toString(), 'error');
        handleLoading(button, false);
      })
  }
}

const submitRegister = (event) => {
  event.preventDefault();
  const type = document.getElementById('selectTipoAtuacao').value === 'Juridica' ? 'registerpj' : 'registerpf';
  const dataApi = {};
  const inputForm = document.getElementById('formRegister').getElementsByTagName('input');
  for (let i = 0; i < inputForm.length; i++) dataApi[inputForm[i].name] = inputForm[i].value;
  const button = document.getElementById('formRegister').getElementsByTagName('button')[0];
  handleLoading(button);
  const headers = new Headers();
  headers.append('access', 'e16ed094626ac8ab1bc3bc17ebc0b9ca');
  headers.append('Content-Type', 'application/json');
  fetch(`/api/${type}`, { headers, method: 'POST', body: JSON.stringify(dataApi) })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        for (let i = 0; i < inputForm.length; i++) inputForm[i].value = '';
        const form = document.getElementById('formRegister');
        form.className = 'needs-validation';
      }
      const type = res.success ? 'success' : 'error';
      toast(res.message, type);
      handleLoading(button, false);
    }).catch((err) => {
      toast(err.toString(), 'error');
      handleLoading(button, false);
    })
}

const handleFormAtuation = () => {
  const type = document.getElementById('selectTipoAtuacao').value;
  const fields = type === 'Juridica' ? document.getElementById('fieldsPJ').innerHTML : document.getElementById('fieldsPF').innerHTML;
  document.getElementById('formRegister').innerHTML = fields;
}

const handleLoading = (button, show = true) => {
  button.disabled = show;
  if (show) return button.innerHTML = 'Carregando...';
  button.innerHTML = 'Salvar';
}

const toast = (message, type = 'success') => {
  const toast = document.getElementById('snackbar');
  toast.className = 'show';
  toast.innerHTML = message;
  toast.style.backgroundColor = type === 'success' ? '#46A049' : '#FF0000'
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}