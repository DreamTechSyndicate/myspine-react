/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { Login, Logout } from '.'
import { AuthContext, CustomerContext } from '../../contexts'
import { readCustomerByUserId } from '../../api/customers'

export const HomepageNav = forwardRef((_, refs) => {
  const { storyRef, consultationRef } = refs
  const { userData } = useContext(AuthContext)
  const { 
    customerProfile, 
    setOriginalCustomerProfile, 
    setCustomerProfile 
  } = useContext(CustomerContext)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const scrollConfig = { behavior: "smooth" }

  const readCustomer = async () => {
    try {
      const customer = await readCustomerByUserId(userData?.id)
      const data = { ...customer, phoneNumber: customer.phone_number }
      
      setOriginalCustomerProfile(data)
      setCustomerProfile(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData && !customerProfile) {
      readCustomer()
    }
  }, [userData])

  // const openLogoutModal = () => {
  //   toggleLogoutModal(true)
  //   closeOverlappingModal()
  // }

  // const openLoginModal = () => {
  //   toggleLoginModal(true)
  //   closeOverlappingModal()
  // }

  const navOptions = {
    // login: {
    //   onClick: () => userData ? openLogoutModal() : openLoginModal(),
    //   linkTo: '#login',
    //   text: (userData && customerProfile) ? `Hi, ${customerProfile.firstname}` : 'LOGIN'
    // },
    consultation: {
      onClick: () => consultationRef.current.scrollIntoView(scrollConfig),
      linkTo: `?${queryParams}#consultation`,
      text: 'REQUEST CONSULTATION'
    },
    story: {
      onClick: () => storyRef.current.scrollIntoView(scrollConfig),
      linkTo: '#story',
      text: 'OUR STORY'
    },
    spineAnatomy: {
      onClick: () => {},
      linkTo: '/anatomy',
      text: 'SPINE ANATOMY / PATHOLOGY'
    }
    // contact: {
    //   onClick: () => contactRef.current.scrollIntoView(scrollConfig),
    //   linkTo: '#contact',
    //   text: 'CONTACT'
    // },
    // pricing: {
    //   onClick: () => {},
    //   linkTo: '/pricing',
    //   text: 'PRICING'
    // }
  }

  return (
    <section className="HomepageNav">
      <div className="--nav-options">
        {
          Object.keys(navOptions).map((op, idx) => {
            // const isFocused = (op === 'login' && isLoginModal) ? '--focused' : ''
            const text = navOptions[op].text

            return <React.Fragment key={idx}>
              <Link
                to={`${navOptions[op]?.linkTo}`}
                onClick={navOptions[op].onClick}>
                {/* <h4 className={`--nav-option --button ${isFocused} ${op}`}> */}
                <h4 className={`--nav-option --button ${op}`}>
                  {text}
                </h4>
              </Link>

              {/* {(op === 'login' && isLoginModal) && 
                <Login
                  isOpen={isLoginModal}
                  toggleOpen={toggleLoginModal}
                />
              }
              {(op === 'login' && isLogoutModal) && 
                <Logout
                  isOpen={isLogoutModal}
                  toggleOpen={toggleLogoutModal}
                />
              } */}
            </React.Fragment>
          })
        }
      </div>
      {/* <p className="--nav-info">
        #1 Choice. Second opinion Expert Advice. Fair Pricing
      </p> */}
    </section>
  )
})