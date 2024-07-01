export default function isPasswordStrong(password) {
  const hasNumber = /\d/;
  const hasSmallLetter = /[a-z]/;
  const hasLargeLetter = /[A-Z]/;
  return (
    password.length > 8 &&
    hasNumber.test(password) &&
    hasSmallLetter.test(password) &&
    hasLargeLetter.test(password)
  );
}
