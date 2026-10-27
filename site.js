/* Shared settings for all three pages. Only public configuration belongs here. */
const SITE = {
  preview: true,
  email: 'harmontownfoodpantry@yahoo.com',
  donationUrl: '',
  facebookPageUrl: '',
  facebookPageFeedEnabled: false,
  videoUrl: 'https://www.facebook.com/OXMS1/videos/2239867703421602/',
  videoEmbedEnabled: false,
  nextDistribution: '', // Confirmed YYYY-MM-DD only.
  distributionTime: '',
  contactEndpoint: '' // Configured HTTPS form-service endpoint; never private credentials.
};

const $ = selector => document.querySelector(selector);
const validHttps = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
$('#year').textContent = new Date().getFullYear();
$('#preview-bar').hidden = !SITE.preview;
document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + SITE.email; if (a.textContent.includes('@')) a.textContent = SITE.email; });
$('[data-donation-email]').href = 'mailto:' + SITE.email + '?subject=Supporting%20Harmontown%20Food%20Pantry';

const donationDialog = $('#donate-dialog');
document.querySelectorAll('[data-donate]').forEach(button => button.addEventListener('click', () => {
  if (validHttps(SITE.donationUrl)) { window.location.assign(SITE.donationUrl); return; }
  if (typeof donationDialog.showModal === 'function') donationDialog.showModal();
  else window.location.assign('mailto:' + SITE.email + '?subject=Supporting%20the%20pantry');
}));
$('#close-dialog').addEventListener('click', () => donationDialog.close());
donationDialog.addEventListener('click', e => {
  if (e.target !== donationDialog) return;
  const r = donationDialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) donationDialog.close();
});
if (validHttps(SITE.donationUrl) && $('.donate-side > p')) $('.donate-side > p').textContent = 'Donations processed through Givebutter';

function makeFrame(src, title) {
  const frame = document.createElement('iframe');
  frame.src = src; frame.title = title; frame.loading = 'lazy';
  frame.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
  frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin';
  return frame;
}

const announcementsLink = $('#facebook-announcements-link');
if (announcementsLink && validHttps(SITE.facebookPageUrl)) {
  announcementsLink.href = SITE.facebookPageUrl; announcementsLink.target = '_blank';
  announcementsLink.rel = 'noopener noreferrer'; announcementsLink.textContent = 'View announcements on Facebook ↗';
}
if ($('#facebook-feed-slot') && SITE.facebookPageFeedEnabled && validHttps(SITE.facebookPageUrl)) {
  const frame = makeFrame('https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(SITE.facebookPageUrl) + '&tabs=timeline&width=340&height=440&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false', 'Harmontown Food Pantry Facebook announcements');
  frame.style.cssText = 'width:100%;height:440px;border:0;display:block';
  $('#facebook-feed-slot').prepend(frame);
  $('#facebook-feed-slot .placeholder-symbol').remove(); $('#facebook-feed-slot h3').remove();
  $('#facebook-feed-slot p').textContent = 'If updates do not load here, open announcements directly on Facebook.';
  $('#update-badge').textContent = 'Facebook';
}
if ($('#video-slot')) {
  if (validHttps(SITE.videoUrl)) { $('#video-play-link').href = SITE.videoUrl; $('#video-text-link').href = SITE.videoUrl; }
  if (SITE.videoEmbedEnabled && validHttps(SITE.videoUrl)) {
    $('#video-slot').replaceChildren(makeFrame('https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(SITE.videoUrl) + '&show_text=false&width=560', 'Community food assistance video selected by Harmontown Food Pantry'));
    $('.caption').replaceChildren(document.createTextNode('If the video does not load, '));
    const link = document.createElement('a'); link.href = SITE.videoUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'watch on Facebook ↗'; $('.caption').append(link);
  }
}
if ($('#distribution-date') && /^\d{4}-\d{2}-\d{2}$/.test(SITE.nextDistribution)) {
  const date = new Date(SITE.nextDistribution + 'T12:00:00');
  if (!Number.isNaN(date.valueOf()) && date.toLocaleDateString('en-CA') === SITE.nextDistribution) {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
    const box = $('#distribution-date'); box.hidden = false;
    const label = document.createElement('strong'); label.textContent = SITE.nextDistribution < today ? 'Previous distribution — check for updates' : 'Next confirmed distribution';
    const value = document.createElement('p'); value.className = 'date-box'; value.textContent = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const time = document.createElement('p'); time.className = 'small'; time.textContent = SITE.distributionTime;
    box.append(label, value, time);
  }
}

// Carry volunteer intent between actual pages without putting contact details in URLs.
document.querySelectorAll('[data-topic]').forEach(link => link.addEventListener('click', () => {
  try { sessionStorage.setItem('pantry-contact-topic', link.dataset.topic); } catch { /* Storage is optional. */ }
}));
const contactForm = $('#contact-form');
if (contactForm) {
  try {
    const topic = sessionStorage.getItem('pantry-contact-topic');
    if (topic && !$('#message').value) $('#message').value = 'Hello! I would like to ask about ' + topic.toLowerCase() + '. ';
    sessionStorage.removeItem('pantry-contact-topic');
  } catch { /* Form still works when storage is disabled. */ }
  const directDelivery = validHttps(SITE.contactEndpoint);
  if (directDelivery) {
    $('#contact-mode').textContent = 'Your message will be sent through the pantry’s connected form service.';
    $('#message-button').textContent = 'Send message ↗';
    contactForm.action = SITE.contactEndpoint; contactForm.method = 'POST';
  }
  contactForm.addEventListener('submit', e => {
    if (directDelivery) return; // Service handles actual delivery and confirmation.
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = [data.get('firstName'), data.get('lastName')].filter(Boolean).join(' ');
    const body = 'Name: ' + name + '\nReply email: ' + data.get('email') + '\n\n' + data.get('message');
    window.location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent('Website inquiry from ' + name) + '&body=' + encodeURIComponent(body);
    $('#form-status').textContent = 'Your email app should open with a draft. Nothing has been sent by this website. Review and send the email there, or email ' + SITE.email + ' directly.';
  });
}
if ($('#share-button')) $('#share-button').addEventListener('click', async () => {
  const url = new URL('index.html', location.href).href;
  try {
    if (navigator.share) await navigator.share({ title: 'Harmontown Food Pantry', url });
    else if (navigator.clipboard && location.protocol !== 'file:') { await navigator.clipboard.writeText(url); $('#share-status').textContent = 'Website link copied.'; }
    else $('#share-status').textContent = 'Copy the website address from your browser to share it.';
  } catch (error) { if (error.name !== 'AbortError') $('#share-status').textContent = 'Copy the website address from your browser to share it.'; }
});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('waiting'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => { if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('waiting'); observer.observe(el); });
  document.documentElement.classList.add('motion-ready');
}
