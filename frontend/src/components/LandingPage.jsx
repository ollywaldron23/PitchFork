import React, { useState } from 'react';
import '../styles/components/LandingPage.css';

export default function LandingPage() {
  const [idea, setIdea] = useState('');
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const [hoverSide, setHoverSide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [negativeFeedback, setNegativeFeedback] = useState('');

  const backgroundImage =
    !ideaSubmitted
      ? '/main.png'
      : hoverSide === 'angel'
      ? '/angelhover.png'
      : hoverSide === 'devil'
      ? '/devilhover.png'
      : '/main.png';

    const handleReset = () => {
        setIdea('');
        setIdeaSubmitted(false);
    };

    const handleSubmit = async () => {
      alert('Pitched!');
      if (!idea) return

        setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/review-idea', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea }),
          })

        

        if (!response.ok) {
          throw new Error('Failed to fetch review')
        }

        const data = await response.json()
        setPositiveFeedback(data.positive)
        setNegativeFeedback(data.negative)
      } catch (error) {
        console.error(error)
        // handle error UI here
      } finally {
        setLoading(false)
        setIdeaSubmitted(true);
      }
    }

  return (
    <div
      className="page-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content-wrapper">
        {/* Hover zones inside content-wrapper */}
        {ideaSubmitted && (
          <>
            <div
              className="hover-zone left-zone"
              onMouseEnter={() => setHoverSide('angel')}
              onMouseLeave={() => setHoverSide(null)}
            />
            <div
              className="hover-zone right-zone"
              onMouseEnter={() => setHoverSide('devil')}
              onMouseLeave={() => setHoverSide(null)}
            />
          </>
        )}

        {/* Angel feedback box on left */}
        {ideaSubmitted && hoverSide === 'angel' && (
            <div className="hover-box left-hover">
                <p>{positiveFeedback}</p>
            </div>
        )}

        <div
          className="center-input"
          onMouseEnter={() => setHoverSide(null)}
        >
          <p>Got an idea? Let's see what they think!</p>
          <textarea
            placeholder="Type your idea here..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={5}  
                style={{ resize: 'none' }}
            ></textarea>
            <div className="button-group">
                <button onClick={handleSubmit}>pitch</button>
                <button onClick={handleReset} className="reset-button">reset</button>
            </div>
        </div>
        {/* Devil feedback box on right */}
        {ideaSubmitted && hoverSide === 'devil' && (
            <div className="hover-box right-hover">
                <p>{negativeFeedback}</p>
            </div>
        )}
      </div>
    </div>
  );
}
