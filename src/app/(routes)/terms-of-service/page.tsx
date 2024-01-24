import styles from "../../Styles/modules/privacy_terms/index.module.scss"

const termsContent = [
  `PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE`,
  `Who we are and how to contact us`,
  `www.digitalgravity.com is a site operated by DGP Capital Management Limited ("We"). We are registered in England and Wales under company number 14691552 and have our registered office at 15 Stratton Street, London, W1J 8LQ. Our main trading address is 15 Stratton Street, London, W1J 8LQ.`,
  `DGP Capital Management Ltd. Is an Appointed Representative of G10 Capital Ltd which is authorised and regulated by the Financial Conduct Authority.`,
  `We are a limited company.`,
  `To contact us, please email admin@digitalgravity.com.`,
  `By using our site you accept these terms`,
  `By using our site, you confirm that you accept these terms of use and that you agree to comply with them.`,
  `If you do not agree to these terms, you must not use our site.`,
  `We recommend that you print a copy of these terms for future reference.`,
  `These terms of use refer to the following additional terms, which also apply to your use of our site:`,
  `· Our Privacy Policy.  See further information within the section titled privacy policy on www.digitalgravity.com`,
  `· Our Cookie Policy, which sets out information about the cookies on our site.`,
  `We may make changes to these terms.`,
  `We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time.`,
  `We may suspend or withdraw our site.`,
  `Our site is made available free of charge.`,
  `You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms of use and other applicable terms and conditions, and that they comply with them.`,
  `How you may use material on our site`,
  `You may print off one copy, and may download extracts, of any page(s) from our site for your personal use and you may draw the attention of others within your organisation to content posted on our site.`,
  `You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text.`,
  `Our status (and that of any identified contributors) as the authors of content on our site must always be acknowledged (except where the content is user-generated).`,
  `You must not use any part of the content on our site for commercial purposes without obtaining a licence to do so from us or our licensors.`,
  `If you print off, copy, download, share or repost any part of our site in breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.`,
  `No text or data mining, or web scraping`,
  `You shall not conduct, facilitate, authorise or permit any text or data mining or web scraping in relation to our site or any services provided via, or in relation to, our site. This includes using (or permitting, authorising or attempting the use of):`,
  `· Any "robot", "bot", "spider", "scraper" or other automated device, program, tool, algorithm, code, process or methodology to access, obtain, copy, monitor or republish any portion of the site or any data, content, information or services accessed via the same.`,
  `· Any automated analytical technique aimed at analysing text and data in digital form to generate information which includes but is not limited to patterns, trends and correlations.`,
  `This clause shall not apply insofar as (but only to the extent that) we are unable to exclude or limit text or data mining or web scraping activity by contract under the laws which are applicable to us.`,
  `Do not rely on information on this site.`,
  `The content on our site is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our site.`,
  `Although we make reasonable efforts to update the information on our site, we make no representations, warranties or guarantees, whether express or implied, that the content on our site is accurate, complete or up to date.`,
  `We are not responsible for websites we link to.`,
  `Where our site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.`,
  `We have no control over the contents of those sites or resources.`,
  `Our responsibility for loss or damage suffered by you`,
  `Whether you are a consumer or a business user:`,
  `· We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors and for fraud or fraudulent misrepresentation.`,
  `· Different limitations and exclusions of liability will apply to liability arising as a result of the supply of any products to you, which will be set out in our contractual arrangements with you. `,
  `If you are a business user:`,
  `· We exclude all implied conditions, warranties, representations or other terms that may apply to our site or any content on it.`,
  `· We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:`,
  `· use of, or inability to use, our site; or`,
  `· use of or reliance on any content displayed on our site.`,
  `· In particular, we will not be liable for:`,
  `· loss of profits, sales, business, or revenue;`,
  `· business interruption;`,
  `· loss of anticipated savings;`,
  `· loss of business opportunity, goodwill or reputation; or`,
  `· any indirect or consequential loss or damage.`,
  `How we may use your personal information`,
  `We will only use your personal information as set out in our PRIVACY POLICY.`,
  `We are not responsible for viruses and you must not introduce them.`,
  `We do not guarantee that our site will be secure or free from bugs or viruses.`,
  `You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software.`,
  `You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately.`,
  `Which country's laws apply to any disputes?`,
  `These terms of use, their subject matter and their formation (and any non-contractual disputes or claims) are governed by English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.`,
  `Policies, procedures, measures and tools`,
  `INFORMATION ON ALL RESTRICTIONS IMPOSED ON THE USE OF THE SERVICE IN POLICIES, PROCEDURES, MEASURES AND BY THE USE OF CONTENT MODERATION TOOLS, INCLUDING ALGORITHMIC DECISION-MAKING AND HUMAN REVIEW, AND RULES OF PROCEDURE OF THE SERVICE'S INTERNAL COMPLAINT HANDLING SYSTEM.`,
]

export default function TermsOfService() {

  return (
    <main className={styles.terms_of_service_page} >

      <h1>Website terms and conditions (UK)</h1>

      <div className={styles.content} >
        {
          termsContent.map( text => <p>{text}</p> )
        }
      </div>

    </main>
  )
}
