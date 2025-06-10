/* eslint-disable */

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import useSocket from '../hooks/useSocket.js';
import Header from "../components/Header.jsx";



const getChannels = async (userToken) => {
  try {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });
    const channels = response.data;
    return channels;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSocket();

  const token = useSelector((state) => state.auth.user.token);
  const channels = useSelector((state) => state.channels.channels);
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchChannels = async () => {
        try {
          const channels = await getChannels(token);
          dispatch(addChannels(channels));
          dispatch(setActiveChannel(channels[0]));
        } catch (error) {
          console.log(error);
        }
      }
      fetchChannels();
    }
  }, [token, navigate, dispatch]);

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0" style={{ overflow: "hidden" }}>
      <Header />
      <Row className="flex-grow-1">
        <Col md={3} className="bg-light p-3 border-end">
          <ChannelsList channels={channels} />
        </Col>
        <Col md={9} className="d-flex flex-column p-0">
          <ChatWindow />
        </Col>
      </Row>
      <ToastContainer />
      <ModalNewChat />
      <RemoveModal />
      <RenameModal />
    </Container>
  );
};

export default HomePage;