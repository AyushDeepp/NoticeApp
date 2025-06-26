import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import api from '../config/api';

const NoticeDetail = () => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await api.get(`/api/notices/${id}`);
        setNotice(res.data);
      } catch (error) {
        console.error('Error fetching notice:', error);
        toast.error('Failed to load notice');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await api.delete(`/api/notices/${id}`);
        toast.success('Notice deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting notice:', error);
        toast.error('Failed to delete notice');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!notice) {
    return <div className="text-center mt-5">Notice not found</div>;
  }

  const canDelete = currentUser && (
    currentUser.role === 'admin' || 
    (currentUser.role === 'teacher' && notice.author._id === currentUser._id)
  );

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h3>{notice.title}</h3>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back
                  </Button>
                  {canDelete && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <Badge bg="primary" className="me-2">
                  {notice.author.name}
                </Badge>
                <small className="text-muted">
                  {moment(notice.createdAt).format('MMMM DD, YYYY [at] h:mm A')}
                </small>
              </div>
              <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                {notice.content}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
