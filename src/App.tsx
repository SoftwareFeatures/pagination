import './App.css'
import FakeData from "./fake.json";

function App() {

  return (
    <>
      <h2>Pagination</h2>
      <div className='product-section'>
        {
          FakeData.length !== 0 && (
            FakeData.slice(0, 5).map(({ title, thumbnail, id }) => (
              <div className='product-item' key={id}>
                <img className='product-item__image' src={thumbnail} alt={title} />
                <div className='product-item__name product-item__name--primary'>{title}</div>
              </div>
            ))
          )
        }
        {
          FakeData.length !== 0 && (
            <div className='pagination'>
              <button className='pagination__button'>prev</button>
              {
                FakeData.slice(0, 5).map((_, i) => (
                  <span key={i} className={`pagination__step ${2 === i ? "pagination__step--active" : ""}`}>
                    {i + 1}</span>
                ))
              }
              <button className='pagination__button'>next</button>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
