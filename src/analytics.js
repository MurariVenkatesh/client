import ReactGA from 'react-ga';

const TRACKING_ID = "G-L1F6XVPHYV"; // Replace with your Google Analytics measurement ID
ReactGA.initialize(TRACKING_ID);

export const logPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
