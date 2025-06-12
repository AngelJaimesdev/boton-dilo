class PayButton extends HTMLElement {
  connectedCallback() {
    const button = this;

    // Limpia y construye el botón
    button.innerHTML = "";

    // Fuente
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // circulo del logo
    const div = document.createElement("div");
    div.style.borderRadius = "100%";
    div.style.overflow = "hidden";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.backgroundColor = "#0066ad";

    // logo Dilo
    const img = document.createElement("img");
    img.src =
      "https://angeljaimesdev.github.io/boton-dilo/logo_dilo/DILO_LOGO-03.png";
    img.alt = "Logo de DILO";
    img.style.width = "90%";
    img.style.height = "90%";
    img.style.objectFit = "cover";
    div.appendChild(img);

    // texto botón
    const text = document.createElement("span");
    text.textContent = "Financia con Dilo";
    Object.assign(text.style, {
      fontFamily: "Inter, sans-serif",
      color: "#9b9b9b",
      fontSize: "18px",
      fontWeight: "800",
      marginLeft: "1px",
      marginRight: "1px",
    });
    text.classList.add("dilo-text");

    button.appendChild(div);
    button.appendChild(text);

    Object.assign(button.style, {
      width: "230px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      borderRadius: "35px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingRight: "15px",
      border: "1px solid #9b9b9b",
      cursor: "pointer",
    });

    button.classList.add("dilo-button");

    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 350px) {
        .dilo-text {
          display: none !important;
        }

        .dilo-button {
          display: flex;
          justify-content: center;
          items-align: center;
          width: 30vw !important;
          padding-right: 5px !important;
          padding-left: 5px !important;
        }
      }
      }
    `;

    document.head.appendChild(style);

    button.addEventListener("click", async () => {
      button.style.pointerEvents = "none";
      button.style.opacity = "0.6";

      try {
        const response = await fetch(
          "https://fnb-dev.we-connect.co/api/auth-bop/get-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              credential: {
                client: "noborrenestacredencialcsmm-u0g",
                secret: "test",
              },
              data: {
                orderId: "ORD-20250529-001",
                totalAmount: 150000,
                items: [
                  {
                    sku: "SKU-001",
                    name: "Zapatos",
                    price: 75000,
                    quantity: 2,
                  },
                  { sku: "SKU-002", name: "carro", price: 25000, quantity: 1 },
                ],
                callbackUrl: "https://x.com/home",
                redirectionUrl: "https://www.youtube.com/",
              },
            }),
          }
        );

        const data = await response.json();

        if (!data || !data.token) {
          alert("No se pudo obtener el token.");
          throw new Error("Token no recibido.");
        }

        console.log("Token recibido:", data.token);

        const url = `https://triplea-fnb-portalpagos.partnerdavinci.com/login?token=${encodeURIComponent(
          data.token
        )}`;
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error al obtener el token:", error);
        alert("Hubo un error al obtener el token.");
      } finally {
        button.style.pointerEvents = "auto";
        button.style.opacity = "1";
      }
    });
  }
}

customElements.define("pay-button", PayButton);
