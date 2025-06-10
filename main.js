document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('pay-button');
  if (!button) return;

  // Limpia y construye el botón
  button.innerHTML = '';

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // Crear div con logo redondo
  const div = document.createElement('div');
  div.style.borderRadius = '100%';
  div.style.overflow = 'hidden';
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.backgroundColor = '#0066ad';

  const img = document.createElement('img');
  // img.src = 'logo_dilo/DILO_LOGO-03.png';
  img.src = 'https://angeljaimesdev.github.io/PRUEBA-BOTON/logo_dilo/DILO_LOGO-03.png';
  img.alt = 'Logo de DILO';
  img.style.width = '90%';
  img.style.height = '90%';
  img.style.objectFit = 'cover';
  div.appendChild(img); 

  // Texto del botón
  const text = document.createElement('span');
  text.textContent = 'Financia con Dilo';
  text.style.fontFamily = 'Inter, sans-serif';
  text.style.color = '#9b9b9b';
  text.style.fontSize = '18px';
  text.style.fontWeight = '800';
  document.body.appendChild(text);
  

  // Agrega el div (logo) y texto al botón
  button.appendChild(div);
  button.appendChild(text);

  // Estilos del botón
  Object.assign(button.style, {
    width: '230px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    borderRadius: '35px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '15px',
    paddingRight: '15px',
    border: '1px solid #9b9b9b',
    cursor: 'pointer',
  });

  // Evento de clic
  // button.addEventListener('click', async () => {

  //   button.style.pointerEvents = 'none';
  //   button.style.opacity = '0.6';
  //   try {
  //     const response = await fetch(`${CONFIG.URL_BACKEND_COMERCIO}/generate-token`);
  //     const data = await response.json();

  //     if (!data || !data.token) {
  //       console.error("Respuesta inválida al obtener token");
  //       alert("Error al obtener el token. Por favor, inténtalo de nuevo más tarde.");
  //       button.style.pointerEvents = 'auto';
  //       button.style.opacity = '1';
  //       return;
  //     }

  //     const token = data.token;
      
  //     // Redirigir al portal con el token
  //     const url = `${CONFIG.URL_PORTAL_PAGOS}/?token=${encodeURIComponent(token)}`;
  //     button.style.pointerEvents = 'auto';
  //     button.style.opacity = '1';
  //     window.open(url, '_blank');
  //   } catch (err) {
  //     console.error("Error al obtener el token o redirigir:", err);
  //     alert("Error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.");
  //     button.style.pointerEvents = 'auto';
  //     button.style.opacity = '1';
  //   }
  // });

   button.addEventListener('click', async () => {
    button.style.pointerEvents = 'none';
    button.style.opacity = '0.6';

    try {
      const response = await fetch('https://fnb-dev.we-connect.co/api/auth-bop/get-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: {
            client: 'noborrenestacredencialcsmm-u0g',
            secret: 'test'
          },
          data: {
            orderId: 'ORD-20250529-001',
            totalAmount: 150000,
            items: [
              { sku: 'SKU-001', name: 'Zapatos', price: 75000, quantity: 2 },
              { sku: 'SKU-002', name: 'carro', price: 25000, quantity: 1 }
            ],
            callbackUrl: 'https://x.com/home',
            redirectionUrl: 'https://www.youtube.com/'
          }
        })
      });

      const data = await response.json();

      if (!data || !data.token) {
        alert("No se pudo obtener el token.");
        throw new Error("Token no recibido.");
      }

      console.log("Token recibido:", data.token);
      
      const url = `https://triplea-fnb-portalpagos.partnerdavinci.com/login?token=${encodeURIComponent(data.token)}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error al obtener el token:", error);
      alert("Hubo un error al obtener el token.");
    } finally {
      button.style.pointerEvents = 'auto';
      button.style.opacity = '1';
    }
  });
});
