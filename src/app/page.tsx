import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Offer from '@/components/Offer'
import Process from '@/components/Process'
import VideoDemo from '@/components/VideoDemo'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Offer />
        <Process />
        <VideoDemo
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
