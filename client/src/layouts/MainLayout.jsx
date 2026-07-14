import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout({children}){
  return (
    <div>
      <Navbar />
      <div style={{maxWidth:1100, margin:'0 auto'}}>{children}</div>
      <Footer />
    </div>
  )
}
