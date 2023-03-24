import { API } from '../Constants'
import { AiFillStar } from 'react-icons/ai'

export function HeaderComponent (props) {
  const { title, img, voteAverage } = props
  return (
        <div>
            <div>
                <img className={'imgCabeceraInfo'} alt={'Poster de la pelicula' + title} src={API.api_image_url + img}/>
            </div>
            <div className={'textTitle grid-2'}>
                <div className='w-maxContent'>
                    {title}
                </div>
                <div className='w-maxContent voteAverage'>
                    <span><AiFillStar className={'alignIcon-bottom'} /> {voteAverage !== undefined ? (voteAverage.toFixed(1)) : null}</span>
                </div>
            </div>
        </div>

  )
}