import { Form, Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from '../../utils/profanityFilter.js'
import { closeModalRenameChat, setCurrentChannel } from '../../slices/modalsSlice.js'

const RenameModal = () => {
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const token = useSelector((state) => state.auth.user.token)
  const channels = useSelector((state) => state.channels.channels)
  const currentChannel = useSelector((state) => state.modals.currentChannel)
  const modalRenameChatStatus = useSelector((state) => state.modals.modalRenameChat.status)

  const notify = () => toast.success(t('notifications.renamed'))

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
        await axios.patch(`/api/v1/channels/${currentChannel.id}`, { name: newChannelName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
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
    if (modalRenameChatStatus) {
      inputRef.current.focus()
    }
  }, [modalRenameChatStatus])

  const handleClose = () => {
    formik.setErrors({})
    formik.resetForm()
    dispatch(setCurrentChannel())
    dispatch(closeModalRenameChat())
  }

  return (
    <Modal show={modalRenameChatStatus} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('modals.renameModal.renameChannel')}</Modal.Title>
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
              {t('modals.renameModal.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              {t('modals.renameModal.send')}
            </Button> 
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameModal
