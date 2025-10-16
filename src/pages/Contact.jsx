export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="contact-page">
      <div className="container py-5">
        <div className="wrapper">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <header className="text-center mb-5">
                <h1 className="display-4 fw-bold text-light mb-4">
                  Contattaci
                </h1>
                <p className="lead text-light">
                  Siamo qui per aiutarti. Inviaci un messaggio e ti risponderemo
                  il prima possibile.
                </p>
              </header>

              <div className="row g-5">
                {/* Contact Information */}
                <div className="col-md-6">
                  <div className="contact-info">
                    <h2 className="h3 fw-semibold text-light mb-4">
                      Informazioni di Contatto
                    </h2>

                    <div className="d-flex flex-column gap-4">
                      <div className="contact-item">
                        <h3 className="h5 fw-medium text-light">Indirizzo</h3>
                        <p className="text-light mb-0">
                          Via Roma 123, 00100 Roma, Italia
                        </p>
                      </div>

                      <div className="contact-item">
                        <h3 className="h5 fw-medium text-light">Telefono</h3>
                        <p className="text-light mb-0">+39 06 1234 5678</p>
                      </div>

                      <div className="contact-item">
                        <h3 className="h5 fw-medium text-light">Email</h3>
                        <p className="text-light mb-0">info@esempio.com</p>
                      </div>

                      <div className="contact-item">
                        <h3 className="h5 fw-medium text-light">
                          Orari di Apertura
                        </h3>
                        <p className="text-light mb-0">
                          Lun - Ven: 9:00 - 18:00
                          <br />
                          Sab: 9:00 - 13:00
                          <br />
                          Dom: Chiuso
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form contatto  */}
                <div className="col-md-6">
                  <div className="contact-form">
                    <h2 className="h3 fw-semibold text-light mb-4">
                      Invia un Messaggio
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-medium">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="form-control"
                          placeholder="Il tuo nome completo"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="form-control"
                          placeholder="la.tua.email@esempio.com"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="subject"
                          className="form-label fw-medium"
                        >
                          Oggetto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          placeholder="Oggetto del messaggio"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="message"
                          className="form-label fw-medium"
                        >
                          Messaggio *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows="5"
                          className="form-control"
                          placeholder="Scrivi il tuo messaggio qui..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                      >
                        Invia Messaggio
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
