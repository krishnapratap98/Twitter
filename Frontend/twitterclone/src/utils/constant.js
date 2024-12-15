// export const USER_API_END_POINT="http://localhost:8080/api/v1/user";
// export const TWEET_API_END_POINT="http://localhost:8080/api/v1/tweet"

const backendURL = process.env.REACT_APP_BACKEND_URL;
console.log(backendURL, 'backendurl');
export const USER_API_END_POINT=`${backendURL}/api/v1/user`;
export const TWEET_API_END_POINT=`${backendURL}/api/v1/tweet`;
