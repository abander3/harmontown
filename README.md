# Harmontown Food Pantry — first website iteration

This is a hand-coded, single-page website for GitHub Pages. All styling, scripts, and the original grocery illustration are inside `index.html`. No installation, build command, paid template, external font, or photo download is required. Open `index.html` in a browser to preview it locally.

## Upload from the campus computer

1. Extract the ZIP. Open the extracted `harmontown-starter` folder.
2. Create a new GitHub repository. Use a public repository for GitHub Pages on GitHub Free. Prefer organization-controlled ownership for the eventual production site.
3. Choose **Add file → Upload files** and upload the **contents** of this folder to the repository root. `index.html` must be at the root, not nested in a `harmontown-starter` subfolder. Commit the upload.
4. Open **Settings → Pages**. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
5. Wait for the deployment to finish. Open the URL shown in Pages settings, normally `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
6. Test this preview URL before changing any Wix/domain settings. Do not set `harmontownfoodpantry.org` as the custom domain yet.

No terminal or personal computer is needed for this upload. Do not upload the ZIP itself as your website; upload its extracted contents. `PROJECT-BRIEF.md` can be kept outside the public repository if desired.

## What is working now

- Responsive desktop/mobile layout, sticky navigation, mobile menu, section links, and smooth anchor scrolling.
- Donation calls to action in the header, opening section, help section, and donation band.
- Honest donation placeholder dialog; it collects no payment.
- Distribution placeholder with directions and a contact fallback. No fabricated dates.
- Community statistics: approximately 100 families and 350 people; entirely donation supported.
- About section, staff placeholders, video placeholder with a link to the exact selected video, and FAQs.
- Contact form validation and email-draft handoff to `harmontownfoodpantry@yahoo.com`. **It does not send messages itself.**
- Share button with browser-native sharing or clipboard fallback.
- Gentle scroll reveals, reduced-motion support, keyboard focus styling, skip link, native modal, semantic sections, and content that remains visible without JavaScript.
- System fonts and self-contained SVG illustration, so the initial layout does not depend on remote image services.

## Configuration

Search `index.html` for `const SITE =`. It contains public settings for the campaign URL, announcement source, selected video, optional confirmed distribution date, and form endpoint. **Never put passwords, private API keys, bank information, Wix credentials, or Givebutter admin tokens in this file or repository.** Public widget embed identifiers are different from private credentials.

### Givebutter

Fastest connection: set `donationUrl` to the existing HTTPS campaign URL. Every fallback Donate button will open that campaign. Test that it is the organization's correct ongoing campaign.

For the embedded experience requested:

1. Use the exact official Givebutter embed you already copied. Get a fresh one from her campaign dashboard if the copied snippet relies on Wix-specific markup.
2. Install its supplied loader script **once**, as directed by Givebutter. Do not paste an entire Wix page or Wix-generated wrapper code.
3. Replace the fallback button inside `id="givebutter-nav"` with the official button widget markup. Keep the widget narrow enough for mobile navigation.
4. Optionally paste the official donation form markup inside `id="givebutter-form-slot"`. Remove the adjacent fallback button when it becomes redundant.
5. Set `donationUrl` as a fallback even if the widget is installed. Update the nearby “Givebutter connection pending” text as appropriate.
6. Test the published GitHub Pages site on mobile and while logged out. The preview currently contains no Givebutter loader or real widget ID.

### Facebook distribution announcements

The exact pantry announcement URL was not supplied. The OXMS1 URL is the selected **video**, not an assumed pantry announcement source.

1. Confirm whether announcements are on a public Facebook **Page** or in a **Group**.
2. Set `facebookPageUrl` to the confirmed source. This immediately enables a direct Facebook announcements link.
3. If it is a public Page, set `facebookPageFeedEnabled: true` to try the timeline iframe. Confirm it works on the deployed preview while logged out. Facebook embeds may be unavailable for some visitors, privacy settings, browsers, or blockers; the direct link remains available.
4. If it is a Group, leave the feed setting false. A public Page timeline embed is not a Group feed. Decide on a supported approach after inspecting the actual source; do not promise an automatic Group feed.
5. Keep distribution information accessible outside the feed. The optional `nextDistribution` field can display a confirmed date; `distributionTime` can hold a confirmed time/instructions. Past dates are labeled as previous distributions using America/Chicago's current date. This manual field does not automate updates.
6. Update the explanatory distribution paragraph and FAQ when the final workflow is agreed. Do not leave preview instructions on the production website.

### Selected Facebook video

The saved video is `https://www.facebook.com/OXMS1/videos/2239867703421602/`.

The placeholder links to this video now. Set `videoEmbedEnabled: true` to try Facebook's video player. The video must remain publicly embeddable; test the actual player while logged out, including on mobile. No playback or embed availability is claimed in this draft. The direct Facebook link remains under the enabled player.

### Contact messages

The existing Wix form sends to the pantry's Yahoo email. GitHub Pages does not carry over that Wix service.

Default behavior: validating the form prepares an email draft through `mailto:`. It requires an email application configured on the visitor's device. It never reports “sent,” and does not clear typed text.

For direct delivery, configure a form service owned by the pantry and verified to deliver to the Yahoo address. Set `contactEndpoint` to its HTTPS endpoint. The form will submit a native POST with `firstName`, `lastName`, `email`, and `message`; adapt names/hidden fields if the selected provider requires them. Configure spam controls, delivery notifications, error/success pages, and any required privacy notice with that service. The endpoint field alone is not a complete delivery setup. Send an authorized test and confirm actual receipt before launch. This draft stores no submissions and uses no private email credentials.

### Real images and staff

Replace the SVG inside `id="hero-image-slot"` with an image, for example `<img src="assets/pantry-shelves.jpg" alt="Food stocked on shelves at Harmontown Food Pantry" style="width:100%;height:100%;object-fit:cover">`. Upload the asset at that relative path. Update the figure caption and alt text to match the actual image. Relative paths work both on a GitHub project preview and a custom domain.

Staff names and roles are intentionally not guessed. Replace the three staff placeholders with approved names, roles, and public contact details. The postal address is taken from the previous website; confirm it with leadership before launch. Confirm all copy and approximate impact figures.

## Before calling it production-ready

- Connect/test Givebutter and verify the destination campaign.
- Confirm announcement source and the distribution workflow; avoid stale dates.
- Test the selected video or retain a clear external link.
- Connect/test direct contact delivery, or agree to an email-link-only design.
- Approve staff, photos, address, service eligibility instructions, and final wording.
- Check mobile navigation, keyboard use, legibility, all external links, and reduced-motion behavior.
- Remove the preview ribbon by setting `preview: false`. This does not automatically remove other placeholder copy.
- Remove the `noindex, nofollow` robots meta line only after the content and integrations are ready. This line discourages indexing; it does **not** make a public test site private.
- Verify the domain in GitHub; configure the custom domain and appropriate DNS records at the domain provider, preserve email-related DNS records, and enable HTTPS using the current provider instructions.
- Keep the Wix domain subscription renewed. Review the separate website plan only after the replacement is working.

## Verification performed for this handoff

JavaScript syntax and HTML structure/local navigation were checked programmatically. The page was not verified in a real browser during this handoff. Placeholder integrations have deliberately not been represented as working connections. Test the published GitHub Pages preview on your phone and desktop; share screenshots for the next design pass.
