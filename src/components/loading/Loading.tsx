import { useEffect, useState } from 'react';
import * as s from './Loading.style';
import Idea from '../../assets/idea.svg';

const Loading = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 1.5초 후 로딩 종료
    return () => clearTimeout(timer);
  }, []);
  return visible ? (
    <s.PageWrapper>
      <s.LoadingWrapper>
        <s.IdeaIcon xmlns={Idea} viewBox="0 0 180 180" fill="none">
          <g filter="url(#filter0_b_1043_5343)">
            <circle
              cx="90"
              cy="90"
              r="90"
              fill="url(#paint0_linear_1043_5343)"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_1043_5343"
              x="-10"
              y="-10"
              width="200"
              height="200"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_1043_5343"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_1043_5343"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1043_5343"
              x1="0"
              y1="0"
              x2="180"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D6EBFF" />
              <stop offset="1" stopColor="#C2C7FF" />
            </linearGradient>
          </defs>
        </s.IdeaIcon>
        <s.LoadingText>잠시만 기다려주세요...</s.LoadingText>
      </s.LoadingWrapper>
    </s.PageWrapper>
  ) : null;
};

export default Loading;
