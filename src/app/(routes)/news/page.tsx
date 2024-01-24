"use client"

import { useState } from "react"
import styles from "../../Styles/modules/News/index.module.scss"
import Link from "next/link"

export default function News() {

  const [activeCategory,setActiveCategory] = useState(allCategories[0])
  const [filteredNews,setFilteredNews] = useState(NewsData)

  const filterNews = ( newCat: string ) => {

    if ( activeCategory === newCat ) return

    setActiveCategory(newCat)

    if ( newCat === "All" ) setFilteredNews(NewsData)
    else {
      const newFilteredNews = NewsData.filter( ({ category }) => category === newCat )
      setFilteredNews(newFilteredNews)
    }
  }

  return (
    <main className={styles.news_page} >
    
      <section className={styles.news_section} >

        <h1>News</h1>

        <div className={styles.news_wrapper} >

          <nav className={styles.news_categories} >
            {
              allCategories.map( (category) => 
                <button className={ category === activeCategory ? styles.active_cat : "" } 
                  onClick={() => filterNews(category)} key={category} >
                    {category}
                </button>
              )
            }
          </nav>

          {
            filteredNews.map( ({ title,category, date, link }) => 
              <Link className={styles.news_row} key={date} href={link} target="_blank" >
                <span className={styles.date_cat} >{ date } &nbsp;-&nbsp; {category}</span>
                <h2>{title}</h2>
              </Link>
            )
          }
        </div>

      </section>
    </main>
  )
}

const allCategories = ["All","Firm","Portfolio","People"]

const NewsData = [
  {
    title: "Digital Gravity Infrastructure Partners launches today",
    date: "27.07.2023",
    category: "Firm",
    link: "/PDF/Digital_Gravity_Infra_Partners_Firm_Launch.pdf"
  },
]