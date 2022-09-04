import * as React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { getCurrentLangKey, getLangs, getUrlForLang } from "ptz-i18n"
import { IntlProvider } from "react-intl"
import "intl"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SelectLanguage from "../components/SelectLanguage"

const BlogIndex = ({ data, location, i18nMessages }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const url = location.pathname
  const { langs, defaultLangKey } = data.site.siteMetadata.languages
  const langKey = getCurrentLangKey(langs, defaultLangKey, url)
  const homeLink = `/${langKey}/`.replace(`/${defaultLangKey}/`, "/")
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url)).map(
    item => ({
      ...item,
      link: item.link.replace(`/${defaultLangKey}/`, "/"),
    })
  )
  console.log("langsMenu", langsMenu)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <IntlProvider locale={langKey} messages={i18nMessages}>
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <SelectLanguage langs={langsMenu} />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    </IntlProvider>
  )
}

export default BlogIndex

// BlogIndex.propTypes = {
//   children: PropTypes.func,
// }

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
