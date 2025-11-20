'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

const scenes = [
  {
    id: 1,
    title: 'THE DREAM SUBURB',
    timestamp: '0:00',
    description: 'A cinematic, high-definition 1960s home-movie style shot of a pristine suburban street at golden hour.',
    details: 'A bright red vintage station wagon drives slowly down a tree-lined street past manicured green lawns and white picket fences. Children are running on the grass in the background.',
    mood: 'warm and nostalgic',
    style: '35mm film grain, soft lens flare, slow smooth camera movement',
    colors: ['#FFD700', '#FF6347', '#90EE90', '#FFFFFF'],
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FFCC33 50%, #FF6B6B 100%)'
  },
  {
    id: 2,
    title: 'THE BOOMING METROPOLIS',
    timestamp: '0:15',
    description: 'Low-angle establishing shot looking up at a gleaming, brand-new glass skyscraper in 1960s New York City.',
    details: 'The camera slowly tilts down to street level to reveal a bustling, energetic scene of vintage yellow taxis driving fast and businessmen in grey suits walking with purpose.',
    mood: 'energetic and dynamic',
    style: 'Technicolor aesthetic, sharp focus, heavy traffic motion',
    colors: ['#FFD700', '#4169E1', '#808080', '#000000'],
    gradient: 'linear-gradient(135deg, #4169E1 0%, #87CEEB 50%, #FFD700 100%)'
  },
  {
    id: 3,
    title: 'THE UNTOLD STORY',
    timestamp: '0:30',
    description: 'A mysterious cinematic sequence awaits...',
    details: 'The narrative continues with unexpected twists and turns, revealing hidden depths beneath the surface.',
    mood: 'mysterious and anticipatory',
    style: 'Film noir aesthetic, dramatic shadows, suspenseful pacing',
    colors: ['#2C2C2C', '#8B0000', '#4B0082', '#1C1C1C'],
    gradient: 'linear-gradient(135deg, #2C2C2C 0%, #4B0082 50%, #8B0000 100%)'
  }
]

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 8000
    const interval = 50
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextScene()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [currentScene])

  const nextScene = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length)
      setIsTransitioning(false)
    }, 500)
  }

  const prevScene = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length)
      setIsTransitioning(false)
      setProgress(0)
    }, 500)
  }

  const goToScene = (index: number) => {
    if (index !== currentScene) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentScene(index)
        setIsTransitioning(false)
        setProgress(0)
      }, 500)
    }
  }

  const scene = scenes[currentScene]

  return (
    <main className={styles.main}>
      <div className={styles.filmGrain}></div>

      <div
        className={`${styles.sceneContainer} ${isTransitioning ? styles.transitioning : ''}`}
        style={{ background: scene.gradient }}
      >
        <div className={styles.vignette}></div>

        <div className={styles.content}>
          <div className={styles.timestamp}>{scene.timestamp}</div>

          <h1 className={styles.title}>{scene.title}</h1>

          <div className={styles.descriptionBox}>
            <p className={styles.description}>{scene.description}</p>
            <p className={styles.details}>{scene.details}</p>
            <div className={styles.metadata}>
              <span className={styles.mood}>Mood: {scene.mood}</span>
              <span className={styles.style}>Style: {scene.style}</span>
            </div>
          </div>

          <div className={styles.colorPalette}>
            {scene.colors.map((color, idx) => (
              <div
                key={idx}
                className={styles.colorSwatch}
                style={{ background: color }}
                title={color}
              ></div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={prevScene} className={styles.navButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.sceneIndicators}>
            {scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToScene(idx)}
                className={`${styles.indicator} ${idx === currentScene ? styles.active : ''}`}
              />
            ))}
          </div>

          <button onClick={nextScene} className={styles.navButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.aspectRatio}>16:9</div>
    </main>
  )
}
