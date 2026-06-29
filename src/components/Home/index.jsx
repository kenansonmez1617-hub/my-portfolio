import { Link } from 'react-router-dom'
import LogoTitle from '../../assets/images/k.jpg'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import { PacmanLoader } from 'react-spinners' // ← react-loaders yerine

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [loaderClass, setLoaderClass] = useState('loader-active') // ← ekle

  const nameArray = ['e', 'n', 'a', 'n']
  const jobArray = [
    'w',
    'e',
    'b',
    ' ',
    'd',
    'e',
    'v',
    'e',
    'l',
    'o',
    'p',
    'e',
    'r',
    '.',
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
      setLoaderClass('loader-hidden') // ← loader'ı gizle
    }, 4000)

    return () => clearTimeout(timer) // cleanup fonksiyonu
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img src={LogoTitle} alt="developer" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>Frontend Developer / JavaScript Expert</h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        <Logo />
      </div>

      <div className={loaderClass}>
        {/* ← wrapper div */}
        <PacmanLoader color="#ffd700" size={25} />
      </div>
    </>
  )
}

export default Home
