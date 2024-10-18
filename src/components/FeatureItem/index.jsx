
export default function FeatureItem({img='', imgAlt='', title='Default Title', text='default text'}) {
  return (
    <div className="feature-item">
          <img src={img} alt={imgAlt} className="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>
            {text}
          </p>
        </div>
  )
}
