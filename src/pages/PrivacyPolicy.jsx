import React from 'react';
import {SITE} from '../data/site';
import {ButtonArrow} from '../components/Decor';

const sections = [
  {id:'overview',label:'Overview'},
  {id:'information',label:'Information we collect'},
  {id:'purposes',label:'How we use information'},
  {id:'services',label:'Service providers'},
  {id:'photos',label:'Children’s photos and privacy'},
  {id:'cookies',label:'Cookies and external content'},
  {id:'retention',label:'Security and retention'},
  {id:'choices',label:'Your privacy choices'},
  {id:'updates',label:'Updates and contact'}
];

export default function PrivacyPolicy(){
  return <div className="privacy-page">
    <section className="privacy-hero" aria-labelledby="privacy-heading">
      <div className="privacy-hero-orbit privacy-hero-orbit-a" aria-hidden="true">✿</div>
      <div className="privacy-hero-orbit privacy-hero-orbit-b" aria-hidden="true">✷</div>
      <div className="wrap privacy-hero-inner">
        <span className="privacy-hero-kicker">♡ A little care for your information</span>
        <h1 id="privacy-heading">Your privacy <span>matters.</span></h1>
        <p>We believe trust starts with being clear about how your information is handled when you visit our website or reach out about childcare.</p>
        <div className="privacy-hero-meta"><span>Yorkson Childcare Academy</span><span>Draft updated October 15, 2026</span></div>
      </div>
      <div className="privacy-hero-wave" aria-hidden="true" />
    </section>

    <section className="privacy-content"><div className="wrap privacy-layout">
      <aside className="privacy-sidebar" aria-label="Privacy policy sections">
        <h2>On this page <span aria-hidden="true">☀</span></h2>
        <nav>{sections.map(s=><a key={s.id} href={`#${s.id}`}>{s.label}<span aria-hidden="true">↗</span></a>)}</nav>
        <div className="privacy-side-contact"><strong>Questions about privacy?</strong><p>We're happy to hear from you.</p><a href={`mailto:${SITE.email}`}>{SITE.email} ↗</a></div>
      </aside>

      <div className="privacy-body">
        <div className="privacy-owner-note"><span aria-hidden="true">✦</span><div><strong>Review before publication</strong><p>This is a website-specific draft. Yorkson’s owner should confirm the academy’s internal privacy practices, retention period, photo consent, and actual service providers before launching the replacement website.</p></div></div>

        <article id="overview" className="privacy-section"><span className="privacy-number">01</span><h2>Overview</h2>
          <p>This policy explains how <strong>Yorkson Childcare Academy</strong> (“Yorkson,” “we,” or “us”) handles personal information received through this website. Our academy is located at {SITE.address}.</p>
          <p>We aim to collect only the information necessary to respond to families and run our website. This policy addresses website activity and enquiries. Additional privacy notices or consent forms may apply if a family enrols a child in childcare.</p>
        </article>

        <article id="information" className="privacy-section"><span className="privacy-number">02</span><h2>Information we collect</h2>
          <p>When you complete a tour, availability, or contact form, you may choose to provide:</p>
          <ul><li>Parent or guardian name and email address</li><li>Phone number, if you wish to share it</li><li>Your child’s age and preferred start date, if relevant to your question</li><li>Enquiry type and the message you send us</li></ul>
          <p>Our web hosting and security services may also process ordinary technical data such as IP address, browser details, request times, and error or security logs. Please avoid sending medical records, identifying details about children, or other sensitive information through the website form.</p>
        </article>

        <article id="purposes" className="privacy-section"><span className="privacy-number">03</span><h2>Why we use information</h2>
          <p>Information submitted through the forms is intended to help us:</p>
          <ul><li>Answer questions from parents and guardians</li><li>Respond to tour requests and childcare availability enquiries</li><li>Follow up on requests you have made</li><li>Keep the website secure and functioning properly</li><li>Meet applicable legal requirements when necessary</li></ul>
          <p>The current website forms are not designed to enrol you in marketing emails. If we later introduce newsletters, analytics or advertising tools, we will review and update this policy and any consent controls as needed.</p>
        </article>

        <article id="services" className="privacy-section"><span className="privacy-number">04</span><h2>Website service providers</h2>
          <p>To provide these features, the planned React website may use:</p>
          <ul>
            <li><strong>Vercel</strong>, for website hosting, delivery, and related security/diagnostics.</li>
            <li><strong>Resend</strong>, if configured by Yorkson, to deliver your enquiry to the academy’s email inbox. The form is not enabled for sending until the owner connects and verifies this service.</li>
            <li><strong>Google</strong>, for Maps, reviews and listing photos when connected via Places API or an authorized Google Business Profile. Google may process information associated with accessing these images and reviews. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s Privacy Policy</a> and <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">Google Maps Terms</a>.</li>
            <li><strong>Google Fonts</strong>, to load the typefaces used in our website design.</li>
          </ul>
          <p>These services may process technical information in their own systems, potentially outside British Columbia or Canada. We should review their applicable terms and privacy practices before publishing. We may also disclose information where required by law.</p>
        </article>

        <article id="photos" className="privacy-section"><span className="privacy-number">05</span><h2>Children’s photos and privacy</h2>
          <p>We take the privacy of children and families seriously. Any actual photographs of identifiable children displayed by Yorkson should be used only with appropriate parent or guardian permission and in keeping with the academy’s photography and consent practices.</p>
          <p>Some pages currently show illustrative <strong>design-concept images</strong>. These are not presented as real photographs of enrolled children or as an authentic Google Business photo feed. When connected, our public gallery may also display images already published on the academy’s Google listing, subject to the relevant permissions and Google’s terms.</p>
          <p>For a question or request concerning an image of your child, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </article>

        <article id="cookies" className="privacy-section"><span className="privacy-number">06</span><h2>Cookies and external content</h2>
          <p>The React website as currently developed does not include a dedicated advertising tracker or analytics platform. However, hosting services or embedded external content may use cookies or similar technologies for functionality, security, or measurement according to their own policies.</p>
          <p>When you open our embedded Google Map or visit an external Google listing, Google may receive technical information about your visit. You can manage cookies through your browser settings; blocking some third-party functionality may affect embedded content.</p>
        </article>

        <article id="retention" className="privacy-section"><span className="privacy-number">07</span><h2>Security and how long information is kept</h2>
          <p>We aim to limit access to enquiries to people who need to respond to them and to use reasonable safeguards to protect the information entrusted to us. No internet transmission or storage system can be guaranteed completely secure.</p>
          <p>Enquiries may remain in the academy’s email inbox and relevant service-provider records for as long as reasonably needed to respond, manage follow-up, comply with legal obligations, or resolve disputes. Yorkson should confirm and document its specific retention/deletion schedule before this policy is published.</p>
        </article>

        <article id="choices" className="privacy-section"><span className="privacy-number">08</span><h2>Your choices and privacy requests</h2>
          <p>You may contact Yorkson to ask about the personal information we hold about you, request a correction, raise a concern, or withdraw consent where applicable. Some information may need to be retained when permitted or required by law.</p>
          <p>Please email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with “Privacy Request” in the subject line so we can direct your question appropriately. We may need to verify your identity before sharing or changing personal information.</p>
        </article>

        <article id="updates" className="privacy-section privacy-section-last"><span className="privacy-number">09</span><h2>Updates and how to contact us</h2>
          <p>We may update this policy when the website changes, integrations are enabled, or our practices change. The date near the top will be revised when the policy is published or materially updated.</p>
          <div className="privacy-address"><span aria-hidden="true">💌</span><div><strong>{SITE.name}</strong><p>{SITE.address}</p><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href="/contact/">Contact Us</a></div></div>
        </article>
      </div>
    </div></section>

    <section className="privacy-bottom"><div className="wrap privacy-bottom-inner"><span className="privacy-bottom-sun" aria-hidden="true">☀</span><div><span className="privacy-bottom-label">QUESTIONS OR TOUR REQUESTS?</span><h2>Let's talk about your <span>little sunshine!</span></h2><p>Our contact page is always one click away.</p></div><ButtonArrow href="/contact/#enquiry" variant="pink">Contact Us</ButtonArrow></div></section>
  </div>;
}
