import './index.scss'
import { useState, useEffect, useRef } from 'react'
import { PacmanLoader } from 'react-spinners'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [loaderClass, setLoaderClass] = useState('loader-active')
  const refForm = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover') // ← hover'a geç
      setLoaderClass('loader-hidden')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        refForm.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        (err) => {
          console.log('Status:', err.status)
          console.log('Text:', err.text) // ← asıl hata mesajı burada
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially on ambitious
            or large projects. However, if you have any other requests or
            questions, don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>

                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>

      <div className="info-map">
        Kenan Sönmez,
        <br />
        Kuzey Kıbrıs Türk Cumhuriyeti,
        <br />
        Söğütlü Sk. 2200, 39200 <br />
        Güzelyurt <br />
        <span>kenansonmez1617@gmail.com</span>
      </div>
      <div className="map-wrap">
        <MapContainer center={[35.197471, 32.999381]} zoom={9}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[35.197471, 32.999381]}>
            <Popup>
              Kenan Sönmez lives here, come over for a cup of coffee :)
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={loaderClass}>
        <PacmanLoader color="#ffd700" size={25} />
      </div>
    </>
  )
}

export default Contact
