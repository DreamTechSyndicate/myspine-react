/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CredentialForm } from '.'
import { AuthContext, NotificationContext } from '../../contexts'
import { 
  renderPasswordReset, 
  resetPassword 
} from '../../api/sessions'

export const PasswordReset = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tokenParam = queryParams.get('token')
  const userIdParam = queryParams.get('userId')

  const defaultResetPayload = {
    password: '',
    token: tokenParam,
    userId: userIdParam
  }

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)

  const [ resetPayload, setResetPayload ] = useState(defaultResetPayload)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  useEffect(() => {
    if (tokenParam && userIdParam) {
      const requestPasswordReset = async () => {
        try {
          const data = await renderPasswordReset({ 
            token: tokenParam, 
            userId: userIdParam 
          })
          setIsAuthenticated(data)
        } catch (err) {
          setIsAuthenticated(false)
          setNotification({
            type: 'error',
            message: 'Something went wrong. Please make sure the reset password link has not expired, or try again later.'
          })
        }
      };
      requestPasswordReset()
    }
  }, [tokenParam, userIdParam, location, setNotification])

  const clearAndClose = () => {
    setResetPayload(defaultResetPayload)
    navigate("/")
  }

  const onSubmit = async() => {
    setIsSubmitting(true)

    if (resetPayload.password) {
      try {
        await resetPassword({
          password: resetPayload.password,
          userId: userIdParam,
          token: tokenParam
        })
        setIsAuthenticated(true)
        setNotification({
          type: 'success', 
          message: 'Password reset successfully! You can now login with the new password.'
        })
        clearAndClose()
      } catch (err) {
        setIsAuthenticated(false)
        setNotification({
          type: 'error', 
          message: 'Something went wrong. Please make sure the reset password link has not expired, or try again later.'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className={`PasswordReset --container --background`}>
      {
        !isAuthenticated
          ? <p className="--unauthenticated">The link may be invalid, or has already expired. Please <em className="--button" onClick={() => navigate("/")}>return to homepage</em> and request another password reset</p>
        : <CredentialForm 
            credentials={resetPayload}
            isSubmitting={isSubmitting}
            onChange={(payload) => setResetPayload({ ...resetPayload, ...payload })}
            onSubmit={onSubmit}
            placeholderText={[
              "",
              "Please enter the new password"
            ]}
            requiredFields={["password"]}
            submitButtonText={"CONFIRM"}
        />
      }
    </section>
  )
}