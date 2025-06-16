import { useFormik } from 'formik'
import * as yup from 'yup'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useRollbar } from '@rollbar/react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { userLogIn } from '../slices/authSlice.js'
import SimpleHeader from '../components/SimpleHeader.jsx'

const SignupPage = () => {
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
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('errors.required'))
        .min(3, t('errors.lengthRules'))
        .max(20, t('errors.lengthRules'))
        .test('no-spaces', t('errors.required'), (value) => {
          return value.trim().length > 0
        }),
      password: yup.string()
        .required(t('errors.required'))
        .min(6, t('errors.passwordMinLength'))
        .test('no-spaces', t('errors.required'), (value) => {
          return value.trim().length > 0
        }),
      confirmPassword: yup.string()
        .required(t('signupPage.confirmPassword'))
        .oneOf([yup.ref('password'), null], t('errors.passwordsMatch')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setError(null)
      setDisabled(true)
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        })
        const { username, token } = response.data
        dispatch(userLogIn({ username, token }))
        navigate('/')
      }
      catch (error) {
        if (error.code === 'ERR_NETWORK') {
          setError(t('errors.network'))
        }
        else if (error.code === 'ERR_BAD_REQUEST') {
          setError(t('errors.userExist'))
        }
        else {
          rollbar.error('Ошибка при регистрации', error)
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
        <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>{t('signupPage.username')}</Form.Label>
            <Form.Control
              ref={usernameInputRef}
              id="username"
              type="text"
              name="username"
              placeholder={t('signupPage.username')}
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={!!formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
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
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>{t('signupPage.confirmPassword')}</Form.Label>
            <Form.Control
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder={t('signupPage.confirmPassword')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {error && (<Alert variant="danger" className="mb-3">{error}</Alert>)}

          <Button className="w-100" variant="primary" type="submit" disabled={disabled}>{t('signupPage.registration')}</Button>

          <Form.Text className="text-center mt-3 d-block">
            {t('signupPage.haveAcc')}
            <Link to="/login">{t('signupPage.loginNavigate')}</Link>
          </Form.Text>
        </Form>
      </Container>
    </>
  )
}

export default SignupPage
