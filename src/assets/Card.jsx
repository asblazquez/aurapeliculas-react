import { LazyLoadImage } from 'react-lazy-load-image-component'
import { API } from '../Constants'
import { AiFillStar } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function CardComponent (props) {
  const { item, overview, rate, route, viewMax } = props
  const navigate = useNavigate()
  const [overViewFormatted, setOverViewFormatted] = useState('')

  const navigateTo = () => {
    navigate(route + item.id)
  }

  useEffect(() => {
    const getoverviewFormatted = () => {
      setOverViewFormatted(overview.slice(0, 150) + '...')
    }

    getoverviewFormatted()
  }, [overview])

  return (
        <div className={viewMax ? 'card sombreado cursor-pointer w-20' : 'card sombreado cursor-pointer w-10'} onClick={navigateTo}>
            <LazyLoadImage
                alt={'poster'}
                src={API.api_image_url + item.poster_path}
                placeholderSrc={'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'}
                height={'100%'}
                width={'100%'}
                loading={'lazy'}
                className={'cardImg'}
            />
            <div className={viewMax ? 'cardInfo fontSize-meduim' : 'cardInfo fontSize-small-custom'}>
                <div className={'voteAverage'}>
                    <span><AiFillStar className={'alignIcon-bottom'} /> {rate}</span>
                </div>
                {overViewFormatted}
            </div>
        </div>
  )
}