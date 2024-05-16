const awsLogin = `aws sso login`;
const awsCheckIsLoggedIn = `aws sts get-caller-identity`;

export default {
	awsCheckIsLoggedIn,
	awsLogin,
};
