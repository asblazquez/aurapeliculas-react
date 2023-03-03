
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { API } from '../Constants'

export function CardComponent (props) {
  const { item } = props
  return (
        <div className='card'>
            <LazyLoadImage
                alt={'poster'}
                src={API.api_image_url + item.poster_path}
                placeholderSrc={'https://anatomised.com/wp-content/uploads/2016/05/spinner-test4.gif'}
                height={'100%'}
                width={'100%'}
                loading={'lazy'}
                className={'cardImg'}
            />
            <div className='cardInfo'>
                texto de prueba
            </div>
        </div>
  )
}