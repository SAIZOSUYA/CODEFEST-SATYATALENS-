document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get('url');

  if (redirectUrl) {
    window.location.replace(redirectUrl);
  } else {
    const message = document.createElement('p');
    message.textContent = 'No redirect URL provided. Please pass ?url=TARGET_URL in the query string.';
    document.body.appendChild(message);
    console.warn('post-redirect: missing url parameter');
  }
});
