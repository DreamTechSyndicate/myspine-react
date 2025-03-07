import { useContext, useRef, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageConsultation,
  HomepageContact,
  HomepagePricing
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'
import { CustomerContext } from '../../contexts'
import { blurb } from '../../copies/homepage-stories';

export const Homepage = () => {
  const [ theme, ] = useState('OCEAN')
  const [ topic, setTopic ] = useState(undefined)

  const [ isLoginModal, toggleLoginModal ] = useState(false)
  const [ isLogoutModal, toggleLogoutModal ] = useState(false)

  const { scrollToTopRef } = useContext(CustomerContext)
  
  const storyRef = useRef()
  const consultationRef = useRef()
  const contactRef = useRef()

  const closeOverlappingModals = (modalToClose) => {
    if (modalToClose === 'topic') {
      setTopic(undefined)
    } else if (modalToClose === 'authentication') {
      toggleLoginModal(false)
      toggleLogoutModal(false)
    }
  }

  return (
    <section 
      className={`Homepage --container --background --${theme}`} 
      ref={scrollToTopRef}>
      <header className="--nav-bar">
        <div className="--left-column">
          <LazyLoad>
            <img
              src={`${logoPath}`}
              className="logo"
              alt="Peace of Mind Spine.com logo, with a Vitruvian man in front of the beach at sunrise"
            />
          </LazyLoad>
          <ul>
            <li>Unbiased.</li>
            <li>Independent.</li>
            <li>Second Opinion Spine Advice.</li>
            </ul>
          <p className="-blurb">{blurb}</p>
        </div>
        <div className="--right-column">
          <HomepageNav
            ref={{
              storyRef,
              consultationRef,
              contactRef
            }}
            isLoginModal={isLoginModal}
            isLogoutModal={isLogoutModal}
            toggleLoginModal={toggleLoginModal}
            toggleLogoutModal={toggleLogoutModal}
            closeOverlappingModal={() => closeOverlappingModals('topic')}
          />
        </div>
      </header>
      
      <SideNavigation ref={scrollToTopRef} />
      <div className="--content-container">
        <HomepageStory ref={storyRef} />
        <HomepageConsultation ref={consultationRef} />
        <HomepagePricing />
        <HomepageTopics 
          topic={topic} 
          setTopic={setTopic} 
          closeOverlappingModal={() => closeOverlappingModals('authentication')} 
        />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}