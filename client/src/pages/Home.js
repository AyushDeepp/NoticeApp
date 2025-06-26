import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import moment from 'moment';
import api from '../config/api';

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/api/notices');
        setNotices(res.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Latest Notices</h2>
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
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="primary">{notice.author.name}</Badge>
                    <small className="text-muted">
                      {moment(notice.createdAt).format('MMM DD, YYYY')}
                    </small>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/notice/${notice._id}`} className="btn btn-outline-primary btn-sm">
                    Read More
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
