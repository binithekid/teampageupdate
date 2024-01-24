import styles from "../../Styles/modules/privacy_terms/index.module.scss"

const termsContent = [
  `Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.`,
  `A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.`,
  `We use the following cookies:`,
  `· Strictly necessary cookies. These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.`,
  `· Analytical or performance cookies. These allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.`,
  `· Functionality cookies. These are used to recognise you when you return to our website. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).`,
  `· Targeting cookies. These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website more relevant to your interests.`,
]


export default function PrivacyPolicy() {

  return (
    <main className={styles.cookies_page} >

      <h1>Cookie policy (UK)</h1>

      <div className={styles.content} >
        {
          termsContent.map( text => <p>{text}</p> )
        }
      </div>

    </main>
  )
}
