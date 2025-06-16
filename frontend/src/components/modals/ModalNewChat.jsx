import { Form, Button, Modal } from "react-bootstrap"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { useTranslation } from "react-i18next"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannel } from '../../slices/channelsSlice.js'
import { closeModalNewChat } from "../../slices/modalsSlice.js"
import filter from "../../utils/profanityFilter.js"

const ModalNewChat = () => {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation()

  const token = useSelector((state) => state.auth.user.token)
  const channels = useSelector((state) => state.channels.channels)
  const modalNewChatStatus = useSelector((state) => state.modals.modalNewChat.status)

  const notify = () => toast.success(t('notifications.created'))

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: yup.object({
      newChannelName: yup
        .string()
        .required(t('errors.required'))
        .min(3, t('errors.lengthRules'))
        .max(20, t('errors.lengthRules'))
        .test('no-spaces', t('errors.required'), (value) => {
          return value.trim().length > 0
        })
        .test('unique-channel', t('errors.unique'), (value) => {
          return !channels.some((channel) => channel.name === value.trim())
        }),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    context: { channels },
    onSubmit: async (values) => {
      setDisabled(true)
      const newChannelName = filter.clean(values.newChannelName)
      try {
        const response = await axios.post('/api/v1/channels', { name: newChannelName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        const newChannel = response.data
        dispatch(setActiveChannel(newChannel))
        notify()
      } catch(err) {
        console.log(err)
      } finally {
        formik.resetForm()
        setDisabled(false)
      }
      
      formik.resetForm()
      if (!formik.errors.newChannelName) {
        handleClose()
      }
    }
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (modalNewChatStatus) {
      inputRef.current.focus()
    }
  }, [modalNewChatStatus])
  
  const handleClose = () => {
    formik.setErrors({})
    formik.resetForm()
    dispatch(closeModalNewChat())
  }

  return (
    <Modal show={modalNewChatStatus} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('modals.newChatModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannelName">
            <Form.Label className="visually-hidden">{t('modals.newChatModal.channelName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              id="newChannelName"
              type="text"
              name="newChannelName"
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              isInvalid={!!formik.errors.newChannelName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              {t('modals.newChatModal.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              {t('modals.newChatModal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChat
