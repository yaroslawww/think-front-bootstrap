class ThinkSharer {
  constructor(params = {}) {
    this.params = {};
    if (typeof params === 'object' && params !== null) {
      this.params = params;
    }
  }

  getCurrentLink() {
    let link = window.location.href;
    if (this.params.filterCurrentLink) {
      link = this.params.filterCurrentLink(link);
    }

    return link;
  }

  getPopupConfig() {
    let config = `height=450, width=550, top=${window.screen.height / 2 - 275}, left=${window.screen.width / 2 - 225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`;
    if (this.params.filterPopupConfig) {
      config = this.params.filterPopupConfig(config);
    }

    return config;
  }

  shareToTwitter(text, title = 'Share to Twitter') {
    window.open(`http://twitter.com/share?url=${encodeURIComponent(this.getCurrentLink())}&text=${encodeURIComponent(text)}`, title, this.getPopupConfig());
  }

  shareToFacebook(title = 'Share to Facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.getCurrentLink())}`, title, this.getPopupConfig());
  }

  shareToLinkedin(pageTitle, title = 'Share to LinkedIn') {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.getCurrentLink())}&title=${encodeURIComponent(pageTitle || document.title)}`, title, this.getPopupConfig());
  }

  shareInMail(subject = 'Interesting link', text = 'Interesting link: ') {
    window.open(`mailto:?subject=${subject}&amp;body=${text}${this.getCurrentLink()}`);
  }

  copyCurrentUrlToClipboard() {
    this.copyToClipboard(this.getCurrentLink());
    // Create a new event
    const event = new CustomEvent('share-url-copied');
    document.dispatchEvent(event);
  }

  copyToClipboard(text) {
    const dummy = document.createElement('input');

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    if (this.params.copyToClipboardEvent) {
      // Create a new event
      const event = new CustomEvent('copied-to-clipboard', {
        detail: {
          text,
        },
      });
      document.dispatchEvent(event);
    }
  }
}

export default ThinkSharer;
