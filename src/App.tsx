import { useEffect, useState } from 'react';
import './App.css'
import FakeData from "./fake.json";

function App() {
  const [currPage, setCurrPage] = useState(1);
  const [productItem, setProductItem] = useState<{ [key: string]: any }[]>([]);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  function setInitialData() {
    const limitPerPage = 5;
    const start = 0 + ((currPage - 1) * limitPerPage);
    const end = start + limitPerPage;
    const limitedItems = FakeData.slice(start, end);
    setProductItem(limitedItems);
  }

  useEffect(() => {
    // this fn must be called inside api call
    setInitialData();
    handlePageNumbers();
  }, [currPage])

  function handlePageNumbers() {
    const limitPerPage = 5;
    const totalPage = FakeData.length / limitPerPage;
    const numOfPageShown = 3;
    const arr = Array(totalPage).fill("").slice(0, numOfPageShown).map((_, i) => {
      return currPage > (numOfPageShown) && currPage <= totalPage ? (i + 1) + ((currPage) - (numOfPageShown)) : i + 1
    });
    setPageNumbers(arr);
  }

  return (
    <>
      <h2>Pagination</h2>
      <div className='product-section'>
        {
          productItem.length !== 0 && (
            productItem.map(({ title, thumbnail, id }) => (
              <div className='product-item' key={id}>
                <img className='product-item__image' src={thumbnail} alt={title} />
                <div className='product-item__name product-item__name--primary'>{title}</div>
              </div>
            ))
          )
        }
      </div>
      <div className='pagination-section'>
        {
          pageNumbers.length !== 0 && (
            <div className='pagination'>
              <button className='pagination__button' disabled={currPage === 1} onClick={() => currPage !== 1 && setCurrPage(a => a - 1)}>prev</button>
              {
                pageNumbers.map((count, i) => (
                  <span key={count} className={`pagination__step ${(currPage > 1 && currPage < 6) && ((i + 1) === Math.ceil(3 / 2)) ? "pagination__step--active" : currPage === count ? "pagination__step--active" : ""}`}>
                    {count}
                  </span>
                ))
              }
              <button className='pagination__button' disabled={currPage === (FakeData.length / 5)} onClick={() => currPage !== (FakeData.length / 5) && setCurrPage(a => a + 1)}>next</button>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
