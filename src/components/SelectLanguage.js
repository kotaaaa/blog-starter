import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import { FormattedMessage } from "react-intl"

const SelectLanguage = props => {
  console.log("props", props)
  const links = props.langs.map(lang => (
    <Link
      to={lang.link}
      key={lang.langKey}
      style={{
        color: "black",
      }}
    >
      <li selected={lang.selected}>{lang.langKey}</li>
    </Link>
  ))

  return (
    <section>
      <header
        style={{
          color: "black",
        }}
      >
        <FormattedMessage id="selectLanguage" />
      </header>
      <ul>{links}</ul>
    </section>
  )
}

SelectLanguage.propTypes = {
  langs: PropTypes.array,
}

export default SelectLanguage
