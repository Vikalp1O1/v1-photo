import React from 'react'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import AwesomeShoots from '@/components/AwesomeShoots'
import Team from '@/components/Team'

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />

      <section id="photo-gallery" className="w-full">
        <Portfolio />
      </section>

      <section id="services" className="w-full">
        <Services />
      </section>

      <section id="testimonials" className="w-full">
        <Testimonials />
      </section>

      <section id="awesome-shoots" className="w-full">
        <AwesomeShoots />
      </section>
    </div>
  )
}

export default Home
