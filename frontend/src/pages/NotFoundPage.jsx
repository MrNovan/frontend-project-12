import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <Card.Title as="h1" className="mb-4" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            404
          </Card.Title>

          <Card.Text className="mb-4" style={{ fontSize: '1.25rem' }}>
            {t('notFoundPage.notFound')}
          </Card.Text>
          <Card.Text className="mb-4" style={{ fontSize: '1rem', color: '#6c757d' }}>
            {t('notFoundPage.navigateToHome')}
          </Card.Text>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
          >
            {t('notFoundPage.toHome')}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
