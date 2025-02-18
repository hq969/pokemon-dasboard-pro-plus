import { useDispatch } from 'react-redux'
import { setPage, setType } from '../../redux/feature/typeFilterSlice'

const TypeFilter = ({ fixed }) => {
  const types = ["all", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric ", "psychic", "ice", "dragon", "dark", "fairy",]
  const dispatch = useDispatch();
  return (
    <div className={`${fixed && "fixed-top"}`}>
      <div id='filter' className={`d-flex py-3 px-5 mx-auto overflow-scroll gap-2 badge-bg`}>
        {types.map((item) => (
          <button
            type="button"
            key={item}
            title={`type filter ${item}`}
            className='badge ms-1 bg-success text-capitalize'
            onClick={() => {
              dispatch(setPage(1));
              dispatch(setType(item))
            }}
          >
            {item}
          </button>
        ))
        }
      </div>
      <button
        className={`${!fixed && 'd-none'} position-absolute top-50 start-0 translate-middle-y fa-solid fa-arrow-left`}
        onClick={(() => {
          document.getElementById('filter').scrollBy(-100, 0)
        })}
      ></button>
      <button
        className={`${!fixed && 'd-none'} position-absolute top-50 end-0 translate-middle-y fa-solid fa-arrow-right`}
        onClick={(() => {
          document.getElementById('filter').scrollBy(100, 0)
        })}
      ></button>
    </div>
  )
}

export default TypeFilter