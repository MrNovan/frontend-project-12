import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { userLogIn } from '../slices/authSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useRollbar } from '@rollbar/react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import SimpleHeader from '../components/SimpleHeader.jsx'

const LoginPage = () => {
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const usernameInputRef = useRef(null)
  const { t } = useTranslation()
  const rollbar = useRollbar()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setError(null)
      setDisabled(true)
      try {
        const response = await axios.post('/api/v1/login', values)
        const { token, username } = response.data
        dispatch(userLogIn({ username, token }))
        navigate('/')
      }
      catch (error) {
        if (error.code === 'ERR_NETWORK') {
          setError(t('errors.network'))
        }
        else if (error.code === 'ERR_BAD_REQUEST') {
          setError(t('errors.incorrectPasswordOrUsername'))
        }
        else {
          rollbar.error('Ошибка при входе', error)
          setError(t('errors.unknown'))
        }
      }
      finally {
        setDisabled(false)
      }
    },
  })

  useEffect(() => {
    usernameInputRef.current.focus()
  }, [])

  return (
    <>
      <SimpleHeader />
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>{t('loginPage.yourUsername')}</Form.Label>
            <Form.Control
              ref={usernameInputRef}
              id="username"
              type="text"
              name="username"
              placeholder={t('loginPage.username')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder={t('password')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </Form.Group>
          {error && (<Alert variant="danger" className="mb-3">{error}</Alert>)}
          <Button className="w-100" variant="primary" type="submit" disabled={disabled}>{t('loginPage.login')}</Button>
          <Form.Text className="text-center mt-3 d-block">
            {t('loginPage.noAcc')}
            <Link to="/signup">{t('loginPage.signupNavigate')}</Link>
          </Form.Text>
        </Form>
      </Container>
    </>
  )
}

export default LoginPage
