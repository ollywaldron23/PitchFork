import { useState } from 'react';
import '../styles/components/LandingPage.css';
import { FaRegSmile } from "react-icons/fa";
import { FaRegFaceLaughSquint } from "react-icons/fa6";

export default function LandingPage() {
  const [idea, setIdea] = useState('');
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const [hoverSide, setHoverSide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [negativeFeedback, setNegativeFeedback] = useState('');
  const [jokeMode, setJokeMode] = useState(false);

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
      setPositiveFeedback('');
      setNegativeFeedback('');
    };

    const handleSubmit = async () => {
      if (!idea) return

        setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/review-idea', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea, jokeMode }),
          })

        if (!response.ok) {
          throw new Error('Failed to fetch review')
        }

        const data = await response.json()
        alert('Pitched!');
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
            <div className="joke-mode-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={jokeMode}
                  onChange={(e) => setJokeMode(e.target.checked)}
                  className="toggle-checkbox"
                />
                <span className="icon-wrapper">
                    {jokeMode ? <FaRegFaceLaughSquint /> : <FaRegSmile />}
                </span>
                <span className="toggle-text">{jokeMode ? 'fun mode' : 'serious mode'}</span>
              </label>
              </div>
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
