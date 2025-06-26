import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import api from '../config/api';

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/api/notices');
      setNotices(res.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await api.delete(`/api/notices/${id}`);
        toast.success('Notice deleted successfully');
        fetchNotices();
      } catch (error) {
        console.error('Error deleting notice:', error);
        toast.error('Failed to delete notice');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <Button variant="primary" onClick={() => navigate('/create-notice')}>
          Create Notice
        </Button>
      </div>

      {notices.length === 0 ? (
        <div className="text-center">
          <p>No notices available.</p>
        </div>
      ) : (
        <Row>
          {notices.map((notice) => (
            <Col key={notice._id} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{notice.title}</Card.Title>
                  <Card.Text>
                    {notice.content.length > 100
                      ? `${notice.content.substring(0, 100)}...`
                      : notice.content}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="primary">{notice.author.name}</Badge>
                    <small className="text-muted">
                      {moment(notice.createdAt).format('MMM DD, YYYY')}
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/notice/${notice._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(notice._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
