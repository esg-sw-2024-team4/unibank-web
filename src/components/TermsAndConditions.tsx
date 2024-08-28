import React from 'react';

interface TermsAndConditionsProps {
  allAgree: boolean;
  showTerms: boolean;
  setAllAgree: (agree: boolean) => void;
  setShowTerms: (show: boolean) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  allAgree,
  showTerms,
  setAllAgree,
  setShowTerms,
}) => {
  return (
    <>
      <div className="terms-container">
        <div>
          <label className="terms-label">
            <input
              style={{ margin: '1px' }}
              type="checkbox"
              checked={allAgree}
              onChange={(e) => setAllAgree(e.target.checked)}
            />
            <p style={{ fontSize: '10px' }}>아래 약관에 모두 동의합니다.</p>
          </label>
        </div>
        <div className="terms-right">
          <span className="terms-link" onClick={() => setShowTerms(!showTerms)}>
            전문보기
          </span>
        </div>
      </div>
      {showTerms && (
        <div className="terms-content">
          <p>약관내용</p>
        </div>
      )}
    </>
  );
};

export default TermsAndConditions;
