import ThinkSharer from './think-sharer';

document.addEventListener('DOMContentLoaded', () => {
  window.thinkSharer = new ThinkSharer();

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('share-button')) {
      event.preventDefault();
      const type = event.target.getAttribute('data-type');
      let text = event.target.getAttribute('data-text');
      if (!text) {
        text = 'Interesting page';
      }

      switch (type) {
        case 'twitter':
          window.thinkSharer.shareToTwitter(text);
          break;
        case 'facebook':
          window.thinkSharer.shareToFacebook();
          break;
        case 'linkedin':
          window.thinkSharer.shareToLinkedin(document.title);
          break;
        case 'mailto':
          window.thinkSharer.shareInMail();
          break;
        case 'copyurl':
        default:
          window.thinkSharer.copyCurrentUrlToClipboard();
          break;
      }
    }
  });
});
