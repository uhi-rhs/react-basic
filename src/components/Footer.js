import React from 'react'
import { SocialIcon } from 'react-social-icons'


const Footer = () => {
  return (
    <div className="footer">
    <SocialIcon url="https://www.linkedin.com/company/rural-housing-scotland/" className="ml-4 mt-2" target="_blank" fgColor="#fff" bgColor="#1e3a8a" style={{ height: 24, width: 24} }/>
    <SocialIcon url="https://www.facebook.com/RuralHousingScotland" className="ml-4 mt-2" target="_blank" fgColor="#fff" bgColor="#1e3a8a" style={{ height: 24, width: 24} }/>
    <SocialIcon url="https://twitter.com/RuralHousingSco" className="ml-4 mt-2" target="_blank" fgColor="#fff" bgColor="#1e3a8a" style={{ height: 24, width: 24} }/>
    <SocialIcon url="https://www.instagram.com/ruralhousingscotland/" className="ml-4 mt-2" target="_blank" fgColor="#fff" bgColor="#1e3a8a" style={{ height: 24, width: 24} }/>
    </div>
  )
}

export default Footer