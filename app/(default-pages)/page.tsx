export const metadata = {
  title: 'Car Dealership',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Section01 from '@/components/section-01'

import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Section01 />
    
      
      <Cta />
    </>
  )
}
